import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, FlatList, TouchableOpacity, Text } from 'react-native';

//constants
import { tmdbPathKey, MEDIUM_FONT_SIZE } from '../constants/constants';

//Screen to show list of most popular movies, that we get from themoviedb.org API, we can press each movie to get specific details
const MovieList = ({ navigation, route }) => {
   const [ movies, setMovies ] = useState([]);
   const [ favorites, setFavorites ] = useState([]);
   //check if a movie is existing in the favorits array
   const isExisting = (movie, list) => {
      return list.some((elem) => elem.id === movie.id);
   };
   //add movie to favorites function
   const addToFavorites = (movie) => {
      try {
         if (!isExisting(movie, favorites)) {
            //if movie is not existing in the favorits array
            setFavorites((oldFavorites) => [ ...oldFavorites, movie ]); //add movie to favorites array
            alert('Added to favorites');
            navigation.goBack();
         } else {
            alert('Already in favorites!');
         }
      } catch (error) {
         console.log('error', error);
      }
   };
   //remove movie from favorites function
   const removeFromFavorites = (movie) => {
      try {
         if (isExisting(movie, favorites)) {
            //if movie is existing in the favorites array
            var filtered = favorites.filter((favorite) => {
               //get new array without the movie
               return favorite.id !== movie.id;
            });
            setFavorites(filtered);
            alert('Removed from favorites!');
            navigation.goBack();
         } else {
            alert('Not in favorites');
         }
      } catch (error) {
         console.log('error', error);
      }
   };
   //async Call to API to get movies data from themoviesdb.com
   const getMovies = async () => {
      try {
         const response = await fetch(tmdbPathKey);
         const data = await response.json();
         return data.results;
      } catch (error) {
         console.log(error);
      }
   };
   //initialize movies state
   useEffect(() => {
      getMovies().then((data) => setMovies(data));
   }, []);

   return (
      <View style={styles.container}>
         <TouchableOpacity
            style={styles.favorites}
            onPress={() => {
               navigation.navigate('Favorites', { favorites });
            }}
         >
            <Text style={styles.favoritesText}>Favorites [{favorites.length}]</Text>
         </TouchableOpacity>
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
                        movieDetails        : item,
                        addToFavorites,
                        removeFromFavorites,
                        favorites
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
   container     : {
      flex            : 1,
      backgroundColor : '#fff',
      alignItems      : 'center',
      justifyContent  : 'center'
   },
   list          : {
      marginTop    : '10%',
      width        : '80%',
      marginBottom : 20
   },

   item          : {
      padding  : 10,
      fontSize : MEDIUM_FONT_SIZE
   },

   favorites     : {
      marginTop       : '5%',
      backgroundColor : '#7805f7',
      width           : '100%',
      height          : 50,
      alignContent    : 'center',
      alignItems      : 'center'
   },
   favoritesText : {
      fontSize     : MEDIUM_FONT_SIZE,
      marginTop    : 'auto',
      marginBottom : 'auto',
      fontWeight   : 'bold',
      color        : 'white'
   }
});
