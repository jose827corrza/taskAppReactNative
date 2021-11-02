import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { auth, nuevaTarea } from '../conn/firebase'

const Cscreen = (props) => {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const handleCrear = async () => {
        const tareaNueva = {
            name: nombre,
            descrip: descripcion,
            state: false,
            user: auth.currentUser.email
        }
        await nuevaTarea(tareaNueva)
        props.navigation.replace('Home')
    }

    return (
        <View
            style={styles.container}
            behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Nombre de tu tarea"
                    value={nombre}
                    onChangeText={text => setNombre(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Descripcion de tu tarea"
                    value={descripcion}
                    onChangeText={text => setDescripcion(text)}
                    style={styles.input}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleCrear}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Añadir Tarea!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Cscreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    inputContainer: {
        width: '50%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#3F56AD',
        width: '50%',
        padding: 15,
        borderRadius: 10,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#3F56AD',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#3F56AD',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
})

