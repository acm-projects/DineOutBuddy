import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { isValidElement, useState } from "react";
import FormContainer from "../components/FormContainer.js";
import FormInput from "../components/FormInput.js";
import FormSubmitBtn from "../components/FormSubmitBtn.js";
import {
  isValidObjField,
  updateError,
  isValidEmail,
} from "../utils/methods.js";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client.js";
import { useLogin } from "../../context/LoginProvider.js";
import { signIn } from "../api/user.js";
import whiteTextmark from "../../assets/BlueTextmark.png";
import { accentColor } from "../components/ComponentColors.js";

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Invalid username")
    .required("username is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const LoginForm = ({ navigation }) => {
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
            <View style={{ gap: 22, marginTop: 100 }}>
              <FormInput
                value={username}
                error={touched.username && errors.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                label=""
                placeholder="Username"
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
              <View
                style={{ justifyContent: "center", alignItems: "flex-end" }}
              >
                <Text
                  style={{
                    color: accentColor,
                    fontSize: 16,
                    fontFamily: "Metropolis-Medium",
                  }}
                >
                  Forgot Password?
                </Text>
              </View>

              <FormSubmitBtn
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Log In"
              />
            </View>
          );
        }}
      </Formik>
      <View
        style={{
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignupForm")}
          underlayColor={"white"}
          styles={{ color: "#ff0000" }}
        >
          <View styles={{ backgroundColor: "#ff0000" }}>
            <Text styles={{ fontFamily: "Metropolis-Medium" }}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </FormContainer>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});