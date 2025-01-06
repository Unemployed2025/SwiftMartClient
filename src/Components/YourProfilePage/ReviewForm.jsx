import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars';
import { getuserid } from '../../api/userRoutes';
import { createReview } from '../../api/reviewRoutes';
import { addReview } from '../../api/furnitureRoutes';
import { addReviewUser } from '../../api/userRoutes';
function ReviewForm({ furniture, onClose, onReviewSubmitted}) {
    const [review, setReview] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(5);
    let userid = null;
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Add your review submission logic here
        await useridfetcher();
        try {
            const response = await createReview(userid, furniture._id, review, rating, title);
            const reviewId = response.data.review;
            await addReview(reviewId, furniture._id);
            await addReviewUser(userid, reviewId);
            onReviewSubmitted(); // Call the callback after successful submission
        } catch (error) {
            console.error('Error creating review:', error);
        }

        onClose();
    };
    
    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const useridfetcher = async () => {
        try {
            const response = await getuserid();
            userid = response.data.id;
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white p-7 rounded-xl w-4/12 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Write a Review for <span className='underline text-pink-500'>{furniture.name}</span></h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition duration-200"
                        >
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xl font-sans text-purple-800 mb-2">Rating</label>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={36}
                            value={rating}
                            half={false}
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-sans text-purple-800 mb-2">Title</label>
                        <textarea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            rows="1"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-xl font-sans text-purple-800 mb-2">Review</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pink-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-pink-700 transition duration-200 focus:ring-4 focus:ring-indigo-500 focus:outline-none"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
    
}
ReviewForm.propTypes = {
    furniture: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onReviewSubmitted: PropTypes.func.isRequired,
};

export default ReviewForm;