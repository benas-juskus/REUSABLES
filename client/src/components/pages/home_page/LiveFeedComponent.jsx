// import Header from "../../layout/header";
// import Footer from "../../layout/footer";
import React, { useState, useEffect } from "react";
import styles1 from "./LiveFeed.module.css";
import styles2 from "./LiveFeed.container.css";
// import Heart from "react-animated-heart";

const LiveFeedComponent = (props) => {
  // const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoreItems = async () => {
    setLoading(true);
    try {
      const newItemsResponse = await fetch(`http://localhost:8000/items/rand${props.ammount}`);
      const newItems = await newItemsResponse.json();
      console.log("newItems", newItems);
      setFeedData((prevItems) => [...prevItems, ...newItems]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      fetchMoreItems();
      console.log("fetching more items");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const fetchFeedData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/items/rand${props.ammount}`);
        const data = await response.json();
        const photoResponse = await fetch("http://localhost:8000/items/photos");
        const photoJson = await photoResponse.json();
        const photo = photoJson.data.photo;
        setFeedData(data);
        setPhotoData(photo);
      } catch (error) {
        console.error("Error fetching live feed data", error);
      }
    };
    fetchFeedData();

    // const refreshInterval = setInterval(fetchFeedData, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // clearInterval(refreshInterval);
    };
  }, []);
  return (
    <>
      <div className={styles1} >
        <div id="container" className={styles2}>
          <h2>&nbsp;</h2>
          <ul>
            {feedData &&
              feedData.map((item, _) => (
                <li key={item.id} style={{ width: `${props.width}` }}>
                  <a href="#"><img src="https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="item_image" /> </a>
                   <br />
                   <div style={{textAlign:'left', marginLeft:'2.3rem', marginBottom:'20px', fontWeight:'bold'}}> {item.SubCategories.title}
                   {/* <Heart  isClick={isHeartClicked} onClick={() => setIsHeartClicked(!isHeartClicked)} /> */}
                   </div>
                    <h2>{item.name}</h2>  <span style={{fontFamily:'monospace', fontWeight:'bold'}}> {item.price}</span> <span style={{color:" hsl(0, 0%, 25%) ", fontWeight:'bold'}}> &euro; </span><br />
                  {/* <button>Add to cart</button> <button>Add to wishlist</button> */}
                  <button>Trade</button> <button>Like</button>
                </li>
              ))}
          </ul>
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </>
  );
};

export default LiveFeedComponent;
