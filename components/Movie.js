import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

//constants
import { tmdbPath, LARGE_FONT_SIZE, SMALL_FONT_SIZE, MEDIUM_FONT_SIZE } from '../constants/constants';

//Screen for showing Movie Details, "cart" with favorite movies, and few action Buttons
const Movie = ({ route, navigation }) => {
   //destructuring movieDetails params
   const { title, poster_path, overview, vote_average, id } = route.params.movieDetails;
   const [ buttonDisabeled, setButtonDisabeled ] = useState(false); // preventing double press on button

   const favorites = route.params.favorites;
   //addToFavorites invokes addFavoriteMovie() in MovieList
   const addToFavorites = () => {
      setButtonDisabeled(true);
      setTimeout(() => {
         setButtonDisabeled(false);
      }, 200);
      route.params.addToFavorites(route.params.movieDetails);
      navigation.goBack();
   };
   //removeFromFavorites invokes removeFromFavorites() in MovieList
   const removeFromFavorites = () => {
      setButtonDisabeled(true);
      setTimeout(() => {
         setButtonDisabeled(false);
      }, 200);
      route.params.removeFromFavorites(route.params.movieDetails);
      navigation.goBack();
   };

   return (
      <ScrollView>
         <View style={styles.container}>
            <TouchableOpacity
               style={styles.cart}
               onPress={() => {
                  navigation.navigate('Favorites', { favorites });
               }}
            >
               <Text style={styles.favoritesText}>Favorites [{favorites.length}]</Text>
            </TouchableOpacity>
            <Text style={styles.name}>{title}</Text>
            <Image style={styles.image} source={{ uri: `${tmdbPath}${poster_path}` }} />
            <Text style={styles.overview}>{overview}</Text>
            <Text style={styles.ratingText}>Rating:</Text>
            <Text style={styles.rating}>{vote_average}</Text>
            <View style={styles.buttons}>
               <Button title='Add to favorites' onPress={addToFavorites} disabled={buttonDisabeled} />
               <Button title='Remove from favorites' onPress={removeFromFavorites} disabled={buttonDisabeled} />
            </View>
         </View>
      </ScrollView>
   );
};

export default Movie;

const styles = StyleSheet.create({
   container     : {
      flex            : 1,
      backgroundColor : '#fff',
      alignItems      : 'center',
      justifyContent  : 'flex-start'
   },

   cart          : {
      width           : '100%',
      backgroundColor : '#7805f7',
      color           : 'white',
      height          : 50,
      alignContent    : 'center',
      alignItems      : 'center',
      marginTop       : '5%'
   },
   favoritesText : {
      fontSize     : MEDIUM_FONT_SIZE,
      marginTop    : 'auto',
      marginBottom : 'auto',
      fontWeight   : 'bold',
      color        : 'white'
   },
   name          : {
      marginTop  : '5%',
      fontSize   : MEDIUM_FONT_SIZE,
      fontWeight : 'bold'
   },
   image         : {
      marginTop    : 20,
      marginBottom : 20,
      width        : 150,
      height       : 250
   },
   overview      : {
      width        : '80%',
      fontSize     : SMALL_FONT_SIZE,
      marginTop    : 20,
      marginBottom : 20
   },

   ratingText    : {
      fontSize : LARGE_FONT_SIZE
   },
   rating        : {
      color        : '#FE5E41',
      fontSize     : LARGE_FONT_SIZE,
      marginBottom : 10
   },
   buttons       : {
      marginBottom : 20
   }
});
