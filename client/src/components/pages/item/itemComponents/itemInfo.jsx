import { Box } from "@mui/material";

const ItemInfo = (props) => {
    
    return (
        <Box>
            <p>{props.item.description}</p>
            {props.item.price && <p>{props.item.price}</p>}
            {props.for_sale && <button>Buy</button>}
            {props.exchange && <button>Exchange</button>}
        </Box>
    )

}

export default ItemInfo