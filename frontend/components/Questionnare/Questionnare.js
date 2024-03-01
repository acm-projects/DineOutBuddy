import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, CheckBox, Button } from 'react-native';

function Questionnaire() {
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

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission, you can send the data to the server or handle it as per your requirement
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dietary Restrictions Questionnaire</Text>
      {/* Checkboxes */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={formData.vegetarian}
          onValueChange={(value) => handleChange('vegetarian', value)}
        />
        <Text>Vegetarian</Text>
      </View>
      {/* Repeat similar checkbox containers for other dietary restrictions */}
      
      {/* Name input */}
      <View style={styles.inputContainer}>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
        />
      </View>
      {/* Repeat similar input containers for other fields */}
      
      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Questionnaire;

