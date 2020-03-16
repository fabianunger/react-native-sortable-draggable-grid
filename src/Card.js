import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';


class Card extends Component {

    constructor(props) {
        super(props);

    }
    onLayout = () => {

            this.container && this.container.measure(this.onMeasure);

    };
    onMeasure = (x,
                 y,
                 width,
                 height,
                 screenX,
                 screenY) => {
        this.props.onRenderCard(this.props.card, screenX, screenY, width, height);
    };
    render() {
        const { title } = this.props
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => {
                    console.log(title)
                }}
                ref={el => this.container = el}
                onLayout={this.onLayout}
            >
                <View style={styles.wrapper}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }


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
