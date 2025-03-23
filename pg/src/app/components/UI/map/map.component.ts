import { Component, AfterViewInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import 

mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: []
})
export class MapComponent implements AfterViewInit {
  map!: mapboxgl.Map;

  ngAfterViewInit(): void {    
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHppbSIsImEiOiJjbThmbTk3bXYwZWFlMnFzNXVxa3libGRxIn0.b276QuWQ1RrczUkVaDEdwQ';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [25.274718, 54.693572],
      zoom: 10,
    });

    new mapboxgl.Marker().setLngLat([25.274718, 54.693572]).addTo(this.map);

    setTimeout(() => {
      this.map.resize(); // 👈 Обновляет размеры карты
    }, 100);
  }
}
