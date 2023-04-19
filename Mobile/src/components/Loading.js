import React from 'react'
import { StyleSheet,View } from 'react-native'
import {  ActivityIndicator } from 'react-native-paper';
const Loading = () => {
  return (
    <View style={styles.loading}>
        <ActivityIndicator size="large" color='#8ecae6'/>
    </View>
  )
}

const styles = StyleSheet.create({
    loading:{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.3)'
    }
})

export default Loading;