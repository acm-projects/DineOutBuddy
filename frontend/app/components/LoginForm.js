import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import React from 'react'
import FormContainer from './FormContainer'
import FormInput from './FormInput'

const LoginForm = () => {
  return (
    <FormContainer>
      <FormInput title='Email' placeholder='potato123@gmail.com'/>
      <FormInput title='Password' placeholder='********'/>
    </FormContainer>
  )
}

export default LoginForm

const styles = StyleSheet.create({
})