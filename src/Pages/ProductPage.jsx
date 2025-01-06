import { useLocation } from "react-router-dom";

import CardGridReview from '../Components/ProductShowPage/CardGridReview'
import PageNewsletter from '../Components/ProductShowPage/PageNewsletter'
import PageProduct from '../Components/ProductShowPage/PageProduct'
import Header from '../Components/Layout/Header'
import Footer from '../Components/Layout/Footer'
function ProductPage() {
    const location = useLocation();
    const furnitureid = location.state?.furnitureid;

    return (
        <div className="animate-fadeIn">
            <Header page={"product"}/>
            <PageProduct furnitureid={furnitureid} />
            <CardGridReview furnitureid={furnitureid}/>
            <PageNewsletter/>
            <Footer page={"product"}/>
        </div>
    );
}

export default ProductPage;
