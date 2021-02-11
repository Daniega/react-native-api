import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const FavoritesBag = ({ navigation }) => {
   return (
      <View style={styles.container}>
         <Text>FAVS</Text>
      </View>
   );
};

export default FavoritesBag;

const styles = StyleSheet.create({
   container : {
      backgroundColor : '#fff',
      alignItems      : 'center',
      justifyContent  : 'center',
      marginTop       : 20,
      height          : 50,
      width           : 50,
      backgroundColor : 'grey'
   }
});
