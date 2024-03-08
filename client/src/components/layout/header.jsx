import { useState } from "react";
import {Formik} from 'formik'
import { createTheme, Button, Box} from "@mui/material";
import TextField from '@mui/material/TextField';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom'

const headerTheme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#9DBC98",
        dark: "#638889",
        contrastText: "#fff"
      },
      secondary: {
        light: "#fcf6e8",
        main: "#F9EFDB",
        dark: "#EBD9B4",
        contrastText: "#000"
      }
    }
  });

const Logo = styled(Box) ({
    height: "5em",
    width: "5em"
})

const Nav = styled(Box) ({
    display: 'flex',
    backgroundColor: headerTheme.palette.primary.main,
});

const Search = styled(TextField) ({

});

const UserPanel = styled(Box) ({
    display: 'flex'
})
const Avatar = styled(Box) ({
    height: "3em",
    width: "3em"
})
const UserPanelBtns = styled(Box) ({
    display: 'flex',
    flexDirection: 'column'
})
const Wrapper = styled(Box) ({
    display: 'flex',
    backgroundColor: headerTheme.palette.primary.main,
    padding: '20px'
})

const Header = () => {
    
    return (
        <Wrapper>
            <Logo component="img" src="./assets/logos/Logo-main-no-bg.png" alt="logo"/>
            <Nav>
                <Button variant="contained">+ List new item</Button>
                <Search></Search>
                <Button variant="contained">View Categories</Button>
            </Nav>
            <UserPanel>
                <Avatar component="img" src="./assets/logos/Logo-main-no-bg.png" alt="avatar"/>
                <UserPanelBtns>
                    <Button variant="contained">Login</Button>
                    <Button variant="contained">Register</Button>
                </UserPanelBtns>
            </UserPanel>
        </Wrapper>
    )
}

export default Header;