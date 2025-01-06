import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { reviewExist } from "../../api/reviewRoutes";
import { useState, useEffect } from "react";

import ReviewForm from "./ReviewForm";
function OrderPlacedCard({ id, boughtfurnitures ,setRefresh}) {
    const navigate = useNavigate();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedFurniture, setSelectedFurniture] = useState(null);
    const [reviewStatuses, setReviewStatuses] = useState({});

    // Add useEffect to fetch review status for each furniture
    useEffect(() => {
        const fetchReviewStatuses = async () => {
            const statuses = {};
            for (const furniture of boughtfurnitures) {
                try {
                    const response = await reviewExist(id, furniture._id);
                    statuses[furniture._id] = response.data.message === 'true';
                } catch (error) {
                    console.error('Error fetching review status:', error);
                }
            }
            setReviewStatuses(statuses);
        };
        fetchReviewStatuses();
    }, [id, boughtfurnitures,showReviewForm]);

    const handleOrderAgain = (furnitureid) => {
        navigate("/product", { state: { furnitureid } });
    }
    const handleViewYourReview = (furnitureid) => {
        navigate("/product", { state: { furnitureid } });
    }
    const handleShowReviewForm = (furniture) => {
        setSelectedFurniture(furniture);
        setReviewStatuses(prev => ({
            ...prev,
            [furniture._id]: true
        }));
        setShowReviewForm(true);
    };
    const handleReviewSubmitted = () => {
        setShowReviewForm(false);
        setRefresh(prev => prev + 1);
    };

    return (
        <div className="space-y-4 items-center flex flex-col">
            {/* Order Card */}
            {boughtfurnitures.length === 0 ? (
                <div className="text-9xl m-24 text-yellow-200">Nothing Here</div>
            ) : (
                boughtfurnitures.map((furnitureData, index) => (
                    <div
                        key={index}
                        className="flex bg-pink-200 p-16 rounded-lg shadow-md w-11/12"
                    >
                        {/* Image Placeholder */}
                        <div className="w-32 h-32 bg-pink-300 flex-shrink-0 border- flex items-center justify-center">
                            <img src={furnitureData.image[0].url} alt="Loading..." className="w-32 h-32 rounded-lg" />
                        </div>
                        {/* Text Content */}
                        <div className="ml-10">
                            <h2 className="text-3xl font-bold font-sans text-gray-900">{furnitureData.name}</h2>
                            <p className="text-xl text-gray-600 mt-2">
                                {furnitureData.details}
                            </p>
                            <button onClick={() => { handleOrderAgain(furnitureData._id) }} className="bg-white text-pink-500 px-2 py-2 text-xl rounded shadow hover:bg-pink-500 hover:text-white transition mt-2">
                                Order Again
                            </button>
                            {!reviewStatuses[furnitureData._id] ? (
                                <button onClick={() => handleShowReviewForm(furnitureData)} className="bg-white text-pink-500 px-2 py-2 text-xl rounded shadow hover:bg-pink-500 hover:text-white transition mt-2 ml-2">
                                    Write a Review
                                </button>
                            ) : (
                                <button onClick={() => handleViewYourReview(furnitureData._id)} className="bg-gray-300 text-gray-600 px-2 py-2 text-xl rounded shadow mt-2 ml-2">
                                    View your Review
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}

            {showReviewForm && (
                <ReviewForm
                    furniture={selectedFurniture}
                    onClose={() => setShowReviewForm(false)}
                    onReviewSubmitted={handleReviewSubmitted}
                />
            )}
        </div>
    )
}
OrderPlacedCard.propTypes = {
    boughtfurnitures: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            details: PropTypes.string.isRequired,
        })
    ).isRequired,
    id: PropTypes.string.isRequired,
    setRefresh: PropTypes.func.isRequired,

};

export default OrderPlacedCard


