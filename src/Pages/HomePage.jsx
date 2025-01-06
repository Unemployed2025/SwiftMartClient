import HomeTrendingGrid from "../Components/Home/HomeTrendingGrid"
import HeroForHomePage from "../Components/Home/HeroForHomePage"
import Footer from "../Components/Layout/Footer"
import Header from "../Components/Layout/Header"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
function HomePage() {
    const navigate = useNavigate();
    const AccessToken = localStorage.getItem('AccessToken')

    useEffect(() => {
        if (!AccessToken) {
            navigate('/')
        }
    }, [AccessToken, navigate])

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