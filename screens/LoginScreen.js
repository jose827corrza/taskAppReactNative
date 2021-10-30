import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, login, signUp } from '../conn/firebase'
import { onAuthStateChanged } from '@firebase/auth'

const LoginScreen = () => {

    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const navigation = useNavigation()

    const handleSignUp = () => {
        signUp(auth, email, password)
    }
    const handleLogin = () => {
        login(auth, email, password)
    }

    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              navigation.replace("Home")
              const uid = user.uid;
              // ...
            } 
          })
    }, [])
    return (
        <View
            style={styles.container}
            behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="email"
                    value={email}
                    onChangeText={text => setemail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="password"
                    value={password}
                    onChangeText={text => setpassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    inputContainer: {
        width:'50%'
    },
    input: {
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
    },
    buttonContainer: {
        width:'60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:40,
    },
    button: {
        backgroundColor:'#3F56AD',
        width:'100%',
        padding:15,
        borderRadius:10,
    },
    buttonOutline: {
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#3F56AD',
        borderWidth:2,
    },
    buttonOutlineText: {
        color:'#3F56AD',
        fontWeight:'700',
        fontSize:16,
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,
    }
})
