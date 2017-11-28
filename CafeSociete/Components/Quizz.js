import React from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, ListView } from 'react-native';
import Auth from './Auth'

export class Quizz extends React.Component {
    static navigationOptions = {
        title: 'Quizz',
        headerStyle: {
            marginTop: Expo.Constants.statusBarHeight,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
        this.score = 0;
        this.getQuizz();
    }

    async getQuizz()
    {
        return fetch(Auth.url + "/api/v1/quizz", {
            headers: {
              Authorization: Auth.token
            },
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }).then((response) => response.json())
            .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState ({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson)
                });
            }).catch((error) => {
                console.error("Test : " + error);
                this.setState ({
                    isLoading: false,
                    dataSource: 'titi'
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <ScrollView>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData.id}</Text>}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    Questions: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: '5%',
    }
});