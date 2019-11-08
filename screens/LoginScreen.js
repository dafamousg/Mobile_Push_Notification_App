import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert }  from 'react-native';
import firebaseSvc from '../FirebaseSvc';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    onLoginPress = async() => {
        const user = {
            email:  this.state.email,
            password: this.state.password,
        };
        firebaseSvc.login(user, this.loginSuccess,this.loginFailed)
        /* firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.navigation.navigate("Chat");
            }, (error) => {
                Alert.alert(error.message);
            }); */
    }

    loginSuccess = () => {
        console.log('login successful, navigate to chat.');
        this.props.navigation.navigate('Chat', {
        email: this.state.email,
        });
    }
    loginFailed = () => {
        alert('Login failure. Please tried again.');
      };

    onCreateAccountPress = () => {
        this.props.navigation.navigate("Signup");
    }
    /* onForgotPasswordPress = () => {
        this.props.navigation.navigate("ForgotPassword");
    } */

    render(){
        return(
            <View style={{paddingTop:100, alignItems:'center'}}>
            <Text>LoginScreen</Text>
                <TextInput placeholder="Email" style={{width:200, height:40, borderWidth:1}}
                    value={this.state.email}
                    onChangeText={(text) => {this.setState({email: text}) }}
                />

                <TextInput placeholder="Password" style={{width:200, height:40, borderWidth:1}}
                    value={this.state.password}
                    onChangeText={(text) => {this.setState({password: text}) }}
                />

                <Button title="Login" onPress={this.onLoginPress}/>
                
                <Button title="Create Account" onPress={this.onCreateAccountPress}/>
                
            </View>
//                <Button title="Forgot Password" onPress={this.onForgotPasswordPress}/>
        );
    }

}


const styles = StyleSheet.create({
  
});