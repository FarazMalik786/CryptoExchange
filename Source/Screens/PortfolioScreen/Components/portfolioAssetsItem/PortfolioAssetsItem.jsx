import React from 'react'
import { Image, Text, View } from 'react-native'
import styles from './Styles'
import { AntDesign } from '@expo/vector-icons';

function PortfolioAssetsItem({assetItem}) {
    const {id, image , name , priceBought , quantityBought , ticker} = assetItem;
   
    return (
      
        <View style={styles.coinContainer}>
            <Image source={{ uri: image }} style={{ height: 30, width: 30 }} />
            <View style={{marginLeft: 15}}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.tikcer}>{ticker}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <Text style={styles.title}>₹ {Number( priceBought ).toFixed(2)}</Text>
                <Text style={styles.tikcer}>{Number( quantityBought ).toFixed(10)}</Text>
            </View>
        </View>
        
    )
}

export default PortfolioAssetsItem
