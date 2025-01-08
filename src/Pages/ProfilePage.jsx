import HeroBasic from '../Components/YourProfilePage/HeroBasic'
import OrderPlaced from '../Components/YourProfilePage/OrderPlaced'
import UserReview from '../Components/YourProfilePage/UserReview'
import Header from '../Components/Layout/Header'
import Footer from '../Components/Layout/Footer'
import { getuserid } from '../api/userRoutes'
import { byid } from '../api/userRoutes'
import { useEffect, useState } from 'react'
import ListedFurniture from '../Components/YourProfilePage/ListedFurniture'
import LoadingComponent from '../Components/LoadingComponent'
function ProfilePage() {
    const [UserData, setUserData] = useState(null)
    const [isloading, setIsLoading] = useState(true)
    const [refresh, setRefresh] = useState(0); // Add refresh state
    useEffect(() => {
        const getProfile = async () => {
            try {
                setIsLoading(true);
                const response = await getuserid();
                const id = response.data.id;
                const user = await byid(id);
                setUserData(user.data.details);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }

        }
        getProfile();
    }, []);

    if (isloading) {
        return <LoadingComponent message="User Profile Loading..."/>
    }

    return (
        <div className='animate-fadeIn'>
            <Header page={"profile"} />
            {UserData && <HeroBasic UserData={UserData} />}
            {UserData && <OrderPlaced UserData={UserData} refresh={refresh} setRefresh={setRefresh} />}
            {UserData && <UserReview UserData={UserData} refresh={refresh} />}
            {UserData && <ListedFurniture UserData={UserData} refresh={refresh} setRefresh={setRefresh} />}
            <Footer page={"profile"} />
        </div>
    )
}

export default ProfilePage
