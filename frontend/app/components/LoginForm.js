import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { isValidElement, useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitBtn from "./FormSubmitBtn";
import { isValidObjField, updateError, isValidEmail } from "../utils/methods";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Invalid email")
    .required("email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const userInfo = {
    email: "",
    password: "",
  };

  const logIn = async (values, formikActions) => {
    const res = await client.post("/api/user/sign-in", {
      ...values,
    });

    console.log(res.data);
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

return (
    <FormContainer>
      <View style={{ height: 120 }} />
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={logIn}
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
          const { email, password } = values;
          return (
            <>
              <FormInput
                value={email}
                error={touched.email && errors.username}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                label=""
                placeholder="Email"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                label=""
                placeholder="Password"
              />
              <View style={{ height: 30 }} />
              <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'blue', fontSize: 16, fontWeight: 'bold' }}>
                  Forgot Password?
                </Text>
              </View>

              <FormSubmitBtn
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Log In"
              />
            </>
          );
        }}
      </Formik>
      <View style={{ height: 30 }} />
      <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Don't have an account? Sign up
        </Text>
      </View>
    </FormContainer>
  );
};

export default LoginForm;
const styles = StyleSheet.create({});
