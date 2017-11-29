import React from 'react';
import Swiper from 'react-native-swiper';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import Auth from './Auth';

export class Search extends React.Component {
    static navigationOptions = {
        title: 'Search',
        headerStyle: {
            marginTop: Expo.Constants.statusBarHeight,
        },
    };

    constructor (props)
    {
        super(props);
        this.state = {
            searhingMenu: true,
            isLoading: false,
            result: false
        };
    }

    renderWaiting()
    {
        return (
            <View style={{flex: 1, paddingTop: '5%', margin: 'auto'}}>
                <ActivityIndicator />
            </View>
        );
    }

    renderHow()
    {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>How</Text>
                </ScrollView>
            </View>
        );
    }

    renderTime()
    {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>Time</Text>
                </ScrollView>
            </View>
        );
    }

    renderResult()
    {
        return (
            <View>
                <Text>Menu</Text>
            </View>
        );
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Swiper>
                { this.renderHow() }
                { this.renderTime() }
            </Swiper>
        );
        if (this.state.isLoading)
            return this.renderWaiting();
        else if (this.state.searhingMenu)
            return this.renderMenu();
        else
            return this.renderResult();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});