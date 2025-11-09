import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Salon } from "@/types/salon";

interface MapProps {
  salons: Salon[];
  selectedSalon?: Salon | null;
}

export const Map = ({ salons, selectedSalon }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("mapbox_token") || "";
    setMapboxToken(token);
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [8.6943, 49.4093],
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    salons.forEach((salon) => {
      const marker = new mapboxgl.Marker({ color: "#0d9488" })
        .setLngLat([salon.coordinates.lng, salon.coordinates.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div class="p-2">
              <h3 class="font-semibold">${salon.name}</h3>
              <p class="text-sm text-gray-600">${salon.address}</p>
              <p class="text-sm mt-1">⭐ ${salon.rating} (${salon.reviewCount} reviews)</p>
            </div>`
          )
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [salons, mapboxToken]);

  useEffect(() => {
    if (selectedSalon && map.current) {
      map.current.flyTo({
        center: [selectedSalon.coordinates.lng, selectedSalon.coordinates.lat],
        zoom: 15,
        duration: 2000,
      });
    }
  }, [selectedSalon]);

  if (!mapboxToken) {
    return (
      <div className="w-full h-[500px] rounded-lg border bg-muted flex items-center justify-center">
        <div className="text-center space-y-4 p-6">
          <p className="text-muted-foreground">
            To display the map, please enter your Mapbox access token
          </p>
          <input
            type="text"
            placeholder="Enter Mapbox token"
            className="px-4 py-2 border rounded-md"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const token = (e.target as HTMLInputElement).value;
                localStorage.setItem("mapbox_token", token);
                setMapboxToken(token);
              }
            }}
          />
          <p className="text-sm text-muted-foreground">
            Get your token at{" "}
            <a
              href="https://www.mapbox.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-[500px] rounded-lg shadow-card" />;
};
