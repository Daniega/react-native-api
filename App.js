import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

//Components / Screens
import Login from './components/Login';
import MovieList from './components/MovieList';
import Favorites from './components/Favorites';
import Movie from './components/Movie';

import { LogBox } from 'react-native';

//react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App () {
   useEffect(() => {
      //passing function as parameter, according to docs, without state management can safely ignore
      LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state' ]);
   }, []);

   return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='MovieList' component={MovieList} />
            <Stack.Screen name='Favorites' component={Favorites} />
            <Stack.Screen name='Movie' component={Movie} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
