import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';

//constants
import { tmdbPathKey } from '../constants/constants';

//components
import FavoritesBag from './FavoritesBag';

const MovieList = ({ navigation }) => {
   const [ movies, setMovies ] = useState([]);
   const [ favoriteMovies, setFavoriteMovies ] = useState([]);

   const addFavoriteMovie = () => {
      console.log('Im running');
      //   setFavoriteMovies((favoriteMovies) => [ ...favoriteMovies, movie ]);
   };

   const getMovies = async () => {
      try {
         const response = await fetch(tmdbPathKey);
         const data = await response.json();
         return data.results;
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getMovies().then((data) => setMovies(data));
      console.log(favoriteMovies);
   }, []);

   return (
      <View style={styles.container}>
         <FavoritesBag
            onPress={() => {
               navigation.navigate('Favorites', {
                  favoritesList : favoriteMovies
               });
            }}
         />

         <FlatList
            style={styles.list}
            data={movies}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
               <Button
                  style={styles.item}
                  title={item.title}
                  onPress={() => {
                     navigation.navigate('Movie', {
                        movieDetails : item
                     });
                  }}
               />
            )}
         />
      </View>
   );
};

export default MovieList;

const styles = StyleSheet.create({
   container : {
      flex            : 1,
      backgroundColor : '#fff',
      alignItems      : 'center',
      justifyContent  : 'center'
   },
   list      : {
      marginTop : '10%'
   },

   item      : {
      padding  : 10,
      fontSize : 18
   }
});
