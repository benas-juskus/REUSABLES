import {Box} from "@mui/material";
import styled from "@emotion/styled";
import colorTheme from "./colorTheme";

const Wrapper = styled(Box) ({
    width: "100%",
    position: "absolute",
    bottom: "0",
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: colorTheme.palette.primary.main,
    color: colorTheme.palette.secondary.light,
    padding: '1.5em 0.5em 1.5em 3em'
});

const Footer = () => {
    return (
        <Wrapper>
            <span>KTMC || REUSABLES © 2024. All rights reserved</span>
        </Wrapper>
    )
}


export default Footer;

