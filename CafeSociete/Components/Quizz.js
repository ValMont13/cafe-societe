import React from 'react';
import { NavigationActions } from 'react-navigation'
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, ListView, Image, Alert, TouchableOpacity } from 'react-native';
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
        this.questionIdx = 0;
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.questions = null;
        this.dsAnswer = null;
        this.getQuizz();
    }

    async getQuizz()
    {
        return fetch(Auth.url + Auth.QUIZZ_URL, {
            headers: {
              Authorization: Auth.token
            },
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState ({
                    isLoading: false,
                    hasQuizz: true,
                    dataSource: this.ds.cloneWithRows(responseJson)
                });
            }).catch((error) => {
                console.error("Test : " + error);
                this.setState ({
                    isLoading: false,
                    hasQuizz: false,
                    dataSource: 'titi'
                });
            });
    }

    async getQuestions(quizzId)
    {
        return fetch(Auth.url + Auth.QUIZZ_URL + "/" + quizzId, {
            headers: {
                Authorization: Auth.token
            },
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }).then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                this.questions = responseJson.questions;
                this.dsAnswer = this.getResponses(this.questions[this.questionIdx].responses);
                this.setState ({
                    hasQuizz: false,
                    hasQuestions: true,
                });
            }).catch((error) => {
                console.error("Test : " + error);
                this.setState ({
                    hasQuizz: false,
                    hasQuestions: false,
                    dataSource: 'titi'
                });
            });
    }

    getResponses(data)
    {
        return this.ds.cloneWithRows(data);
    }

    nextQuestion(data)
    {
        if (data.solution) {
            this.score += 1;
            Alert.alert( 'Good job !', this.questions[this.questionIdx].description, [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } );
        }
        else
            Alert.alert( 'Bad answer :/', this.questions[this.questionIdx].description, [ {text: 'OK', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } );
        if (this.questionIdx + 1 < this.questions.length) {
            this.questionIdx += 1;
            this.dsAnswer = this.getResponses(this.questions[this.questionIdx].responses);
            this.setState ({
                hasQuestions: true,
            })
        }
        else
            this.setState ({
                isLoading: false,
                hasQuizz: false,
                hasQuestions: false,
                end: true,
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
                <View style={{alignItems: 'center', paddingTop: '5%'}}>
                    <Image
                        style={{width: 200, height: 200}}
                        source={{ uri: 'http://api.eliastre100.fr/quizz.jpg'}}
                    />
                </View>
                <ListView
                    style={styles.List}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <Text style={styles.Id}>{ ('Edition n°' + rowData.edition_id).toUpperCase() }</Text>
                            <TouchableOpacity activeOpacity={0.8} style={styles.customTouch} onPress={() => this.getQuestions(rowData.id)}>
                                <Text style={styles.customTouchText}>{rowData.name}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </ScrollView>
        );
    }

    renderEnd()
    {
        return (
          <View style={styles.container}>
              <Text style={styles.Questions}>End of the Quizz !</Text>
              <View style={styles.Score}>
                <Text style={styles.ScoreTxt}>Score : {(this.score / this.questions.length) * 100}%</Text>
              </View>
              <View style={styles.EndButton}>
                 <Button title='Retour' onPress={() => this.props.navigation.dispatch(NavigationActions.back())}/>
              </View>
          </View>
        );
    }

    renderQuestion()
    {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.Questions}>{this.questions[this.questionIdx].content}</Text>
                <View style={styles.answerContainer}>
                    <ListView
                        dataSource={this.dsAnswer}
                        renderRow={(rowData) =>
                            <View style={styles.Answers}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.customAnswer} onPress={() => this.nextQuestion(rowData)}>
                                    <Text style={styles.customTouchText}>{rowData.value}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
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
    customAnswer: {
        backgroundColor: '#232e5d',
        padding: '2%',
    },
    customTouch: {
        backgroundColor: '#232e5d',
        padding: '4%',
    },
    customTouchText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
    },
    Questions: {
        color: '#232e5d',
        padding: '1%',
        textShadowColor: '#e3dd00',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5,
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: '5%',
    },
    Id: {
        color: 'white',
        backgroundColor: '#44a0dd',
        padding: '2%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
    },
    List: {
        marginTop: '5%',
    },
    customButton: {
        padding: '10%',
    },
    Answers: {
        margin: '6%',
    },
    answerContainer: {
        marginTop: '10%',
    },
    Score: {
        marginTop: '5%',
        marginBottom: '5%',
    },
    ScoreTxt: {
        fontSize: 30,
        textAlign: 'center',
    },
    EndButton:  {
        width: '100%',
        height: '100%',
    }
});