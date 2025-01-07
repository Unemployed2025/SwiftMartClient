import { useState } from "react";
import PropTypes from 'prop-types';
import { addNewFurniture } from "../../api/furnitureRoutes";
import { addListedFurniture, getuserid } from "../../api/userRoutes";


function CreateFurnitureForm({ onClose, onFurnitureSubmitted, userdata }) {
    const [formData, setFormData] = useState({
        name: "",
        details: "",
        price: "",
        dimension: "",
        stockLeft: "",
        category: "",
        stockAdded: "",
        images: [], // Initialize as an empty array
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFileChange = (e) => {
        // Convert FileList to an array and set it to the images field
        setFormData({ ...formData, images: Array.from(e.target.files) });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("name", formData.name);
        data.append("details", formData.details);
        data.append("price", formData.price);
        data.append("dimensions", formData.dimension);
        data.append("stockLeft", formData.stockLeft);
        data.append("category", formData.category);
        data.append("stockAdded", formData.stockAdded);

        // Append each file with the same field name "images"
        formData.images.forEach((file) => {
            data.append(`images`, file); // Keep the field name as "images" for each file
        });


        try {
            const responsee = await getuserid();
            const owner = responsee.data.id;
            data.append("owner", owner);

            // for (const pair of data.entries()) {
            //     console.log(pair[0], pair[1]);
            // }

            const response = await addNewFurniture(data);

            console.log("Furniture added:", response.data.success, response.data.id);
            // alert("Furniture added successfully!");

            // Clear form after successful submission
            setFormData({
                name: "",
                details: "",
                price: "",
                dimension: "",
                stockLeft: "",
                category: "",
                stockAdded: "",
                images: []
            });
            await addListedFurniture(userdata._id, response.data.id);
            onFurnitureSubmitted(); // Call the callback after successful submission

        } catch (error) {
            console.error("Error adding furniture:", error.response?.data || error.message);
            alert("Something went wrong. Please try again.");
        } finally {
            onClose();
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative animate-in fade-in duration-200">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Add New Furniture</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close"
                        >
                            X
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Dimension</label>
                                <input
                                    type="text"
                                    name="dimension"
                                    value={formData.dimension}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Stock Left</label>
                                <input
                                    type="number"
                                    name="stockLeft"
                                    value={formData.stockLeft}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Stock Added</label>
                                <input
                                    type="number"
                                    name="stockAdded"
                                    value={formData.stockAdded}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Images</label>
                            <input
                                type="file"
                                name="images"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Add Furniture
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

CreateFurnitureForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onFurnitureSubmitted: PropTypes.func.isRequired,
    userdata: PropTypes.shape({
        _id: PropTypes.string.isRequired
    }).isRequired
};

export default CreateFurnitureForm;