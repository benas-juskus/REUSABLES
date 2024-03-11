import React, { useEffect, useState } from 'react';

function App() {
  const [categories, setCategories] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [inputText, setInputText] = useState('');
  const [subcategoriesText, setSubcategoriesText] = useState({});
  const [subcategoryTexts, setSubcategoryTexts] = useState({});

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

  const handleInputChange = (event) => {
    setInputText(event.target.value);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      setReloadData(prev => !prev);

    } catch (error) {
      console.error('Error:', error);
    }
    console.log("inputText", inputText);
    setInputText('');
  };

  const handleSubmit2 = async (event, categoryText, categoryId) => {
    event.preventDefault();
    try {
      const response = await fetch(`/categories/${categoryId}/subcategories/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: categoryText, category_id: categoryId })
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      setReloadData(prev => !prev);
      // Optionally, handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle errors (e.g., show an error message)
    }
    
    setSubcategoriesText(prevState => ({
      ...prevState,
      [categoryId]: '' // Clear input after submission
    }));
    console.log("categoryText", categoryText, "categoryId", categoryId, "sent to:", `/categories/${categoryId}/subcategories`);
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
      // Optionally, handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle errors (e.g., show an error message)
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
      // Optionally, handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle errors (e.g., show an error message)
    }

    console.log("subcategoryId", subcategoryId, "sent to:", `/categories/${subcategoryId}/subcategories//${subcategoryId}`);
  };
  const handleSubmit5 = async (event, subcategoryText, subcategoryId) => {
    event.preventDefault();
    try {
        const response = await fetch(`/categories/${subcategoryId}/subcategories/${subcategoryId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: subcategoryText, category_id: subcategoryId })
        });
        if (!response.ok) {
            throw new Error('Failed to submit data');
        }
        setReloadData(prev => !prev);
        // Optionally, handle successful submission (e.g., show a success message)
    } catch (error) {
        console.error('Error:', error);
        // Optionally, handle errors (e.g., show an error message)
    }

    // Clear input after submission for the respective input field
    setSubcategoryTexts(prevState => ({
        ...prevState,
        [subcategoryId]: ''
    }));
    console.log("subcategoryText", subcategoryText, "subcategoryId", subcategoryId, "sent to:", `/categories/${subcategoryId}/subcategories/${subcategoryId}`);
};

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.title} 

          <button onClick={() => handleSubmit3(category.id)}>Delete</button>
          
          </h2>
        
          <ul>
        {category.SubCategories.map(subcategory => (
          <li key={subcategory.id}><form onSubmit={(event) => handleSubmit5(event, subcategoryTexts[subcategory.id], subcategory.id)}>
          <input
            placeholder={`rename subcategory ${subcategory.title}`}
            type="text"
            value={subcategoryTexts[subcategory.id] || subcategory.title}
            onChange={(event) => handleInputChanges2(subcategory.id, event.target.value)}
          />
          <button type='submit'>Submit</button>
        </form> <button onClick={() => handleSubmit4(subcategory.id)}>Delete</button>
          
          </li>
          
        ))}
      </ul>
          <form onSubmit={(event) => handleSubmit2(event, subcategoriesText[category.id], category.id)}>
            <input
              placeholder={`add subcategory for ${category.title}`}
              type="text"
              value={subcategoriesText[category.id] || ''}
              onChange={(event) => handleInputChanges(category.id, event)}
            />
            <button type='submit'>Submit</button>
          </form>
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder='add category'
            type="text"
            value={inputText}
            onChange={handleInputChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
