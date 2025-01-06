// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Arrow from '../../assets/Arrow up-right.png'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFurniture } from "../../api/furnitureRoutes";

function HomeTrendingGrid() {
    const [furnitureData, setFurnitureData] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllFurniture();
                const ArrayOfJson = response.data;
                setFurnitureData(ArrayOfJson);
            } catch (error) {
                console.error("Error fetching furniture data:", error);
            }
        };

        fetchData();
    }, []);


    const handlClick = (furnitureid) => {
        navigate("/product", { state: { furnitureid } });
    }

    return (
        <>
            <div className="bg-[#FF4D6D] py-10 px-4 min-h-screen">
                <h2 className="text-[#FFFF3F] text-3xl font-bold mb-4">
                    Browse Trending Furniture&#39;s
                </h2>
                <p className="text-[#EFFFF8] text-xl mb-8">
                    Our TOP 6 Furniture&#39;s
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {
                        furnitureData.map((furniture, index) => (
                            <div
                                key={index}
                                className="group bg-pink-300 rounded-lg shadow-lg p-6 transform transition duration-300  hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-black min-h-[350px] flex flex-col justify-between"
                                onClick={() => handlClick(furniture._id)}
                            >
                                <div className="mb-6">
                                    <img
                                        src={furniture.image[0].url}
                                        alt={furniture.title}
                                        className="w-40 h-40 object-cover"
                                    />
                                </div>
                                <h3 className="text-3xl text-[#1E1E1E] first-letter:mb-2">
                                    {furniture.name}
                                </h3>
                                <p className="text-xl text-[#757575]">
                                    {furniture.details}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Link
                to="/allproducts"
                className="block bg-[#FF4D6D] text-black text-4xl py-6 text-center no-underline mr-auto ml-auto"
            >
                <span className="hover-underline font-sans mb-8">
                    Browse All
                    <img src={Arrow} className="inline-block mb-2" />
                </span>
            </Link>
        </>
    );
}

export default HomeTrendingGrid;
