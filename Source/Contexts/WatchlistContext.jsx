import React, { createContext , useContext, useEffect} from "react";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistContext = createContext();
export const useWatchlist = () => useContext(WishlistContext)
const WatchlistProvider = ({children}) =>{
    const [watchlistCoinIds, setwatchlistCoinIds] = useState([]);
    const [portfolioAssets, setportfolioAssets] = useState([]);
   

    const getWatchlistData = async () =>{
        try {
            const jsonValue = await AsyncStorage.getItem('@watchlist_coins');
            setwatchlistCoinIds(jsonValue != null ? JSON.parse(jsonValue) : [])
        } catch (error) {
            console.log(error)
        }
    }
    const getPortfolioAssets = async () =>{
        try {
            const jsonValue = await AsyncStorage.getItem('@portfolio_coins');
            setportfolioAssets(jsonValue != null ? JSON.parse(jsonValue) : [])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getWatchlistData();
        getPortfolioAssets();
    },[]);


    const StoreWatchListCoinId = async (coinId)=>{
        try {
            const newWatchlist = [...watchlistCoinIds,coinId];
            const jsonValue = JSON.stringify(newWatchlist);
            await AsyncStorage.setItem('@watchlist_coins', jsonValue);
            setwatchlistCoinIds(newWatchlist);
        } catch (error) {
            console.log(error)
        }
    }

    const removeWatchListCoinId = async (coinId) =>{
        const newWatchlist = watchlistCoinIds.filter((coinIdValue)=> coinIdValue !== coinId);
        const jsonValue = JSON.stringify(newWatchlist);
        await AsyncStorage.setItem('@watchlist_coins', jsonValue);
        setwatchlistCoinIds(newWatchlist)
    }

    const storePortfolioAssets = (newAsset)=>{
        setportfolioAssets((existing)=>[...existing , newAsset])
    }

    const updatePortfolioAssets =  (index)=>{
        portfolioAssets.splice(index,1)
     

    }

    return(
        <WishlistContext.Provider value={{watchlistCoinIds , StoreWatchListCoinId, removeWatchListCoinId , portfolioAssets , storePortfolioAssets ,  updatePortfolioAssets}}>
            {children}
        </WishlistContext.Provider>
    )
}
export default WatchlistProvider;