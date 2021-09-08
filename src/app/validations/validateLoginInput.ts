import { ILoginInput } from "../types/ILoginInput";

export const validateLoginInput = ({ email, password }: ILoginInput) => {
    const errors: any = {};

    if (!email) {
        errors.email = "email cannot be empty";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "invalid email format";
    }

    if (!password) {
        errors.password = "password can not be empty";
    };

    return errors;
};