import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Text, TextInput, View } from 'react-native'
import CoinDetailHeader from './Components/CoinDetailHeader/CoinDetailHeader'
import styles from './Styles'
import { AntDesign } from '@expo/vector-icons';
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel, monotoneCubicInterpolation } from '@rainbow-me/animated-charts';
import { useRoute } from "@react-navigation/native"
import axios from 'axios';
import Activity_Indicator from '../../Components/ActivityIndicator/Activity_Indicator';

function CoinDetailedScreen() {
  const [coin, setcoin] = useState([]);
  const [coinMarketData, setcoinMarketData] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [coinValue, setcoinValue] = useState("1");
  const [usdValue, setusdValue] = useState("");
  const route = useRoute();
  const { params: { coinId } } = route;
  console.log(coinId)
  const screenWidth = Dimensions.get("window").width;

  const fetchCoinData = async () => {
    const fetchedCoinData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    const fetchedCoinMarketData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=1&interval=hourly`)
    setcoin(fetchedCoinData.data);
    setcoinMarketData(fetchedCoinMarketData.data);
    setusdValue(fetchedCoinData.data.market_data.current_price.inr.toString())
    setisLoading(false)
  }
  useEffect(() => {
    fetchCoinData();

  }, []);

  if (isLoading) {
    return <Activity_Indicator />
  }


  const formatCurrency = (value) => {
    "worklet";
    if (isLoading) {
      return null;
    }
    if (value === "") {
      return `$${coin.market_data.current_price.toFixed(2)}`
    }
    return `$${parseFloat(value).toFixed(2)}`
  }


  function changeCoinValue(value) {
    setcoinValue(value);
    setusdValue(coin.market_data.current_price.inr * value)
  }
  function changeUsdValue(value) {
    setusdValue(value);
    setcoinValue((value / coin.market_data.current_price.inr).toString());
  }



  var percentageColor = coin.market_data.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
  var chartColor = coin.market_data.current_price.inr > coinMarketData.prices[0][1] ? "#16c784" : "#ea3943";




  return (
    <View>

      <View style={{ paddingHorizontal: 10 }}>
        <ChartPathProvider
          data={{ points: coinMarketData.prices.map(([x, y]) => ({ x, y })), smoothingStrategy: 'bezier' }}
        >
          <CoinDetailHeader
            image={coin.image.small}
            symbol={coin.symbol}
            marketCapRank={coin.market_data.market_cap_rank}
            coinId={coin.id}
          />
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.name}>{coin.name}</Text>
              <ChartYLabel
                format={formatCurrency}
                style={styles.currentPrice}
              />
              <Text style={styles.currentPrice}>${coin.market_data.current_price.inr}</Text>
            </View>
            <View style={{ backgroundColor: /* percentageColor */"red", paddingHorizontal: 3, borderRadius: 10, flexDirection: "row" }}>
              <AntDesign name={coin.market_data.price_change_percentage_24h < 0 ? "caretdown" : "caretup"} size={12} color={"white"} style={{ alignSelf: "center", marginRight: 5 }} />
              <Text style={styles.priceChange}>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</Text>
            </View>
          </View>
          <View>
            <ChartPath height={screenWidth / 2} stroke="yellow" width={screenWidth} strokeWidth={2} />
            <ChartDot style={{ backgroundColor: /*chartColor*/ "blue" }} />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={{ color: "white" }}>{coin.symbol.toUpperCase()}</Text>
              <TextInput style={styles.input} value={coinValue} keyboardType="numeric" />
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={{ color: "white" }}>USD</Text>
              <TextInput style={styles.input} value={usdValue} keyboardType="numeric" />
            </View>
          </View>
        </ChartPathProvider>
      </View>

    </View>
  )
}
//
<View style={{ marginLeft: "auto" }}>
  <Text style={styles.title}>4000</Text>
  <View style={{ flexDirection: "row" }}>
    <AntDesign name={"caretup"} size={12} color={"#16c784"} style={{ alignSelf: "center", marginRight: 5 }} />
    <Text style={{ color: "#16c784", fontWeight: "600" }}>1.2%</Text>
  </View>
</View>

export default CoinDetailedScreen
