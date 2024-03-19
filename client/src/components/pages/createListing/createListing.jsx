import Heeader from '../../../components/layout/header';
import Footer from '../../../components/layout/footer';
import CreateItem  from './createItem/createItem';

// This is just some mock data for dev purposes.
const user_data = {
    id: 3,
    rating: 3.3,
    username: "Meghan",
    photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-TlIRtOXmmDA%2FWS8Ar-jMLDI%2FAAAAAAAAH58%2Fb03hdJmdDTs6j0X9d9FQOlHWAHYTJC6KQCK4B%2Fs1600%2FStock%252Bimages%252Bare%252Boften%252Bcasted%252Bwith%252Battractive%252Bpeople%252B...-790465.jpg",
    items: [
        {id: 15, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F75525e65-2fed-4d38-8749-e5ae1868b534.1520148fcfd9503a20d125194b5db9d6.jpeg"},
        {id: 16, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.antiquepottery.co.uk%2Fwp-content%2Fuploads%2F2019%2F08%2F1085899.jpg"},
        {id: 17, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2xcq4qphg1ge9.cloudfront.net%2Fassets%2F155264%2F3318187%2Foriginal_drill.jpg"},
        {id: 18, name: "Item Name", photo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thesprucecrafts.com%2Fthmb%2Fzu2AMOgH3zrIHoWo1SA2PJSqVnY%3D%2F1150x0%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2FGettyImages-131961180-59ed564e03f4020011ee1377.jpg"},
    ],
    transactions: [
        {id: 1, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: null, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 2, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: 27, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 3, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: null, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 4, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: 27, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 1, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: null, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"},
        {id: 2, user1_id: 3, user2_id: 4, item1_id: 18, item2_id: 27, user1_conf: 0, user2_conf: 0, final_price: null, created_at: "2022-01-01"}
    ]
};

const CreateListing = () => {
    return (
        <>
            <Heeader data={user_data}/>
            <CreateItem/>
            <Footer />
        </>
    )
};

export default CreateListing;