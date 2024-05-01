import BarberCard from "./BarberCard";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function BarbersList() {
    const { barbers, setBarbers } = useOutletContext();
    const [search, setSearch] = useState("");

    const filteredBarbers = barbers.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase())
  );

    return (
        <div>
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