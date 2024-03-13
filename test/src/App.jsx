import React, { useEffect, useState } from 'react';

//Define functions
function App() {
  const [categories, setCategories] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [inputText, setInputText] = useState('');
  const [subcategoriesText, setSubcategoriesText] = useState({});
  const [subcategoriesNr, setsubcategoriesNr] = useState({});
  const [subcategoryTexts, setSubcategoryTexts] = useState({});
  const [categoryTexts, setcategoryTexts] = useState({})
  const [nr, setnr] = useState({})

  //Fetch data and reload when updated
  useEffect(() => {
    fetch("/test/")
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [reloadData]);

  //Input change handlers
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleNumberChange = (event) => {
    setnr(event.target.value);
  }
  const handleNumberChange2 = (categoryId, event) => {
    const newnr = event.target.value;
    setsubcategoriesNr(prevState => ({
      ...prevState,
      [categoryId]: newnr
    }));
  };

  const handleInputChanges = (categoryId, event) => {
    const newText = event.target.value;
    setSubcategoriesText(prevState => ({
      ...prevState,
      [categoryId]: newText
    }));
  };

  const handleInputChanges2 = (categoryId, value) => {
    setSubcategoryTexts(prevState => ({
      ...prevState,
      [categoryId]: value
    }));
  };
  const handleInputChanges3 = (categoryId, value) => {
    setcategoryTexts(prevState => ({
      ...prevState,
      [categoryId]: value
    }));
  };

  //Submit handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText, nr: nr })
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      //Reload data if responsise is ok
      setReloadData(prev => !prev);

    } catch (error) {
      console.error('Error:', error);
    }

    console.log("inputText", inputText, "nr", nr);
    //Clear input fields
    setInputText('');
    setnr('');
  };

  const handleSubmit2 = async (event, subcategoryText, categoryId, categoryNumber) => {
    event.preventDefault();
    try {
      const response = await fetch(`/categories/${categoryId}/subcategories/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: subcategoryText, category_id: categoryId, Nr: categoryNumber })
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      setReloadData(prev => !prev);

      // Reset the subcategory number input field to an empty string using the category number as the key
      setsubcategoriesNr(prevState => ({
        ...prevState,
        [categoryNumber]: ''
      }));
    } catch (error) {
      console.error('Error:', error);
    }

    // Reset the subcategory text input field to an empty string
    setSubcategoriesText(prevState => ({
      ...prevState,
      [categoryId]: ''
    }));
  };


  const handleSubmit3 = async (categoryId) => {
    try {
      const response = await fetch(`/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      setReloadData(prev => !prev);
    } catch (error) {
      console.error('Error:', error);
    }

    console.log("categoryId", categoryId, "sent to:", `/categories/`);
  };
  const handleSubmit4 = async (subcategoryId) => {
    try {
      const response = await fetch(`/categories/${subcategoryId}/subcategories//${subcategoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      setReloadData(prev => !prev);
    } catch (error) {
      console.error('Error:', error);
    }

    console.log("subcategoryId", subcategoryId, "sent to:", `/categories/${subcategoryId}/subcategories//${subcategoryId}`);
  };
  const handleSubmit5 = async (event, subcategoryText, subcategoryId, subcategoriesNr) => {
    event.preventDefault();
    try {
      const response = await fetch(`/categories/${subcategoryId}/subcategories/${subcategoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: subcategoryText, category_id: subcategoryId, Nr: subcategoriesNr })
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      setReloadData(prev => !prev);
      setsubcategoriesNr(prevState => ({
        ...prevState,
        [subcategoryId]: ''
      }));
    } catch (error) {
      console.error('Error:', error);
    }

    setSubcategoryTexts(prevState => ({
      ...prevState,
      [subcategoryId]: ''
    }));
    console.log(subcategoriesNr, "subcategoryText", subcategoryText, "subcategoryId", subcategoryId, "sent to:", `/categories/${subcategoryId}/subcategories/${subcategoryId}`);
  };




  const handleSubmit6 = async (event, categoryText, categoryId, categoryNr) => {
    event.preventDefault();
    try {
      const response = await fetch(`/categories/${categoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: categoryText, category_id: categoryId, Nr: categoryNr })
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      setReloadData(prev => !prev);

      // Reset the subcategoriesNr for the specific category ID
      setsubcategoriesNr(prevState => ({
        ...prevState,
        [categoryId]: ''
      }));

    } catch (error) {
      console.error('Error:', error);
    }

    // Reset the categoryTexts for the specific category ID
    setcategoryTexts(prevState => ({
      ...prevState,
      [categoryId]: ''
    }));

    console.log("categoryText", categoryText, "categoryId", categoryId, "sent to:", `/categories/${categoryId}`);
  };



  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.title} {category.nr}</h2>

          <button onClick={() => handleSubmit3(category.id)}>Delete</button>

          <form onSubmit={(event) => handleSubmit6(event, categoryTexts[category.id], category.id, subcategoriesNr[category.id])}>
            {/* SubcategoriesNr ne subkategorija, o kintamasis kategorijos numeriui pakeisti. Naudoju subcatogiresNr kintamaji kad nereiketu kartot kodo */}
            <input
              placeholder={`Rename category ${category.title}`}
              type="text"
              value={categoryTexts[category.id]}
              onChange={(event) => handleInputChanges3(category.id, event.target.value)}
            />
            <input
              placeholder='Change category number'
              onChange={(event) => handleNumberChange2(category.id, event)}
              value={subcategoriesNr[category.id]} // Use category ID to retrieve the value
              type="number"
              name=""
              id=""
              pattern='[0-9]*'
              inputMode='numeric'
            />            <button type='submit'>Submit</button>
          </form>
          <ul>
            {category.SubCategories.map(subcategory => (
              <li key={subcategory.id}>
                <p>{subcategory.title} {subcategory.nr}</p>
                <form onSubmit={(event) => handleSubmit5(event, subcategoryTexts[subcategory.id], subcategory.id, subcategoriesNr[subcategory.id])}>
                  <input
                    placeholder={`Rename subcategory ${subcategory.title}`}
                    type="text"
                    value={subcategoryTexts[subcategory.id]}
                    onChange={(event) => handleInputChanges2(subcategory.id, event.target.value)}
                  />
                  <input
                    placeholder='Change subcategory number'
                    onChange={(event) => handleNumberChange2(subcategory.id, event)}
                    value={subcategoriesNr[subcategory.id]} // Use subcategory ID as the key to access the value
                    type="number"
                    name=""
                    id=""
                    pattern='[0-9]*'
                    inputMode='numeric'
                  />
                  <button type='submit'>Submit</button>
                </form> <button onClick={() => handleSubmit4(subcategory.id)}>Delete</button>
              </li>

            ))}
          </ul>
          <form onSubmit={(event) => handleSubmit2(event, subcategoriesText[category.id], category.id, subcategoriesNr[category.nr])}>
            <input
              placeholder={`Add subcategory for ${category.title}`}
              type="text"
              value={subcategoriesText[category.id] || ''}
              onChange={(event) => handleInputChanges(category.id, event)}
            />
            <input
              required
              placeholder='Subcategory number'
              onChange={(event) => handleNumberChange2(category.nr, event)}
              value={subcategoriesNr[category.nr]}
              type="number"
              name=""
              id=""
              pattern='[0-9]*'
              inputMode='numeric'
            />          <button type='submit'>Submit</button>
          </form>
          <hr />
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='Add category'
            type="text"
            value={inputText}
            onChange={handleInputChange}
          />
          <input required placeholder='Category number' type="number" onChange={handleNumberChange} value={nr} name="" id="" pattern='[0-9]*' inputMode='numeric' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;