import { useState } from "react";
import {Formik} from 'formik'
import { createTheme, Button, Box} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import styled from "@emotion/styled";
import colorTheme from "./colorTheme";
import { Link } from 'react-router-dom'


const Wrapper = styled(Box) ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: colorTheme.palette.primary.main,
    padding: '1.5em 0.5em 1.5em 3em'
});

const Logo = styled(Box) ({
    alignSelf: "center",
    height: "7em",
    width: "7em"
});

const Nav = styled(Box) ({
    maxWidth: "80%",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
});

const Search = styled(OutlinedInput) ({
    width: "75%",
    height: "3em",
});

const UserPanel = styled(Box) ({
    width: "25%",
    maxWidth: "55%",
    display: 'flex',
    justifyContent: 'space-evenly'
});

const UserPanelInfo = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    aligItems: 'center',
    justifyContent: 'center'
})

const Avatar = styled(Box) ({
    alignSelf: "center",
    height: "4em",
    width: "4em"
});

const UserPanelBtns = styled(Box) ({
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column'
});

const Header = ({username = 'Username'}) => {
    
    return (
        <Wrapper>
        
            <Logo component="img" src="./assets/logos/Logo-main-no-bg.png" alt="logo"/>

            <Nav>
                <Search placeholder="Search items">Search listings</Search>
                <Button variant="contained" style={{
                        height: "3em",
                        marginTop: "0.8em",
                        color: colorTheme.palette.primary.dark,
                        backgroundColor: colorTheme.palette.secondary.light
                        }}>+ List new item
                </Button>
                
                <Button variant="contained" style={{
                        height: "3em",
                        marginTop: "0.8em",
                        backgroundColor: colorTheme.palette.primary.dark
                        }}>View Categories
                </Button>
            </Nav>

            <UserPanel>
                <UserPanelInfo>
                    <Avatar component="img" src="./assets/logos/Logo-main-no-bg.png" alt="avatar"/>
                    <p>{username}</p>
                </UserPanelInfo>

                <UserPanelBtns>
                    <Button variant="contained" size="small" style={{backgroundColor: colorTheme.palette.primary.dark}}>Login</Button>
                    <Button variant="contained" size="small" style={{backgroundColor: colorTheme.palette.primary.dark}}>Register</Button>
                </UserPanelBtns>
            </UserPanel>

        </Wrapper>
    )
}

export default Header;