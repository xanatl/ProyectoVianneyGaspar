import { Component} from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import{
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,IonLabel, IonIcon,
  IonButton,AlertController, NavController,IonInputPasswordToggle
}from '@ionic/angular/standalone';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports:[
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,IonInput, 
    IonLabel, 
    IonButton, RouterModule
  ]
})
export class LoginPage{
  credenciales= {
  email: '',
  password: ''
  }
  

  constructor(private authService: AuthService, private alertController: AlertController, private navCtrl: NavController, private router: Router
  ){
    addIcons({ eyeOutline, eyeOffOutline });
  }
  async login(){    
    const { email, password } = this.credenciales;
    if(!this.credenciales.email||!this.credenciales.password){
      this.mostrarError('Ingresa tus datos');
    return
    }try {
      
      await this.authService.login(this.credenciales.email, this.credenciales.password);
      this.navCtrl.navigateRoot('/home');
    }catch (error: any){
      
      let mensaje = "Credenciales incorrectas, revisa tus datos";
      if (error.code === 'auth/invalid-credential'){
        mensaje='El correo o la contraseña no son correctos';
      }else if (error.code === 'auth/user-not-found'){
        mensaje='El usuario no existe'
      }else if(error.code === 'auth/wrong-password'){
        mensaje='Contraseña incorrecta'
      }
      this.mostrarError(mensaje);
    }
    
  }
async mostrarError(mensaje:string){
const alert = await this.alertController.create({
  header: 'Error de acceso',
  message: mensaje,
  buttons: ['ok']
});
await alert.present();
}
  irARegistro(){
  this.router.navigate(['/registro-usuario']);
  }
  async recuperarContra(){
    const alert = await this.alertController.create({
    header: 'Recuperar Contraseña',
    message: 'Introduce tu correo electrónico para reestablecer tu contraseña.',
    inputs: [
      {
        name: 'email',
        type: 'email',
        placeholder: 'correo@ejemplo.com'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Enviar enlace',
        handler: async (data) => {
          if (!data.email) {
            this.mostrarError('Ingresa tu correo electrónico.');
            return;
          }
          await this.Recuperar(data.email);
        }
      }
    ]
  });

  await alert.present();
}

  async Recuperar(email: string) {
    try {
    await this.authService.recuperarContra(email);
    

    const exito = await this.alertController.create({
      header: '¡Correo Enviado!',
      message: `Se ha enviado un enlace de recuperación a ${email}`,
      buttons: ['OK']
    });
    await exito.present();

  } catch (error: any) {
    console.error(error.code);
    
    let mensaje = 'Ocurrió un error al procesar la solicitud.';
    
  
    if (error.code === 'auth/user-not-found') {
      mensaje = 'El correo electrónico ingresado no pertenece a ningún usuario registrado.';
    } else if (error.code === 'auth/invalid-email') {
      mensaje = 'Ingresa un formato de correo electrónico válido.';
    }

    const errorAlert = await this.alertController.create({
      header: 'Usuario no encontrado',
      message: mensaje,
      buttons: ['Reintentar']
    });
    await errorAlert.present();
  }
}
}