import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';



import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


const firebaseConfig = {

  apiKey: "AIzaSyBRYxoCmC5-ayI5ThTek1XrrzcyKYvmUqU",

  authDomain: "gestion-prodleche.firebaseapp.com",

  databaseURL: "https://gestion-prodleche-default-rtdb.firebaseio.com",

  projectId: "gestion-prodleche",

  storageBucket: "gestion-prodleche.firebasestorage.app",

  messagingSenderId: "922608338412",

  appId: "1:922608338412:web:f3905186fc609899daecc9",

  measurementId: "G-G7D11KLMQX"

};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
  
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};