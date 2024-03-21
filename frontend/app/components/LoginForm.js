import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { isValidElement, useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitBtn from "./FormSubmitBtn";
import { isValidObjField, updateError, isValidEmail } from "../utils/methods";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";
import { useLogin } from "../../context/LoginProvider";
import { signIn } from "../api/user";

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Invalid username")
    .required("username is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const { setIsLoggedIn, setProfile } = useLogin();

  const userInfo = {
    username: "",
    password: "",
  };

  const logIn = async (values, formikActions) => {
    console.log("Signed in");
    const res = await signIn(values.username, values.password);

    if (res.data.success) {
      setProfile(res.data.user);
      setIsLoggedIn(true);
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <FormContainer>
      <View style={{ height: 100 }} />
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
                label=""
                placeholder="username"
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
              <View
                style={{
                  height: 50,
                  justifyContent: "right",
                  alignItems: "right",
                }}
              >
                {<Text>Forgot Password?</Text>}
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
      <View style={{ height: 50 }} />
      <View
        style={{ height: 50, justifyContent: "center", alignItems: "center" }}
      >
        {<Text>Don't have an account? Sign up</Text>}
      </View>
    </FormContainer>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
