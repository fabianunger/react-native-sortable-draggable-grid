import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SortableDraggableGrid from './src/SortableDraggableGrid';

export default function App() {
    return (
        <View style={styles.container}>
            {/*<Text style={styles.text}>Test</Text>*/}
            <SortableDraggableGrid/>
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
