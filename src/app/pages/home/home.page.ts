import { Component } from '@angular/core';
import { NavController} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, trash, mail } from 'ionicons/icons';
import { personAddOutline, peopleOutline, logOutOutline, chevronForwardOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonButtons, IonBadge,IonInput,
  AlertController,IonInputPasswordToggle,IonList,IonInputOtp, IonSpinner,IonAvatar,IonItemOption,IonItemSliding,
 IonItemOptions,IonListHeader,IonModal

} from '@ionic/angular/standalone';

import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
addIcons({ personAddOutline, peopleOutline, logOutOutline, chevronForwardOutline, mailOutline, trash });

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader,IonListHeader, IonList,IonInput,IonToolbar, IonTitle, IonContent, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonButtons, IonBadge,
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,IonInput, IonModal,
    IonLabel, 
    IonButton, RouterModule, IonSpinner,IonAvatar,IonItemSliding, IonItemOption,IonItemOptions,
    
  
  ]
})
export class HomePage {
private cdr = inject(ChangeDetectorRef);
 usuarios: any[] = [];
 mostrarLista = false;
    constructor(private authService: AuthService, private alertController: AlertController, private navCtrl: NavController, private router: Router) {
    
      addIcons({ personAddOutline, peopleOutline, logOutOutline, chevronForwardOutline });
    }
  async verUsuarios() { 
    this.mostrarLista = !this.mostrarLista;
    if (this.mostrarLista) {
      this.authService.getUsuarios().subscribe({
        next: (res) => {
          this.usuarios = res;
          console.log('Usuarios en consola:', this.usuarios);
          this.cdr.detectChanges(); 
        }
      });
  }
  }//finVerUsuario
logout() {
      this.navCtrl.navigateRoot('/login');
    }
    irARegistro(){
    this.router.navigate(['/registro-usuario']);
    }
    irAUsuarios() {
      this.navCtrl.navigateRoot('/usuarios');
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