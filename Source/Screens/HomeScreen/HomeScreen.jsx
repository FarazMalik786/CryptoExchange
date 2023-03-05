import React from 'react'
import axios from 'axios'
import { View, FlatList, Pressable, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react'
import CoinItem from '../../Components/CoinItem/CoinItem'


function HomeScreen({navigation}) {
    const [cryptodata, setcryptodata] = useState([]);
    const[isLoading , setisLoading] = useState(false);

    const fetchCoins = async (pageNumber = 1)=>{
        setisLoading(true);
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false`);
        setcryptodata((existing)=>([... existing, ...response.data]));
        setisLoading(false);
    }
    useEffect(() => {
        fetchCoins();
    },[]);
    
    const refetchCoins = async () =>{
        setisLoading(true);
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false");
        setcryptodata(response.data);
        setisLoading(false);
    }
    return (
        <View style={{flex:1,backgroundColor:"black"}}>
            <FlatList
                data={cryptodata}
                renderItem={({ item }) => {
                    function coindetail() {
                        navigation.navigate("CoinDetailScreen",{coinId: item.id})
                    }
                    return (
                        <Pressable onPress={coindetail}>
                            <CoinItem marketCoin={item} />
                        </Pressable>
                    )
                }}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl 
                    refreshing={isLoading}
                    tintColor="white"
                    onRefresh={refetchCoins}
                    />
                }
                onEndReached={()=> fetchCoins((cryptodata.length / 50)+1)}
            />
        </View>
    )
}

export default HomeScreen
