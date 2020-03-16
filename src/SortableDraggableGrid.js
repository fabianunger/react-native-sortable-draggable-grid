import React, { Component } from 'react';
import { Dimensions, PanResponder, StyleSheet, View,LayoutAnimation} from 'react-native';
import Card from './Card';
import { isPointWithinArea , moveArrayElement} from './_helpers/helpers';

class SortableDraggableGrid extends Component {
    static defaultProps = {
        animationDuration: 400
        // animationDuration: 250
    };

    cardBeingDragged

    constructor(props) {
        super(props);
        const { width, height } = Dimensions.get('window');
        this.state = {
            cards: [
                { key: 1, title: '1' },
                { key: 2, title: '2' },
                { key: 3, title: '3' },
                { key: 4, title: '4' },
                { key: 5, title: '5' },
                { key: 6, title: '6' },
                { key: 7, title: '7' },
                { key: 8, title: '8' },
                { key: 9, title: '9' },
                { key: 10, title: '10' },
            ],
            dndEnabled: true,
        };
    }

    componentWillMount() {
        this.panResponder = this.createPanResponder();
    }
    componentWillUpdate() {
        LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.easeInEaseOut,
            duration: this.props.animationDuration
        });
    }
    createPanResponder = () => PanResponder.create({
        // Handle drag gesture
        onMoveShouldSetPanResponder: (_, gestureState) => this.onMoveShouldSetPanResponder(gestureState),
        onPanResponderGrant: (_, gestureState) => this.onPanResponderGrant(),
        onPanResponderMove: (_, gestureState) => this.onPanResponderMove(gestureState),
    });
    onPanResponderMove = (gestureState) => {
        const { moveX, moveY } = gestureState;
        if (!this.state.dndEnabled) {
            return;
        }
        // Find the card we're dragging the current card over
        const draggedOverCard = this.findCardAtCoordinates(moveX, moveY, this.cardBeingDragged);
        if (draggedOverCard) {
            this.swapCards(this.cardBeingDragged, draggedOverCard);
        }
    };
    enableDnd = () => {
        this.setState({ dndEnabled: true });
    };
    enableDndAfterAnimating = () => {
        setTimeout(this.enableDnd, this.props.animationDuration);
    };
    swapCards = (draggedCard, anotherCard) => {


        this.setState((state) => {
            const draggedCardIndex = this.state.cards.findIndex(({ key }) => key === draggedCard.key);
            const anotherCardIndex = this.state.cards.findIndex(({ key }) => key === anotherCard.key);

            //old version TODO: Adapt

            // console.log("just before moveArrayElement", this.state.newCardList);

            const newList = moveArrayElement(
                this.state.cards,
                draggedCardIndex,
                anotherCardIndex,
            );
            this.setState({ cards: newList });



            this.setState({ dndEnabled: false });
            // return {};
        }, this.enableDndAfterAnimating);
    };

    onPanResponderEnd = () => {
        this.updateCardState(this.cardBeingDragged, { isBeingDragged: false });
        this.cardBeingDragged = undefined;
        console.log('card is beeing gragged: FALSE');

        // HERE UPDATE FIREBASE BY CHECKING THE INDEXES OF THE ARRAY AND UPDATING THE CARDINDEX OF EACH CARD  - CARDINDEX = NEW Object Array Index

        // console.log(this.state.tempSortableContent);
        // this.props.triggerSetSortContent(this.state.tempSortableContent);
        //
        // this.setState({
        //     cards:
        // })

        // const listArr = this.props.sortableContent;
        // console.log("listArr onPanResponderEnd", listArr);
        // const userRef = firebase.database().ref("users").child(firebase.auth().currentUser.uid);

        // listArr.forEach(c => {
        //   // console.log("index of "+ c.key.toString() + "    is "+ listArr.indexOf(c));
        //   userRef
        //     .child('versions').child(this.props.activeVersion).child("pages").child('content').child(this.props.currentPage).child("cards").child(c.key.toString()).update({i: listArr.indexOf(c)});
        //
        //
        // });
    };
    onPanResponderGrant = () => {
        this.updateCardState(this.cardBeingDragged, { isBeingDragged: true });
        // console.log("card is beeing gragged: TRUE");
    };
    onMoveShouldSetPanResponder = (gestureState) => {

        const { dx, dy, moveX, moveY, numberActiveTouches } = gestureState;
        console.log(dx, dy, moveX, moveY, numberActiveTouches)
        // Do not set pan responder if a multi touch gesture is occurring
        if (numberActiveTouches !== 1) {
            return false;
        }

        // or if there was no movement since the gesture started
        if (dx === 0 && dy === 0) {
            return false;
        }

        // Find the card below user's finger at given coordinates
        const card = this.findCardAtCoordinates(moveX, moveY);
        console.log(card)
        if (card) {
            // assign it to `this.cardBeingDragged` while dragging
            this.cardBeingDragged = card;

            // and tell PanResponder to start handling the gesture by calling `onPanResponderMove`
            return true;
        }

        return false;
    };

    findCardAtCoordinates = (x, y, exceptCard) => this.state.cards.find(
        (card) =>
            card.tlX && card.tlY && card.brX && card.brY
            && isPointWithinArea(x, y, card.tlX, card.tlY, card.brX, card.brY)
            && (!exceptCard || exceptCard.key !== card.key)
    )
    updateCardState = (Card, props) => {
        const index = this.state.cards.findIndex(({ key }) => key === Card.key);

        // console.log("index...", index);

        const ReCards = [
            ...this.state.cards.slice(0, index),
            {
                ...this.state.cards[index],
                ...props,
            },
            ...this.state.cards.slice(index + 1),
        ];

        this.setState({ cards: ReCards });


    };
    onRenderCard = (card,
                    screenX,
                    screenY,
                    width,
                    height) => {
        this.updateCardState(card, {
            tlX: screenX,
            tlY: screenY,
            brX: screenX + width,
            brY: screenY + height,
        });
    };

    render() {
        return (
            <View style={styles.container}
                  {...this.panResponder.panHandlers}
            >
                {/*<Text>{this.props.animationDuration}</Text>*/}
                {this.state.cards.map((card, index) => {
                    return <Card onRenderCard={this.onRenderCard} card={card} key={card.key} title={card.title}/>
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default SortableDraggableGrid;
