import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, } from 'react-native';
import Card from './Card';

class SortableDraggableGrid extends Component {
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
            ],
            dndEnabled: true,
        };
    }

    render() {
        return (
            <View style={styles.container}>
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
