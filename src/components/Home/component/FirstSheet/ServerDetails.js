import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constant/color'

const ServerDetails = () => {
    return (
        <View style={styles.serverDetailsContainer}>
            <Text style={{color: 'white'}}>ServerDetails</Text>
        </View>
    )
}

export default ServerDetails

const styles = StyleSheet.create({
    serverDetailsContainer:{
        width: '60%',
        height: "98%",
        alignSelf: "flex-end",
        borderRadius: 8,
        backgroundColor: colors.sheetColor,
    }
})