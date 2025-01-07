import proptype from "prop-types"
import { getlistedfurniture } from "../../api/userRoutes";
import { Card } from "flowbite-react";
import CreateFurnitureForm from "./CreateFurnitureForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListedFurniture({ UserData, refresh, setRefresh }) {
    const [listedFurnitureData, setListedFurnitureData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const getListedFurniture = async (id) => {
            try {
                const response = await getlistedfurniture(id);
                setListedFurnitureData(response.data.details);
            } catch (error) {
                console.error('Error fetching furniture:', error);
            }
        };
        getListedFurniture(UserData._id);
    }, [UserData, refresh]);


    const openFurnitureStats = (fid) => {
        navigate('/profile/furniturestats', { state: { fid } });
    }


    return (
        <div className="bg-[#FF4D6D] p-24 border-b-4 border-pink-800">
            <h2 className="text-3xl font-sans mb-20">Furnitures added by you</h2>
            {
                listedFurnitureData.length === 0 ?
                    (
                        <div className="text-4xl text-yellow-200">Wanna Sell Furniture and earn some darn money click
                            <button type="button" onClick={() => setShowAddForm(true)} className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-sans rounded-lg px-5 py-2 text-center ml-10 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">Add furniture</button>
                        </div>
                    ) :
                    (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {
                                listedFurnitureData.map((data, index) => (
                                    console.log(data),
                                    <Card key={index} className="max-w-sm" imgSrc={data.image[0].url} horizontal>
                                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {data.name}
                                        </h5>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">
                                            {data.details}
                                        </p>
                                        <button type="button" onClick={() => openFurnitureStats(data._id)} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View Furniture Stats</button>

                                    </Card>
                                ))
                            }
                            <button type="button" onClick={() => setShowAddForm(true)} className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-sans rounded-lg px-5 py-2 text-center ml-10 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">Add furniture</button>
                        </div>
                    )
            }
            {
                showAddForm && (
                    <CreateFurnitureForm
                        onClose={() => setShowAddForm(false)}
                        onFurnitureSubmitted={() => {
                            setShowAddForm(false);
                            setRefresh(prev => prev + 1);
                        }}
                        userdata={UserData}
                    />
                )
            }
        </div>

    )
    // {/* <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
    //             <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //                 Noteworthy technology acquisitions 2021
    //             </h5>
    //             <p className="font-normal text-gray-700 dark:text-gray-400">
    //                 Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
    //             </p>
    //         </Card> */}
    //     </div >


    // )
}

ListedFurniture.propTypes = {
    UserData: proptype.shape({
        _id: proptype.string.isRequired,
        name: proptype.string.isRequired
    }).isRequired,
    refresh: proptype.number.isRequired,
    setRefresh: proptype.func.isRequired

}


export default ListedFurniture