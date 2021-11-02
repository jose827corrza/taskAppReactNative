import React from 'react'
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements';
import { auth, sigout, consutarToDo, database, getDocumento, borrarTarea } from '../conn/firebase'

const TaskDetail = (props) => {
    console.log(props.route.params.taskID);
    const [tarea, setTarea] = useState({})
    const [loading, setloading] = useState(true)

    const getTaskInfor = async (idRef) => {
        const result = await getDocumento(idRef)
        setTarea(result)
        console.log(result);
        setloading(false)

    }

    const borradoTarea = async(idTarea) => {
        await borrarTarea(idTarea)
        console.log('Se ha borrado la tarea con id : '+idTarea);
        props.navigation.replace('Home')
    }

    useEffect(() => {
        getTaskInfor(props.route.params.taskID)

        console.log(tarea);
    }, [])

    if(loading){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2B82F4" />

            </View>
        )
    }
    return (
        <>
        {tarea == {} ? <Carga/>:
        <View 
        >
            <Card style={styles.carta}>
                <Card.Title>{tarea.name}</Card.Title>
                <Card.Divider />
                <Text>{tarea.descrip}</Text>
                <TouchableOpacity style={styles.buttonEdit} onPress={() => { borradoTarea(props.route.params.taskID); }}>
                <Text style={styles.buttonText}>Eliminar</Text>
                <Icon
                    name='close'
                    type='evilicon'
                    color='#252321'
                    
                />
                
            </TouchableOpacity>
        </Card>
        </View >
        }
        </>
    )
}

export default TaskDetail

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
        backgroundColor: '#F4682B',
        width: '30%',
        borderRadius: 10,
        padding: 5,
        


    },
    carta:{
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        alignContent: 'center',
    }
})
