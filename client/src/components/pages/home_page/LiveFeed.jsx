import Header from "../../layout/header";
import Footer from "../../layout/footer";
import React, { useState, useEffect } from "react";
import styles1 from "./LiveFeed.module.css";
import styles2 from "./LiveFeed.container.css";

const LiveFeedComponent = () => {
  const [feedData, setFeedData] = useState([]);
  const [photoData, setPhotoData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoreItems = async () => {
    setLoading(true);
    try {
      const newItemsResponse = await fetch("http://localhost:8000/items/rand");
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
        const response = await fetch("http://localhost:8000/items/rand");
        // console.log("response", response);
        const data = await response.json();
        // const response2 = await fetch("http://localhost:8000/items/rand");
        // console.log("response2", response2);
        // const data2 = await response2.json();
        // console.log("data", data);
        // console.log("data2", data2);
        const photoResponse = await fetch("http://localhost:8000/items/photos");
        const photoJson = await photoResponse.json();
        const photo = photoJson.data.photo;
        //     console.log("data", data);
        //     console.log("photo", photo);
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
      <Header />
      <div className={styles1}>
        <div id="container" className={styles2}>
          <h2>Live Feed</h2>
          <ul>
            {feedData &&
              feedData.map((item, index) => (
                <li key={item.id} style={{ width: "20%" }}>
                  <img src="https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  , <br /> {item.name}, <br /> {item.price} &euro; <br />
                  <button>Add to cart</button> <button>Add to wishlist</button>
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
