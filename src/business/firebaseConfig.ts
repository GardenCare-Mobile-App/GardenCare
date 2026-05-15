import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Import padrão
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCRIjjKu3LWpvYtYwwFc6ixLqWjOEHPRZ4",
  authDomain: "gardencare-facul.firebaseapp.com",
  databaseURL: "https://gardencare-facul-default-rtdb.firebaseio.com",
  projectId: "gardencare-facul",
  storageBucket: "gardencare-facul.firebasestorage.app",
  messagingSenderId: "519649308123",
  appId: "1:519649308123:web:35048b6862fb8763970bfe",
  measurementId: "G-BJ4SQ56VGM"
};

// Inicializa o App
const app = initializeApp(firebaseConfig);

// INICIALIZAÇÃO COM "AS ANY" PARA RESOLVER O ERRO DE TIPO E DE CAMINHO
export const auth = initializeAuth(app, {
  persistence: (getReactNativePersistence as any)(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);