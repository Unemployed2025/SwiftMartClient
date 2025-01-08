import { useLocation } from "react-router-dom"
import { getFurnitureById, getReviewOfFurniture } from "../api/furnitureRoutes";
import { useEffect, useState } from "react";
import LoadingComponent from "../Components/LoadingComponent";
import { StarIcon } from '@heroicons/react/solid';


function FurnitureStatsPage() {
  const [furnitureData, setFurnitureData] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const furniture = location.state?.fid;


  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        setIsLoading(true);

        const response = await getFurnitureById(furniture);
        setFurnitureData(response.data);

        const reviewResponse = await getReviewOfFurniture(furniture);
        setReviews(reviewResponse.data);


      } catch (error) {
        console.error(error);

      } finally {
        setIsLoading(false);

      }
    }
    fetchFurniture();
  }, [furniture]);

  useEffect(() => {
    console.log('reviewUpdated', reviews);
  }, [reviews]);

  const calculateAverageRating = () => {
    if (!reviews.length) return 0;
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  };

  if (isLoading) {
    return (
      <LoadingComponent />
    )
  }
  return (
    <div className="min-h-screen bg-red-500">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{furnitureData?.name}</h2>
            <div className="mb-4">
              <p className="text-gray-600">Average Rating</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-5 w-5 ${index < Math.round(calculateAverageRating())
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                      }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  ({calculateAverageRating().toFixed(1)})
                </span>
              </div>
            </div>

            {/* Stock Info */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Stock Information</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span>Initial Stock:</span>
                  <span className="font-semibold">{furnitureData?.stockAdded}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining Stock:</span>
                  <span className="font-semibold">{furnitureData?.stockLeft}</span>
                </div>
                <div className="mt-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{
                      width: `${(furnitureData?.stockLeft / furnitureData?.stockAdded) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, starIndex) => (
                      <StarIcon
                        key={starIndex}
                        className={`h-4 w-4 ${starIndex < review.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FurnitureStatsPage