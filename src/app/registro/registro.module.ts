import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegisterPage } from './registro.page';
import { RouterModule } from '@angular/router'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    RegistroPageRoutingModule
  ],
  declarations: [RegisterPage]
})
export class RegistroPageModule {}
