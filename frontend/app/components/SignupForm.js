import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitBtn from './FormSubmitBtn';
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../api/client';

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, 'Invalid name')
    .required('Name is required'),
  username: Yup.string()
    .trim()
    .min(3, 'Invalid username')
    .required('Username is required'),
  email: Yup.string().email('Invalid email!').required('Email is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const SignupForm = ({ navigation }) => {
  const userInfo = {
    fullname: '',
    username: '',
    email: '',
    password: '',
  };

  const signUp = async (values, formikActions) => {
    try {
      const res = await client.post('/api/user/create-user', {
        ...values,
      });

      console.log(res.data);
      formikActions.resetForm();
      formikActions.setSubmitting(false);

      // Navigate to home page upon successful signup
      navigation.navigate('./Home'); // Replace 'Home' with the name of your home screen
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle signup failure
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { fullname, username, email, password } = values;
          return (
            <>
              <FormInput
                value={fullname}
                error={touched.fullname && errors.fullname}
                onChangeText={handleChange('fullname')}
                onBlur={handleBlur('fullname')}
                label="Full name"
                placeholder="Sponge Bobby Bob"
              />
              <FormInput
                value={username}
                error={touched.username && errors.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                label="Username"
                placeholder="Spongebob123"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                label="Email"
                placeholder="potato123@gmail.com"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                label="Password"
                placeholder="********"
              />
              <FormSubmitBtn
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="SignUp"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default SignupForm;

const styles = StyleSheet.create({});
