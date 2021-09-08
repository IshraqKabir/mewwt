import { AxiosResponse } from "axios";
import { BACKEND_URL } from "../../../../config/envs";
import { IRegisterInput } from "../../types/IRegisterInput";
import { IResponse } from "../../types/IResponse";
import { IUser } from "../../types/IUser";
import axiosInstance from "../../utils/axiosInterceptor";

export const registerUserReq = async (values: IRegisterInput): Promise<IResponse<IUser & { authToken: string; }>> => {
    try {
        const response = await axiosInstance.post(`${BACKEND_URL}/api/auth/register`, values);
        return response.data;
    } catch (error) {
        return {
            errors: error.response.data.errors,
        };
    }
};
