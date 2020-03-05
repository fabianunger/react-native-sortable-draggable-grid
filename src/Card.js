import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import PropTypes from 'prop-types';

const Card = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'khaki',
        margin: 10,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        backgroundColor: 'gray',
        borderRadius: 99,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        width: 50,
        height: 50,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
    }
});
Card.defaultProps = {
    title: 'Title',
};
Card.propTypes = {
    title: PropTypes.string.isRequired,
};


export default Card;
