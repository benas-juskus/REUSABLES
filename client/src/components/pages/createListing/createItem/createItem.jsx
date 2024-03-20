import React, { useEffect, useState } from "react";
import "../stylesheet.css";

const CreateItem = () => {
  const [reloadData, setReloadData] = useState(false);
  const [categories, Categories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [for_sale, setfor_sale] = useState(false);
  const [exchange, setexchange] = useState(false);

  const [visibility, setVisibility] = useState("1");

  const [categoryId, setCategoryId] = useState("");
  const [subcategories_id, setsubcategories_id] = useState("");
  const [tradecategoryId, settradeCategoryId] = useState("");
  const [tradesubcategories_id, settradesubcategories_id] = useState("");

  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState("");

  const [subcategories, setSubcategories] = useState([]);
  const [tradesubcategories, setTradeSubcategories] = useState([]);

  //Fetch categories
  useEffect(() => {
    fetch("/categories/")
      .then((response) => response.json())
      .then((data) => {
        Categories(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reloadData]);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (categoryId) {
        try {
          const response = await fetch(
            `/categories/${categoryId}/subcategories`
          );
          const subcategoriesData = await response.json();
          setSubcategories(subcategoriesData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    console.log(subcategories);

    fetchSubcategories();
  }, [categoryId]);

  useEffect(() => {
    const fetchTradeSubcategories = async () => {
      if (tradecategoryId) {
        try {
          const response = await fetch(
            `/categories/${tradecategoryId}/subcategories`
          );
          const subcategoriesData = await response.json();
          setTradeSubcategories(subcategoriesData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    console.log(subcategories);

    fetchTradeSubcategories();
  }, [tradecategoryId]);

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handlefor_saleChange = (e) => {
    setfor_sale(e.target.checked);
  };

  const handleexchangeChange = (e) => {
    setexchange(e.target.checked);
  };

  const handleSubmit = async (
    event,
    name,
    description,
    for_sale,
    exchange,
    price,
    visibility,
    subcategories_id,
    tradesubcategories_id,
    photo
  ) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("user_id", 1);
      formData.append("subcategories_id", subcategories_id);
      formData.append("tradesubcategories_id", tradesubcategories_id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("for_sale", for_sale);
      formData.append("exchange", exchange);
      formData.append("visibility", visibility);
      formData.append("photo", photo);

      const response = await fetch("/items/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("sending data:", photo);
  };

  const handleCategoryChange = async (event) => {
    const selectedCategoryId = event.target.value;
    setCategoryId(selectedCategoryId);
  };

  const handleTradeCategoryChange = async (event) => {
    const selectedTradeCategoryId = event.target.value;
    settradeCategoryId(selectedTradeCategoryId);
  };

  return (
    <>
      <form
        onSubmit={(event) =>
          handleSubmit(
            event,
            name,
            description,
            for_sale,
            exchange,
            price,
            visibility,
            subcategories_id,
            tradesubcategories_id,
            photo
          )
        }
      >
        <div class="StyledMain">
          <div class="left">
            <img
              src={
                photo
                  ? URL.createObjectURL(photo)
                  : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
              }
              alt="/nophoto.jpg"
            />

            <div>
              <label for="photo">Select a photo:</label>
              <input
                accept="image/*"
                type="file"
                id="photo"
                name="photo"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div class="middle">
            <div>
              <label>Category:</label>
              <select
                name="category"
                value={categoryId}
                onChange={(event) => handleCategoryChange(event)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>

              {/* Render available subcategories after selecting a category */}
              {subcategories.length > 0 && (
                <div>
                  <label>Subcategories:</label>
                  <select
                    value={subcategories_id}
                    onChange={(e) => setsubcategories_id(e.target.value)}
                  >
                    {subcategories.map((subcategory) => (
                      <option value={subcategory.id}>
                        {subcategory.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label>Title: </label>
              <input
                placeholder="Item name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <div> 
                <label for="for_sale">For sale</label>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={for_sale}
                  onChange={handlefor_saleChange}
                />
               
                {for_sale ? (
                
                    <input
                    placeholder="Item price"
                      type="number"
                      min={0}
                      name=""
                      id=""
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
              
                ) : null}
              </div>
              <div>
                <label for="exchange">Trade</label>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value={exchange}
                  onChange={handleexchangeChange}
                />
                
                {exchange ? (
                  <div>
                    <label>I want to exchange this to:</label>
                    <div>


              <label>Category:</label>
                  {/* I didnt find the controller for exchange to table so this function does not fetch any data to the server right now */}
              <select
                name="category"
                value={tradecategoryId}
                onChange={(event) => handleTradeCategoryChange(event)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>

              {/* Render available subcategories after selecting a category */}
              {tradesubcategories.length > 0 && (
                <div>
                  <label>Subcategories:</label>
                  <select
                    value={tradesubcategories_id}
                    onChange={(e) => settradesubcategories_id(e.target.value)}
                  >
                    {tradesubcategories.map((tradesubcategory) => (
                      <option value={tradesubcategory.id}>
                        {tradesubcategory.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
                  

                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div class="right">
            <div>
              <textarea
                placeholder="item description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>

            <div>
              <label>Item visisbility</label>
              <select
                name=""
                id=""
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="1">public</option>
                <option value="0">private</option>
              </select>
            </div>
            <button type="submit">CREATE LISTING</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateItem;
