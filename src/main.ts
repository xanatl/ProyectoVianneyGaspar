import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
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

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
})
