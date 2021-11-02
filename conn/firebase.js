// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@firebase/auth'
import {getFirestore, collection, getDocs, query, getDoc, doc, updateDoc, addDoc, where, deleteDoc} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMlDpPuOAPRn86GupNBw8DkIUqZW_ee7s",
  authDomain: "fir-learning-71a7b.firebaseapp.com",
  projectId: "fir-learning-71a7b",
  storageBucket: "fir-learning-71a7b.appspot.com",
  messagingSenderId: "1045868960010",
  appId: "1:1045868960010:web:913f4911a22eb6adcec2f3",
  measurementId: "G-MMBJE0QLQ7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore();
// if(firebase.apps.length ===0){
//     app = initializeApp(firebaseConfig);
// }
// else{
//     app = firebase.app()
// }

export const auth = getAuth()

//Login
export const login = (auth, email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email);
  })
  .catch(err => alert(err.message))
}

//Signup
export const signUp = (auth, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email);
  })
  .catch(err => alert(err.message))
}

//Salida
export const sigout = (auth) => {
  signOut(auth)
      
}

////////////////////////////////////////////////////////////////////////////////////////////////
//DB Firestore 

//Consultar todos los servicios del usuario
export const consultarToDoUser = async (nombreColeccion, usr) => {
  try {
      const DBServicios = collection(database, nombreColeccion);
      const q = query(DBServicios, where("user", "==", usr));
      const respuesta = await getDocs(q);
      //const respuesta = await getDocs(query(collection(database, nombreColeccion)), where("user", "==", "corredor.jose@fuac.edu.co"))
      // console.log(respuesta);


      const coleccionDatos = respuesta.docs.map((documento) => {
          // console.log(documento);
          //console.log(documento.data());
          const documentoTemporal = {
              id: documento.id,
              ...documento.data()
          }
          // console.log(documentoTemporal);
          return documentoTemporal
      })

      return coleccionDatos
  } catch (error) {
      throw new Error(error)
  }
}

//Consultar todos los servicios
export const consutarToDo = async (nombreColeccion) => {
  try {
      const respuesta = await getDocs(collection(database, nombreColeccion))
      // console.log(respuesta);

      const coleccionDatos = respuesta.docs.map((documento) => {
          //console.log(documento);
          //console.log(documento.data());
          const documentoTemporal = {
              id: documento.id,
              ...documento.data()
          }
          //console.log(documentoTemporal);
          return documentoTemporal
      })
      console.log(coleccionDatos);
      return coleccionDatos
  } catch (error) {
      throw new Error(error)
  }
}

//Obtener por ID de Doc
export const getDocumento = async(id) => {
  const docref = doc(database, 'tasks', id);
  const docSnap = await getDoc(docref);
  const docT = {
    id: docSnap.id,
    ...docSnap.data()
  }
  return docT
  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }
  
}
//Actualizar tarea 
export const actualiza = async (idCambio, objeto) => {
  const ref = doc(database, 'tasks', idCambio);
  await updateDoc(ref, objeto);
}

//Anadir nuevo tarea
export const nuevaTarea = async(nuevo) =>{
  const ref = await addDoc(collection(database, 'tasks'), nuevo);
}
//Borrar tareas
export const borrarTarea = async(idaborrar) =>{
  await deleteDoc(doc(database, 'tasks',idaborrar));
}


