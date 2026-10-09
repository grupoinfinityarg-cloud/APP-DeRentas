import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Vehicle } from '../types/fleet';
import { FLEET_VEHICLES } from '../data/mockData';
import { 
  Layers, 
  Crosshair, 
  Maximize2, 
  Minimize2, 
  Navigation2, 
  ShieldAlert,
  Play,
  Pause
} from 'lucide-react';

interface InteractiveMapProps {
  activeVehicle: Vehicle;
  onSelectVehicle: (plate: string) => void;
  className?: string;
}

// Buenos Aires realistic coordinates for the fleet
const VEHICLE_COORDS: Record<string, { lat: number; lng: number; name: string; model: string }> = {
  'AF 492 KZ': { lat: -34.5512, lng: -58.4533, name: 'Marcos Gómez', model: 'Chevrolet Onix' },
  'AG 118 PL': { lat: -34.5680, lng: -58.4720, name: 'Santiago Russo', model: 'Fiat Cronos' },
  'AE 884 PO': { lat: -34.5830, lng: -58.4200, name: 'Florencia Rivas', model: 'Fiat Cronos' },
  'AD 771 QP': { lat: -34.5960, lng: -58.3820, name: 'Esteban Morales', model: 'Toyota Etios' },
  'AF 342 PK': { lat: -34.5420, lng: -58.4890, name: 'Lucas Herrera', model: 'Fiat Cronos' },
};

// Geofence polygon around CABA / AMBA
const GEOFENCE_POLYGON: [number, number][] = [
  [-34.5150, -58.4900], // Vicente López / Gral Paz
  [-34.5300, -58.4400], // Costanera Norte
  [-34.5800, -58.3700], // Retiro / Puerto Madero
  [-34.6400, -58.3550], // La Boca / Riachuelo
  [-34.6800, -58.4600], // Puente La Noria
  [-34.6500, -58.5300], // Liniers
  [-34.5800, -58.5200], // San Martín / Gral Paz
  [-34.5300, -58.5100], // Panamericana
];

