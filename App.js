import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SortableDraggableGrid from './src/SortableDraggableGrid';


export default function App() {

    const [gridItems, setItems] = useState([
        { key: 1, title: '1' },
        { key: 2, title: '2' },
        { key: 3, title: '3' },
        { key: 4, title: '4' },
        { key: 5, title: '5' },
        { key: 6, title: '6' },
        { key: 7, title: '7' },
        { key: 8, title: '8' },
        { key: 9, title: '9' },
        { key: 10, title: '10' }])

    const updateGrid = (cards) => {
        setItems(cards)
    }

    return (
        <View style={styles.container}>
            {/*<Text style={styles.text}>Test</Text>*/}
            <SortableDraggableGrid gridItems={gridItems} updateGrid={updateGrid}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'khaki',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 20
    }
});
