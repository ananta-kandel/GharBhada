import React from 'react'
import Navbar from './Navbar'
const Layout = ({children}) => {
  return (
    <>
    <Navbar />
     {children}
     <footer className="bg-secondary text-white mt-0 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Gharbhada. All rights reserved.</p>
        </div>
      </footer>
    </>
    
  )
}

export default Layout