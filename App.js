import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SortableDraggableGrid from './src/SortableDraggableGrid';

export default function App() {
    return (
        <View style={styles.container}>
            <SortableDraggableGrid/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
