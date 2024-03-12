import Heeader from '../../../components/layout/header';
import Footer from '../../../components/layout/footer';
import {Container, Box, Button} from "@mui/material";
import colorTheme from '../../layout/colorTheme';
import UserDetails from './dashboardComponents/userDetails';
import RecentItemsList from './dashboardComponents/recentItems';

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

const RecentChats = () => {
    return (
        <Box sx={{boxShadow: 1, backgroundColor: colorTheme.palette.secondary.light, minHeight: "100%", width: "30%"}}>
        Messenger component will go here
        </Box>
    )
}

const Dashboard = () => {
    return (
        <>
            <Heeader data={user_data}/>
                <Container sx={{paddingTop: "5em",height: "50em", display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                    <UserDetails user_data={user_data}/>
                    <RecentItemsList user_items={user_data.items}></RecentItemsList>
                    <RecentChats></RecentChats>
                </Container>
            <Footer />
        </>
    )
};

export default Dashboard;