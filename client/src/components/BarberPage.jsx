import { useParams, useOutletContext } from "react-router-dom";
import Reviews from "./Reviews";
import QRCode from "qrcode.react";

function BarberPage() {
  const params = useParams();

  const { barbers, setBarbers } = useOutletContext();

  console.log(barbers)

  const barber = barbers.find(barber => barber.id === parseInt(params.id));
  const reviews = barber.reviews;

  if (!barber){
    return <h1>Loading...</h1>
  }

  console.log(window.location.href);

  return(
    <div className="barber-detail-page">
      <aside>
        <img src={barber.image} alt='image' />

        <div className="qrcode" >
          <QRCode value={window.location.href} size={256}
    style={{ height: "auto", maxWidth: "40%", width: "20%" }}
    viewBox={`0 0 256 256`} />
    
        </div>
        <h1>{barber.name}</h1>
        <p>{barber.bio}</p>
        <p>{barber.website}</p>
        <p>{barber.street}</p>
        <p>{barber.city} {barber.state}, {barber.zip_code}</p>
        <p>{barber.phone}</p>
        <Reviews barber={barber} reviews={reviews} />
      </aside>
      </div>
  );
};

export default BarberPage;