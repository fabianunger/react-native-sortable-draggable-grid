import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, } from 'react-native';

class SortableDraggableGrid extends Component {
    constructor(props) {
        super(props);
        const { width, height } = Dimensions.get('window');
        this.state = {
            cards: [
                { key: 1, title: 'card1' },
                { key: 2, title: 'card2' },
                { key: 3, title: 'card3' }
            ],
            dndEnabled: true,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sortable Grid coming up!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default SortableDraggableGrid;
