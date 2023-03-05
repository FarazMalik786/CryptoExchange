import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, Pressable } from 'react-native'
import styles from './Styles';
import PortfolioAssetsItem from '../portfolioAssetsItem/PortfolioAssetsItem';
import { useNavigation } from '@react-navigation/native';
import { useWatchlist } from '../../../../Contexts/WatchlistContext';
function PortfolioAssetsList() {
    const navigation = useNavigation();
    const { portfolioAssets } = useWatchlist();
    const [ currentBalance , setcurrentBalance] = useState(0)
    useEffect(() => {
        let balance = 0
        portfolioAssets.forEach(element => {
            balance += Number(element.priceBought);
        });
        setcurrentBalance(balance)
    }, [portfolioAssets])

    return (
        <View>
            <FlatList
                data={portfolioAssets}
                renderItem={({ item }) => <PortfolioAssetsItem assetItem={item} />}
                extraData={portfolioAssets}
                ListHeaderComponent={
                    <>
                        <View style={styles.balacecontainer}>
                                <Text style={styles.currentBalance}>Current Balance</Text>
                                <Text style={styles.currentBalanceValue}>₹ {currentBalance.toFixed(2)}</Text>
                        </View>
                        <View>
                            <Text style={styles.assetsLable}>Your Assets</Text>
                        </View>
                    </>
                }
                ListFooterComponent={
                    <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate("AddNewAssetScreen")}>
                        <Text style={styles.buttonText}>Add New Assets</Text>
                    </Pressable>
                }
            />
        </View>
    )
}

export default PortfolioAssetsList
