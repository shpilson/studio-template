import HomepageBanner from "./components/HomepageBanner/HomepageBanner";
import HeaderNavigation from "./components/HeaderNavigation/HeaderNavigation";
import Products from "./components/Products/Products";
import Benefits from "./components/Benefits/Benefits";
import CallMeBanner from "./components/CallMeBanner/CallMeBanner";
import Clients from "./components/Clients/Clients";

function App() {
    return (
        <div className="layout">
            <HeaderNavigation/>
            <HomepageBanner/>
            <Products/>
            <Benefits/>
            <CallMeBanner/>
            <Clients/>
        </div>
    );
}

export default App;
