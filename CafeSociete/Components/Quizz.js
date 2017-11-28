import React from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, ListView, Button } from 'react-native';
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
        this.questions = null;
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

    async getQuestions(quizzId)
    {
        return fetch(Auth.url + "/api/v1/quizz/" + quizzId, {
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
                    hasQuizz: false,
                    hasQuestions: true,
                    dataSource: ds.cloneWithRows(responseJson.questions)
                });
            }).catch((error) => {
                console.error("Test : " + error);
                this.setState ({
                    isLoading: false,
                    hasQuizz: false,
                    hasQuestions: true,
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
                <ListView
                    style={styles.List}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <Text style={styles.Row}>
                                <Text style={styles.Id}>{rowData.edition_id}</Text>
                            </Text>
                            <Button style={styles.customButton} onPress={() => this.getQuestions(rowData.id)} style={styles.Questions} title={rowData.name}/>
                        </View>
                    }
                />
            </ScrollView>
        );
    }

    renderQuestion()
    {
        return (
            <ScrollView>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <Text style={styles.Questions}>{rowData.content}</Text>
                                <Button title={rowData.responses[0].value}/>
                        </View>
                    }
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
        fontSize: 25,
        textAlign: 'center',
        marginTop: '5%',
    },
    Row: {
        backgroundColor: '#fafafa',
        padding: '2%',
    },
    Id: {
        fontSize: 20,
    },
    List: {
        marginTop: '5%',
    },
    customButton: {
        padding: '10%",'
    },
    Answers: {
        marginTop: '5%',
    }
});