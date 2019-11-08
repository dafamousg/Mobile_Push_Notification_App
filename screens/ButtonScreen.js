import React from 'react';
import {View, Text, Button, Alert} from 'react-native';

export default class ButtonScreen extends React.Component{
    
    render(){
        return(
            <View>
                <Button title="Push 1" onPress={this.onPush1Press}/>
                <Button title="Push 2" onPress={this.onPush2Press}/>
            </View>
        );
    }

    onPush1Press = () => {
        alert('Push 1');
    };
    onPush2Press = () => {
        alert('Push 2');
    };
    
}