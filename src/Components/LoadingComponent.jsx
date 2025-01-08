
import PropTypes from 'prop-types';

function LoadingComponent({ message }) {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500">
                <div className="animate-ping h-16 w-16 rounded-full bg-purple-400 opacity-75 mx-auto mt-8"></div>
            </div>
            <p className="ml-4 text-xl text-purple-600 animate-pulse">{message || 'Loading...'}</p>
        </div>
    );
};

LoadingComponent.propTypes = {
    message: PropTypes.string,
};

export default LoadingComponent