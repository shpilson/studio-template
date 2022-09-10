import HomepageBanner from "./components/HomepageBanner/HomepageBanner";
import HeaderNavigation from "./components/HeaderNavigation/HeaderNavigation";
import Products from "./components/Products/Products";
import Benefits from "./components/Benefits/Benefits";

function App() {
    return (
        <div className="layout">
            <HeaderNavigation/>
            <HomepageBanner/>
            <Products/>
            <Benefits/>
        </div>
    );
}

export default App;
