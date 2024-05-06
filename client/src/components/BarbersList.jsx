import BarberCard from "./BarberCard";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from '@vis.gl/react-google-maps';

function BarbersList() {
    const { barbers, setBarbers } = useOutletContext();
    const [search, setSearch] = useState("");

    const filteredBarbers = barbers.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase())
  );

    const position = {lat: 40.790294, lng: -73.946481}

    return (
        <div className="barber-list-containter">

        <div className="map" style={{width: '20vw', height: '90vh'}}>

        <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
            <Map
            defaultCenter={position}
            defaultZoom={10}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={import.meta.env.VITE_API_MAP_ID}>

            <AdvancedMarker 
            position={position}>
            </AdvancedMarker>

            </Map>
        </APIProvider>
        </div>

            <input
                type="text"
                placeholder="Search barbers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul className="barber-list">
                {barbers && filteredBarbers.map(barber => <li> <BarberCard key={barber.id} barber={barber} /> </li>)}
            </ul>

        </div>
    )}

export default BarbersList;