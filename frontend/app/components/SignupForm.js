import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import FormContainer from './FormContainer'

const SignupForm = () => {
  return (
    <FormContainer>
      <Text style={{ fontSize: 50, fontWeight: 'bold'}}>Sign Up</Text>
    </FormContainer>
  )
}

export default SignupForm

const styles = StyleSheet.create({
})