// map.component.ts
import { Component, AfterViewInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private http = inject(HttpClient);
  private platform = inject(Platform);

  ngAfterViewInit(): void {
    this.platform.ready().then(() => {
      setTimeout(() => this.initMap(), 300); // время на отрисовку DOM
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([54.693572, 25.274718], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: 'assets/icon/marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const marker = L.marker([54.693572, 25.274718], { icon: customIcon }).addTo(
      this.map,
    );

    marker.on('click', () => {
      const { lat, lng } = marker.getLatLng();
      const lang = navigator.language?.split('-')[0] || 'en';
      const nominatimBase = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=${lang}`;
      // 🧠 Если платформа — web, добавляем CORS-прокси
      const isWeb =
        this.platform.is('mobileweb') || this.platform.is('desktop');
      const url = isWeb
        ? `https://api.allorigins.win/get?url=${encodeURIComponent(nominatimBase)}`
        : nominatimBase;

      this.http.get<any>(url).subscribe(
        (data) => {
          const json = JSON.parse(data.contents);
          const address = json.display_name || 'Адрес не найден';
          marker.bindPopup(`<b>Адрес:</b><br>${address}`).openPopup();
          setTimeout(() => this.map.invalidateSize(), 200);
        },
        (error) => {
          marker.bindPopup('Ошибка при получении адреса').openPopup();
          setTimeout(() => this.map.invalidateSize(), 200);
        },
      );
    });

    setTimeout(() => this.map.invalidateSize(), 100);
  }
}
