import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const Carga = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#F3B73F"/>

        </View>
    )
}

export default Carga

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    horizontal:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '10px',
    }
})
