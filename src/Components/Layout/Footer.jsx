import mailIcon from '../../assets/mail.png';
import phoneIcon from '../../assets/Phone.png';
import instagramIcon from '../../assets/Instagram.png';
import twitterIcon from '../../assets/Twitter.png';
import logo from'../../assets/Block.png';
import PropTypes from 'prop-types';
function Footer({page}) {

    let footerBg;

    switch (page) {
        case "product":
            footerBg = "bg-[#606C38]";
            break;
        case "profile":
            footerBg = "bg-[#FF758F]";
            break;
        case "home":
            footerBg = "bg-[#E0AAFF]";
            break;
        case "cart":
            footerBg = "bg-[#196774]";
            break;
        default:
            footerBg = "bg-[#B7E4C7]";
    }
    return (
        <div className={`w-full mx-auto ${footerBg} flex justify-around items-center animate-fadeIn`}>
            <div className=''>
                <img src={logo} alt="" />
            </div>
            <div className='p-9'>
                <h1 className="text-xl hover-underline">Contact us</h1>
                <h1 className="text-xl mt-8 hover-underline-for-links">Mail us Concern on <img src={mailIcon} alt="Mail Icon" className='inline-flex'/></h1>
                <h1 className="text-xl mt-5 hover-underline-for-links"><img src={phoneIcon} alt="Phone Icon" className='inline-flex'/> us at +91 1234567891</h1>
                <h1 className="text-xl mt-5 hover-underline-for-links">Mention us on <img src={instagramIcon} alt="Instagram Icon" className='inline-flex'/></h1>
                <h1 className="text-xl mt-5 hover-underline-for-links">Mention us on <img src={twitterIcon} alt="Twitter Icon" className='inline-flex'/></h1>
            </div>
            <div className='p-9'>
                <h1 className="text-xl hover-underline">About us</h1>
                <h1 className="text-xl mt-8 hover-underline-for-links">Our Motive</h1>
                <h1 className="text-xl mt-5 hover-underline-for-links">Our Suppliers</h1>
                <h1 className="text-xl mt-5 hover-underline-for-links">Our Consumer Base</h1>
                <h1 className="text-xl mt-5 hover-underline-for-links">Our Warehouse Space</h1>
            </div>
            <div className='p-9'>
                <h1 className="text-xl hover-underline">Our Parteners</h1>
                <h1 className="text-xl mt-8 hover-underline-for-links">XYZ.CO</h1>
                <h1 className="text-xl mt-5 hover-underline-for-links">ABC.CO</h1>
                <h1 className="text-xl mt-5 hover-underline-for-links">PQR.CO</h1>
                <h1 className="text-xl mt-5 hover-underline-for-links">IJK.CO</h1>
            </div>
            <img src="" alt="" />
        </div>
    )
}

Footer.propTypes = {
    page: PropTypes.string.isRequired,
};

export default Footer;
