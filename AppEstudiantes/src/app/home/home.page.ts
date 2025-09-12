import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonFab, IonFabButton,
  ToastController,IonModal,IonButtons,
  IonLabel,
  IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { Firestore, collection, addDoc, query, getDocs, collectionData, } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonButtons, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonFab, IonFabButton, IonModal, FormsModule, IonLabel, IonItem],
})
export class HomePage {

  mostrarModal: boolean = false;
  estudiantes$: Observable<any[]> | undefined;
  inputNombre: string = '';
  inputApellido: string = '';
  inputClase: string = '';

  constructor(private firestore: Firestore, private toastController: ToastController) { }

  ngOnInit() {
    addIcons({
      add
    });
    const estudiantesCollection = collection(this.firestore, 'Estudiantes');
    this.estudiantes$ = collectionData(estudiantesCollection, { idField: 'id' }) as Observable<any[]>;
  }

  abrirModal() {
    this.mostrarModal = true;
    this.inputNombre = '';
    this.inputApellido = '';
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

    const nombre = this.inputNombre.trim();
    const apellido = this.inputApellido.trim();
    const clase = this.inputClase.trim();

    if (!nombre || !apellido || !clase) {
      this.showToast('Por favor, complete todos los campos.');
      return;
    }

    try {
      const estudiantesCollection = collection(this.firestore, 'Estudiantes');

      await addDoc(estudiantesCollection,
        {
          nombre,
          apellido,
          clase
        }
      );

      this.showToast('Estudiante agregado exitosamente.');
      this.cerrarModal();
    }
    catch (error) {
      console.error('Error al agregar estudiante: ', error);
      this.showToast('Error al agregar estudiante. Intente nuevamente.');
      return;
    }
  }

  async getEstudiantes() {

    const estudiantesCollection = collection(this.firestore, 'Estudiantes');
    const q = query(estudiantesCollection);
    const querySnapshot = await getDocs(q);
    const estudiantes = querySnapshot.docs.map(doc => doc.data());

    this.estudiantes$ = of(estudiantes);

  }

}