import firebase from 'firebase';
import uuid from 'uuid-js';



class FirebaseSvc {

    uid ='';
    messageRef=null;
    name='';

    constructor() {
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyDMs2M-0Iv30iXnjsYG2BclfyyX6hqkPbQ",
                authDomain: "auth-mobile-a92ab.firebaseapp.com",
                databaseURL: "https://auth-mobile-a92ab.firebaseio.com",
                projectId: "auth-mobile-a92ab",
                storageBucket: "auth-mobile-a92ab.appspot.com",
                messagingSenderId: "403857317782",
                appId: "1:403857317782:web:ac74e259a19f0653fe07b7",
                measurementId: "G-EW38TFSGMS"
            });
        }
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setUid(user.uid);
                this.setName();
            }
        })  
    }
    
    setName(){
        firebase.database().ref('users/' + this.uid).once('value', (snapshot) => {
            this.name = snapshot.val().username;
        });
    }

    getName(){
        this.setName();
        return this.name;
    }

    setUid(value){
        this.uid = value;
    }

    getUid(){
        return this.uid;
    }

    //Load Messages
    loadMessages(callback){
        this.messageRef = firebase.database().ref('messages');
        this.messageRef.off();
        const onReceive = (data) =>{
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user:{
                    _id: message.user._id,
                    name: this.getName(),
                },
            });
        };
        this.messageRef.limitToLast(20).on('child_added', onReceive);
    }


    sendMessage(message) {
        for (let i =0; i < message.length; i++) {
            this.messageRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
            
        }
        
        alert('message sent');
    }

    closeChat(){
        if(this.messageRef){
            this.messageRef.off();
        }
    }

    logout(){
        firebase.auth().signOut();
    }


    login = async(user, success_callback, failed_callback) => {
        await firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(success_callback,failed_callback);
    }

    createAccount = async(user) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function() {
            var userf= firebase.auth().currentUser;
            firebase.database().ref('users/' + userf.uid).set({
                username: user.name,
                email: user.email
            });
            userf.updateProfile({displayName: user.name})
            .then(function() {
                alert("User " + user.name + " was created successfully.");
            },
            function(error) {
                console.warn("Error update displayName.");
            });
        },
        function(error) {
            console.error("Got error: " + error.message);
            alert("Create account failed");
        });
    }

    writeUserData = (user) => {
        firebase.database().ref().child('users').child(uuid).update({
            username: user.name,
            email: user.email
        });
    }

}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;