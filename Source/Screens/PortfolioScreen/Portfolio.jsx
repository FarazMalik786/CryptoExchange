import React from 'react'
import { View , Text} from 'react-native'
import PortfolioAssetsList from './Components/PortfolioAssets/PortfolioAssetsList'
import { Suspense } from 'react'
import Activity_Indicator from '../../Components/ActivityIndicator/Activity_Indicator'
function Portfolio() {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Suspense fallback={<Activity_Indicator/>}>
        <PortfolioAssetsList />
      </Suspense>
    </View>
  )
}

export default Portfolio
