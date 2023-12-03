import React, { useState } from 'react';

const WishlistForm = () => {
  const [item, setItem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the access token from local storage
      const supabaseToken = localStorage.getItem('supabaseToken');
      console.log('Supabase Token:', supabaseToken);

      const response = await fetch('http://localhost:3001/add-to-wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${supabaseToken}`,
        },
        body: JSON.stringify({ item }),
      });
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log('Item added to wishlist:', result);
      } else {
        console.log('response not ok!!!')
        console.error('Error adding item to wishlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
    setItem('');
  };

  return (
    <div>
      <h2>Wishlist Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Wishlist Item:
          <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
        </label>
        <button type="submit">Add to Wishlist</button>
      </form>
    </div>
  );
};

export default WishlistForm;
