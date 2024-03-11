import Heeader from '../../../components/layout/header';
import Footer from '../../../components/layout/footer';
import {Container} from "@mui/material";
import colorTheme from '../../layout/colorTheme';

const Dashboard = () => {
    return (
        <>
            <Heeader />
                <Container style={{backgroundColor: colorTheme.palette.secondary.light}}>
                I am the container
                </Container>
            <Footer />
        </>
    )
};

export default Dashboard;