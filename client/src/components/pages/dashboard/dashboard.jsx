import Heeader from '../../../components/layout/header';
import Footer from '../../../components/layout/footer';
import {Container, Box} from "@mui/material";
import colorTheme from '../../layout/colorTheme';
import UserDetails from './dashboardComponents/userDetails';

const user_data = {
    id: 3,
    rating: 3.3,
    username: "Meghan",
    photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-TlIRtOXmmDA%2FWS8Ar-jMLDI%2FAAAAAAAAH58%2Fb03hdJmdDTs6j0X9d9FQOlHWAHYTJC6KQCK4B%2Fs1600%2FStock%252Bimages%252Bare%252Boften%252Bcasted%252Bwith%252Battractive%252Bpeople%252B...-790465.jpg",
    items: [
        {id: 15, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngmart.com%2Ffiles%2F8%2FInventory-PNG-Photos.png"},
        {id: 16, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngmart.com%2Ffiles%2F8%2FInventory-PNG-Photos.png"},
        {id: 17, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngmart.com%2Ffiles%2F8%2FInventory-PNG-Photos.png"},
        {id: 18, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngmart.com%2Ffiles%2F8%2FInventory-PNG-Photos.png"},
    ]
};

const SingleItemQuickView = ({item}) => {
    return (
        <Box style={{display: "flex"}}>
            <img src={item.photo} alt="item_image" style={{width: "5em", height: "5em", borderRadius: "10px", objectFit: "cover"}}></img>
            <h3 style={{marginLeft: "0.5em"}}>{item.name}</h3>
        </Box>
    )
}

const RecentItemsList = ({user_items}) => {
    return (
        <Box style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            {user_items.map((item) => (
                <SingleItemQuickView item={item}/>
            ))}
        </Box>
    )
};

const RecentChats = () => {
    return (
        <>

        </>
    )
}

const Dashboard = () => {
    return (
        <>
            <Heeader data={user_data}/>
                <Container style={{display: "flex", backgroundColor: colorTheme.palette.secondary.light}}>
                    <UserDetails user_data={user_data}/>
                    <Box>
                        <RecentItemsList user_items={user_data.items}></RecentItemsList>
                        <RecentChats></RecentChats>
                    </Box>
                </Container>
            <Footer />
        </>
    )
};

export default Dashboard;