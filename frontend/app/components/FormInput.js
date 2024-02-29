import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function FormInput(props) {
  const { placeholder, label} = props;
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...props} style={styles.input} placeholder={placeholder}/>
    </>
  )
}

const styles = StyleSheet.create({
  label:{
    fontWeight: 'bold',
  },
  input:{
    borderWidth: 1,
    borderColor: '#1b1b33',
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 10
  }
})