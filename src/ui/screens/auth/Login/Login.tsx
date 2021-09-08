import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, Pressable, View } from "react-native";
import { Wrapper } from "../../../layout/Wrapper/Wrapper";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { validateLoginInput } from "../../../../app/validations/validateLoginInput";
import { loginThunk } from "../../../../app/redux/auth/thunks/loginThunk";
import { useAppDispatch } from "../../../../app/redux/store";
import { useSelector } from "react-redux";
import { loginSelector } from "../../../../app/redux/auth/selectors/loginSelector";
import { getError } from "../../../../app/utils/getError";
import { ILoginInput } from "../../../../app/types/ILoginInput";

type ILoginFieldName = "email" | "password";

export const Login = () => {
    const { navigate } = useNavigation();

    const dispatch = useAppDispatch();
    const { state, errors: serverErrors } = useSelector(loginSelector);

    return (
        <Wrapper>
            <View
                style={{
                    marginVertical: 50,
                    width: "100%",
                }}
            >
                <Text
                    style={{
                        color: "black",
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: "800",
                    }}
                >
                    Login Screen
                </Text>
            </View>
            <Formik
                initialValues={
                    {
                        email: "ishraqkabir@gmail.com",
                        password: "asdf",
                    } as ILoginInput
                }
                onSubmit={async (values: ILoginInput) => {
                    await dispatch(loginThunk(values));
                }}
                validate={validateLoginInput}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors: formikErrors,
                }) => (
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
                        {formikErrors.email ? (
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: "red" }}>
                                    {formikErrors.email}
                                </Text>
                            </View>
                        ) : null}

                        {getError<ILoginFieldName>("email", serverErrors) ? (
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: "red" }}>
                                    {getError<ILoginFieldName>(
                                        "email",
                                        serverErrors
                                    )}
                                </Text>
                            </View>
                        ) : null}

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
                        {formikErrors.password ? (
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: "red" }}>
                                    {formikErrors.password}
                                </Text>
                            </View>
                        ) : null}

                        {getError<ILoginFieldName>("password", serverErrors) ? (
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ color: "red" }}>
                                    {getError<ILoginFieldName>(
                                        "password",
                                        serverErrors
                                    )}
                                </Text>
                            </View>
                        ) : null}

                        <Button
                            onPress={handleSubmit as () => void}
                            title="Login"
                            disabled={state === "pending"}
                        />
                    </View>
                )}
            </Formik>

            <Pressable
                onPress={() => {
                    navigate("register");
                }}
            >
                <Text style={{ marginTop: 20 }}>
                    Go To{" "}
                    <Text style={{ fontWeight: "bold" }}>Register Screen</Text>
                </Text>
            </Pressable>
        </Wrapper>
    );
};
