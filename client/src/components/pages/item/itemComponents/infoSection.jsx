import {Container} from "@mui/material";
import colorTheme from "../../../layout/colorTheme";
import Stats from './ItemStats';
import ItemInfo from './itemInfo';
import OwnerInfo from "./itemOwnerInfo";

const InfoSection = (props) => {

    return (
        <Container  
            className="info-wrapper" 
            sx={{
                display:"flex",
                flexDirection:"column", 
                height:"100%", 
                backgroundColor: colorTheme.palette.secondary.light, 
                }}
            style={{padding:"3.5rem 0 0"}}>
            <Stats item={props.item} favoured={props.favoured}/>
            <ItemInfo item={props.item} for_sale={props.item.for_sale} exchange={props.item.exchange}/>
            <OwnerInfo item={props.item} />

        </Container>  
    )
}

export default InfoSection