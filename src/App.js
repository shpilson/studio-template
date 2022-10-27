import HomepageBanner from "./components/HomepageBanner/HomepageBanner";
import HeaderNavigation from "./components/HeaderNavigation/HeaderNavigation";
import Products from "./components/Products/Products";
import Benefits from "./components/Benefits/Benefits";
import CallMeBanner from "./components/CallMeBanner/CallMeBanner";
import Clients from "./components/Clients/Clients";
import Reviews from "./components/Reviews/Reviews";
import Brief from "./components/Brief/Brief";
import Contacts from "./components/Contacts/Contacts";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="layout">
            <HeaderNavigation/>
            <HomepageBanner/>
            <Products/>
            <Benefits/>
            <CallMeBanner/>
            <Clients/>
            <Reviews/>
            <Brief/>
            <Contacts/>
            <Footer/>
        </div>
    );
}

export default App;
