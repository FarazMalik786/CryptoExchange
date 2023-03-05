import React from 'react'
import { View , Image , Text} from 'react-native'
import {Ionicons , EvilIcons , FontAwesome} from "@expo/vector-icons"
import styles from './Styles'
import {useNavigation} from "@react-navigation/native"
import { useWatchlist } from '../../../../Contexts/WatchlistContext'
function CoinDetailHeader(prop) {
  const {image ,  symbol , marketCapRank, coinId} = prop;
  const navigation = useNavigation();
  const {watchlistCoinIds , StoreWatchListCoinId, removeWatchListCoinId} = useWatchlist();

  const checkIfCoinIsWatchListed =  ()=>{
    return watchlistCoinIds.some((coinIdValue)=> coinIdValue === coinId)
  }
  const handleWatchListCoin = ()=>{
    if (checkIfCoinIsWatchListed()) {
      return removeWatchListCoinId(coinId);
    } else{
      return StoreWatchListCoinId(coinId);
    }
  }
  return (
    <View style={styles.headerContainer}>
      <Ionicons name="chevron-back-sharp" size={30} color="white" onPress={()=> navigation.goBack()}/>
      <View style={styles.tickerContainer}>
        <Image source={{uri: image}} style={{width: 25 , height:25}}></Image>
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
            <Text style={{color:"white",fontWeight:"bold",fontSize:15}}>
                #{marketCapRank}
            </Text>
        </View>
      </View>
      <FontAwesome name={checkIfCoinIsWatchListed() ?  "star" : "star-o"} size={25} color="white" onPress={handleWatchListCoin}/>
    </View>
  )
}

export default CoinDetailHeader
