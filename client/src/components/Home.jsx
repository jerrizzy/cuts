import { React, useState } from 'react'
import { useOutletContext, useNavigate  } from 'react-router-dom'
// import Search from './Search'

function Home() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const { barbers, setBarbers } = useOutletContext()

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Navigate to the barber card page with the search query as a parameter
    // the search query is not passing to the barber card page as a query parameter
    navigate(`/barbers?search=${search}/name`);
  };

  const filteredBarbers = barbers.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="banner">
      <h1>Discover your favorite barber.</h1>
      <form onSubmit={handleSearchSubmit} className="search">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for your barber..."
            className="input-text"
          />
          <button kind="BUTTON/FLAT_SECONDARY" aria-label="Find Restaurants" type="button" class="styles__ButtonRoot-sc-1nqx07s-0 hje"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="styles__StyledInlineSvg-sc-1hetb2e-0 eCVqVv fetched-icon"><path d="M12.2929 17.2929C11.9024 17.6834 11.9024 18.3166 12.2929 18.7071C12.6834 19.0976 13.3166 19.0976 13.7071 18.7071L19.1578 13.2564C19.242 13.1722 19.3427 13.0717 19.4241 12.9758C19.5183 12.8648 19.6439 12.6962 19.7195 12.4635C19.8174 12.1623 19.8174 11.8377 19.7195 11.5365C19.6439 11.3038 19.5183 11.1352 19.4241 11.0242C19.3427 10.9283 19.242 10.8278 19.1578 10.7436L13.7071 5.29289C13.3166 4.90237 12.6834 4.90237 12.2929 5.29289C11.9024 5.68342 11.9024 6.31658 12.2929 6.70711L16.5858 11L5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44771 13 5 13L16.5858 13L12.2929 17.2929Z" fill="currentColor"></path></svg></button>
        </form>
      <div className="search-container">
        
      </div> 

    <div>    
      <h3>Real people, real reviews.</h3>
      </div>  
      
      </div>

      
  )
}

export default Home