// Restricted / Warning zone (Fuera de zona)
const RESTRICTED_ZONE_CENTER: [number, number] = [-34.5200, -58.5350];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  activeVehicle,
  onSelectVehicle,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const activeMarkerRef = useRef<L.Marker | null>(null);
  const pathPolylineRef = useRef<L.Polyline | null>(null);

  const [mapLayer, setMapLayer] = useState<'streets' | 'satellite'>('streets');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(true);
  const [currentPos, setCurrentPos] = useState({ lat: -34.5512, lng: -58.4533 });

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [-34.5580, -58.4450],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      // Add zoom control in top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Attribution
      L.control.attribution({ position: 'bottomright', prefix: false })
        .addAttribution('&copy; OpenStreetMap &copy; CartoDB')
        .addTo(map);

      // Default base tile layer (CartoDB Voyager - high contrast, clean urban)
      const streetLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          subdomains: 'abcd',
        }
      );
      streetLayer.addTo(map);

      // Add Geofence polygon (AMBA boundary in golden amber)
      const geofence = L.polygon(GEOFENCE_POLYGON, {
        color: '#d97706',
        weight: 3,
        dashArray: '8, 6',
        fillColor: '#fef08a',
        fillOpacity: 0.12,
      }).addTo(map);

      geofence.bindTooltip('<b>Geocerca Activa: CABA / AMBA</b><br/>Zona Operativa Autorizada', {
        permanent: false,
        direction: 'center',
        className: 'bg-white text-xs font-bold text-slate-900 px-2 py-1 rounded shadow-md border border-amber-300',
      });

      // Add Restricted Alert Zone Circle (Fuera de Zona)
      const restrictedCircle = L.circle(RESTRICTED_ZONE_CENTER, {
        radius: 1200,
        color: '#dc2626',
        weight: 2,
        dashArray: '5, 5',
        fillColor: '#fee2e2',
        fillOpacity: 0.35,
      }).addTo(map);

      restrictedCircle.bindTooltip('<b>⚠ ZONA RESTRINGIDA</b><br/>Alerta de salida perimetral', {
        permanent: false,
        direction: 'top',
        className: 'bg-red-50 text-xs font-bold text-red-700 px-2 py-1 rounded shadow-md border border-red-300',
      });

      // Breadcrumb history trail for active vehicle
      const pathTrail = L.polyline([
        [-34.5420, -58.4680],
        [-34.5460, -58.4610],
        [-34.5490, -58.4560],
        [-34.5512, -58.4533],
      ], {
        color: '#0f172a',
        weight: 4,
        dashArray: '4, 4',
        opacity: 0.8,
      }).addTo(map);
      pathPolylineRef.current = pathTrail;

      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tile layer on switch (streets vs satellite)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (mapLayer === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
      }).addTo(map);
    } else {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);
    }
  }, [mapLayer]);

  // Render or update vehicle markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Add markers for all fleet vehicles
    Object.entries(VEHICLE_COORDS).forEach(([plate, data]) => {
      const isActive = plate === activeVehicle.plate;
      const coords: [number, number] = isActive
        ? [currentPos.lat, currentPos.lng]
        : [data.lat, data.lng];

      // Custom HTML Marker matching Argentine Plate look
      const customIcon = L.divIcon({
        className: 'custom-fleet-marker',
        html: `
          <div class="relative flex flex-col items-center cursor-pointer select-none">
            ${
              isActive
                ? `<div class="absolute -top-3 w-10 h-10 rounded-full bg-amber-400/40 animate-ping"></div>`
                : ''
            }
            <div class="w-8 h-8 rounded-full ${
              isActive ? 'bg-[#0F172A] border-2 border-[#F6C300]' : 'bg-white border-2 border-slate-700'
            } flex items-center justify-center shadow-lg transition-transform hover:scale-110">
              <span class="text-sm">${isActive ? '🚘' : '🚗'}</span>
            </div>
            <div class="mt-1 bg-white border ${
              isActive ? 'border-2 border-slate-950 font-black' : 'border-slate-300 font-bold'
            } rounded-md px-1.5 py-0.2 text-[10px] shadow-sm whitespace-nowrap text-slate-900 font-mono tracking-tight">
              ${plate}
            </div>
          </div>
        `,
        iconSize: [60, 48],
        iconAnchor: [30, 24],
      });

      if (markersRef.current[plate]) {
        markersRef.current[plate].setLatLng(coords);
        markersRef.current[plate].setIcon(customIcon);
      } else {
        const marker = L.marker(coords, { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          onSelectVehicle(plate);
          map.panTo(coords, { animate: true, duration: 0.6 });
        });

        // Popup with vehicle details
        marker.bindPopup(`
          <div class="p-2 min-w-[180px] font-sans">
            <div class="flex items-center justify-between pb-1 border-b border-slate-200">
              <strong class="text-xs text-slate-900">${data.name}</strong>
              <span class="text-[10px] font-mono bg-slate-100 px-1 py-0.5 rounded font-bold">${plate}</span>
            </div>
            <p class="text-[11px] text-slate-600 mt-1">${data.model}</p>
            <div class="flex justify-between items-center text-[10px] text-slate-500 mt-1">
              <span>Velocidad: <b>${isActive ? activeVehicle.speed : 38} km/h</b></span>
              <span class="text-emerald-700 font-bold">● En Línea</span>
            </div>
          </div>
        `, { className: 'rounded-xl overflow-hidden' });

        markersRef.current[plate] = marker;
      }

      if (isActive) {
        activeMarkerRef.current = markersRef.current[plate];
      }
    });
  }, [activeVehicle.plate, currentPos, activeVehicle.speed, onSelectVehicle]);

  // Simulate real GPS movement along Av. Libertador
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setCurrentPos((prev) => {
        // Small step along diagonal northwest/southeast (Av. Libertador direction)
        const latDelta = (Math.random() - 0.48) * 0.0003;
        const lngDelta = (Math.random() - 0.48) * 0.0003;
        const nextLat = prev.lat + latDelta;
        const nextLng = prev.lng + lngDelta;

        // Update trail polyline
        if (pathPolylineRef.current) {
          const latlngs = pathPolylineRef.current.getLatLngs() as L.LatLng[];
          latlngs.push(L.latLng(nextLat, nextLng));
          if (latlngs.length > 25) latlngs.shift();
          pathPolylineRef.current.setLatLngs(latlngs);
        }

        return { lat: nextLat, lng: nextLng };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Recenter map on active vehicle
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([currentPos.lat, currentPos.lng], 14, {
        animate: true,
      });
    }
  };

  return (
    <div className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-300 shadow-sm bg-slate-100 ${className} ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : 'aspect-4/3 sm:aspect-16/9'
    }`}>
      {/* Map Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        {/* Geofence Active Indicator */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-md flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-900">GPS Dinámico</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-medium hidden sm:inline">CABA / AMBA</span>
          <span className="text-amber-800 font-bold bg-amber-100 text-[10px] px-1.5 py-0.2 rounded-full border border-amber-300">
            En Línea
          </span>
        </div>

        {/* Map Tool buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          {/* Layer switcher */}
          <button
            type="button"
            onClick={() => setMapLayer(mapLayer === 'streets' ? 'satellite' : 'streets')}
            className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
            title={mapLayer === 'streets' ? 'Ver vista Satelital' : 'Ver mapa de Calles'}
          >
            <Layers className="w-4 h-4 text-slate-700" />
          </button>

          {/* Simulation Toggle */}
          <button
            type="button"
            onClick={() => setIsSimulating(!isSimulating)}
            className={`w-9 h-9 rounded-xl shadow-md border flex items-center justify-center transition-all active:scale-95 ${
              isSimulating
                ? 'bg-[#F6C300] text-slate-950 border-amber-400 font-bold'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
            title={isSimulating ? 'Pausar simulación de movimiento GPS' : 'Reanudar movimiento GPS'}
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Recenter button */}
          <button
            type="button"
            onClick={handleRecenter}
            className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
            title="Centrar en vehículo activo"
          >
            <Crosshair className="w-4 h-4 text-amber-600" />
          </button>

          {/* Fullscreen button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
            title="Pantalla completa del mapa"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Floating Legend / Coordinates */}
      <div className="absolute bottom-3 left-3 pointer-events-auto z-10 flex items-center gap-1.5 flex-wrap">
        <div className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-lg border border-slate-800 shadow">
          LAT: {currentPos.lat.toFixed(4)} • LNG: {currentPos.lng.toFixed(4)}
        </div>
        <div className="bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2 py-1 rounded-lg shadow hidden sm:flex items-center gap-1">
          <Navigation2 className="w-3 h-3" />
          <span>Av. Libertador • Rumbo Norte</span>
        </div>
      </div>
    </div>
  );
};
