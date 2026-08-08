import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail-clima',
  templateUrl: './detail-clima.component.html',
  styleUrls: ['./detail-clima.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent]
})
export class DetailClimaComponent implements OnInit {

  @Input() climaData: any;
  @Input() pais: string = '';
  @Input() capital: string = '';

  constructor() { }

  ngOnInit() { }

}
