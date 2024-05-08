import BarberCard from "./BarberCard";
import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from '@vis.gl/react-google-maps';

function BarbersList() {
    const { barbers, setBarbers } = useOutletContext();
    const [search, setSearch] = useState("");
    const { search: params } = useParams();

    console.log("these are my barbers before attempting to use params to grab a specific barber")
    console.log(barbers)
    
    // TODO: Fix single-barber extraction script.
    // NOTE: Probably broken due to use of `params`.
    const barber = barbers.find(barber => barber.params === barber.params);
    console.log("this is my barber:")
    console.log(barber)

    const filteredBarbers = barbers.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase())
  );

    const positions = [
        {lat: 40.790294, lng: -73.946481},
        {lat: 40.6892494, lng: -74.0445004},
        {lat: 40.7484405, lng: -73.9882447},
    ]

    return (<>
            <input
                type="text"
                placeholder="Search barbers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        <div className="barber-list-container">



            <ul className="barber-list">
                {barbers && filteredBarbers.map(barber => <li> <BarberCard key={barber.id} barber={barber} /> </li>)}
            </ul>

    <div className="map" style={{width: '50vw', height: '20vh'}}>

        <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
            <Map
            defaultCenter={positions[0]}
            defaultZoom={10}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={import.meta.env.VITE_API_MAP_ID}>

            <AdvancedMarker 
            position={positions[1]} >
            </AdvancedMarker>

            <AdvancedMarker s
            position={positions[2]} >
            </AdvancedMarker>

            </Map>
        </APIProvider>
        </div>
        </div>
        </>
    )}

export default BarbersList;