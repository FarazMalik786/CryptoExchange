import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import Watchlist from '../Screens/WatchlistScreen/Watchlist';
import Portfolio from '../Screens/PortfolioScreen/Portfolio';
import { Entypo , Foundation} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false ,
         tabBarActiveTintColor:"white",
         tabBarInactiveTintColor:"grey",
         tabBarStyle:{
            backgroundColor:"#181818"
         }
         }}>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon: ({focused , color})=>{ return <Entypo name="home" size={focused ? 30 : 24} color={color} />}
      }}/>
      <Tab.Screen name='Watchlist' component={Watchlist}
      options={{
        tabBarIcon: ({focused , color})=>{ return <FontAwesome name="star" size={focused ? 30 : 24} color={color} />}
      }}
      />
      <Tab.Screen name='Portfolio' component={Portfolio} options={{
        tabBarIcon: ({focused , color})=>{ return <Foundation name="graph-pie" size={focused ? 30 : 24} color={color} />}
      }}/>
    </Tab.Navigator>
  )
}

export default BottomTab
