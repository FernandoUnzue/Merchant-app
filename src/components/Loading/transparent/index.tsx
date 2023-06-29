import { ActivityIndicator, ActivityIndicatorBase, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@core/theme'

type Props = {
    isLoading?: boolean,
    isFetching?: boolean,
}

export const LoadingTransparent:React.FC<Props> = ({isFetching, isLoading}):JSX.Element => {
  return (
    <View>
    {isFetching && !isLoading &&
        <View style={{
           alignItems: 'center',
           justifyContent: "flex-start",
           width: "100%", 
           height: "100%",
           position: "absolute",
           paddingVertical: "100%",
           backgroundColor: "#fff",
           top: 0,
           right: 500,
           left: 0,
           zIndex: 99,
           opacity: 0.8,
         }}
         >
           <ActivityIndicator
         size="large" 
         color={Colors.accent} 
         />
         </View>}
         </View>
  )
}

export default LoadingTransparent

const styles = StyleSheet.create({})