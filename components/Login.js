import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

//fontAwesome
import { FontAwesome } from '@expo/vector-icons';

//firebase
import * as Google from 'expo-google-app-auth';

const Login = ({ navigation }) => {
   const [ user, setUser ] = useState({ signedIn: false, userName: '', photoUrl: '' });

   //Sign In with google function to get user data
   const signInWithGoogleAsync = async () => {
      try {
         const result = await Google.logInAsync({
            androidClientId : '1015181446053-3o3dega2vc8nera1okit5snk9u735cmd.apps.googleusercontent.com',
            iosClientId     : '1015181446053-0rcbscuhcl8636didtd1m8melhe2semc.apps.googleusercontent.com',
            scopes          : [ 'profile', 'email' ]
         });

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
               <Button title='Sign In With Google' onPress={signInWithGoogleAsync} />
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

   profilePhoto : {
      height       : 100,
      width        : 100,
      borderRadius : 50
   }
});
