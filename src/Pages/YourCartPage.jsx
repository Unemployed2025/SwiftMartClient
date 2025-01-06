import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, removefromcart } from '../api/cartRoutes'
// import { getFurnitureById } from '../api/furnitureRoutes'
import Footer from '../Components/Layout/Footer'
import Header from '../Components/Layout/Header'
import Carousell from '../Components/Carousell'
import { getuserid } from '../api/userRoutes'
// import ProgressIndicatior from './ProgressIndicatior'
// import '../styles/cart.css'

export default function YourCartPage() {

  const [furnitureData, setFurnitureData] = useState([]) // this is array of furniture objects
  const [quantities, setQuantities] = useState({}) // this is json object with key as furniture id and value as quantity
  const navigate = useNavigate()

  useEffect(() => {
    const getCartfurnitures = async () => {
      try {
        const response = await getuserid();
        const id = response.data.id;
        // Get cart IDs
        const cartResponse = await getCart(id);


        // Set all furniture data at once
        setFurnitureData(cartResponse.data.details);
        setQuantities(cartResponse.data.details.reduce((acc, item) => {
          acc[item._id] = 1;
          return acc;
        }, {}))

      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    getCartfurnitures();
  }, []);

  const handleIncreaseQuantity = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.min((prev[id] || 1) + 1, furnitureData.find(f => f._id === id).stockLeft) // Corrected stockLeft
    }))
  }

  const handleDecreaseQuantity = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1)
    }))
  }

  const removeFromCart = async (fid) => {
    try {
      const response = await getuserid();
      const id = response.data.id;
      await removefromcart(fid, id);
      setFurnitureData(prevData => prevData.filter(item => item._id !== fid));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }

  const gotoCheckout = () => {
    navigate('/checkout', { state: { furnitureData, quantities } })
  }

  return (
    <>
      <Header page={"cart"} />
      <div className="mx-auto p-10 bg-[#363432] animate-fadeIn">

        {furnitureData.length === 0 ? (
          <div className="text-center py-10 my-16">
            <p className="text-7xl text-[#90A19D] font-robotofont">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center space-y-12">
            {/* <ProgressIndicatior page='cart' /> */}
            {furnitureData.map((item, index) => (
              <div key={index} className="bg-[#FFD65A] rounded-lg shadow-2xl p-8 hover:shadow-amber-100 transition-shadow w-8/12">
                <div className="flex flex-row gap-24">
                  <Carousell furniture={item} page={'cart'} />
                  <div className="flex flex-col justify-between flex-1">
                    <div className="space-y-8">
                      <h3 className="text-6xl font-sans text-[#EF6024]">{item.name}</h3>
                      <div className="flex items-baseline">
                        <sup className="text-green-400 text-2xl font-semibold">$</sup>
                        <span className="text-4xl text-green-900 font-sans">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-2xl font-robotofont text-red-500">
                        Stock Left: {item.stockLeft}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleDecreaseQuantity(item._id)}
                        disabled={quantities[item._id] <= 1}
                        className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50 hover:bg-gray-800 transition"
                      >
                        -
                      </button>
                      <span className="text-2xl font-sans text-black">
                        {quantities[item._id] || 1}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(item._id)}
                        disabled={quantities[item._id] >= item.stockLeft} // Corrected stockLeft
                        className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50 hover:bg-gray-800 transition"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="w-2/3 bg-red-500 text-white font-semibold py-2 mt-4 rounded-md hover:bg-red-600">
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {furnitureData.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={gotoCheckout}
              className="bg-[#EF6024] text-black font-sans text-xl py-2 px-10 rounded-md hover:bg-orange-700 hover:text-white transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <Footer page={"cart"} />
    </>
  )
}
