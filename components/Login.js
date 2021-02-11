import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { GoogleSocialButton } from 'react-native-social-buttons';
//fontAwesome
import { FontAwesome } from '@expo/vector-icons';
//Google Authentication
import * as Google from 'expo-google-app-auth';
//constants
import { ANDROID_ID, IOS_ID } from '../constants/constants';

//Screen for showing Welcome screen with user data, and login Button to get user data
const Login = ({ navigation }) => {
   const [ user, setUser ] = useState({ signedIn: false, userName: '', photoUrl: '' });
   //Sign In with google function to get user data
   const signInWithGoogleAsync = async () => {
      try {
         //WARNING - Environment variables! used here just for simplicity, but these variables should be hidden.
         const result = await Google.logInAsync({
            androidClientId : ANDROID_ID,
            iosClientId     : IOS_ID,
            scopes          : [ 'profile', 'email' ]
         });
         //If Login successfull - save user data in user State
         if (result.type === 'success') {
            setUser({
               signedIn : true,
               userName : result.user.name,
               photoUrl : result.user.photoUrl
            });
         } else {
            console.log('cancelled');
         }
      } catch (e) {
         console.log(e.message);
      }
   };

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerText}>Welcome {user.signedIn ? user.userName : 'stranger'}!</Text>
            {user.signedIn ? (
               <Image style={styles.profilePhoto} source={{ uri: user.photoUrl }} />
            ) : (
               <FontAwesome name='user-circle' size={100} color='grey' />
            )}
            <Text style={styles.bottomText}>Please log in to continue to the awesomness</Text>
         </View>
         <View style={styles.buttons}>
            {user.signedIn ? (
               <Button title='Movie List' onPress={() => navigation.navigate('MovieList')} />
            ) : (
               <GoogleSocialButton
                  title='Sign In With Google'
                  onPress={signInWithGoogleAsync}
                  buttonViewStyle={styles.googleButton}
               />
            )}
         </View>
         <StatusBar style='auto' />
      </View>
   );
};

export default Login;

const styles = StyleSheet.create({
   container    : {
      flex            : 1,
      backgroundColor : '#fff',
      alignItems      : 'center',
      justifyContent  : 'space-between'
   },

   header       : {
      alignItems : 'center',
      marginTop  : '40%'
   },

   headerText   : {
      marginBottom : 20,
      fontSize     : 30
   },

   bottomText   : {
      marginTop : 20
   },

   buttons      : {
      marginBottom : '20%'
   },

   googleButton : {
      backgroundColor : '#DE5246'
   },

   profilePhoto : {
      height       : 100,
      width        : 100,
      borderRadius : 50
   }
});
