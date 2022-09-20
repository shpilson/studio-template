import HomepageBanner from "./components/HomepageBanner/HomepageBanner";
import HeaderNavigation from "./components/HeaderNavigation/HeaderNavigation";
import Products from "./components/Products/Products";
import Benefits from "./components/Benefits/Benefits";
import CallMeBanner from "./components/CallMeBanner/CallMeBanner";
import Clients from "./components/Clients/Clients";
import Reviews from "./components/Reviews/Reviews";

function App() {
    return (
        <div className="layout">
            <HeaderNavigation/>
            <HomepageBanner/>
            <Products/>
            <Benefits/>
            <CallMeBanner/>
            <Clients/>
            <Reviews />
        </div>
    );
}

export default App;
