import React, { useEffect, useState } from 'react';
import { LayoutAnimation, PanResponder, StyleSheet, Text, View } from 'react-native';
import Card from './Card';
import { isPointWithinArea } from './_helpers/helpers';

export default function SortableDraggableGrid(props) {

    const [dndEnabled, setDndEnabled] = useState(true)
    const [cardBeingDragged,setCardBeingDragged] = useState(undefined)

    useEffect(() => {
        LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.easeInEaseOut,
            // TODO: Make Duration Customizable
            duration: 400
        });
        console.log('useEffect!')
    });


    const createPanResponder = () => PanResponder.create({
        // Handle drag gesture
        onMoveShouldSetPanResponder: (_, gestureState) => onMoveShouldSetPanResponder(gestureState),
        onPanResponderGrant: (_, gestureState) => onPanResponderGrant(),
        onPanResponderMove: (_, gestureState) => onPanResponderMove(gestureState),
    });
    const panResponder = createPanResponder();
    const onPanResponderMove = (gestureState) => {
        const { moveX, moveY } = gestureState;
        if (!dndEnabled) {
            return;
        }
        // Find the card we're dragging the current card over
        const draggedOverCard = findCardAtCoordinates(moveX, moveY, cardBeingDragged);
        if (draggedOverCard) {
            swapCards(cardBeingDragged, draggedOverCard);
        }
    };
    const enableDnd = () => {
        setDndEnabled(true)
    };
    const enableDndAfterAnimating = () => {
        setTimeout(enableDnd, props.animationDuration);
    };
    const swapCards = (draggedCard, anotherCard) => {

        console.log(props.gridItems, 'TTT')

        const draggedCardIndex = props.gridItems.findIndex(({ key }) => key === draggedCard.key);
        const anotherCardIndex = props.gridItems.findIndex(({ key }) => key === anotherCard.key);


        const newList = moveArrayElement(
            props.gridItems,
            draggedCardIndex,
            anotherCardIndex,
        );

        props.updateGrid(newList)
        setDndEnabled(false)
        return {};
        enableDndAfterAnimating()
    };

    const onPanResponderEnd = () => {
        updateCardState(cardBeingDragged, { isBeingDragged: false });
        setCardBeingDragged(undefined)
        console.log('end!')
    };
    const onPanResponderGrant = () => {
        updateCardState(cardBeingDragged, { isBeingDragged: true });
        // console.log("card is beeing gragged: TRUE");
    };
    const onMoveShouldSetPanResponder = (gestureState) => {

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
        const card = findCardAtCoordinates(moveX, moveY);
        console.log(card)
        if (card) {
            // assign it to `this.cardBeingDragged` while dragging
            setCardBeingDragged(card)

            // and tell PanResponder to start handling the gesture by calling `onPanResponderMove`
            return true;
        }

        return false;
    };

    const findCardAtCoordinates = (x, y, exceptCard) => props.gridItems.find(
        (card) =>
            card.tlX && card.tlY && card.brX && card.brY
            && isPointWithinArea(x, y, card.tlX, card.tlY, card.brX, card.brY)
            && (!exceptCard || exceptCard.key !== card.key)
    )
    const updateCardState = (Card, more) => {
        const index = props.gridItems.findIndex(({ key }) => key === Card.key);

        const ReCards = [
            ...props.gridItems.slice(0, index),
            {
                ...props.gridItems[index],
                ...more,
            },
            ...props.gridItems.slice(index + 1),
        ];

        props.updateGrid(ReCards)

    };
    const onRenderCard = (card,
                          screenX,
                          screenY,
                          width,
                          height) => {
        updateCardState(card, {
            tlX: screenX,
            tlY: screenY,
            brX: screenX + width,
            brY: screenY + height,
        });
    };


    return (
        <View style={styles.container}
              {...panResponder.panHandlers}
        >
            <Text>{dndEnabled.toString()}</Text>
            {/*<Text>{this.props.animationDuration}</Text>*/}
            {props.gridItems.map((card, index) => {
                return <Card onRenderCard={onRenderCard} card={card} key={card.key} title={card.title}/>
            })}
        </View>
    );

}


SortableDraggableGrid.defaultProps = {
    gridItems: [
        { key: 1, title: '1' },
        { key: 2, title: '2' },
        { key: 3, title: '3' },
        { key: 4, title: '4' },
        { key: 5, title: '5' },
        { key: 6, title: '6' },
        { key: 7, title: '7' },
        { key: 8, title: '8' },
        { key: 9, title: '9' },
        { key: 10, title: '10' }]
}

SortableDraggableGrid.propTypes = {

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

