import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, Pressable, View } from "react-native";
import { Wrapper } from "../../../layout/Wrapper/Wrapper";
import { Formik } from "formik";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useAppDispatch } from "../../../../app/redux/store";
import { useSelector } from "react-redux";
import { getError } from "../../../../app/utils/getError";
import { IRegisterInput } from "../../../../app/types/IRegisterInput";
import { registerSelector } from "../../../../app/redux/auth/selectors/registerSelector";
import { registerThunk } from "../../../../app/redux/auth/thunks/registerThunk";
import { validateRegisterInput } from "../../../../app/validations/validateRegisterInput";

type IRegisterFieldName =
  "email" |
  "firstName" |
  "lastName" |
  "password" |
  "confirmPassword";

export const Register = () => {
  const { navigate } = useNavigation();

  const dispatch = useAppDispatch();
  const { state, errors: serverErrors } = useSelector(registerSelector);

  return (
    <ScrollView>
      <Wrapper>
        <View style={{
          marginVertical: 50,
          width: "100%",
        }}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 30, fontWeight: "800" }}>Register Screen</Text>
        </View>
        <Formik
          initialValues={{
            email: "ishraqkabirdev@gmail.com",
            firstName: "ishraq",
            lastName: "kabir",
            password: "asdf",
            confirmPassword: "asdf",
          } as IRegisterInput}
          onSubmit={(values: IRegisterInput) => {
            dispatch(registerThunk(values));
          }}
          validate={validateRegisterInput}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors: formikErrors }) => (
            <View>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                textContentType="emailAddress"
                value={values.email}
                placeholder="Email"
                placeholderTextColor="black"
                style={{
                  borderColor: "lightgray",
                  borderWidth: 1,
                  marginBottom: 10,
                  color: "black",
                }}
              />
              {formikErrors.email ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{formikErrors.email}</Text>
                </View>
                : null}

              {getError<IRegisterFieldName>("email", serverErrors) ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{getError<IRegisterFieldName>("email", serverErrors)}</Text>
                </View>
                : null}

              <TextInput
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                placeholder="First name"
                placeholderTextColor="black"
                style={{
                  borderColor: "lightgray",
                  borderWidth: 1,
                  marginBottom: 10,
                  color: "black",
                }}
              />
              {formikErrors.firstName ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{formikErrors.firstName}</Text>
                </View>
                : null}

              {getError<IRegisterFieldName>("firstName", serverErrors) ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{getError<IRegisterFieldName>("firstName", serverErrors)}</Text>
                </View>
                : null}

              <TextInput
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                placeholder="Last name"
                placeholderTextColor="black"
                style={{
                  borderColor: "lightgray",
                  borderWidth: 1,
                  marginBottom: 10,
                  color: "black",
                }}
              />
              {formikErrors.lastName ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{formikErrors.lastName}</Text>
                </View>
                : null}

              {getError<IRegisterFieldName>("lastName", serverErrors) ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{getError<IRegisterFieldName>("lastName", serverErrors)}</Text>
                </View>
                : null}

              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                style={{
                  borderColor: "lightgray",
                  borderWidth: 1,
                  marginBottom: 10,
                  color: "black",
                }}
              />
              {formikErrors.password ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{formikErrors.password}</Text>
                </View>
                : null}

              {getError<IRegisterFieldName>("password", serverErrors) ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{getError<IRegisterFieldName>("password", serverErrors)}</Text>
                </View>
                : null}

              <TextInput
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                style={{
                  borderColor: "lightgray",
                  borderWidth: 1,
                  marginBottom: 10,
                  color: "black",
                }}
              />
              {formikErrors.confirmPassword ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{formikErrors.confirmPassword}</Text>
                </View>
                : null}

              {getError<IRegisterFieldName>("confirmPassword", serverErrors) ?
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ color: "red", }}>{getError<IRegisterFieldName>("confirmPassword", serverErrors)}</Text>
                </View>
                : null}

              <Button
                onPress={handleSubmit as () => void}
                title="Register"
                disabled={state === "pending"}
              />
            </View>
          )}
        </Formik>

        <Pressable
          onPress={() => {
            navigate("login");
          }}
        >
          <Text
            style={{ marginTop: 20, }}
          >
            Go To {" "}
            <Text style={{ fontWeight: "bold" }}>
              Login Screen
            </Text>
          </Text>
        </Pressable>
      </Wrapper>
    </ScrollView>
  );
};
