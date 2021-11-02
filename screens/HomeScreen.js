import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import { auth, sigout, consutarToDo, database, consultarToDoUser, borrarTarea } from '../conn/firebase'
import { List, Avatar, ListItem, Button, Icon, Badge } from 'react-native-elements'
import { getFirestore, collection, getDocs, onSnapshot } from '@firebase/firestore'
import Carga from './Carga'

const HomeScreen = (props) => {
    const navigation = useNavigation()
    const [ToDo, setToDo] = useState([])
    const [loading, setloading] = useState(true)


    const handleSigout = () => {
        sigout(auth)
        navigation.navigate("Login")


    }


    const handleTareas = async () => {
        const listT = await consutarToDo('tasks')
        setToDo(listT)

    }

    const handleTareaUser = async () => {
        const listT = await consultarToDoUser('tasks', auth.currentUser.email)
        setToDo(listT)
        setloading(false)
    }
    const borradoTarea = async (idTarea) => {
        await borrarTarea(idTarea)
        console.log('Se ha borrado la tarea con id : ' + idTarea);
    }
    useEffect(() => {
        //traerToDo()
        //handleTareas()
        handleTareaUser()
        console.log(auth.currentUser?.email);

    }, [])
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2B82F4" />

            </View>
        )
    }
    return (
        <>

            <ScrollView>

                {
                    ToDo.map((tarea) => {
                        return (
                            <ListItem key={tarea.id} bottomDivider onPress={() => {
                                props.navigation.navigate('Details', {
                                    nameTask: tarea.name,
                                    descripTask: tarea.descrip,
                                    stateTask: tarea.state,
                                    taskID: tarea.id
                                })
                            }}>
                                <ListItem.Chevron />
                                <ListItem.Content>
                                    <ListItem.Title>{tarea.name}</ListItem.Title>
                                    <ListItem.Subtitle>{tarea.descrip}</ListItem.Subtitle>
                                    <Badge status={tarea.status = true ? "success" : "error"} />
                                </ListItem.Content>
                                <TouchableOpacity style={styles.buttonEdit} onPress={() => {
                                    props.navigation.navigate('Editar', { taskID: tarea.id })
                                }}>
                                    <Icon
                                        name='pencil'
                                        type='evilicon'
                                        color='#252321'
                                    />

                                    {/* <Text style={styles.buttonText}>Editar</Text> */}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonEdit} onPress={() => { borradoTarea(tarea.id); }}>
                                    <Icon
                                        name='close'
                                        type='evilicon'
                                        color='#252321'
                                    />
                                </TouchableOpacity>
                            </ListItem>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('Crear')
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Añadir Tarea</Text>

                </TouchableOpacity>
                <Text>Logeado con email: {auth.currentUser?.email}</Text>
                <TouchableOpacity
                    onPress={handleSigout}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign Out</Text>

                </TouchableOpacity>
                <View >
                    <Text style={styles.text}>Desarrollado por JoseDev</Text>
                </View>

            </View >
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        backgroundColor: '#3F56AD',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonEdit: {
        backgroundColor: '#F3B73F',
        width: '12%',
        borderRadius: 10,
        padding: 5,


    },
    text: {
        fontSize: 12,
        fontFamily: 'Bold',
        marginTop: 4,
    }
})
