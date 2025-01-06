import PropTypes from 'prop-types';
import Carousell from '../Carousell';

function PageProduct({ furniture, viewProduct }) {
  return (
    <div className="flex p-10 bg-[#DDA15E] shadow-md border-b border-slate-900">
      {/* Left: Image Section */}
      <div className="flex-1 flex">
        <Carousell furniture={furniture} page={'products'}/>
      </div>

      {/* Right: Details Section */}
      <div className="flex-1 px-6 ml-40">
        <div className="mb-4">
          {/* Furniture Name */}
          <h2 className="text-6xl font-sans mb-8">{furniture.name}</h2>
          {/* Tag */}
          <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-md">
            {"New"}
          </span>
        </div>

        {/* Price */}
        <div>
          <sup className="text-black text-3xl font-bold">$</sup>
          <span className="text-5xl text-black font-robotofont">{furniture.price}</span>
        </div>
        {/* Quantity */}
        {/* <div className="mt-14 w-10/12">
          <label className="block mb-2 font-sans text-2xl text-gray-700">
            Quantity
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue="1"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div> */}

        {/* Add to Cart Button */}
        <button onClick={viewProduct} className="mt-4 w-10/12 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          View This
        </button>

        {/* Description */}
        <div className="mt-6 bg-white p-4 rounded-md w-10/12">
          <h3 className="text-2xl text-black">Description</h3>
          <p className="text-lg text-gray-600">{furniture.details}</p>
        </div>
      </div>
    </div>
  );
};
PageProduct.propTypes = {
  furniture: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
  viewProduct: PropTypes.func.isRequired,
};

export default PageProduct;