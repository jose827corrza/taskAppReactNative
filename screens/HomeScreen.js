import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import { auth, sigout, consutarToDo, database } from '../conn/firebase'
import { List, Avatar, ListItem, Button, Icon, Badge } from 'react-native-elements'
import { getFirestore, collection, getDocs, onSnapshot } from '@firebase/firestore'

const HomeScreen = (props) => {
    const navigation = useNavigation()
    const [ToDo, setToDo] = useState([])


    const handleSigout = () => {
        sigout(auth)
        navigation.navigate("Login")


    }


    const handleTareas = async () => {
        const listT = await consutarToDo('tasks')
        setToDo(listT)

    }

    useEffect(() => {
        //traerToDo()
        handleTareas()

    }, [])
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
                                    <Badge status={tarea.status=true ? "success" : "error"}/>
                                </ListItem.Content>
                                <TouchableOpacity style={styles.buttonEdit} onPress={()=>{
                                    props.navigation.navigate('Editar', {taskID: tarea.id})
                                }}>
                                    <Icon
                                        name='pencil'
                                        type='evilicon'
                                        color='#252321'
                                    />
                                    
                                    {/* <Text style={styles.buttonText}>Editar</Text> */}
                                </TouchableOpacity>
                            </ListItem>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.container}>
            <TouchableOpacity
                    onPress={()=>{
                        props.navigation.navigate('Crear')
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Añadir Tarea</Text>

                </TouchableOpacity>
                <Text>Email: {auth.currentUser?.email}</Text>
                <TouchableOpacity
                    onPress={handleSigout}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign Out</Text>

                </TouchableOpacity>

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
        width: '30%',
        borderRadius: 10,
        padding: 10,


    }
})
