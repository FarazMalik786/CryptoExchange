import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Dimensions, Text, TextInput, View, Pressable } from 'react-native'
import CoinDetailHeader from './Components/CoinDetailHeader/CoinDetailHeader'
import styles from './Styles'
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native"
import axios from 'axios';
import Activity_Indicator from '../../Components/ActivityIndicator/Activity_Indicator';
import { useWatchlist } from '../../Contexts/WatchlistContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CoinDetailedScreen() {

  const [coin, setcoin] = useState([]);
  const [coinMarketData, setcoinMarketData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [coinValue, setcoinValue] = useState(1);
  const [inrValue, setinrValue] = useState(0);
  const { portfolioAssets, storePortfolioAssets, updatePortfolioAssets } = useWatchlist()
  const navigation = useNavigation()
  const route = useRoute();
  const { params: { coinId } } = route;

  const fetchCoinData = async () => {
    const fetchedCoinData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    const fetchedCoinMarketData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=1&interval=hourly`);
    setcoin(fetchedCoinData.data);
    setcoinMarketData(fetchedCoinMarketData.data);
    setinrValue(fetchedCoinData.data.market_data.current_price.inr)
    setisLoading(false)
  }

  useEffect(() => {
    fetchCoinData();
  }, []);

  if (isLoading) {
    return <Activity_Indicator />
  }
  var percentageColor = coin.market_data.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
 

  function changeCoinValue(value) {
    setcoinValue(value);
    setinrValue(coin.market_data.current_price.inr * value);
  }
  function changeUsdValue(value) {
    setinrValue(value);
    setcoinValue(value / coin.market_data.current_price.inr);
  }
  const isButtonDisable = inrValue < 1 || coinValue == 0 ? true : false;
  const existingPortfolioAsset = portfolioAssets.some((item) => item.id === coinId);
  const onAddNewAsset = async () => {
    const newAsset = {
      id: coin.id,
      name: coin.name,
      image: coin.image.small,
      ticker: coin.symbol.toUpperCase(),
      quantityBought: parseFloat(coinValue),
      priceBought: inrValue,
    }

    if (existingPortfolioAsset) {
      const assetIndex = portfolioAssets.findIndex((element) => element.id === coinId);
      newAsset.priceBought = Number(portfolioAssets[assetIndex].priceBought) + +inrValue;
      newAsset.quantityBought = Number(portfolioAssets[assetIndex].quantityBought) + parseFloat(coinValue);
      await updatePortfolioAssets(assetIndex);
     

    }
    const newAssets = [...portfolioAssets, newAsset]
    const jsonValue = JSON.stringify(newAssets)
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    storePortfolioAssets(newAsset)
    navigation.goBack()
  }
  return (
    <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "black", justifyContent: "space-between" }}>
      <View>
        <CoinDetailHeader
          image={coin.image.small}
          symbol={coin.symbol}
          marketCapRank={coin.market_data.market_cap_rank}
          coinId={coin.id}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{coin.name}</Text>
            <Text style={styles.currentPrice}>${coin.market_data.current_price.inr}</Text>
          </View>
          <View style={{ backgroundColor: percentageColor, paddingHorizontal: 3, borderRadius: 10, flexDirection: "row" }}>
            <AntDesign name={coin.market_data.price_change_percentage_24h < 0 ? "caretdown" : "caretup"} size={12} color={"white"} style={{ alignSelf: "center", marginRight: 5 }} />
            <Text style={styles.priceChange}>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</Text>
          </View>
        </View>
      </View>


      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: "white" }}>{coin.symbol.toUpperCase()}</Text>
          <TextInput style={styles.input} value={coinValue.toString()} keyboardType="numeric" onChangeText={changeCoinValue} />
        </View>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: "white" }}>INR</Text>
          <TextInput style={styles.input} value={inrValue.toString()} keyboardType="numeric" onChangeText={changeUsdValue} />
        </View>
      </View>
      <View>
        <Pressable
          style={{ ...styles.buttonContainer, backgroundColor: isButtonDisable ? "#303030" : "#4169E1" }}
          onPress={onAddNewAsset}
          disabled={isButtonDisable}
        >
          <Text style={{ ...styles.buttonText, color: isButtonDisable ? "grey" : "white" }}>Add New Asset</Text>
        </Pressable>
      </View>
    </View>
  )
}



export default CoinDetailedScreen
