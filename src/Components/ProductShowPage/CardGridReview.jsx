import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getReviewOfFurniture } from "../../api/furnitureRoutes";
import { byid } from "../../api/userRoutes";
import ReactStars from 'react-stars'
import UserImage from '../../assets/user image.png'

function CardGridReview({ furnitureid }) {
  const [ReviewData, setReviewData] = useState([]);
  const [reviewerNames, setReviewerNames] = useState({});

  useEffect(() => {
    const getReview = async (fid) => {
      try {
        const response = await getReviewOfFurniture(fid);
        setReviewData(response.data);

        // Fetch reviewer names for all reviews
        const names = {};
        for (const review of response.data) {
          const userResponse = await byid(review.byWhom);
          names[review.byWhom] = userResponse.data.details.name;
        }
        setReviewerNames(names);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    getReview(furnitureid);
  }, [furnitureid]);


  return (
    <div className="bg-[#FEFAE0] p-24">
      <h2 className="text-3xl font-sans mb-20">Latest reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {ReviewData.map((data, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative">
            <p className="font-sans text-gray-800 text-3xl mb-4">{data.title}</p>
            <div className="flex items-center mb-4">
              <ReactStars value={data.rating} size={35} edit={false} color1="black" />
            </div>
            <p className="font-sans text-gray-800 mb-10 text-xl">{data.body}</p>
            <div className="absolute bottom-4 left-6 flex items-center">
              <img src={UserImage} alt="Reviewer" className="w-10 h-10 rounded-full mr-3 object-cover" />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {reviewerNames[data.byWhom] || 'Loading...'}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(data.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CardGridReview.propTypes = {
  furnitureid: PropTypes.string.isRequired,
};

export default CardGridReview;