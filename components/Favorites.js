import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const Favorites = ({ route }) => {
   const { favoritesList } = route.params.favorites;

   return (
      <View style={styles.container}>
         <FlatList
            style={styles.list}
            data={favoritesList}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
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
   item      : {
      color : 'black'
   }
});
