import React, { useEffect, useState } from 'react';

function App() {
  const [categories, setCategories] = useState([]);
  const [inputText, setInputText] = useState('');
  const [subcategoriesText, setSubcategoriesText] = useState({});

  useEffect(() => {
    fetch("/test/")
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
      // Optionally, handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle errors (e.g., show an error message)
    }
    console.log("inputText", inputText);
    setInputText(''); // Clear input after submission
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
      window.location.reload();
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



  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.title} <a href="">Delete</a></h2>
          <ul>
        {category.SubCategories.map(subcategory => (
          <li key={subcategory.id}>{subcategory.title}</li>
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
