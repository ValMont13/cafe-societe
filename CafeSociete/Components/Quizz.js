import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class Quizz extends React.Component {
    static navigationOptions = {
        title: 'Quizz',
        headerStyle: {
            marginTop: Expo.Constants.statusBarHeight,
        },
    };

    constructor(props) {
        super(props);
        this.score = 0;
    }

    getMoviesFromApiAsync()
    {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => { return responseJson.movies; })
            .catch((error) => { console.error(error); });
    }

    render() {
        return (
            <View>
                <Text style={styles.Title}>Quizz</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Title: {
        fontSize: 30,
    }
});