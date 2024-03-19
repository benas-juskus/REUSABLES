import Heeader from '../../layout/header';
import Footer from '../../layout/footer';
import {Container, Button, Box} from "@mui/material";
import UserDetails from '../dashboard/dashboardComponents/userDetails';
import RecentItemsList from '../dashboard/dashboardComponents/recentItems';
import RecentChats from '../dashboard/dashboardComponents/recentChats';
import Gallery from '../item/itemComponents/itemGallery';
import styled from "@emotion/styled";
import { useEffect, useState } from 'react';
import Axios from 'axios'
import ItemInfo from '../item/itemComponents/itemInfo';

const Wrapper = styled(Box) ({
    border: "1px solid black",
    borderRadius: "5px",
    width: "fit-content",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
    // marginTop: "2em",
    background: "linear-gradient(to right bottom, #F9EFDB, #9DBC98) ",
})



const ItemPage= ({ user_data}) => {

    const [item, setItem] = useState({})

    let item_id = 5

    useEffect(() => {
        const getItem = async () => {
            try {
                const item = await Axios.get(`/items/${item_id}`);
                console.log(item.data);
                setItem(item.data);
            } catch (error) {
                console.log(error);
            }
        }
        getItem()
    }, [])
    return (
        <>
            <Heeader data={user_data}/>
                {/* <Container sx={{
                        paddingTop: "5em",
                        height: "50em", 
                        display: "flex", 
                        justifyContent: "space-evenly", 
                        alignItems: "center"}}>
                    <UserDetails user_data={user_data}/>
                    <RecentItemsList user_items={user_data.items}></RecentItemsList>
                    <RecentChats transactions={user_data.transactions}></RecentChats>
                </Container> */}
            <Container sx={{display:"flex"}}>
                <Box>
                    <h1>{item.name}</h1>
                </Box>
                <Wrapper className="gallery-wrapper">
                    <Gallery />
                </Wrapper>
                <ItemInfo item={item} for_sale={item.for_sale} exchange={item.exchange}/>
            </Container>    
            {/* <Footer /> */}
        </>
    )
};

export default ItemPage;