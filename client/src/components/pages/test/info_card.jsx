import {Box} from "@mui/material";

import styled from "@emotion/styled";

const Wrapper = styled(Box) ({
    border: "1px solid black",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "5px",
})

const Username = styled(Box) ({
    padding: 0,
    margin: 0,
    fontSize: "1.5em",
})
const Email = styled(Box) ({
    padding: 0,
    margin: 0,
  
})

const Card = (props) => {

    return (
        <Wrapper>
            <Username >{props.name}</Username>
            <Email>{props.description}</Email>
        </Wrapper>
    )
}

export default Card