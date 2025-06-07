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
import { Search, MapPin, Navigation, Layers, X, ChevronDown, Check, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const createCustomIcon = (color: string, emoji: string = "📍") => {
  return L.divIcon({
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        transform: scale(1.05);
      " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1.05)'">
        ${emoji}
      </div>
    `,
    className: "custom-marker",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

const startIcon = createCustomIcon("#10b981", "A"); // Green
const endIcon = createCustomIcon("#ef4444", "B"); // Red
const searchIcon = createCustomIcon("#3b82f6", "🔍"); // Blue
const currentIcon = createCustomIcon("#8b5cf6", "📍"); // Purple

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
  startCoordinates?: Coordinates | null;
  endCoordinates?: Coordinates | null;
  onClose?: () => void;
  mode?: 'start' | 'end';
}

const tileLayers = [
  {
    name: "Peta Standar",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  {
    name: "Satelit",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
  },
  {
    name: "Topografi",
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
      map.setView([coordinates.lat, coordinates.lng], zoom || 15);
    }
  }, [coordinates, map, zoom]);

  return null;
}

function DraggableMarker({
  position,
  onPositionChange,
  icon,
  label,
  color,
}: {
  position: Coordinates;
  onPositionChange: (lat: number, lng: number) => void;
  icon: L.DivIcon;
  label: string;
  color: string;
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
      <Popup className="custom-popup">
        <div className="text-sm space-y-1">
          <div className="font-bold flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 bg-${color}-500`}></span>
            {label}
          </div>
          <div className="text-xs text-gray-600">
            Latitude: {position.lat.toFixed(6)}
            <br />
            Longitude: {position.lng.toFixed(6)}
          </div>
          <div className="text-xs mt-1 text-gray-500 italic">
            Drag marker untuk mengubah posisi
          </div>
        </div>
      </Popup>
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
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari lokasi di Indonesia..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          onFocus={() => results.length > 0 && setShowResults(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {showResults && (results.length > 0 || isLoading) && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-[500] max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500 text-sm flex items-center justify-center">
              <div className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
              Mencari lokasi...
            </div>
          ) : (
            <>
              <div className="p-2 text-xs text-gray-500 border-b bg-gray-50">
                Hasil pencarian ({results.length})
              </div>
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(result)}
                  className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-start space-x-2"
                >
                  <div className={`flex-shrink-0 ${
                    result.type === 'city' || result.type === 'town' ? 'text-blue-500' : 
                    result.type === 'village' ? 'text-green-500' : 'text-gray-500'
                  }`}>
                    {result.type === 'city' || result.type === 'town' ? (
                      <MapPin className="w-4 h-4 fill-current" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {result.display_name.split(",")[0]}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {result.display_name.split(",").slice(1).join(",").trim()}
                    </div>
                  </div>
                </button>
              ))}
            </>
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
        className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <Layers className="w-4 h-4 text-gray-700" />
        <span className="text-sm font-medium text-gray-700">{currentLayer.name}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-[500] min-w-40">
          {tileLayers.map((layer) => (
            <button
              key={layer.name}
              onClick={() => handleLayerSelect(layer)}
              className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors text-sm ${
                currentLayer.name === layer.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              } ${layer === tileLayers[0] ? 'rounded-t-lg' : ''} ${
                layer === tileLayers[tileLayers.length - 1] ? 'rounded-b-lg' : ''
              }`}
            >
              {layer.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InteractiveMap({
  onCoordinateSelect,
  startCoordinates,
  endCoordinates,
  onClose,
  mode = 'start',
}: InteractiveMapProps) {
  const defaultCenter: Coordinates = { lat: -1.3360, lng: 132.1740 };
  const [selectedPosition, setSelectedPosition] = useState<Coordinates | null>(null);
  const [currentTileLayer, setCurrentTileLayer] = useState(tileLayers[0]);
  const [showAccuracyCircle, setShowAccuracyCircle] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Initialize with start or end coordinates based on mode
  useEffect(() => {
    if (mode === 'start' && startCoordinates) {
      setSelectedPosition(startCoordinates);
    } else if (mode === 'end' && endCoordinates) {
      setSelectedPosition(endCoordinates);
    }
  }, [mode, startCoordinates, endCoordinates]);

  const handleCoordinateSelect = (lat: number, lng: number) => {
    const newPosition = { lat, lng };
    setSelectedPosition(newPosition);
    onCoordinateSelect(lat, lng);
  };

  const handleMarkerDrag = (lat: number, lng: number) => {
    setSelectedPosition({ lat, lng });
    onCoordinateSelect(lat, lng);
  };

  const handleLocationSelect = (lat: number, lng: number, name: string) => {
    const newPosition = { lat, lng };
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
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser ini.");
    }
  };

  const handleConfirmSelection = () => {
    if (selectedPosition) {
      onCoordinateSelect(selectedPosition.lat, selectedPosition.lng);
      if (onClose) onClose();
    }
  };

  // Helper function to check if coordinates are the same
  const isSameCoordinate = (coord1: Coordinates, coord2: Coordinates) => {
    return Math.abs(coord1.lat - coord2.lat) < 0.000001 && Math.abs(coord1.lng - coord2.lng) < 0.000001;
  };

  return (
    <div className="h-full w-full relative flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <h2 className="font-semibold text-lg">
            Pilih Koordinat {mode === 'start' ? 'Awal' : 'Akhir'}
          </h2>
          {selectedPosition && (
            <Badge variant="outline" className="ml-2">
              {selectedPosition.lat.toFixed(6)}, {selectedPosition.lng.toFixed(6)}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHelp(!showHelp)}
            className="text-gray-600"
          >
            <Info className="w-4 h-4 mr-1" />
            Bantuan
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="bg-blue-50 p-4 border-b">
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Cara menggunakan peta:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Klik di peta untuk memilih lokasi</li>
              <li>Gunakan pencarian untuk menemukan alamat</li>
              <li>Drag marker untuk penyesuaian presisi</li>
              <li>Tombol navigasi untuk mendapatkan lokasi saat ini</li>
            </ul>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white px-4 py-2 border-b flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <SearchBox onLocationSelect={handleLocationSelect} />
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <LayerControl onLayerChange={setCurrentTileLayer} />
          <Button
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            className="text-gray-700"
          >
            <Navigation className="w-4 h-4 mr-1" />
            Lokasi Saya
          </Button>
          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedPosition}
            size="sm"
            className="ml-2"
          >
            <Check className="w-4 h-4 mr-1" />
            Konfirmasi
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[
            selectedPosition?.lat || startCoordinates?.lat || endCoordinates?.lat || defaultCenter.lat,
            selectedPosition?.lng || startCoordinates?.lng || endCoordinates?.lng || defaultCenter.lng,
          ]}
          zoom={selectedPosition ? 15 : (startCoordinates || endCoordinates ? 13 : 6)}
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution={currentTileLayer.attribution}
            url={currentTileLayer.url}
          />

          <MapClickHandler onCoordinateSelect={handleCoordinateSelect} />
          <MapViewController coordinates={selectedPosition} zoom={15} />

          {/* FIXED MARKER RENDERING LOGIC */}
          {/* Show start coordinates only if not in start mode or if no selected position */}
          {startCoordinates && mode !== 'start' && (
            <Marker
              position={[startCoordinates.lat, startCoordinates.lng]}
              icon={startIcon}
            >
              <Popup className="custom-popup">
                <div className="text-sm space-y-1">
                  <div className="font-bold flex items-center text-green-600">
                    <span className="w-3 h-3 rounded-full mr-2 bg-green-500"></span>
                    Titik Awal
                  </div>
                  <div className="text-xs text-gray-600">
                    {startCoordinates.lat.toFixed(6)}, {startCoordinates.lng.toFixed(6)}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Show end coordinates only if not in end mode or if no selected position */}
          {endCoordinates && mode !== 'end' && (
            <Marker
              position={[endCoordinates.lat, endCoordinates.lng]}
              icon={endIcon}
            >
              <Popup className="custom-popup">
                <div className="text-sm space-y-1">
                  <div className="font-bold flex items-center text-red-600">
                    <span className="w-3 h-3 rounded-full mr-2 bg-red-500"></span>
                    Titik Akhir
                  </div>
                  <div className="text-xs text-gray-600">
                    {endCoordinates.lat.toFixed(6)}, {endCoordinates.lng.toFixed(6)}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Selected Position Marker - Only show if we have a selected position */}
          {selectedPosition && (
            <DraggableMarker
              position={selectedPosition}
              onPositionChange={handleMarkerDrag}
              icon={mode === 'start' ? startIcon : endIcon}
              label={`Titik ${mode === 'start' ? 'Awal' : 'Akhir'} Terpilih`}
              color={mode === 'start' ? 'green' : 'red'}
            />
          )}

          {/* Accuracy Circle */}
          {showAccuracyCircle && selectedPosition && (
            <Circle
              center={[selectedPosition.lat, selectedPosition.lng]}
              radius={50}
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

      {/* Footer */}
      <div className="bg-white px-4 py-3 border-t text-sm text-gray-600 flex items-center justify-between">
        <div>
          {selectedPosition ? (
            <span>
              Koordinat terpilih: <strong>{selectedPosition.lat.toFixed(6)}, {selectedPosition.lng.toFixed(6)}</strong>
            </span>
          ) : (
            <span>Klik di peta atau gunakan pencarian untuk memilih lokasi</span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              <span className="text-xs">Awal</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              <span className="text-xs">Akhir</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
              <span className="text-xs">Pencarian</span>
            </div>
          </div>
          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedPosition}
            size="sm"
            className="ml-4"
          >
            <Check className="w-4 h-4 mr-1" />
            Gunakan Koordinat Ini
          </Button>
        </div>
      </div>
    </div>
  );
}