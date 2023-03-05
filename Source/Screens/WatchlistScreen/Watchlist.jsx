import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, Pressable, RefreshControl } from 'react-native'
import axios from 'axios';
import { useWatchlist } from '../../Contexts/WatchlistContext'
import CoinItem from '../../Components/CoinItem/CoinItem';
import { useNavigation } from '@react-navigation/native';


function Watchlist() {
  const { watchlistCoinIds } = useWatchlist();
  console.log(watchlistCoinIds)
  const [coins, setcoins] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigation = useNavigation();
  const transformCoinId = () => watchlistCoinIds.join('%2C')

  const fetchWatchlistCoins = async (pageNumber = 1, coinIds) => {
    
    setisLoading(true);
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24th`);
    setcoins((existing) => ([ ...response.data]));
    setisLoading(false);
  }
  useEffect(() => {
    if (watchlistCoinIds.length !== 0) {
      fetchWatchlistCoins(1, transformCoinId());
    } else {
      setcoins([])
    }
    
  }, [watchlistCoinIds]);
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <FlatList
        data={coins}
        renderItem={({ item }) => {
          function coindetail() {
            navigation.navigate("CoinDetailScreen", { coinId: item.id })
          }
          return (
            <Pressable onPress={coindetail}>
              <CoinItem marketCoin={item} />
            </Pressable>
          )
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            tintColor="white"
            onRefresh={fetchWatchlistCoins}
          />
        }
      />
    </View>
  )
}

export default Watchlist
