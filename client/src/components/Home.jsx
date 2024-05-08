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
    navigate(`/barbers?search=${search}`);
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
          <input
            type="submit"
            value="Search for barbers"
            className="submit"
          />
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