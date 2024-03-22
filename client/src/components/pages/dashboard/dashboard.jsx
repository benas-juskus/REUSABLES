import Heeader from '../../../components/layout/header';
import Footer from '../../../components/layout/footer';
import {Container} from "@mui/material";
import UserDetails from './dashboardComponents/userDetails';
import RecentItemsList from './dashboardComponents/recentItems';
import RecentChats from './dashboardComponents/recentChats';
import { useEffect, useState } from 'react';
import Axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

// This is just some mock data for dev purposes.
let user_data = {
    id: 3,
    rating: 3.3,
    username: localStorage.getItem("loggedUsr"),
    photo: "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg",
    items: [
        {id: 15, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F75525e65-2fed-4d38-8749-e5ae1868b534.1520148fcfd9503a20d125194b5db9d6.jpeg"},
        {id: 16, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.antiquepottery.co.uk%2Fwp-content%2Fuploads%2F2019%2F08%2F1085899.jpg"},
        {id: 17, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2xcq4qphg1ge9.cloudfront.net%2Fassets%2F155264%2F3318187%2Foriginal_drill.jpg"},
        {id: 18, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thesprucecrafts.com%2Fthmb%2Fzu2AMOgH3zrIHoWo1SA2PJSqVnY%3D%2F1150x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2FGettyImages-131961180-59ed564e03f4020011ee1377.jpg"},
    ],
    transactions: [
        {id: 1, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: null, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 2, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: 27, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 3, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: null, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 4, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: 27, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 1, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: null, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 2, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: 27, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"}
    ]
};

const Dashboard = () => {

    const redirect = useNavigate();
    
    // will use this data for userprofile data
    const { id } = useParams();

    const [userData, setUserData] = useState({})

    useEffect(() => {

        const authorize = async () => {
            const token = localStorage.getItem('token')
            console.log(token);
            if (token) {
                try {
                    const tokenAuth = await Axios.post('/auth', {token, id: Number(id)})
                    if (tokenAuth.data) {
                        console.log(tokenAuth.data);
                        const user = await Axios.post('/users/show', {id: Number(id)});
                        setUserData(user.data);
                    } else {
                        redirect('/login')
                    } 
                } catch (error) {
                    redirect('/login')
                    console.log(error);
                }
            } else {
                redirect('/login')
            }
        }
        // const user = async () => {
        //     const user = await Axios.post('/users/show', {id: Number(id)})
        //     setUserData(user.data);
        //     // console.log(user.data);
        // }
        authorize()
        // user()
    }, [])


    return (
        <>
            <Heeader data={user_data}/>
                <Container sx={{
                        paddingTop: "5em",
                        height: "50em", 
                        display: "flex", 
                        justifyContent: "space-evenly", 
                        alignItems: "center"}}>
                    <UserDetails user_data={user_data}/>
                    <RecentItemsList user_items={user_data.items}></RecentItemsList>
                    <RecentChats transactions={user_data.transactions}></RecentChats>
                </Container>
            <Footer />
        </>
    )
};

export default Dashboard;