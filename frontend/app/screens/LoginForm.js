import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  ImageBackground,
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
import whiteTextmark from "../../assets/WhiteTextmark.png";
import { accentColor, darkColor, primaryColor } from "../components/ComponentColors.js";
import LoginPageBG from "../../assets/LoginPageBG.png"

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
    <View style={styles.container}>
      <ImageBackground source={LoginPageBG} style={styles.imageBG}>
        <Text style={[styles.splashText, {fontSize: 26, padding: 22}]}>Welcome!</Text>
        <Image source={whiteTextmark} style={styles.logo}/>
        <Text style={[styles.splashText, {fontSize: 21}]}>Food, Friends, Fun</Text>
      </ImageBackground>
      <View style={{marginTop: 20}}/> 
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
              <View style={{ gap: 8 }}>
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
                  style={{
                    justifyContent: "center", 
                    alignItems: "flex-end",
                    height: 56 
                  }}
                >
                  <Text style={styles.linkText}>Forgot Password?</Text>
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
        <View style={{height: 44}}/>
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            flexDirection: "row",
          }}
        >
          <Text style={styles.plainText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignupForm")}
            underlayColor={"white"}
            styles={{ color: "#ff0000" }}
          >
            <View>
              <Text style={styles.linkText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: primaryColor
  },
  imageBG: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width/1.14, // 1.14 is the aspect ratio of the image
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  logo: {
    width: Dimensions.get("window").width - 60,
    height: (Dimensions.get("window").width - 60)/3.2, // 3.2 is the aspect ratio of the image
    resizeMode: "center"
  },
  splashText: {
    fontFamily: "HeyComic",
    color: primaryColor
  },
  plainText: {
    fontSize: 16,
    fontFamily: "Metropolis-Regular",
    color: darkColor
  },
  linkText: {
    fontSize: 16,
    fontFamily: "Metropolis-Medium",
    color: accentColor
  }
});