import { useState, useEffect} from "react";
import {Formik} from 'formik';
import { Link } from 'react-router-dom';
import { Button, Box} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import styled from "@emotion/styled";
import colorTheme from "./colorTheme";
import axios from 'axios';

const user_data = {
    id: 3,
    username: "username",
    photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-TlIRtOXmmDA%2FWS8Ar-jMLDI%2FAAAAAAAAH58%2Fb03hdJmdDTs6j0X9d9FQOlHWAHYTJC6KQCK4B%2Fs1600%2FStock%252Bimages%252Bare%252Boften%252Bcasted%252Bwith%252Battractive%252Bpeople%252B...-790465.jpg"
};

const mock_categories = [
    {id: 1, cat: "category 1", link: "/category/1"},
    {id: 2, cat: "category 2", link: "/category/2"},
    {id: 3, cat: "category 3", link: "/category/3"},
    {id: 4, cat: "category 4", link: "/category/4"},
    {id: 5, cat: "category 5", link: "/category/5"},
    {id: 6, cat: "category 6", link: "/category/6"},
    {id: 7, cat: "category 7", link: "/category/7"},
    {id: 8, cat: "category 8", link: "/category/8"},
    {id: 9, cat: "category 9", link: "/category/9"},
    {id: 10, cat: "category 10", link: "/category/10"},
];

const Wrapper = styled(Box) ({
    width: "100%",
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: colorTheme.palette.primary.main,
    padding: '1.5em 0 1.5em'
});

const Logo = styled(Box) ({
    alignSelf: "center",
    height: "7em",
    width: "7em",
    marginLeft: "3em"
});

const Nav = styled(Box) ({
    width: "80%",
    maxWidth: "35em",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
});

const SearchInput = styled(OutlinedInput) ({
    width: "100%",
    height: "3em",
});

const SearchForm = ({setData}) => {
    const [query, setQuery] = useState("");
    // const [data, setData] = useState([]);

    // useEffect(() => {
    // const getAllItems = async () => {
    //     const Items = await axios.get(`/items/search?q=${query}`);
    //     console.log(Items.data);
    //     setData(Items.data);
    // };
    // getAllItems();

    // }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/items/search', { params: { q: query } });
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
    }
};
    return(
        <Formik  style={{width: "100%"}}>
            <form  onSubmit={handleSubmit} style={{width: "100%"}}>
                <SearchInput 
                    placeholder="Search..." 
                    name="search_for"
                    onChange={e => setQuery(e.target.value)}
                    />
            </form>
        </Formik>
    )
}

const UserPanel = styled(Box) ({
    width: "35%",
    maxWidth: "20em",
    display: 'flex',
    justifyContent: 'space-evenly'
});

const Avatar = styled(Box) ({
    borderRadius: "50%",
    alignSelf: "center",
    height: "4em",
    width: "4em",
    objectFit: "cover"
});

const UserPanelInfo = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    aligItems: 'center',
    justifyContent: 'center'
});

const UserPanelBtns = styled(Box) ({
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column'
});

const LogInButton = () => {
    return (
        <Button 
            href="/login" 
            variant="contained" 
            size="small" 
            style={{backgroundColor: colorTheme.palette.primary.dark}}>
            Log In
        </Button>
    )
};

const LogOutButton = ({user_id}) => {
    return (
        <Button 
            href={`/logout/${user_id}`} 
            variant="contained" size="small" 
            style={{backgroundColor: colorTheme.palette.primary.dark}}>
            Log out
        </Button>
    )
};

const RegisterButton = () => {
    return (
        <Button 
            href="/register" 
            variant="contained" 
            size="small" 
            style={{backgroundColor: colorTheme.palette.primary.dark}}>
            Register
        </Button>
    )
};

const MyItemsButton = () => {
    return (
        <Button 
            href="/myitems" 
            variant="contained" 
            size="small" 
            style={{backgroundColor: colorTheme.palette.primary.dark}}>
            My Items
        </Button>
    )
};

const CategoriesList = styled(Box) ({
    textAlign: "center",
    padding: "1em 0",
    marginTop: "0",
    listStyle: "none",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: colorTheme.palette.secondary.dark,
});

const CategoriesPanel = ({data, visibility}) => {
    return(
        <CategoriesList component="ul" style={{display: visibility ? "flex" : "none"}}>
            {data.map(data => <li style={{margin: "0.4em 3em", minWidth: "25%"}} key={data.id}><a style={{textDecoration: "none", color: "black"}} href={data.link}>{data.cat}</a></li>)}
        </CategoriesList>
        
    )
};

const Header = ({data = user_data ? user_data : null,setData}) => {

    const [isVisible, setIsVisible] = useState(false);
    // const [query, setQuery] = useState("");
    // console.log(query);
    const toggleCategoriesVisibility = () => {
        setIsVisible(!isVisible);
    };
    
    return (
        <>
        <Wrapper>
        
            <Link to="/">
                <Logo component="img" src="./assets/logos/Logo-main-no-bg.png" alt="logo"/>
            </Link>

            <Nav>
                <SearchForm setData={setData}/>
                <Box sx={{width: "100%", display: "flex", justifyContent: "space-evenly"}}>
                    <Button variant="contained"
                            href="/items/create"
                            style={{
                                height: "3em",
                                marginTop: "0.8em",
                                color: colorTheme.palette.primary.dark,
                                backgroundColor: colorTheme.palette.secondary.light
                            }}>+ List new item
                    </Button>
                    
                    <Button variant="contained" 
                            onClick={toggleCategoriesVisibility}
                            style={{
                                height: "3em",
                                marginTop: "0.8em",
                                backgroundColor: colorTheme.palette.primary.dark
                            }}>View Categories
                    </Button>
                </Box>
            </Nav>

            <UserPanel>
                <UserPanelInfo>
                    <Link to="/dashboard">
                        <Avatar component="img" src={data.id ? data.photo : "./assets/logos/Logo-main-no-bg.png"} alt="avatar"/>
                    </Link>
                    <p>{data.id ? data.username : "Guest"}</p>
                </UserPanelInfo>

                <UserPanelBtns>
                    {data.id ? <LogOutButton user_id={data.id}/>  : <LogInButton/>}
                    {data.id ? <MyItemsButton/> : <RegisterButton/>}
                </UserPanelBtns>
            </UserPanel>
            

        </Wrapper>
        <CategoriesPanel data={mock_categories} visibility={isVisible}/>
        </>
    )
}

export default Header;