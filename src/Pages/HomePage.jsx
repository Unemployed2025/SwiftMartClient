import HomeTrendingGrid from "../Components/Home/HomeTrendingGrid"
import HeroForHomePage from "../Components/Home/HeroForHomePage"
import Footer from "../Components/Layout/Footer"
import Header from "../Components/Layout/Header"

function HomePage() {


    return (
        <div className="animate-fadeIn">
            <Header page={"home"} />
            <HeroForHomePage />
            <HomeTrendingGrid />
            <Footer page={"home"} />
        </div>
    )
}

export default HomePage