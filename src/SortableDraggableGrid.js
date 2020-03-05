import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, } from 'react-native';

class SortableDraggableGrid extends Component {
    constructor(props) {
        super(props);
        const { width, height } = Dimensions.get('window');
        this.state = {
            cards: [
                { key: 1, title: 'asd' },
                { key: 2, title: 'asd' },
                { key: 2, title: 'asd' }
            ],
            dndEnabled: true,
        };
    }


    render() {
        return (
            <View
                style={styles.container}
            >
                <Text>Grid</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',

    },
});


export default SortableDraggableGrid;
