import Heeader from '../../layout/header';
import Footer from '../../layout/footer';
import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import axios from 'axios';
import Card from './info_card';


const Search = () => {

    const [data, setData] = useState([]);
    // const [query, setQuery] = useState("");

//     useEffect(() => {
//         const getAllItems = async () => {
//             const Items = await axios.get(`/items/search?q=${query}`);
//             console.log(Items.data);
//             setData(Items.data);
//         };
//         getAllItems();

// }, [query])

    return (
        <>
            <Heeader setData={setData}/>
            {/* <Heeader setQuery={setQuery}/> */}
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
                {data.map((item, index) => (
                    <Card key={index} name={item.name} description={item.description}/>
                ))}
                
            </Container>
            <Footer />
        </>
    )
};

export default Search;