import { Outlet } from 'react-router-dom'
import NavBar from '../Fixed/NavBar'
import Footer from '../Fixed/Footer'

const Main = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>

    </div>
  )
}

export default Main
