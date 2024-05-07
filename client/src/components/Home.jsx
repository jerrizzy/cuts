import { React, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Search from './Search'

function Home() {
  const [search, setSearch] = useState("")

  const { barbers, setBarbers } = useOutletContext()

  const filteredBarbers = barbers.filter((barber) =>
    barber.name.toLowerCase().includes(search.toLowerCase())
  )

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  return (
    <div className="banner">
      <h1 >Discover your favorite barber.</h1>

      <div className="form">
        <form onSubmit={handleSearch} className="new-destination-form" />
            <input onChange={(e) => {setBarbers(e.target.value);}} value= {barbers} type="text" name="barbers" placeholder="Search for your barber..."className="input-text"></input>
            <input type="submit" name= "submit" value= "Search for barbers" className="submit"></input>
          <form/>
        </div> 

    <div>    
      <h3>Real people, real reviews.</h3>
      </div>  
      
      </div>

      
  )
}

export default Home