import React from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, Image, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, ListView} from 'react-native';
import Auth from './Auth';

let durationToFind = 0;

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
        this.search = {
            platform: {
                hear: false,
                see: false,
                read: false,
            },
            time: {
                three: false,
                seven: false,
                fif: false,
            }
        };
        this.state = {
            isLoading: false,
            result: false
        };
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.call = 0;
        this.infos = [];
        this.dsInfos = null;
    }

    toggle(bool)
    {
        bool = !bool;
        this.setState({
            isLoading: false,
            result: false,
        });
        return (bool);
    }

    filter(a, b)
    {
        let deltaA = (a.duration - durationToFind) * (a.duration - durationToFind);
        let deltaB = (b.duration - durationToFind) * (b.duration - durationToFind);
        if (deltaA < deltaB)
            return -1;
        else if (deltaA > deltaB)
            return 1;
        return 0;
    }

    computeData() {
        this.infos.sort(this.filter);
        this.dsInfos = this.ds.cloneWithRows(this.infos);
        console.log(this.infos);
    }

    callValidation()
    {
        this.call -= 1;
        if (this.call === 0) {
            if (this.search.time.three)
                durationToFind = 180;
            else if (this.search.time.seven)
                durationToFind = 420;
            else if (this.search.time.fif)
                durationToFind = 900;
            else
                durationToFind = 0;
            this.computeData();
            this.setState({
                isLoading: false,
                result: true,
            });
        }
    }

    getInfo()
    {
        this.infos = [];
        if (this.search.platform.read || this.search.platform.hear || this.search.platform.see)
            this.setState({
                isLoading: true,
            });
        if (this.search.platform.hear) {
            this.call += 1;
            fetch(Auth.url + Auth.HEAR_URL, {
                method: 'GET',
                headers: {
                    Authorization: Auth.token
                },
                mode: 'cors',
                cache: 'default'
            }).then((response) => response.json())
                .then((responseJson) => {
                    for (let i = 0; i < responseJson.podcasts.length; i++) {
                        responseJson.podcasts[i].type = "podcast";
                        this.infos.push(responseJson.podcasts[i]);
                    }
                    this.callValidation();
                }).catch((error) => {
                console.error("Test : " + error);
                this.setState({
                    isLoading: false,
                });
            });
        }
        if (this.search.platform.read) {
            this.call += 1;
            fetch(Auth.url + Auth.READ_URL, {
                method: 'GET',
                headers: {
                    Authorization: Auth.token
                },
                mode: 'cors',
                cache: 'default'
            }).then((response) => response.json())
                .then((responseJson) => {
                    for (let i = 0; i < responseJson.articles.length; i++) {
                        responseJson.articles[i].type = "article";
                        this.infos.push(responseJson.articles[i]);
                    }
                    this.callValidation();
                }).catch((error) => {
                console.error("Test : " + error);
                this.setState({
                    isLoading: false,
                });
            });
        }
        if (this.search.platform.see) {
            this.call += 1;
            fetch(Auth.url + Auth.SEE_URL, {
                method: 'GET',
                headers: {
                    Authorization: Auth.token
                },
                mode: 'cors',
                cache: 'default'
            }).then((response) => response.json())
                .then((responseJson) => {
                    for (let i = 0; i < responseJson.videos.length; i++) {
                        responseJson.videos[i].type = "video";
                        this.infos.push(responseJson.videos[i]);
                    }
                    this.callValidation();
                }).catch((error) => {
                console.error("Test : " + error);
                this.setState({
                    isLoading: false,
                });
            });
        }
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
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity activeOpacity={0.6} onPress={ () => this.search.platform.hear = this.toggle(this.search.platform.hear) }>
                    <View>
                        <Image
                            style={{ width: this.search.platform.hear ? 125 : 100, height: this.search.platform.hear ? 125 : 100 }}
                            source={{ uri: 'http://api.eliastre100.fr/headphones.jpg'}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touch} activeOpacity={0.6} onPress={ () => this.search.platform.read = this.toggle(this.search.platform.read) }>
                    <View>
                        <Image
                            style={{ width: this.search.platform.read ? 125 : 100, height: this.search.platform.read ? 125 : 100 }}
                            source={{ uri: 'http://api.eliastre100.fr/click.jpg'}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touch} activeOpacity={0.6} onPress={ () => this.search.platform.see = this.toggle(this.search.platform.see) }>
                    <View>
                        <Image
                            style={{ width: this.search.platform.see ? 125 : 100, height: this.search.platform.see ? 125 : 100 }}
                            source={{ uri: 'http://api.eliastre100.fr/video.jpg'}}
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    renderTime()
    {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity activeOpacity={0.6} onPress={ () => this.search.time.three = this.toggle(this.search.time.three) }>
                    <View>
                        <Text style={{ fontSize: this.search.time.three ? 25 : 20, fontWeight: '700', marginTop: '10%' }}>3 MINUTES</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={ () => this.search.time.seven = this.toggle(this.search.time.seven ) }>
                    <View>
                        <Text style={{ fontSize: this.search.time.seven ? 25 : 20, fontWeight: '700', marginTop: '10%'  }}>7 MINUTES</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={ () => this.search.time.fif = this.toggle(this.search.time.fif) }>
                    <View>
                        <Text style={{ fontSize: this.search.time.fif ? 25 : 20, fontWeight: '700', marginTop: '10%'  }}>15 MINUTES</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    renderResult()
    {
        if (this.state.isLoading)
            return (
                <View style={{flex: 1, paddingTop: '5%', margin: 'auto', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator />
                </View>
            );
        else if (this.state.result)
            return (
                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <ListView
                        dataSource={this.dsInfos}
                        renderRow={(rowData) =>
                            <View style={styles.InfoContainer}>
                                <Text style={styles.InfoName}>{ (rowData.type.toUpperCase()) }</Text>
                                <Text style={styles.InfoName}>{ (rowData.name) }</Text>
                                <Text style={styles.Info}>{ 'Durée : ' + (rowData.duration / 60) + ' min' }</Text>
                            </View>
                        }
                    />
                    <TouchableOpacity activeOpacity={0.8} style={styles.customTouch} onPress={() => this.getInfo()}>
                        <Text style={styles.customTouchText}>Let's go !</Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        else
            return (
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.customTouch} onPress={() => this.getInfo()}>
                        <Text style={styles.customTouchText}>Let's go !</Text>
                    </TouchableOpacity>
                </View>
            )
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Swiper>
                { this.renderHow() }
                { this.renderTime() }
                { this.renderResult() }
            </Swiper>
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
    imgSelected: {
        backgroundColor: 'red'
    },
    touch: {
      marginTop: '5%',
    },
    customTouch: {
        backgroundColor: '#232e5d',
        width: '100%',
        paddingTop: '5%',
        paddingBottom: '5%',
        marginTop: '5%',
        marginBottom: '15%',
    },
    customTouchText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
    },
    InfoContainer: {
        backgroundColor: '#44a0dd',
        padding: '5%',
        marginTop: '3%',
    },
    InfoName: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    Info: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
});