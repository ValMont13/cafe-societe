import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        headerStyle: {
            marginTop: Expo.Constants.statusBarHeight,
        },
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.customButton}>
                <Button
                    onPress={() => navigate('Quizz')}
                    title="Lancer le Quizz"
                />
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
    customButton: {
        position: 'absolute',
        top: '40%',
        left: '30%'
    }
});