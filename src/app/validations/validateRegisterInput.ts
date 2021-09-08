import { IRegisterInput } from "../types/IRegisterInput";

export const validateRegisterInput = ({
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
}: IRegisterInput): Partial<IRegisterInput> => {
    const errors: Partial<IRegisterInput> = {};

    if (!email) {
        errors.email = "email cannot be empty";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "invalid email format";
    } else if (email.length > 100) {
        errors.email = "too long";
    }

    if (!firstName) {
        errors.firstName = "First name can not be empty";
    } else if (firstName.length < 3) {
        errors.firstName = "First name must be atleast 3 characters long";
    } else if (firstName.length > 100) {
        errors.firstName = "too long";
    }

    if (!lastName) {
        errors.lastName = "Last name can not be empty";
    } else if (lastName.length < 3) {
        errors.lastName = "Last name must be atleast 3 characters long";
    } else if (lastName.length > 100) {
        errors.lastName = "too long";
    }

    if (!password) {
        errors.password = "password can not be empty";
    } else if (password.length < 3) {
        errors.password = "Password must be atleast 3 characters long";
    } else if (password.length > 100) {
        errors.password = "too long";
    }

    if (password && confirmPassword !== password) {
        errors.confirmPassword = "Confirm password doesnt match";
    }

    return errors;
};
