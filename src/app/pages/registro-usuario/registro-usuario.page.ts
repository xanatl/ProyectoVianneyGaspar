import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { 
  AlertController, 
  NavController,
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonLabel, 
  IonSelect, 
  IonSelectOption , IonIcon
} from '@ionic/angular/standalone';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonLabel, 
    IonSelect, 
    IonSelectOption, IonIcon
  ]
})
export class RegistroUsuarioPage {

  usuario = {
    nombre: '',
    paterno: '',
    materno: '',
    email: '',
    password: '',
    passwordConfirm: '',
    rol: '' 
  };

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router
    
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }
  verPassword = false;
  verPasswordConfirm = false;

  async nuevoUsuario() {
   
    if (!this.usuario.nombre ||!this.usuario.paterno || !this.usuario.materno || !this.usuario.email || !this.usuario.password || !this.usuario.passwordConfirm || !this.usuario.rol) {
      await this.mostrarAlerta(
        'Campos Incompletos', 
        'Por favor, rellena todos los campos para continuar.'
      );
      return;
    }
    if (this.usuario.password!== this.usuario.passwordConfirm){
      await this.mostrarAlerta('La contraseña no coincide',' Intentelo de nuevo');
      return;
    }

  
    if (!this.usuario.email.includes('@')) {
      await this.mostrarAlerta(
        'Email Inválido', 
        'Asegúrate de ingresar un correo electrónico correcto.'
      );
      return;
    }

    try {
      
      await this.authService.registrar({
        nombre: this.usuario.nombre,
        paterno: this.usuario.paterno,
        materno: this.usuario.materno,
        email: this.usuario.email,
        password: this.usuario.password,
        rol: this.usuario.rol
      });

  
      await this.mostrarAlertaExito();

    } catch (error: any) {
      console.error('Error en el proceso:', error);     

      let mensajeError = 'Ocurrió un error inesperado.';
      
      if (error.code === 'auth/weak-password') {
        mensajeError = 'La contraseña es muy corta (mínimo 6 caracteres).';
      } else if (error.code === 'auth/email-already-in-use') {
        mensajeError = 'Este correo electrónico ya está registrado.';
      } else if (error.code === 'auth/invalid-email') {
        mensajeError = 'El formato del correo no es válido.';
      }
      await this.mostrarAlerta('Error de Registro', mensajeError);
    }
  }

 
  async mostrarAlerta(cabecera: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: cabecera,
      message: mensaje,
      buttons: ['Entendido']
    });
    await alert.present();
  }


  async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: '¡Usuario Creado!',
      message: 'El registro se completó con éxito.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Regresar al inicio de sesión',
          handler: () => {
            this.navCtrl.navigateRoot('/login'); 
          }
        }
      ]
    });
    await alert.present();
  }
  irARegresar(){
  this.router.navigate(['/usuarios']);
  }
    
}