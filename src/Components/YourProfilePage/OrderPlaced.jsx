import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getboughtfurniture } from "../../api/userRoutes";
import OrderPlacedCard from "./OrderPlacedCard";
function OrderPlaced({ UserData, setRefresh }) {
  const [boughtfurnitures, setBoughtFurnitures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getboughtfurnituredata = async () => {
      if (!UserData?._id) return;

      setIsLoading(true);
      try {
        const response = await getboughtfurniture(UserData._id);
        setBoughtFurnitures(response.data.details);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getboughtfurnituredata();
  }, [UserData]);

  if (isLoading) {
    return <div className="bg-[#FF4D6D] min-h-screen p-6 mb-10">
      <h1 className="text-black text-2xl font-robotofont ml-20 my-16">Loading orders...</h1>
    </div>
  }

  return (
    <div className="bg-[#FF4D6D] p-24 border-b-4 border-pink-800">
      <h2 className="text-3xl font-sans mb-20">Order’s Placed by you</h2>
      <OrderPlacedCard boughtfurnitures={boughtfurnitures} id={UserData._id} setRefresh={setRefresh} />
    </div>
  );
}


OrderPlaced.propTypes = {
  UserData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default OrderPlaced;
