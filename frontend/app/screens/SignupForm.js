import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import React, { isValidElement, useState } from "react";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import FormSubmitBtn from "../components/FormSubmitBtn";
import { isValidObjField, updateError, isValidEmail } from "../utils/methods";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";
import { StackActions } from "@react-navigation/native";
import { useLogin } from "../../context/LoginProvider";
import { signIn } from "../api/user";
import { primaryColor, accentColor, darkColor } from "../components/ComponentColors";
import BlueTextmark from "../../assets/BlueTextmark.png"

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, "Invalid name")
    .required("Name is required"),
  username: Yup.string()
    .trim()
    .min(3, "Invalid username")
    .required("Username is required"),
  email: Yup.string().email("Invalid email!").required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignupForm = ({ navigation }) => {
  const { setIsLoggedIn, setProfile } = useLogin();

  const userInfo = {
    fullname: "",
    username: "",
    email: "",
    password: "",
  };

  const signUp = async (values, formikActions) => {
    const res = await client.post("/api/user/create-user", {
      ...values,
    });

    console.log(res.data.success);
    if (res.data.success) {
      const signInRes = await signIn(values.username, values.password);

      if (signInRes.data.success) {
        console.log(signInRes.data.user);
        setProfile(signInRes.data.user);
        setIsLoggedIn(true);
        navigation.navigate("AllergyScreen");
      }
    }

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={BlueTextmark} style={styles.logo}/>
        <Text style={styles.splashText}>Food, Friends, Fun</Text>
      </View>
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
              <View style={{ gap: 8 }}>
                <FormInput
                  value={fullname}
                  error={touched.fullname && errors.fullname}
                  onChangeText={handleChange("fullname")}
                  onBlur={handleBlur("fullname")}
                  label=""
                  placeholder="Full Name"
                />
                <FormInput
                  value={username}
                  error={touched.username && errors.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  label=""
                  placeholder="Username"
                />
                <FormInput
                  value={email}
                  error={touched.email && errors.email}
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
                <View style={{height: 44-8}}/>
                <FormSubmitBtn
                  submitting={isSubmitting}
                  onPress={handleSubmit}
                  title="SignUp"
                />
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
                    onPress={() => navigation.navigate("LoginForm")}
                    underlayColor={"white"}
                    styles={{ color: "#ff0000" }}
                  >
                    <View>
                      <Text style={styles.linkText}>Sign Up</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </Formik>
      </FormContainer>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: primaryColor
  },
  imageContainer: {
    marginTop: 80,
    marginBottom: 50,
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center"
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
  },
    splashText: {
    fontFamily: "HeyComic",
    fontSize: 22,
    color: accentColor
  },
    logo: {
    width: Dimensions.get("window").width - 60,
    height: (Dimensions.get("window").width - 60)/3.2, // 3.2 is the aspect ratio of the image
    resizeMode: "center"
  }
});
