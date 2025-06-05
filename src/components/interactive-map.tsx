"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Popup,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, Navigation, Layers, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const createCustomIcon = (color: string, emoji: string = "📍") => {
  return L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, ${color}, ${color}dd);
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        ${emoji}
      </div>
    `,
    className: "custom-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const startIcon = createCustomIcon("#10b981", "🎯"); // Green
const endIcon = createCustomIcon("#ef4444", "🏁"); // Red
const otherIcon = createCustomIcon("#6b7280", "📍"); // Gray
const searchIcon = createCustomIcon("#3b82f6", "🔍"); // Blue

interface Coordinates {
  lat: number;
  lng: number;
}

interface SearchResult {
  lat: number;
  lng: number;
  display_name: string;
  type: string;
}

interface InteractiveMapProps {
  onCoordinateSelect: (lat: number, lng: number) => void;
  initialCoordinates?: Coordinates | null;
  otherCoordinates?: Coordinates | null;
}

const tileLayers = [
  {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
  },
  {
    name: "Terrain",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://opentopomap.org/">OpenTopoMap</a>'
  }
];

function MapClickHandler({ onCoordinateSelect }: { onCoordinateSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onCoordinateSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapViewController({ coordinates, zoom }: { coordinates?: Coordinates | null; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lng], zoom || 13);
    }
  }, [coordinates, map, zoom]);

  return null;
}

function DraggableMarker({
  position,
  onPositionChange,
  icon,
  label,
}: {
  position: Coordinates;
  onPositionChange: (lat: number, lng: number) => void;
  icon: L.DivIcon;
  label?: string;
}) {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const position = marker.getLatLng();
        onPositionChange(position.lat, position.lng);
      }
    },
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={[position.lat, position.lng]}
      ref={markerRef}
      icon={icon}
    >
      {label && (
        <Popup>
          <div className="text-sm">
            <strong>{label}</strong>
            <br />
            Koordinat: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            <br />
            <em>Drag untuk mengubah posisi</em>
          </div>
        </Popup>
      )}
    </Marker>
  );
}

function SearchBox({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number, name: string) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchLocation = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=id`
      );
      const data = await response.json();
      setResults(data.map((item: any) => ({
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        display_name: item.display_name,
        type: item.type
      })));
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        searchLocation(query);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, searchLocation]);

  const handleLocationSelect = (result: SearchResult) => {
    onLocationSelect(result.lat, result.lng, result.display_name);
    setShowResults(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari lokasi di Indonesia..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {showResults && (results.length > 0 || isLoading) && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">
              <div className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
              Mencari...
            </div>
          ) : (
            results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(result)}
                className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-start space-x-2"
              >
                <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {result.display_name.split(",")[0]}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {result.display_name}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function LayerControl({ onLayerChange }: { onLayerChange: (layer: typeof tileLayers[0]) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(tileLayers[0]);

  const handleLayerSelect = (layer: typeof tileLayers[0]) => {
    setCurrentLayer(layer);
    onLayerChange(layer);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50"
      >
        <Layers className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLayer.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-32">
          {tileLayers.map((layer) => (
            <button
              key={layer.name}
              onClick={() => handleLayerSelect(layer)}
              className={`w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                currentLayer.name === layer.name ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <div className="text-sm font-medium">{layer.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InteractiveMap({
  onCoordinateSelect,
  initialCoordinates,
  otherCoordinates,
}: InteractiveMapProps) {
  const defaultCenter: Coordinates = { lat: -2.5, lng: 118.0 };
  const [selectedPosition, setSelectedPosition] = useState<Coordinates | null>(
    initialCoordinates || null
  );
  const [searchResult, setSearchResult] = useState<Coordinates | null>(null);
  const [currentTileLayer, setCurrentTileLayer] = useState(tileLayers[0]);
  const [showAccuracyCircle, setShowAccuracyCircle] = useState(false);

  const handleCoordinateSelect = (lat: number, lng: number) => {
    const newPosition = { lat, lng };
    setSelectedPosition(newPosition);
    setSearchResult(null);
    onCoordinateSelect(lat, lng);
  };

  const handleMarkerDrag = (lat: number, lng: number) => {
    setSelectedPosition({ lat, lng });
    onCoordinateSelect(lat, lng);
  };

  const handleLocationSelect = (lat: number, lng: number, name: string) => {
    const newPosition = { lat, lng };
    setSearchResult(newPosition);
    setSelectedPosition(newPosition);
    onCoordinateSelect(lat, lng);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleCoordinateSelect(latitude, longitude);
          setShowAccuracyCircle(true);
          setTimeout(() => setShowAccuracyCircle(false), 5000);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Tidak dapat mengakses lokasi saat ini. Pastikan izin lokasi telah diberikan.");
        }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser ini.");
    }
  };

  return (
    <div className="h-full w-full relative">
      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-[1000] space-y-3">
        {/* Search Box */}
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200" style={{ width: '300px' }}>
          <SearchBox onLocationSelect={handleLocationSelect} />
        </div>
        
        {/* Info Panel */}
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <div className="text-sm space-y-2">
            <div className="font-semibold text-gray-700">Kontrol Peta:</div>
            <div className="space-y-1">
              <div className="text-xs text-gray-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Klik untuk memilih lokasi
              </div>
              <div className="text-xs text-gray-600 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Drag marker untuk mengatur
              </div>
              <div className="text-xs text-gray-600 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Gunakan pencarian lokasi
              </div>
            </div>
            
            {selectedPosition && (
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-700 mb-1">Koordinat Terpilih:</div>
                <div className="text-xs font-mono bg-gray-100 p-2 rounded border">
                  Lat: {selectedPosition.lat.toFixed(6)}<br />
                  Lng: {selectedPosition.lng.toFixed(6)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="absolute top-4 right-4 z-[1000] space-y-2">
        <LayerControl onLayerChange={setCurrentTileLayer} />
        <button
          onClick={getCurrentLocation}
          className="flex items-center justify-center bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50"
          title="Dapatkan lokasi saat ini"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      <MapContainer
        center={[
          initialCoordinates?.lat || defaultCenter.lat,
          initialCoordinates?.lng || defaultCenter.lng,
        ]}
        zoom={initialCoordinates ? 13 : 6}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution={currentTileLayer.attribution}
          url={currentTileLayer.url}
        />

        <MapClickHandler onCoordinateSelect={handleCoordinateSelect} />
        <MapViewController coordinates={selectedPosition} zoom={selectedPosition ? 15 : undefined} />

        {/* Marker yang sedang dipilih */}
        {selectedPosition && (
          <DraggableMarker
            position={selectedPosition}
            onPositionChange={handleMarkerDrag}
            icon={startIcon}
            label="Lokasi Terpilih"
          />
        )}

        {/* Marker hasil pencarian */}
        {searchResult && searchResult !== selectedPosition && (
          <Marker
            position={[searchResult.lat, searchResult.lng]}
            icon={searchIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong>Hasil Pencarian</strong>
                <br />
                Koordinat: {searchResult.lat.toFixed(6)}, {searchResult.lng.toFixed(6)}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marker lainnya */}
        {/* {otherCoordinates && (
          <Marker
            position={[otherCoordinates.lat, otherCoordinates.lng]}
            icon={otherIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong>Lokasi Lain</strong>
                <br />
                Koordinat: {otherCoordinates.lat.toFixed(6)}, {otherCoordinates.lng.toFixed(6)}
              </div>
            </Popup>
          </Marker>
        )} */}

        {/* Circle untuk akurasi lokasi */}
        {showAccuracyCircle && selectedPosition && (
          <Circle
            center={[selectedPosition.lat, selectedPosition.lng]}
            radius={100}
            pathOptions={{
              fillColor: '#3b82f6',
              fillOpacity: 0.1,
              color: '#3b82f6',
              weight: 2,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}