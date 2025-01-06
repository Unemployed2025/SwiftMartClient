import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { emptycart } from "../api/cartRoutes";
import { getuserid, addboughtfurnitures } from "../api/userRoutes";
import { updateStockLeft } from "../api/furnitureRoutes";
// import ProgressIndicatior from "./ProgressIndicatior";
function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const furnitureData = location.state.furnitureData; // Array of furniture objects
    const quantities = location.state.quantities;
    console.log(furnitureData);
    console.log(quantities);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        address: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({});
    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    };
    // Name validation - only letters, spaces, and hyphens
    const validateName = (name) => {
        const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+|-[A-Za-z]+)*$/;
        return nameRegex.test(name) && name.length >= 2;
    };
    // Card number validation - only numbers and spaces
    const validateCardNumber = (number) => {
        const cardNumberRegex = /^[\d\s]+$/;
        const digitsOnly = number.replace(/\s/g, '');
        return cardNumberRegex.test(number) && digitsOnly.length === 16;
    };
    // Expiry date validation (MM/YY format)
    const validateExpiry = (expiry) => {
        const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryRegex.test(expiry)) return false;

        const [month, year] = expiry.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        const expYear = parseInt(year);
        const expMonth = parseInt(month);

        return (expYear > currentYear) ||
            (expYear === currentYear && expMonth >= currentMonth);
    };
    // CVV validation - exactly 3 digits
    const validateCVV = (cvv) => {
        const cvvRegex = /^\d{3}$/;
        return cvvRegex.test(cvv);
    };
    const handleChange = (e, field) => {
        let value = e.target.value;

        // Field-specific formatting and validation
        switch (field) {
            case 'cardNumber':
                value = value.replace(/[^\d\s]/g, '') // Remove non-digits and spaces
                    .replace(/\s/g, '') // Remove existing spaces
                    .replace(/(\d{4})/g, '$1 ') // Add space after every 4 digits
                    .trim(); // Remove trailing space
                if (value.length > 19) return; // Max length including spaces
                break;

            case 'expiry':
                value = value.replace(/[^\d/]/g, '') // Remove non-digits and forward slash
                    .replace(/^(\d{2})(?=\d)/, '$1/'); // Add slash after 2 digits
                if (value.length > 5) return; // MM/YY format
                break;

            case 'cvv':
                value = value.replace(/\D/g, ''); // Remove non-digits
                if (value.length > 3) return;
                break;

            case 'name':
                value = value.replace(/[^A-Za-z\s-]/g, ''); // Only letters, spaces, and hyphens
                break;
        }

        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate all fields
        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!validateName(formData.name)) {
            newErrors.name = 'Please enter a valid name (letters only)';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Please enter your shipping address';
        }

        if (!validateCardNumber(formData.cardNumber)) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }

        if (!validateExpiry(formData.expiry)) {
            newErrors.expiry = 'Please enter a valid future expiry date (MM/YY)';
        }

        if (!validateCVV(formData.cvv)) {
            newErrors.cvv = 'Please enter a valid 3-digit CVV';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const userResponse = await getuserid();
                const userId = userResponse.data.id;
                const furnitureId = furnitureData.map(item => item._id);
                await addboughtfurnitures(userId, furnitureId);
                const stockLeft = furnitureData.map(item => item.stockLeft - quantities[item._id]);
                await updateStockLeft(furnitureId, stockLeft);
                // Simulate payment processing
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsLoading(false);
                emptycart();
                navigate('/profile');
            } catch (error) {
                console.error('Error procession checkout:', error);
                setIsLoading(false);
            }
        }
    };

    const calculateTotal = () => {
        return furnitureData.reduce((total, item) => {
            return total + (item.price * (quantities[item._id] || 0));
        }, 0);
    };

    return (
        <div className="min-h-screen bg-[#e9edc9] py-8 animate-fadeIn">
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-center">Processing payment...</p>
                    </div>
                </div>
            )}
            <div className="container mx-auto px-4">
                {/* <ProgressIndicatior page="checkout"/> */}
                {/* Back to Cart Button */}
                <button
                    onClick={() => navigate('/yourcart')}
                    className="mb-6 w-36 flex items-center text-blue-600 hover:text-blue-800"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Cart
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    { /* Order Summary */}
                    <div className="bg-[#faedcd] rounded-lg shadow-lg p-8 w-full border-2 border-[#d4a373]">
                        <h2 className="text-4xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-8">
                            {furnitureData.map((item, index) => (
                                quantities[item._id] > 0 && (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img src={item.image[0].url} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                                            <div className="ml-6">
                                                <h3 className="text-xl font-semibold">{item.name}</h3>
                                                <p className="text-lg text-gray-600">Quantity: {quantities[item._id]}</p>
                                            </div>
                                        </div>
                                        <p className="text-xl font-sans">${(item.price * quantities[item._id]).toFixed(2)}</p>
                                    </div>
                                )
                            ))}
                            <div className="border-t-2 border-[#d4a373] pt-6 mt-6">
                                <div className="flex justify-between">
                                    <span className="text-2xl font-bold">Total:</span>
                                    <span className="text-2xl font-bold">${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-[#ccd5ae] rounded-xl shadow-lg p-8 w-full mx-auto border-[#a9b18f] border-2">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Payment Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    className={`block w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => handleChange(e, 'email')}
                                    required
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    className={`block w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => handleChange(e, 'name')}
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Address</label>
                                <textarea
                                    className={`block w-full rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                    placeholder="Enter your address"
                                    value={formData.address}
                                    onChange={(e) => handleChange(e, 'address')}
                                    required
                                    rows={4}
                                />
                                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Card Number</label>
                                <input
                                    type="text"
                                    className={`block w-full rounded-lg border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                    placeholder="1234 5678 9012 3456"
                                    value={formData.cardNumber}
                                    onChange={(e) => handleChange(e, 'cardNumber')}
                                    required
                                />
                                {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Expiry Date</label>
                                    <input
                                        type="text"
                                        className={`block w-full rounded-lg border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                        placeholder="MM/YY"
                                        value={formData.expiry}
                                        onChange={(e) => handleChange(e, 'expiry')}
                                        required
                                    />
                                    {errors.expiry && <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">CVV</label>
                                    <input
                                        type="password"
                                        className={`block w-full rounded-lg border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                        placeholder="123"
                                        value={formData.cvv}
                                        onChange={(e) => handleChange(e, 'cvv')}
                                        required
                                    />
                                    {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            >
                                Pay ${calculateTotal().toFixed(2)}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage