import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './Components/HomeScreen';
import { Quizz } from './Components/Quizz';

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Quizz: { screen: Quizz }
});

export default class App extends React.Component {
    render() {
        return <SimpleApp />;
    }
}
