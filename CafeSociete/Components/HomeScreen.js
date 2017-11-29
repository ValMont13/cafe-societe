import React from 'react';
import { StyleSheet, View, Button, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import Auth from './Auth';

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        headerStyle: {
            marginTop: Expo.Constants.statusBarHeight,
        },
    };

    constructor (props)
    {
        super(props);
        this.state = {
            isLoading: true
        };
        if (Auth.token == null)
            Auth.token = this.getToken();
    }

    async getToken()
    {
        return fetch(Auth.url + Auth.LOGIN_URL, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify({ email: 'toto@toto.fr', password: 'titi', }),
            mode: 'cors',
            cache: 'default'
        }).then((response) => response.json())
            .then((responseJson) => {
            this.setState ({
                isLoading: false,
            });
            Auth.token = responseJson.auth_token;
        }).catch((error) => {
            console.error("Test : " + error);
            this.setState ({
                isLoading: false,
            });
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: '5%', margin: 'auto'}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.customButton}>
                    <Button
                        onPress={() => navigate('Quizz')}
                        title="Lancer le Quizz"
                    />
                </View>
                <TouchableOpacity style={styles.customTouch} onPress={() => navigate('Search')}>
                    <Text style={{fontSize: 20}}>Recherche</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    customTouch: {
      marginTop: '10%',
    },
    customButton: {
        margin: 'auto'
    }
});