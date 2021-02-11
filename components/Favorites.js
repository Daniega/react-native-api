import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

//constants
import { MEDIUM_FONT_SIZE, LARGE_FONT_SIZE } from '../constants/constants';

//Screen to show Favorite movies
const Favorites = ({ route }) => {
   const favoritesList = route.params.favorites;

   //FavoriteItem component
   const FavoriteItem = ({ item }) => {
      return <Text style={styles.item}>{item.title}</Text>;
   };

   return (
      <View style={styles.container}>
         <Text style={styles.header}>My Favorites:</Text>
         <FlatList
            style={styles.list}
            data={favoritesList}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <FavoriteItem item={item} />}
         />
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
   },

   list      : {
      width : '90%'
   },

   header    : {
      marginTop    : 20,
      marginBottom : 20,
      fontSize     : LARGE_FONT_SIZE
   },
   item      : {
      fontSize     : MEDIUM_FONT_SIZE,
      marginTop    : 5,
      marginBottom : 5,
      alignItems   : 'center'
   }
});
