import Heeader from '../../layout/header';
import Footer from '../../layout/footer';
import {Container, Box} from "@mui/material";
import {useEffect, useState} from "react";
import axios from 'axios';
import Card from './info_card';


const Search = () => {
    const keys = ["username", "email"];

    const search = (data) => {
        return data.filter(item => 
            keys.some(key => item[key].toLowerCase().includes(query)));
    };

    useEffect(async () => {
   
        const Users = await axios.post("/users/showall");
        console.log(Users.data);
        setUsers(Users.data);

}, [])

    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    console.log(query);
    // console.log(data.filter((user) => user.username.toLowerCase().includes("ot")));
    return (
        <>
            <Heeader setQuery={setQuery}/>
                {/* <Container sx={{
                        paddingTop: "5em",
                        height: "50em", 
                        display: "flex", 
                        justifyContent: "space-evenly", 
                        alignItems: "center"}}>
                </Container> */}
            <Container
                sx={{
                    paddingTop: "1em", 
                    display: "flex", 
                    flexDirection: "column",
                    justifyContent: "space-evenly", 
                    alignItems: "center",
                    gap: "1em",
                    width: "400px",
                }}
            >
                {search(users).map((user) => (
                    <Card key={user._id} username={user.username} email={user.email}/>
                ))}
                
            </Container>
            <Footer />
        </>
    )
};

export default Search;