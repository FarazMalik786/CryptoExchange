import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import CoinDetailedScreen from '../Screens/CoinDetailedScreen/CoinDetailedScreen'
import HomeScreen from '../Screens/HomeScreen/HomeScreen'
import AddNewAssetScreen from '../Screens/AddNewAssetScreen/AddNewAssetScreen'
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();
function Navigation() {
  return (
    <Stack.Navigator >
      <Stack.Screen name='Root' component={BottomTab} options={{headerShown:false}}/>
      <Stack.Screen name='CoinDetailScreen' component={CoinDetailedScreen}  options={{headerShown:false}}/>
      <Stack.Screen name='AddNewAssetScreen' component={AddNewAssetScreen} options={{
        title:"Add New Asset",
        headerStyle:{
          backgroundColor:"#121212"
        },
        headerTintColor:"white",
        headerTitleStyle:{
          fontWeight:"bold",
          
        }
      }}/>
    </Stack.Navigator>
  )
}

export default Navigation
