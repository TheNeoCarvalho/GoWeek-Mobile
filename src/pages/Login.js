import React, { Component } from "react"
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import { StackActions, NavigationActions } from 'react-navigation'

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        username: '',
    };

    async componentDidMount() {
        const username = await AsyncStorage.getItem('@GoTwitter:username')
        if (username) {
            this.navigateToTimeline()
        }
    }

    handleInputChange = username => {
        this.setState({ username })
    }

    handleLogin = async () => {
        const { username } = this.state
        if (!username.length) return
        await AsyncStorage.setItem('@GoTwitter:username', username)
        this.navigateToTimeline()
    }

    navigateToTimeline = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: "Timeline" })
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View>
                        <Icon name="twitter" size={64} color="#4BB0EE" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome de usuário"
                        value={this.state.username}
                        onChangeText={this.handleInputChange}
                        returnKeyType="send"
                        onSubmitEditing={this.handleLogin}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleLogin}
                    >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 15,
        alignSelf: "stretch",
        marginTop: 30
    },

    button: {
        height: 44,
        alignSelf: "stretch",
        marginTop: 10,
        backgroundColor: "#4BB0EE",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});
