// map.component.ts
import {
  Component,
  AfterViewInit,
  inject,
  Input,
  OnChanges,
  OnDestroy,
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
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() grounds: IGround[] | null = null;

  private map?: L.Map;
  private markersLayer = L.layerGroup();

  private http = inject(HttpClient);
  private platform = inject(Platform);

  private reverseCache = new Map<string, string>();
  private initialized = false;

  ngAfterViewInit(): void {
    this.platform.ready().then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.initMap());
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grounds'] && this.map) {
      this.renderMarkers();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
    this.initialized = false;
    this.reverseCache.clear();
  }

  private initMap(): void {
    if (this.initialized) return;

    const container = document.getElementById('map');
    if (!container) {
      requestAnimationFrame(() => this.initMap());
      return;
    }

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      requestAnimationFrame(() => this.initMap());
      return;
    }

    this.map = L.map(container, { zoomControl: true }).setView(
      [54.693572, 25.274718],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      updateWhenIdle: true,
      keepBuffer: 2,
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
    this.renderMarkers();

    this.initialized = true;
    setTimeout(() => this.map?.invalidateSize(), 50);
  }

  private renderMarkers(): void {
    if (!this.map) return;

    this.markersLayer.clearLayers();

    // ✅ ВАЖНО: добавляем leaflet-div-icon в className
    const customIcon = L.divIcon({
      className: 'leaflet-div-icon playg-marker-wrapper',
      html: `<div class="playg-marker"></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });

    const list = this.grounds ?? [];

    for (const g of list) {
      const lat = Number(g.geolocation?.lat);
      const lng = Number(g.geolocation?.lng);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(
        this.markersLayer
      );

      marker.bindPopup(this.buildGroundPopup(g));
      marker.on('click', () => this.reverseGeocodeAppend(marker));
    }
  }

  private buildGroundPopup(g: IGround): HTMLElement {
    const el = document.createElement('div');

    const title = document.createElement('b');
    title.textContent = g.name ?? '';
    el.appendChild(title);

    if (g.address) {
      el.appendChild(document.createElement('br'));
      const addr = document.createElement('span');
      addr.textContent = g.address;
      el.appendChild(addr);
    }

    const sports = (g.kindofsport ?? []).filter(Boolean);
    if (sports.length) {
      el.appendChild(document.createElement('br'));
      const small = document.createElement('small');
      small.textContent = sports.join(', ');
      el.appendChild(small);
    }

    return el;
  }

  private reverseGeocodeAppend(marker: L.Marker): void {
    if (!this.map) return;

    const { lat, lng } = marker.getLatLng();
    const key = `${lat.toFixed(6)},${lng.toFixed(6)}`;

    const cached = this.reverseCache.get(key);
    if (cached) {
      this.appendHtmlToPopup(marker, cached);
      return;
    }

    const lang = navigator.language?.split('-')[0] || 'en';

    const nominatimUrl =
      `https://nominatim.openstreetmap.org/reverse` +
      `?lat=${encodeURIComponent(String(lat))}` +
      `&lon=${encodeURIComponent(String(lng))}` +
      `&format=json` +
      `&accept-language=${encodeURIComponent(lang)}`;

    const isWeb = this.platform.is('mobileweb') || this.platform.is('desktop');
    const url = isWeb
      ? `https://api.allorigins.win/get?url=${encodeURIComponent(nominatimUrl)}`
      : nominatimUrl;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        try {
          const json = isWeb ? JSON.parse(data?.contents ?? '{}') : data;
          const address: string =
            json?.display_name || 'Адрес не найден (OSM)';

          const html = `<b>Адрес (OSM):</b><br>${this.escapeHtml(address)}`;
          this.reverseCache.set(key, html);

          this.appendHtmlToPopup(marker, html);
        } catch {
          this.appendHtmlToPopup(
            marker,
            `<b>Адрес (OSM):</b><br>Ошибка парсинга ответа`
          );
        } finally {
          setTimeout(() => this.map?.invalidateSize(), 80);
        }
      },
      error: () => {
        this.appendHtmlToPopup(marker, `<b>Адрес (OSM):</b><br>Ошибка запроса`);
        setTimeout(() => this.map?.invalidateSize(), 80);
      },
    });
  }

  private appendHtmlToPopup(marker: L.Marker, extraHtml: string): void {
    const popup = marker.getPopup();
    const current = popup?.getContent();

    if (current instanceof HTMLElement) {
      const wrapper = document.createElement('div');
      wrapper.appendChild(current.cloneNode(true));

      const hr = document.createElement('hr');
      hr.style.margin = '8px 0';
      wrapper.appendChild(hr);

      const extra = document.createElement('div');
      extra.innerHTML = extraHtml; // extraHtml экранирован
      wrapper.appendChild(extra);

      marker.setPopupContent(wrapper).openPopup();
      return;
    }

    const base = typeof current === 'string' ? current : '';
    marker
      .setPopupContent(
        base ? `${base}<hr style="margin:8px 0"/>${extraHtml}` : extraHtml
      )
      .openPopup();
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
