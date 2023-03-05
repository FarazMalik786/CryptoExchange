import React from 'react'
import { ActivityIndicator , View} from 'react-native'

function Activity_Indicator() {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center", backgroundColor:"black"}}>
      <ActivityIndicator size={"large"} color={"white"}/>
    </View>
  )
}

export default Activity_Indicator
