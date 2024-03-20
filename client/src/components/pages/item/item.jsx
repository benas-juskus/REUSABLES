import Heeader from '../../layout/header';
import Footer from '../../layout/footer';
import {Container} from "@mui/material";
import { useEffect, useState } from 'react';
import Axios from 'axios'
import ItemInfo from '../item/itemComponents/itemInfo';
import colorTheme from "../../../components/layout/colorTheme";
import Stats from '../item/itemComponents/ItemStats';
import GallerySection from '../item/itemComponents/gallerySection';
import InfoSection from '../item/itemComponents/infoSection';






const ItemPage= ({ user_data}) => {

    const [item, setItem] = useState({})
    const [favoured, setFavoured] = useState("")

    let item_id = 3

    useEffect(() => {
        const getItem = async () => {
            try {
                const item = await Axios.get(`/items/${item_id}`);
                const favCount = await Axios.get(`/items/fav/${item_id}`)
                console.log(favCount.data);
                console.log(item.data);
                setItem(item.data);
                setFavoured(favCount.data)
            } catch (error) {
                console.log(error);
            }
        }
        getItem()
    }, [])
    return (
        <Container sx={{display: "flex", flexDirection: "column", height: "100vh", width: "100%"}} style={{padding: "0"}}>
            <Heeader data={user_data}/>
            <Container sx={{flexGrow: 1, display:"flex"}} style={{padding: "0"}}>    
                <GallerySection itemName={item.name}/>
                <InfoSection item={item} favoured={favoured}/>
            </Container>
            <Footer />
        </Container>
    )
};

export default ItemPage;