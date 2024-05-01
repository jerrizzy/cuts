import { useParams, useOutletContext } from "react-router-dom";
import Reviews from "./Reviews";

function BarberPage() {
  const params = useParams();

  const { barbers, setBarbers } = useOutletContext();

  console.log(barbers)

  const barber = barbers.find(barber => barber.id === parseInt(params.id));
  const reviews = barber.reviews;

  if (!barber){
    return <h1>Loading...</h1>
  }

  return(
      <aside>
        <img src={barber.image} alt='image' />
        <h1>{barber.name}</h1>
        <p>{barber.bio}</p>
        <p>{barber.address}</p>
        <p>{barber.phone}</p>
        <Reviews barber={barber} reviews={reviews} />
        
      </aside>
  );
};

export default BarberPage;