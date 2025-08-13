import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon,IonButton, IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,
    IonCardContent,IonFab, IonFabButton} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton,IonCard,IonCardHeader,IonCardTitle,
    IonCardSubtitle,IonCardContent,IonFab,IonFabButton, ],
})
export class HomePage {
  constructor() {
    addIcons({ add });
  }
}
