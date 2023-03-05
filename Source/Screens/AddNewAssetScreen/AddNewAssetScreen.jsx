import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import SearchableDropDown from '../../../Searchable_Dropdown'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useWatchlist } from '../../Contexts/WatchlistContext';

function AddNewAssetScreen() {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setboughtAssetQuantity] = useState(0);
  const [InrValue, setInrValue] = useState("");
  const [loading, setloading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { portfolioAssets, storePortfolioAssets, updatePortfolioAssets } = useWatchlist()
  const navigation = useNavigation()

  const existingPortfolioAsset = portfolioAssets.some((item) => item.id == selectedCoinId);
  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBought: InrValue,
    }
    if (existingPortfolioAsset) {

      const assetIndex = portfolioAssets.findIndex((element) => element.id == selectedCoinId);
      newAsset.priceBought = +portfolioAssets[assetIndex].priceBought + +InrValue;
      newAsset.quantityBought = Number(portfolioAssets[assetIndex].quantityBought) + parseFloat(boughtAssetQuantity);
      await updatePortfolioAssets(assetIndex);

    }
    const newAssets = [...portfolioAssets, newAsset]
    const jsonValue = JSON.stringify(newAssets)
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    storePortfolioAssets(newAsset)
    navigation.goBack()
  }
  const getAllCoins = async () => {
    try {
      if (loading) {
        return;
      }
      setloading(true);
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=700&page=1&sparkline=false`);
      setAllCoins(response.data);
      setloading(false);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCoinInfo = async () => {
    try {
      if (loading) {
        return;
      }
      setloading(true);
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCoinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
      setSelectedCoin(response.data);
      setloading(false);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllCoins();
  }, []);
  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo()
    }
  }, [selectedCoinId]);

  function changeInrValue(value) {
    setInrValue(value);
    setboughtAssetQuantity(Number(value / selectedCoin.market_data.current_price.inr));
  }
 console.log(boughtAssetQuantity)
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SearchableDropDown
        items={allCoins}
        onItemSelect={(item) => setSelectedCoinId(item.id)}
        containerStyle={{
          width: "100%",
          paddingHorizontal: 10,
          paddingVertical: 20
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "#1e1e1e",
          borderWidth: 1,
          borderColor: "#44444",
          borderRadius: 5,
        }}
        itemTextStyle={{ color: "white" }}

        resetValue={false}
        placeholder={selectedCoinId || "Select a coin..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: 'transparent',
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#44444",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            color: "white",
          }
        }}
      />
      {selectedCoin && (
        <View style={{ flex: 2, justifyContent: "space-between" }}>
          <View style={styles.boughtquantitycontainer}>
            <View >
              <TextInput
                style={{ color: "white", fontSize: 90 }}
                value={boughtAssetQuantity}
                placeholder="₹"
                placeholderTextColor={"grey"}
                textAlign="center"
                keyboardType="numeric"
                editable={true}
                onChangeText={changeInrValue}

              />
              <Text style={styles.ticker}>{boughtAssetQuantity.toFixed(4)} {selectedCoin.symbol.toUpperCase()}</Text>
            </View>
          </View>
          <Pressable
            style={{ ...styles.buttonContainer, backgroundColor: boughtAssetQuantity === 0 ? "#303030" : "#4169E1" }}
            onPress={onAddNewAsset}
            disabled={boughtAssetQuantity === 0}
          >
            <Text style={{ ...styles.buttonText, color: boughtAssetQuantity === 0 ? "grey" : "white" }}>Add New Asset</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

export default AddNewAssetScreen
const styles = StyleSheet.create({
  ticker: {
    color: "gray",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 25,
    marginLeft: 5,
    textAlign: "center"
  },
  boughtquantitycontainer: {
    alignItems: "center",
    marginTop: 50,

  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600"
  },
  buttonContainer: {

    padding: 10,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 5
  }
})