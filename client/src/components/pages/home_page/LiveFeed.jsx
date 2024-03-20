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
      const newItemsResponse = await fetch("http://localhost:8000/items/all");
      const newItems = await newItemsResponse.json();
      setFeedData((prevItems) => [...prevItems, ...newItems]);
      console.log(newItems);
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
        const response = await fetch("http://localhost:8000/items/all");
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

    const refreshInterval = setInterval(fetchFeedData, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(refreshInterval);
    };
  }, []);
  return (
    <>
      <Header />
      <div className={styles1}>
        <div id="container" className={styles2}>
          <h2>Live Feed</h2>
          <ul>
            {feedData.map((item, _) => (
              <li key={item.id} style={{ width: "20%" }}>
                <img src={photoData[0].photo} />, <br /> {item.name}, <br />{" "}
                {item.price} &euro; <br />
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
