import HomepageBanner from "./components/HomepageBanner/HomepageBanner";
import HeaderNavigation from "./components/HeaderNavigation/HeaderNavigation";
import Products from "./components/Products/Products";

function App() {
  return (
    <div className="layout">
      <HeaderNavigation />
      <HomepageBanner />
      <Products />
    </div>
  );
}

export default App;
