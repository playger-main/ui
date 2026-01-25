import {
  Component,
  AfterViewInit,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { IGround } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [],
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() grounds: IGround[] | null = null;

  private map!: L.Map;
  private markersLayer = L.layerGroup();
  private http = inject(HttpClient);
  private platform = inject(Platform);

  ngAfterViewInit(): void {
    this.platform.ready().then(() => {
      setTimeout(() => this.initMap(), 300);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grounds'] && this.map) {
      this.renderMarkers();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([54.693572, 25.274718], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
    this.renderMarkers();

    setTimeout(() => this.map.invalidateSize(), 100);
  }

  private renderMarkers(): void {
    this.markersLayer.clearLayers();

    const customIcon = L.icon({
      iconUrl: 'assets/icon/marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const list = this.grounds ?? [];

    for (const g of list) {
      const lat = Number(g.geolocation?.lat);
      const lng = Number(g.geolocation?.lng);

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(
        this.markersLayer
      );

      marker.bindPopup(
        `<b>${g.name}</b><br>${g.address ?? ''}<br><small>${(g.kindofsport ?? []).join(', ')}</small>`
      );

      marker.on('click', () => this.reverseGeocode(marker));
    }

    setTimeout(() => this.map.invalidateSize(), 100);
  }

  private reverseGeocode(marker: L.Marker): void {
    const { lat, lng } = marker.getLatLng();
    const lang = navigator.language?.split('-')[0] || 'en';
    const nominatimBase = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=${lang}`;

    const isWeb = this.platform.is('mobileweb') || this.platform.is('desktop');
    const url = isWeb
      ? `https://api.allorigins.win/get?url=${encodeURIComponent(nominatimBase)}`
      : nominatimBase;

    this.http.get<any>(url).subscribe(
      (data) => {
        const json = isWeb ? JSON.parse(data.contents) : data;
        const address = json.display_name || 'Адрес не найден';
        marker.bindPopup(`<b>Адрес:</b><br>${address}`).openPopup();
        setTimeout(() => this.map.invalidateSize(), 200);
      },
      () => {
        marker.bindPopup('Ошибка при получении адреса').openPopup();
        setTimeout(() => this.map.invalidateSize(), 200);
      }
    );
  }
}
