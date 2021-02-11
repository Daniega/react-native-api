import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

//constants
import { tmdbPath, LARGE_FONT_SIZE, SMALL_FONT_SIZE } from '../constants/constants';

const Movie = ({ route }) => {
   const { title, poster_path, overview, vote_average, id } = route.params.movieDetails;
   //handlePress invokes addFavoriteMovie() in MovieList
   const addToFavorites = () => {
      route.params.addToFavorites(route.params.movieDetails);
   };
   const removeFromFavorites = () => {
      route.params.removeFromFavorites(route.params.movieDetails);
   };

   return (
      <View style={styles.container}>
         <Text style={styles.name}>{title}</Text>
         <Image style={styles.image} source={{ uri: `${tmdbPath}${poster_path}` }} />
         <Text style={styles.overview}>{overview}</Text>
         <Text style={styles.ratingText}>Rating:</Text>
         <Text style={styles.rating}>{vote_average}</Text>
         <Button title='Add to favorites' onPress={addToFavorites} />
         <Button title='Remove from favorites' onPress={removeFromFavorites} />
      </View>
   );
};

export default Movie;

const styles = StyleSheet.create({
   container  : {
      flex            : 1,
      backgroundColor : '#fff',
      alignItems      : 'center',
      justifyContent  : 'flex-start'
   },
   name       : {
      marginTop : '10%',
      fontSize  : LARGE_FONT_SIZE
   },
   image      : {
      marginTop    : 20,
      marginBottom : 20,
      width        : 200,
      height       : 300
   },
   overview   : {
      width        : '80%',
      fontSize     : SMALL_FONT_SIZE,
      marginTop    : 20,
      marginBottom : 20
   },

   ratingText : {
      fontSize : LARGE_FONT_SIZE
   },
   rating     : {
      color        : '#FE5E41',
      fontSize     : LARGE_FONT_SIZE,
      marginBottom : 10
   }
});
