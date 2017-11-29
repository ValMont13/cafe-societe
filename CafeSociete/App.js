import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './Components/HomeScreen';
import { Quizz } from './Components/Quizz';
import { Search } from './Components/Search';

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Quizz: { screen: Quizz },
    Search: { screen: Search },
});

export default class App extends React.Component {
    render() {
        return <SimpleApp />;
    }
}
