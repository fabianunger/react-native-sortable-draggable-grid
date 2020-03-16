import React, { Component } from 'react';
import { Dimensions, PanResponder, StyleSheet, View, } from 'react-native';
import Card from './Card';
import { isPointWithinArea } from './_helpers/helpers';

class SortableDraggableGrid extends Component {
    static defaultProps = {
        animationDuration: 400
        // animationDuration: 250
    };

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

    createPanResponder = () => PanResponder.create({
        // Handle drag gesture
        onMoveShouldSetPanResponder: (_, gestureState) => this.onMoveShouldSetPanResponder(gestureState),
    });

    onMoveShouldSetPanResponder = (gestureState) => {

        const { dx, dy, moveX, moveY, numberActiveTouches } = gestureState;
        console.log(dx, dy, moveX, moveY, numberActiveTouches )
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

    render() {
        return (
            <View style={styles.container}
                  {...this.panResponder.panHandlers}
            >
                {/*<Text>{this.props.animationDuration}</Text>*/}
                {this.state.cards.map((card, index) => {
                    return <Card key={index} title={card.title}/>
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
