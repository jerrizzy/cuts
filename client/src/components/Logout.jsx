import React from 'react'

function Logout() {
  const [isLoggedOut, setIsLoggedOut] = useState()

  useEffect(() => {
    fetch('http://127.0.0.1:5555/logout', {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(resp => {
      if (resp.ok) {
        setIsLoggedOut(true)
        // redirect('/')
      } else {
        setIsLoggedOut(false)
      }
    })
  }, [])

  return (
    <div>
      {isLoggedOut ? "Logged out successfully" : "Error logging out"}
    </div>
  )
}

export default Logout;