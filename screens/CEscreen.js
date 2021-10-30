import React from 'react'
import { useEffect, useState } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { CheckBox, Input } from 'react-native-elements'
import { auth, sigout, consutarToDo, database, getDocumento, actualiza } from '../conn/firebase'

const CEscreen = (props) => {

    const [tarea, setTarea] = useState({})
    const [ide, setide] = useState('')
    const [isSelected, setisSelected] = useState(false);
    const getTaskInfor = async (idRef) => {
        const result = await getDocumento(idRef)
        setTarea(result)
        console.log(result);

    }
    const handleTextChange = (value, prop) => {
        setTarea({ ...tarea, [prop]: value })
    }

    const handleActualizar = async (id) => {
        const objeto = {
            name: tarea.name,
            descrip: tarea.descrip,
            user: auth.currentUser?.email
        }
        const respuesta = await actualiza(id, tarea)
        props.navigation.replace('Home')
    }


    useEffect(() => {
        getTaskInfor(props.route.params.taskID)
        setide(props.route.params.taskID)
        console.log(tarea);
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text>Nombre de Tarea</Text>
                <Input
                    style={styles.input}
                    value={tarea.name}
                    onChangeText={(value) => handleTextChange(value, "name")} />
                <Text>Descripcion de la tarea</Text>
                <Input
                    style={styles.input}
                    value={tarea.descrip}
                    onChangeText={(value) => handleTextChange(value, "descrip")} />

            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                value={isSelected}
                checked={isSelected}
                onPress={() => setisSelected(!isSelected)}/>
                <Text>Esta tarea esta: {isSelected ? 'Finalizada!' : 'NO Finalizada'}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        
                        handleActualizar(ide)
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Actualizar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CEscreen

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
        backgroundColor: '#0A990B',
        width: '100%',
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
})

