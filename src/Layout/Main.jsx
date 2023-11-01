import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer"

const Main = () => {
    return (
        <div >
            <div className="container mx-auto">
            <NavBar></NavBar>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
    
};

export default Main;