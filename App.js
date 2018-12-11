import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import FavouritesScreen from "./FavouritesScreen";

const App = createStackNavigator(
    {
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
    Favourites: {screen: FavouritesScreen}
    }, 
{
        initialRouteName: "Home"

    }      
);

export default createAppContainer(App);


