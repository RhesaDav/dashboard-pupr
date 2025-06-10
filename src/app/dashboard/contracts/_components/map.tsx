import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { LatLngBounds, LatLngTuple, divIcon } from 'leaflet';

// Component to handle map bounds and routing
const MapController: React.FC<{
  startCoord: LatLngTuple;
  endCoord: LatLngTuple;
  onRouteLoading: (loading: boolean) => void;
}> = ({ startCoord, endCoord, onRouteLoading }) => {
  const map = useMap();
  const [routeCoords, setRouteCoords] = useState<LatLngTuple[]>([]);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);

  useEffect(() => {
    const getRouteOSRM = async () => {
      onRouteLoading(true);
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${startCoord[1]},${startCoord[0]};${endCoord[1]},${endCoord[0]}?overview=full&geometries=geojson`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`OSRM service error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          const coordinates = route.geometry.coordinates;
          
          const routeLatLngs: LatLngTuple[] = coordinates.map((coord: number[]) => [coord[1], coord[0]]);
          setRouteCoords(routeLatLngs);
          
          const distance = (route.distance / 1000).toFixed(1); 
          const duration = Math.round(route.duration / 60); 
          setRouteInfo({ distance, duration: duration.toString() });
          
          // Fit bounds to show the entire route
          const bounds = new LatLngBounds([startCoord, endCoord, ...routeLatLngs]);
          map.fitBounds(bounds, { padding: [30, 30] });
          
        } else {
          throw new Error('No route found');
        }
        
      } catch (error) {
        console.log('OSRM routing failed, using direct line:', error);
        // Fallback to direct line
        setRouteCoords([startCoord, endCoord]);
        
        const distance = map.distance(startCoord, endCoord) / 1000;
        setRouteInfo({ distance: distance.toFixed(1), duration: 'N/A' });
        
        // Fit bounds to show both points
        const bounds = new LatLngBounds([startCoord, endCoord]);
        map.fitBounds(bounds, { padding: [50, 50] });
      } finally {
        onRouteLoading(false);
      }
    };

    getRouteOSRM();
  }, [startCoord, endCoord, map]);

  return (
    <>
      {routeCoords.length > 0 && (
        <Polyline
          positions={routeCoords}
          pathOptions={{
            color: routeCoords.length === 2 ? '#6b7280' : '#3b82f6',
            weight: routeCoords.length === 2 ? 3 : 5,
            opacity: routeCoords.length === 2 ? 0.6 : 0.8,
            dashArray: routeCoords.length === 2 ? '10, 10' : undefined,
          }}
        />
      )}
    </>
  );
};

const MapComponent: React.FC<{
  koordinatAwal: string | null;
  koordinatAkhir: string | null;
}> = ({ koordinatAwal, koordinatAkhir }) => {
  const [routeLoading, setRouteLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const parseCoordinate = (coord: string | null): LatLngTuple | null => {
    if (!coord) return null;
    const parts = coord.split(',').map(p => parseFloat(p.trim()));
    return parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) ? [parts[0], parts[1]] : null;
  };

  const startCoord = parseCoordinate(koordinatAwal);
  const endCoord = parseCoordinate(koordinatAkhir);

  if (!startCoord || !endCoord) {
    return (
      <div className="bg-gray-100 rounded-md p-4 h-64 flex items-center justify-center">
        <p className="text-gray-500">Koordinat tidak tersedia</p>
      </div>
    );
  }

  // Custom icons
  const startIcon = divIcon({
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

  const endIcon = divIcon({
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

  // Calculate center point and zoom level
  const centerLat = (startCoord[0] + endCoord[0]) / 2;
  const centerLng = (startCoord[1] + endCoord[1]) / 2;
  const center: LatLngTuple = [centerLat, centerLng];

  return (
    <div className="relative">
      <div className="h-64 rounded-md overflow-hidden">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <Marker position={startCoord} icon={startIcon}>
            <Popup>
              <strong>Titik Awal</strong><br/>
              Koordinat: {koordinatAwal}
            </Popup>
          </Marker>
          
          <Marker position={endCoord} icon={endIcon}>
            <Popup>
              <strong>Titik Akhir</strong><br/>
              Koordinat: {koordinatAkhir}
            </Popup>
          </Marker>

          <MapController
            startCoord={startCoord}
            endCoord={endCoord}
            onRouteLoading={setRouteLoading}
          />
        </MapContainer>
      </div>
      
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
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
};

export default MapComponent;