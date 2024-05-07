import { useParams, useOutletContext } from "react-router-dom";
import Reviews from "./Reviews";
import QRCode from "qrcode.react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function BarberPage() {
  const params = useParams();

  const { barbers, setBarbers } = useOutletContext();

  console.log(barbers)

  const barber = barbers.find(barber => barber.id === parseInt(params.id));
  // const reviews = barber.reviews;
  const reviews = barber ? barber.reviews : []; // Add null check here

  const averageRating = Math.ceil(reviews.reduce((acc, review) => {
    return acc + review.rating;
}, 0) / reviews.length); // get average rating

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

        <div>
        <Box
          sx={{
              '& > legend': { mt: 2 },
          }}>
          <Typography component="legend">{reviews.length} (reviews)</Typography>
          <Rating name="read-only" value={averageRating} readOnly />
      </Box>
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