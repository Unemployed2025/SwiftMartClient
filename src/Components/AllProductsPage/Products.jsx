import { useEffect, useState } from "react";
import PageProduct from "./PageProduct";
import { getAllFurniture } from "../../api/furnitureRoutes";
import { useNavigate } from "react-router-dom";
function Products() {

    const [furnitures, setFurnitures] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchFurnitures = async () => {
            try {
                const response = await getAllFurniture();
                setFurnitures(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFurnitures();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = furnitures.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(furnitures.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleClick = (furnitureid) => {
        navigate("/product", { state: { furnitureid } });
    };
    return (
        <>
            <div className="">
                {currentItems.map((furniture, index) => (
                    <PageProduct key={index} furniture={furniture} viewProduct={() => handleClick(furniture._id)} />
                ))}
            </div>
            <div className="p-24 w-full flex justify-between items-center bg-[#FFFFFF] border-b border-slate-950">
                {/* Previous Button */}
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="w-6/12 text-black text-3xl font-myfont"
                >
                    ← Previous
                </button>

                {/* Next Button */}
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(furnitures.length / itemsPerPage)}
                    className="w-6/12 text-black text-3xl font-myfont"
                >
                    Next →
                </button>
            </div>
        </>
    );
}

export default Products;