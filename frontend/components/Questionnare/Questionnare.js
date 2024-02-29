import React, { useState } from 'react';

function Questionnare() {
  const [formData, setFormData] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    shellfishFree: false,
    other: '',
    allergies: '',
    preferences: '',
    email: '',
    name: '',
    ageGroup: '',
    gender: '',
    referralSource: '',
    receiveUpdates: false
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, you can send the data to the server or handle it as per your requirement
    console.log(formData);
  };

  return (
    <div>
      <h2>Dietary Restrictions Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Vegetarian:
          <input
            type="checkbox"
            name="vegetarian"
            checked={formData.vegetarian}
            onChange={handleChange}
          />
        </label>
        {/* Repeat similar label and input elements for other dietary restrictions */}
        {/* Add textareas and input fields for other questions */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        {/* Add other input fields and textareas as needed */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Questionnare;
