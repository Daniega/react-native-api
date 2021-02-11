import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

//constants
import { tmdbPath, LARGE_FONT_SIZE, SMALL_FONT_SIZE } from '../constants/constants';

const Movie = ({ route, navigation }) => {
   //    const movie = route.params.movieDetails;
   const { title, poster_path, overview, vote_average } = route.params.movieDetails;

   const [ favorites, setFavorites ] = useState([]);

   const addToFavorites = async () => {
      console.log('im inside');
      const newFavorite = route.params.movieDetails;
      setFavorites((favorites) => [ ...favorites, newFavorite ]);
      console.log(favorites);
   };

   return (
      <View style={styles.container}>
         <Text style={styles.name}>{title}</Text>
         <Image style={styles.image} source={{ uri: `${tmdbPath}${poster_path}` }} />
         <Text style={styles.overview}>{overview}</Text>
         <Text style={styles.ratingText}>Rating:</Text>
         <Text style={styles.rating}>{vote_average}</Text>
         <Button title='Add to favorites' onPress={addToFavorites} />
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
      marginTop    : 30,
      marginBottom : 30,
      width        : 200,
      height       : 300
   },
   overview   : {
      width        : '80%',
      fontSize     : SMALL_FONT_SIZE,
      marginTop    : 30,
      marginBottom : 30
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
