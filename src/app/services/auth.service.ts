import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,authState } from '@angular/fire/auth';
import { Firestore, doc,docData, setDoc, collection, collectionData, deleteDoc,updateDoc } from '@angular/fire/firestore';
import { Observable,of } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private firestore : Firestore =inject (Firestore);
  private auth: Auth = inject(Auth);
  userProfile$: Observable<any>;

  constructor() {
    this.userProfile$ = authState(this.auth).pipe(
      switchMap(user => {
        if (user) {
          // Buscamos el documento del usuario en la colección 'usuarios' usando su UID
          const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
          return docData(userDocRef, { idField: 'id' });
        } else {
          return of(null);
        }
      }),
      shareReplay(1) // Para que no pida los datos a Firebase cada vez que alguien pregunte
    );
  
  }
  
  getUsuarios(): Observable<any[]> {
    const usuariosRef = collection(this.firestore, 'usuarios');
    return collectionData(usuariosRef, { idField: 'id' });
  }
  async actualizarUsuario(id: string, datos: any) {
    const docRef = doc(this.firestore, `usuarios/${id}`);
    return await updateDoc(docRef, datos);
  }
  async eliminarUsuario(id: string) {
    const docRef = doc(this.firestore, `usuarios/${id}`);
    return await deleteDoc(docRef);
  }
 

  async registrar(data: any) {
    const { nombre, paterno, materno, email, password, rol } = data;

    try {
      
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;      
      await setDoc(doc(this.firestore, 'usuarios', uid), {
        nombre: nombre,
        paterno: paterno,
        materno: materno,
        email: email,
        rol: rol,
        createdAt: new Date()
      });
      return userCredential;
    } catch (error) {
      throw error;
    }
  }// fin agregar usuario
  async login(email:string, password:string){
    try{
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }
  async recuperarContra(email: string){
    try{
      return await sendPasswordResetEmail(this.auth, email);
    }catch (error){
      throw error
    }
  }

  
  
}