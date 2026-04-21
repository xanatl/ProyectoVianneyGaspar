import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular/standalone';
import { addIcons,  } from 'ionicons';
import { mailOutline, trash, mail, createOutline, trashOutline } from 'ionicons/icons';
import { personAddOutline, peopleOutline, logOutOutline, chevronForwardOutline,closeOutline, cloudUploadOutline, 
      saveOutline, } from 'ionicons/icons';
import { IonHeader, IonToolbar,IonText, IonTitle, IonContent, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonButtons, IonBadge,IonInput,
  AlertController,IonInputPasswordToggle,IonList,IonInputOtp, IonSpinner,IonAvatar,IonItemOption,IonItemSliding,
 IonItemOptions,IonListHeader,IonCardContent,IonRow,IonCol,IonGrid,IonSelectOption
,IonModal
} from '@ionic/angular/standalone';

import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectorRef, inject } from '@angular/core';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
addIcons({ personAddOutline, peopleOutline, logOutOutline, chevronForwardOutline, mailOutline, trash });

@Component({
  selector: 'app-usuarios',
  templateUrl: 'usuarios.page.html',
  styleUrls: ['usuarios.page.scss'],
  standalone: true,
  imports: [IonHeader,IonListHeader, IonList,IonInput,IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonButtons, IonBadge,
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,IonModal,
    IonInput,IonCard,IonRow,IonCol,IonGrid,IonCardContent,
    IonLabel, IonText,IonSelectOption,
    IonButton, RouterModule, IonSpinner,IonAvatar,IonItemSliding,IonItemOption,
  ]
})
export class UsuariosPage implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  usuarios: any[] = [];
  esModalAbierto: boolean = false;
usuarioSeleccionado: Record<string, any> | null = null;
  private authService = inject(AuthService);
  private alertCtrl = inject(AlertController);
  
    constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router) 
    {
    
      addIcons({ createOutline, trashOutline, personAddOutline, 
      peopleOutline, closeOutline, cloudUploadOutline, 
      saveOutline, logOutOutline});
      this.cargarUsuarios();
    }
    ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios() {
    this.authService.getUsuarios().subscribe(res => {
      this.usuarios = res;
      this.cdr.detectChanges();
    });
  }
abrirEditor(user: any) {
  
  this.usuarioSeleccionado = JSON.parse(JSON.stringify(user));
  this.esModalAbierto = true;
}
abrirModalNuevo() {
    this.router.navigate(['/registro-usuario']);
  }


async guardarCambios() {
 
  if (!this.usuarioSeleccionado) return;

  try {
  
    const id = this.usuarioSeleccionado['id'];  
    const datosParaActualizar: any = {};
    Object.keys(this.usuarioSeleccionado).forEach(key => {
      if (key !== 'id' && key !== 'createdat') {
        datosParaActualizar[key] = this.usuarioSeleccionado![key];
      }
    });

    if (id) {
   
      await this.authService.actualizarUsuario(id, datosParaActualizar);
      console.log('Usuario actualizado con éxito');
    } 
    
    this.esModalAbierto = false;
  } catch (error) {
    console.error('Error al guardar en Firebase:', error);
  }
}//fin Guardar Cambios
  async confirmarEliminacion(user: any) {
    const alert = await this.alertCtrl.create({
      header: '¡Atención!',
      message: `¿Estás seguro de eliminar a <b>${user.nombre}</b>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.authService.eliminarUsuario(user.id);
          }
        }
      ]
    });
    await alert.present();
  }
    logout() {
      this.navCtrl.navigateRoot('/login');
    }
    irARegistro(){
    this.router.navigate(['/registro-usuario']);
    }
 
  async mostrarError(mensaje:string){
  const alert = await this.alertController.create({
    header: 'Error de acceso',
    message: mensaje,
    buttons: ['ok']
  });
  await alert.present();
  }

}//fin Classe