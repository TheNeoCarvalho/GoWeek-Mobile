import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../services/api'
import socket from 'socket.io-client'
import Tweet from '../components/Tweet'

class Timeline extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Início",
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('New')}>
                <Icon
                    style={{ marginRight: 20 }}
                    name="add-circle-outline"
                    size={24}
                    color="#4BB0EE"
                />
            </TouchableOpacity>
        )
    });

    state = {
        tweets: [],
    };

    async componentDidMount() {
        this.subscribeToEvents()
        const response = await api.get('tweets')
        this.setState({ tweets: response.data })
    }

    subscribeToEvents = () => {
        const io = socket('https://goweek-ujjehtoqif.now.sh');
        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] })
        })
        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(tweet => tweet._id === data._id ? data : tweet)
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={({ item }) => <Tweet tweet={item} />}
                />
            </View>
        );
    }
}
export default Timeline

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
})
