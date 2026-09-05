import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonText, IonItem, IonTextarea, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-cima-fotografia-page',
  templateUrl: './cima-fotografia-page.page.html',
  styleUrls: ['./cima-fotografia-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRadio, IonRadioGroup, IonText, IonItem, IonTextarea, IonFab, IonFabButton, IonIcon]
})
export class CimaFotografiaPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });
};


export const usePhotoGallery = () => {
  const a = async () => {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log(capturedPhoto);
  };

  return {
  };
};
