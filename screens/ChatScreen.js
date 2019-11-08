import React from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Platform, TextInput, Button, Alert }  from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
import firebaseSvc from '../FirebaseSvc';

export default class ChatScreen extends React.Component {


    static navigationOptions = ({ navigation }) => ({
        title: 'Chat',
    });
    
    state = {
        messages: [],
    };
    
    componentWillMount(){
        
    }

    onLogoutPress = () => {
        firebaseSvc.logout();
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <Button title="Logout" onPress={this.onLogoutPress}/>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(message) => {
                        firebaseSvc.sendMessage(message);
                    }}
                    user={{
                        _id: firebaseSvc.getUid(),
                        name: firebaseSvc.getName(),
                    }}
                />
                <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' :  null} keyboardVerticalOffset={80} />
            </View>
        );
    }

    componentDidMount() {
        firebaseSvc.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages,message),
                };
            });
        });
    }
    componentWillUnmount(){
        firebaseSvc.closeChat();
    }


}


const styles = StyleSheet.create({
  
});