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
            end: false,
        };
        this.score = 0;
        this.questionId = 0;
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
                this.questions = responseJson.questions;
                this.setState ({
                    hasQuizz: false,
                    hasQuestions: true,
                });
            }).catch((error) => {
                console.error("Test : " + error);
                this.setState ({
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
            <ScrollView style={styles.container}>
                <ListView
                    style={styles.List}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <Text style={styles.Row}>
                                <Text style={styles.Id}>Edition n°{rowData.edition_id}</Text>
                            </Text>
                            <Button style={styles.customButton} onPress={() => this.getQuestions(rowData.id)} style={styles.Questions} title={rowData.name}/>
                        </View>
                    }
                />
            </ScrollView>
        );
    }

    renderEnd()
    {
        const { navigate } = this.props.navigation;

        return (
          <View style={styles.container}>
              <Text style={styles.Questions}>End of the Quizz !</Text>
              <Text>Score : {this.score}</Text>
              <Button title='Retour' onPress={() => navigate('Home')}/>
          </View>
        );
    }

    nextQuestion(data)
    {
        if (data.solution)
            this.score += 1;
        if (this.questionId < this.questions.length)
            this.questionId += 1;
        else
            this.setState ({
                isLoading: false,
                hasQuizz: false,
                hasQuestions: false,
                end: true,
            });
    }

    /*    <ListView
        dataSource={new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1 !== r2}
                .cloneWithRows(this.questions)
        )}
        renderRow={(rowData) =>
            <View>
                <Text style={styles.Questions}>{rowData.content}</Text>
                <ListView
                    dataSource={new ListView.DataSource(
                        {rowHasChanged: (r1, r2) => r1 !== r2}
                            .cloneWithRows(this.questions[this.questionId].responses)
                    )}
                    renderRow={(rowData) =>
                        <View style={styles.Answers}>
                            <Button title={rowData.value} onPress={() => this.nextQuestion(rowData)}/>
                        </View>
                    }
                />
            </View>
        }
    />*/

    renderQuestion()
    {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.Questions}>Example of Question</Text>
                <View style={styles.answerContainer}>
                    <View style={styles.Answers}>
                        <Button title="Reponse 1" onPress={() => console.log("Test")}/>
                    </View>
                    <View style={styles.Answers}>
                        <Button title="Reponse 2" onPress={() => console.log("Test")}/>
                    </View>
                    <View style={styles.Answers}>
                        <Button title="Reponse 3" onPress={() => console.log("Test")}/>
                    </View>
                </View>
            </ScrollView>
        );
    }

    render() {
        if (this.state.isLoading)
            return this.renderWaiting();
        else if (this.state.hasQuizz)
            return this.renderQuizz();
        else if (this.state.hasQuestions)
            return this.renderQuestion();
        else if (this.state.end)
            return (this.renderEnd());
        else
            return (
                <Text style={styles.Questions}>Sorry it's broken :'(</Text>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
        margin: '6%',
    },
    answerContainer: {
        marginTop: '10%',
    }
});