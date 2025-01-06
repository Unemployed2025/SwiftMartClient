import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../api/userRoutes';
function Header({ page }) {

    const navigate = useNavigate();
    let headerBg;
    let buttonBg;
    let text;

    switch (page) {
        case "product":
            headerBg = "bg-[#BC6C25]";
            buttonBg = "bg-[#6F1D1B]";
            text = "text-white";
            break;
        case "profile":
            headerBg = "bg-[#FFB3C1]";
            buttonBg = "bg-[#590D22]";
            text = "text-[#FFF0F3]";
            break;
        case "home":
            headerBg = "bg-[#B7E4C7]";
            buttonBg = "bg-[#A3B18A]";
            text = "text-gray-800";
            break;
        case "cart":
            headerBg = "bg-[#F0941F]";
            buttonBg = "bg-[#FFD65A]";
            text = "text-black";
            break;
        default:
            headerBg = "bg-[#B7E4C7]";
            buttonBg = "bg-[#A3B18A]";
    }


    const handleYourProfileButtonClick = () => {
        navigate('/profile');
    }
    const handleYourHomeButtonClick = () => {
        navigate('/home');
    }
    const handleYourCartButtonClick = () => {
        navigate('/yourcart');
    }
    const handleYourProductsButtonClick = () => {
        navigate('/allproducts');
    }
    const handleLogout = () => {
        localStorage.removeItem('AccessToken');
        logout();
        navigate('/');
    }
    return (
        <header className={`${headerBg} top-0 w-full py-4 px-10 font-serif flex items-center justify-between z-50 animate-fadeIn`}>
            <img src="./logo2.svg" alt="Logo of APP" className="h-6" />
            <nav>
                <ul className="flex list-none space-x-4 m-0 p-0">
                    <li>
                        <button  onClick={handleYourHomeButtonClick} className={`${buttonBg} rounded-md px-4 py-2 ${text} hover:${buttonBg} hover:opacity-80`}>
                            Home
                        </button>
                    </li>
                    <li>
                        <button onClick={handleYourProductsButtonClick}  className={`${buttonBg} rounded-md px-4 py-2 ${text} hover:${buttonBg} hover:opacity-80`}>
                            Products
                        </button>
                    </li>
                    <li>
                        <button onClick={handleYourProfileButtonClick}  className={`${buttonBg} rounded-md px-4 py-2 ${text} hover:${buttonBg} hover:opacity-80`}>
                            Your Profile
                        </button>
                    </li>
                    <li>
                        <button onClick={handleYourCartButtonClick}  className={`${buttonBg} rounded-md px-4 py-2 ${text} hover:${buttonBg} hover:opacity-80`}>
                            Your Cart
                        </button>
                    </li>
                    <li>
                        <button 
                             
                            className={`${buttonBg} rounded-md px-4 py-2 ${text} hover:${buttonBg} hover:opacity-80`}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

Header.propTypes = {
    page: PropTypes.string.isRequired,
};

export default Header;