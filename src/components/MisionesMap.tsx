import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { municipalities } from '@/lib/mockData';
import 'leaflet/dist/leaflet.css';

export default function MisionesMap() {
  return <MapContainer className="misiones-map" bounds={[[-27.914,-55.896],[-25.599,-54.133]]} boundsOptions={{padding:[20,20]}} scrollWheelZoom={false}>
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {municipalities.map(m => <CircleMarker key={m.name} center={[m.lat,m.lng]} radius={8} pathOptions={{className: 'municipality-marker'}}><Popup><strong>{m.name}</strong><br />{m.count} cooperativas escolares</Popup></CircleMarker>)}
  </MapContainer>;
}