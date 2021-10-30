import React from 'react'
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card } from 'react-native-elements';
import { auth, sigout, consutarToDo, database, getDocumento } from '../conn/firebase'

const TaskDetail = (props) => {
    console.log(props.route.params.taskID);
    const [tarea, setTarea] = useState({})

    const getTaskInfor = async(idRef) => {
        const result = await getDocumento(idRef)
        setTarea(result)
        console.log(result);

    }

    useEffect(()=> {
        getTaskInfor(props.route.params.taskID)
        
        console.log(tarea);
    },[])
    return (
        <View style={styles.container}>
            <Card>
                <Card.Title>{tarea.name}</Card.Title>
                <Card.Divider/>
                <Text>{tarea.descrip}</Text>
                
            </Card>
        </View>
    )
}

export default TaskDetail

const styles = StyleSheet.create({
    container:{
        flex:1,

    }
})
