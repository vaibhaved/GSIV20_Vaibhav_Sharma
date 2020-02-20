import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
          <MyStack />
      </NavigationContainer>
    );
  }

function MyStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="MovieList"
          component={MovieList}
          options={{headerShown:false}}
        />
        <Stack.Screen name="MovieDetails" component={MovieDetails} options={{title:'Back'}}/>
      </Stack.Navigator>
  );
}