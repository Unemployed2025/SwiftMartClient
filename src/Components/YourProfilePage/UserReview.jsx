import proptype from 'prop-types'
import UserImage from '../../assets/user image.png'
import { getReviews } from '../../api/userRoutes'
import { useState, useEffect } from 'react';
import ReactStars from 'react-stars'
function UserReview({ UserData, refresh }) {
    const [ReviewData, setReviewData] = useState([]);
    useEffect(() => {
        const getReview = async (id) => {
            try {
                const response = await getReviews(id);
                setReviewData(response.data.details);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        getReview(UserData._id);
    }, [UserData, refresh]);


    return (
        <div className="bg-[#FF4D6D] p-24 border-b-4 border-pink-800">
            <h2 className="text-3xl font-sans mb-20">Reviews added by you</h2>

            {ReviewData.length === 0 && <div className="text-9xl text-yellow-200">Nothing Here</div>}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {

                    ReviewData.map((data, index) => (
                        <div
                            key={index}
                            className="bg-red-400 p-6 rounded-lg shadow-md border border-gray-200 relative"
                        >
                            <p className="font-sans text-gray-800 text-3xl mb-4">{data.title}</p>
                            <div className="flex items-center mb-4">
                                <ReactStars value={data.rating} size={35} edit={false} color1="black" />
                            </div>
                            <p className="font-sans text-gray-800 mb-10 text-xl">{data.body}</p>
                            <div className="absolute bottom-4 left-6 flex items-center">
                                <img src={UserImage} alt="Reviewer" className="w-10 h-10 rounded-full mr-3 object-cover" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {UserData.name || 'Loading...'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Added:{new Date(data.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

UserReview.propTypes = {
    UserData: proptype.shape({
        _id: proptype.string.isRequired,
        name: proptype.string.isRequired
    }).isRequired,
    refresh: proptype.number.isRequired

}

export default UserReview