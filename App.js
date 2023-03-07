import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import Navigation from './Source/navigation/Navigation';
import WatchlistProvider from './Source/Contexts/WatchlistContext';


export default function App() {

  return (
    <NavigationContainer >
        <WatchlistProvider>
          <View style={styles.container}>
            <Navigation />
            <StatusBar  backgroundColor='black' style="light" translucent={false}/>
          </View>
        </WatchlistProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
