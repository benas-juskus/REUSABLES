import Heeader from '../../../components/layout/header';
import Footer from '../../../components/layout/footer';
import {Container} from "@mui/material";
import colorTheme from '../../layout/colorTheme';
import UserDetails from './dashboardComponents/userDetails';

const user_data = {
    id: 3,
    rating: 3.3,
    username: "Meghan",
    photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-TlIRtOXmmDA%2FWS8Ar-jMLDI%2FAAAAAAAAH58%2Fb03hdJmdDTs6j0X9d9FQOlHWAHYTJC6KQCK4B%2Fs1600%2FStock%252Bimages%252Bare%252Boften%252Bcasted%252Bwith%252Battractive%252Bpeople%252B...-790465.jpg"
};

const ItemsList = () => {
    return (
        <>

        </>
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
                <Container style={{backgroundColor: colorTheme.palette.secondary.light}}>
                    <UserDetails user_data={user_data}/>
                    <ItemsList></ItemsList>
                    <RecentChats></RecentChats>
                </Container>
            <Footer />
        </>
    )
};

export default Dashboard;