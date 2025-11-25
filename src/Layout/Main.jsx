import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../Fixed/NavBar'
import Footer from '../Fixed/Footer'

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || 
                          location.pathname.includes('signup') || 
                          location.pathname.includes('forgot-password')
    
    return (
        <div>
            {!noHeaderFooter && <NavBar />}
            <Outlet />
            {!noHeaderFooter && <Footer />}
        </div>
    )
}

export default Main
