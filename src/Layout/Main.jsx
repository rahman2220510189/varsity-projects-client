import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../Fixed/NavBar'
import Footer from '../Fixed/Footer'

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup') 
  return (
    <div>
   <div>
     {noHeaderFooter ||   <NavBar></NavBar>}
      <Outlet></Outlet>
     { noHeaderFooter ||  <Footer></Footer>}
   </div>

    </div>
  )
}

export default Main
