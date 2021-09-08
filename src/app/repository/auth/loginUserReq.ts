import { BACKEND_URL } from "../../../../config/envs";
import { ILoginInput } from "../../types/ILoginInput";
import { IResponse } from "../../types/IResponse";
import { IUser } from "../../types/IUser";
import axiosInstance from "../../utils/axiosInterceptor";

export const loginUserReq = async (values: ILoginInput): Promise<IResponse<IUser & { authToken: string; }>> => {
    try {
        const response = await axiosInstance.post(`${BACKEND_URL}/api/auth/login`, values);
        return response.data;
    } catch (error) {
        return {
            errors: [
                error.response.data,
            ],
        };
    }

    return {};
};
