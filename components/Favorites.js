import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const Favorites = ({ navigation }) => {
   const { favoritesList } = route.params;

   useEffect(() => {
      console.log(favoritesList);
   }, []);

   return (
      <View style={styles.container}>
         <Text />
      </View>
   );
};

export default Favorites;

const styles = StyleSheet.create({
   container : {
      flex            : 1,
      backgroundColor : '#fff',
      alignItems      : 'center',
      justifyContent  : 'center'
   }
});
