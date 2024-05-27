import AboutUs from "./AboutUs"
import Banner from "./Banner"
import CategoryShowCase from "./CategoryShowCase"
import HomeCategory from "./HomeCategory"
import LocationSprade from "./LocationSprade"
import Register from "./Register"

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeCategory />
      <CategoryShowCase />
      <Register />
      <LocationSprade />
      <AboutUs/>
    </div>
  );
}

export default Home
