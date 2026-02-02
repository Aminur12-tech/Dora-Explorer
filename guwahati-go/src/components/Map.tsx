
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

interface MapProps {
    center?: [number, number];
    zoom?: number;
    markers?: Array<{
        position: [number, number];
        title: string;
    }>;
}

export const MapComponent = ({
    center = [26.1445, 91.7362],
    zoom = 13,
    markers = [
        { position: [26.1445, 91.7362], title: "Guwahati City Center" },
        { position: [26.1667, 91.7167], title: "Kamakhya Temple" }
    ]
}: MapProps) => {

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
            className="w-full h-full min-h-[300px] z-0"
            style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, index) => (
                <Marker key={index} position={marker.position} icon={defaultIcon}>
                    <Popup>
                        {marker.title}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
