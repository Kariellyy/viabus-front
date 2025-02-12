"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { LatLng, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Corrigir o ícone do marcador que não carrega por padrão no Next.js
const icon = new Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface StopMapProps {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
  initialPosition?: { lat: number; lng: number };
}

function RecenterMap({
  position,
}: {
  position: { lat: number; lng: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 16);
    }
  }, [map, position]);

  return null;
}

function LocationMarker({
  position,
  onLocationSelect,
}: {
  position: LatLng | null;
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
}) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? (
    <Marker
      position={position}
      icon={icon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          onLocationSelect({ lat: position.lat, lng: position.lng });
        },
      }}
    />
  ) : null;
}

export function StopMap({ onLocationSelect, initialPosition }: StopMapProps) {
  const position = initialPosition || {
    lat: -5.08921,
    lng: -42.8016,
  };

  const [positionState, setPositionState] = useState<LatLng | null>(
    initialPosition
      ? new LatLng(initialPosition.lat, initialPosition.lng)
      : null
  );

  const handleLocationSelect = (coords: { lat: number; lng: number }) => {
    setPositionState(new LatLng(coords.lat, coords.lng));
    onLocationSelect(coords);
  };

  useEffect(() => {
    if (initialPosition) {
      setPositionState(new LatLng(initialPosition.lat, initialPosition.lng));
    }
  }, [initialPosition]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "0.5rem",
        zIndex: 0,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        position={positionState}
        onLocationSelect={handleLocationSelect}
      />
      <RecenterMap position={initialPosition || null} />
    </MapContainer>
  );
}
