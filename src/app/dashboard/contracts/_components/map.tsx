import { useEffect, useState } from 'react';

const MapComponent: React.FC<{
  koordinatAwal: string | null;
  koordinatAkhir: string | null;
}> = ({ koordinatAwal, koordinatAkhir }) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [L, setL] = useState<typeof import('leaflet') | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    const loadLeaflet = async () => {
      const leaflet = await import('leaflet');
      setL(leaflet.default);
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    };
    loadLeaflet();
  }, []);

  useEffect(() => {
    if (!L || !koordinatAwal || !koordinatAkhir) return;

    const parseCoordinate = (coord: string | null): [number, number] | null => {
      if (!coord) return null;
      const parts = coord.split(',').map(p => parseFloat(p.trim()));
      return parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) ? [parts[0], parts[1]] : null;
    };

    const startCoord = parseCoordinate(koordinatAwal);
    const endCoord = parseCoordinate(koordinatAkhir);

    if (!startCoord || !endCoord) return;

    const mapInstance = L.map('map').setView(startCoord, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    const startIcon = L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div style="
          background-color: #22c55e;
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-weight: bold;
            font-size: 16px;
          ">A</div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const endIcon = L.divIcon({
      className: 'custom-marker-icon',
      html: `
        <div style="
          background-color: #ef4444;
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-weight: bold;
            font-size: 16px;
          ">B</div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const startMarker = L.marker(startCoord, { icon: startIcon }).addTo(mapInstance);
    startMarker.bindPopup('<strong>Titik Awal</strong><br/>Koordinat: ' + koordinatAwal);

    const endMarker = L.marker(endCoord, { icon: endIcon }).addTo(mapInstance);
    endMarker.bindPopup('<strong>Titik Akhir</strong><br/>Koordinat: ' + koordinatAkhir);

    const getRoute = async () => {
      setRouteLoading(true);
      try {
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248YOUR_API_KEY&start=${endCoord[1]},${endCoord[0]}&end=${startCoord[1]},${startCoord[0]}`
        );
        
        if (!response.ok) {
          throw new Error('Route service not available');
        }
        
        const data = await response.json();
        const coordinates = data.features[0].geometry.coordinates;
        
        const routeCoords = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
        
        const polyline = L.polyline(routeCoords, {
          color: '#3b82f6',
          weight: 5,
          opacity: 0.8,
          dashArray: '0',
        }).addTo(mapInstance);
        
        mapInstance.fitBounds(polyline.getBounds(), { padding: [20, 20] });
        
      } catch (error) {
        console.log('Routing service unavailable, using direct line');
        const directLine = L.polyline([startCoord, endCoord], {
          color: '#6b7280',
          weight: 3,
          opacity: 0.6,
          dashArray: '10, 10',
        }).addTo(mapInstance);
        
        const bounds = L.latLngBounds([startCoord, endCoord]);
        mapInstance.fitBounds(bounds, { padding: [50, 50] });
      } finally {
        setRouteLoading(false);
      }
    };

    const getRouteOSRM = async () => {
      setRouteLoading(true);
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${startCoord[1]},${startCoord[0]};${endCoord[1]},${endCoord[0]}?overview=full&geometries=geojson`
        );
        
        if (!response.ok) {
          throw new Error('OSRM service not available');
        }
        
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const coordinates = route.geometry.coordinates;
          
          const routeCoords = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
          
          const polyline = L.polyline(routeCoords, {
            color: '#3b82f6',
            weight: 5,
            opacity: 0.8,
            lineCap: 'round',
            lineJoin: 'round',
          }).addTo(mapInstance);
          
          const distance = (route.distance / 1000).toFixed(1); 
          const duration = Math.round(route.duration / 60); 
          
          const routeInfo = L.popup()
            .setLatLng([(startCoord[0] + endCoord[0]) / 2, (startCoord[1] + endCoord[1]) / 2])
            .setContent(`
              <div style="text-align: center;">
                <strong>Informasi Rute</strong><br/>
                Jarak: ${distance} km<br/>
                Estimasi: ${duration} menit
              </div>
            `);
          
          mapInstance.fitBounds(polyline.getBounds(), { padding: [30, 30] });
          
        } else {
          throw new Error('No route found');
        }
        
      } catch (error) {
        console.log('OSRM routing failed, using direct line');
        const directLine = L.polyline([startCoord, endCoord], {
          color: '#6b7280',
          weight: 3,
          opacity: 0.6,
          dashArray: '10, 10',
        }).addTo(mapInstance);
        
        const distance = mapInstance.distance(startCoord, endCoord) / 1000;
        const directInfo = L.popup()
          .setLatLng([(startCoord[0] + endCoord[0]) / 2, (startCoord[1] + endCoord[1]) / 2])
          .setContent(`
            <div style="text-align: center;">
              <strong>Jarak Langsung</strong><br/>
              ${distance.toFixed(1)} km
            </div>
          `);
        
        const bounds = L.latLngBounds([startCoord, endCoord]);
        mapInstance.fitBounds(bounds, { padding: [50, 50] });
      } finally {
        setRouteLoading(false);
      }
    };

    getRouteOSRM();

    setMap(mapInstance);

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [L, koordinatAwal, koordinatAkhir]);

  if (!koordinatAwal || !koordinatAkhir) {
    return (
      <div className="bg-gray-100 rounded-md p-4 h-64 flex items-center justify-center">
        <p className="text-gray-500">Koordinat tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div id="map" className="h-64 rounded-md z-0"></div>
      {routeLoading && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm z-10">
          Memuat rute...
        </div>
      )}
      <style jsx>{`
        .custom-marker-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default MapComponent;