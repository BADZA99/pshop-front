import AppSection from "../AppSection"
import AboutUs from "./AboutUs"
import Banner from "./Banner"
import CategoryShowCase from "./CategoryShowCase"
import HomeCategory from "./HomeCategory"
import LocationSprade from "./LocationSprade"
import Register from "./Register"
import Sponsor from "./Sponsor"

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeCategory />
      <CategoryShowCase />
      <Register />
      <LocationSprade />
      <AboutUs />
      <AppSection />
      <Sponsor/>
    </div>
  );
}

export default Home
