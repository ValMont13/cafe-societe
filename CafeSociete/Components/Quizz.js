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
            hasQuizz: false,
            hasQuestions: false,
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
                    hasQuizz: true,
                    dataSource: ds.cloneWithRows(responseJson)
                });
            }).catch((error) => {
                console.error("Test : " + error);
                this.setState ({
                    isLoading: false,
                    hasQuizz: true,
                    dataSource: 'titi'
                });
            });
    }

    renderWaiting()
    {
        return (
            <View style={{flex: 1, paddingTop: '5%', margin: 'auto'}}>
                <ActivityIndicator />
            </View>
        );
    }

    renderQuizz()
    {
        return (
            <ScrollView>
                <Text style={styles.Questions}>Quizz Time !</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData.id}</Text>}
                />
            </ScrollView>
        );
    }

    renderQuestion()
    {
        return (
            <ScrollView>
                <Text style={styles.Questions}>Example of Question</Text>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Button/>}
                />
            </ScrollView>
        )
    }

    render() {
        if (this.state.isLoading)
            return this.renderWaiting();
        else if (this.state.hasQuizz)
            return this.renderQuizz();
        else if (this.state.hasQuestions)
            return this.renderQuestion();
        else
            return (
                <Text style={styles.Questions}>Sorry it's broken :'(</Text>
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