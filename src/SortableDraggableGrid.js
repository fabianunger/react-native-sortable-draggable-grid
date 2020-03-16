import React, { Component } from 'react';
import { Dimensions, StyleSheet, View,Text } from 'react-native';
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
                { key: 6, title: '6' },
                { key: 7, title: '7' },
                { key: 8, title: '8' },
                { key: 9, title: '9' },
                { key: 10, title: '10' },
            ],
            dndEnabled: true,
        };
    }
    static defaultProps = {
        animationDuration: 400
        // animationDuration: 250
    };
    render() {
        return (
            <View style={styles.container}>
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
