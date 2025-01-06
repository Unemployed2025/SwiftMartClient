import Footer from "../Components/Layout/Footer"
import Header from "../Components/Layout/Header"
import Products from '../Components/AllProductsPage/Products'
function ProductsPage() {
  return (
    <div className="animate-fadeIn">
      <Header page={"product"} />
      <Products />
      <Footer page={"product"} />
    </div>
  )
}

export default ProductsPage