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
    .min(3, "Invalid username")
    .required("Username is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const userInfo = {
    username: "",
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
          const { fullname, username, email, password } = values;
          return (
            <>
              <FormInput
                value={username}
                error={touched.username && errors.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                label="Username"
                placeholder="Spongebob123"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                label="Password"
                placeholder="********"
              />
              <FormSubmitBtn
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Log In"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
