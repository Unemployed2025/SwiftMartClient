import { getFurnitureById } from "../../api/furnitureRoutes";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { getCart } from "../../api/cartRoutes";
import { addtocart } from "../../api/cartRoutes";
import { useNavigate } from "react-router-dom";
import Carousell from "../Carousell";
function PageProduct({ furnitureid }) {

  const [furnitureData, setFurnitureData] = useState([]);
  const [currentCart, setCurrentCart] = useState([]);
  const TypeOfWood = ['Teak', 'Mahogany', 'Pine', 'Oak', 'Cedar', 'Maple', 'Cherry', 'Walnut', 'Birch', 'Beech', 'Ash', 'Elm', 'Poplar', 'Spruce', 'Fir', 'Cypress', 'Redwood', 'Plywood', 'MDF', 'Particle Board', 'Wicker', 'Rattan', 'Cane', 'Bamboo'];
  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCurrentCart(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }


  useEffect(() => {
    const obtainFurniture = async (furnitureid) => {
      try {
        const response = await getFurnitureById(furnitureid);
        // console.log(response.data);
        setFurnitureData(response.data);
      }
      catch (error) {
        console.error("Error fetching furniture data:", error);
      }
    };
    obtainFurniture(furnitureid);
    fetchCart();
  }, [furnitureid])

  const randomWoodGiver = () => {
    let randIndex = Math.floor(Math.random() * TypeOfWood.length);
    return TypeOfWood[randIndex];
  }
  const addToCart = async (productid) => {
    try {
      const response = await addtocart(productid);
      setCurrentCart(response.data.cart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
    // console.log(currentCart);
  }
  const viewInCart = () => {
    navigate('/yourcart');
  }
  return (
    <div className="flex p-10 bg-[#DDA15E] shadow-md">
      {/* Left: Image Section */}
      <div className="flex-1 ">
        <Carousell furniture={furnitureData} page={'product'}/>
      </div>

      {/* Right: Details Section */}
      <div className="flex-1 px-6 ml-40">
        <div className="mb-4">
          {/* Furniture Name */}
          <h2 className="text-6xl font-sans mb-8">{furnitureData.name}</h2>
          {/* Category Tag */}
          <div className="flex gap-2">
            <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-md">
              {furnitureData.category}
            </span>
            <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded-md">
              {furnitureData.stockLeft > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            <span className="text-sm bg-red-200 text-red-800 px-2 py-1 rounded-md">
              New
            </span>
            <span className="text-sm bg-fuchsia-200 text-fuchsia-900 px-2 py-1 rounded-md">
              {randomWoodGiver()}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <sup className="text-green-800 text-3xl font-bold">$</sup>
          <span className="text-5xl text-green-900 font-robotofont">{furnitureData.price}</span>
        </div>

        {/* Stock and Dimensions Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 w-10/12">
          <div className="bg-white p-3 rounded-md">
            <h3 className="text-xl text-black font-semibold">Stock Available</h3>
            <p className="text-lg text-gray-600">{furnitureData.stockLeft} units</p>
          </div>
          <div className="bg-white p-3 rounded-md">
            <h3 className="text-xl text-black font-semibold">Dimensions</h3>
            <p className="text-lg text-gray-600">{furnitureData.dimensions}</p>
          </div>
        </div>

        {/* Add to Cart or View in Cart */}
        {
          furnitureData.stockLeft === 0 ? (
            <button
              className="mt-4 w-10/12 py-2 bg-gray-400 text-white rounded-md"
              disabled
            >
              Out of Stock
            </button>
          ) : currentCart.some((item) => item === furnitureData._id) ? (
            <button
              className="mt-4 w-10/12 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={viewInCart}
            >
              View this in Cart
            </button>
          ) : (
            <button
              className="mt-4 w-10/12 py-2 bg-black text-white rounded-md hover:bg-zinc-900"
              onClick={() => addToCart(furnitureData._id)}
            >
              Add to Cart
            </button>
          )
        }
        <div className="mt-6 bg-white p-4 rounded-md w-10/12">
          <h3 className="text-2xl text-black">Description</h3>
          <p className="text-lg text-gray-600">{furnitureData.details}</p>
        </div>

        {/* Timestamp */}
        {furnitureData.createdAt && (
          <div className="mt-4 text-sm text-gray-600 w-10/12">
            <p>Added: {new Date(furnitureData.createdAt).toLocaleDateString()}</p>
            <p>Last Updated: {new Date(furnitureData.updatedAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
      {/* {console.log(furnitureData.image[0].url)} */}
    </div>
  );
}
PageProduct.propTypes = {
  furnitureid: PropTypes.string.isRequired,
};

export default PageProduct;

