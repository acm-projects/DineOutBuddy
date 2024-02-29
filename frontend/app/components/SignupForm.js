import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { isValidElement, useState } from 'react'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormSubmitBtn from './FormSubmitBtn'
import { isValidObjField, updateError, isValidEmail } from '../utils/methods';


const SignupForm = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
  })

  const { fullName, userName, email, password } = userInfo;

  const [error, setError] = useState('')

  const handleOnChange = (value, fieldName) => {
    setUserInfo({...userInfo, [fieldName]: value})
  }

  const isValidForm = () => {
    if (!isValidObjField(userInfo)) return updateError('Required all field', setError);

    if(!fullName.trim() || fullName.length < 3) return updateError('Name is too short', setError);

    if(!isValidEmail(email)) return updateError('Invalid Email', setError);

    if(!password.trim() || password.length < 8) return updateError('password is less than 8 characters', setError);
    
  }

  const submitForm = () =>{
    if(isValidForm()){
      // submit form 
      console.log(userInfo);
    }

  }

  return (
    <FormContainer>
      { error ? <Text style={{color: 'red', fontSize: 18, textAlign: 'center'}}>{error}</Text>: null}
      <FormInput value={fullName} onChangeText={(value) => handleOnChange(value, 'fullName')} label='Full name' placeholder='Sponge Bobby Bob'/>
      <FormInput value={userName} onChangeText={(value) => handleOnChange(value, 'userName')} label='Username' placeholder='Spongebob123'/>
      <FormInput value={email} onChangeText={(value) => handleOnChange(value, 'email')} label='Email' placeholder='potato123@gmail.com'/>
      <FormInput value={password}  onChangeText={(value) => handleOnChange(value, 'password')} secureTextEntry label='Password' placeholder='********'/>
      <FormSubmitBtn onPress={submitForm} title='SignUp'/>
    </FormContainer>
  )
}

export default SignupForm

const styles = StyleSheet.create({
})