import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonFab, IonFabButton,
  ToastController, IonModal, IonButtons,
  IonLabel,
  IonItem,
  IonInput
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Firestore, collection, addDoc, query, getDocs, collectionData, } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonButtons, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonModal, IonInput, FormsModule, IonLabel, IonItem],
})
export class HomePage {

  mostrarModal: boolean = false;
  estudiantes$: Observable<any[]> | undefined;
  inputNombre: string = '';
  inputApellidos: string = '';
  inputClase: string = '';

  constructor(private firestore: Firestore, private toastController: ToastController) { }

  ngOnInit() {
    addIcons({
      'add': add
    });
    const estudiantesCollection = collection(this.firestore, 'Estudiantes');
    this.estudiantes$ = collectionData(estudiantesCollection, { idField: 'id' }) as Observable<any[]>;
  }

async abrirModal() {
  this.mostrarModal = true;
  this.inputNombre = '';
  this.inputApellidos = '';
  this.inputClase = '';
}

  cerrarModal() {
    this.mostrarModal = false;
  }

  showToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).then(toast => toast.present());
  }

  async agregarEstudiante() {

    const Nombre = this.inputNombre.trim();
    const Apellidos = this.inputApellidos.trim();
    const Clase = this.inputClase.trim();

    if (!Nombre || !Apellidos || !Clase) {
      this.showToast('Por favor, complete todos los campos.');
      return;
    }

    try {
      const estudiantesCollection = collection(this.firestore, 'Estudiantes');
      const docRef = await addDoc(estudiantesCollection, {
        Nombre,
        Apellidos,
        Clase
      });
      await import('@angular/fire/firestore').then(firestoreModule =>
        firestoreModule.updateDoc(docRef, { id: docRef.id })
      );

      this.showToast('Estudiante agregado exitosamente.');
      this.cerrarModal();
    } catch (error) {
      console.error('Error al agregar estudiante: ', error);
      console.log(Nombre, Apellidos, Clase);
      this.showToast('Error al agregar estudiante. Intente nuevamente.');
      return;
    }
  }

  async getEstudiantes() {

    const estudiantesCollection = collection(this.firestore, 'Estudiantes');
    const q = query(estudiantesCollection);
    const querySnapshot = await getDocs(q);
    const estudiante = querySnapshot.docs.map(doc => doc.data());

    this.estudiantes$ = of(estudiante);

  }

}