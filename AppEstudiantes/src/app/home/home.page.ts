import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData } from '@angular/fire/firestore'
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  styleUrls: ['home.page.scss'],
  imports: [CommonModule,IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonFab, IonFabButton,],
})
export class HomePage {

  constructor(private firestore: Firestore) {
    addIcons({ add });

  }
}




