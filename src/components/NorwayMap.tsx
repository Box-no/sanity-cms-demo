"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Office {
  _id: string;
  name: string;
  slug: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  location: { lat: number; lng: number };
  isHeadquarters?: boolean;
}

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const hqIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function NorwayMap({ offices }: { offices: Office[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[500px] w-full rounded-xl bg-gray-100 animate-pulse flex items-center justify-center">
        <p className="text-gray-400">Laster kart…</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[63.4, 10.4]}
      zoom={5}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-xl shadow-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {offices.map((office) => (
        <Marker
          key={office._id}
          position={[office.location.lat, office.location.lng]}
          icon={office.isHeadquarters ? hqIcon : defaultIcon}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-bold text-base mb-1">
                {office.name}
                {office.isHeadquarters && (
                  <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Hovedkontor
                  </span>
                )}
              </h3>
              <p className="text-gray-600 text-sm mb-1">{office.city}</p>
              {office.address && (
                <p className="text-gray-500 text-xs mb-1">{office.address}</p>
              )}
              {office.phone && (
                <p className="text-gray-500 text-xs">📞 {office.phone}</p>
              )}
              {office.email && (
                <p className="text-gray-500 text-xs">✉️ {office.email}</p>
              )}
              {office.description && (
                <p className="text-gray-600 text-sm mt-2">
                  {office.description}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
