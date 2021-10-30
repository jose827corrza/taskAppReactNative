import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'

const Listas = () => {
    return (
        <View>
            <ListItem >
                <ListItem.Content>
                    <ListItem.Title>Prueba 1</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem >
                <ListItem.Content>
                    <ListItem.Title>Prueba 2</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

export default Listas

const styles = StyleSheet.create({})
