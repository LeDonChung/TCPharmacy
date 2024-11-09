import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserRegisterRequest } from "../../../domain/models/request/UserRegisterRequest";
import { UserModel } from "../../../domain/models/UserModel";
import { Gender } from "../../../domain/models/Gender";
import * as SecureStore from 'expo-secure-store';
import { axiosInstance } from "../../../api/APIClient";
const initialState: {
    userLogin: UserModel,
    userRegister: UserRegisterRequest,
    errorResponse: any,
    loading: boolean
} = {
    userLogin: new UserModel(0, '', '', '', new Date(), Gender.Female, ''),
    userRegister: new UserRegisterRequest('', '', ['', '', '', '', '', '']),
    errorResponse: null,
    loading: false
}

const generateOTP: any = createAsyncThunk('userRegister/generateOTP', async (
    phoneNumber: string, { rejectWithValue }
) => {
    try {
        const response = await axiosInstance.get(`/otp/generate?phoneNumber=${phoneNumber}`);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data)
    }
});

const register: any = createAsyncThunk('userRegister/register', async (
    request: UserRegisterRequest, { rejectWithValue }
) => {
    try {
        const requestBody = {
            phoneNumber: request.phoneNumber,
            password: request.password,
            otp: request.otp.join('')
        }
        const response = await axiosInstance.post(`/auth/register`, requestBody);

        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});

const findUserLogin: any = createAsyncThunk('userRegister/findUserLogin', async (_, {rejectWithValue}) => {
    try{
        const token = await SecureStore.getItemAsync('token');
        console.log(token);
        if(token === null){
            throw rejectWithValue('Vui lòng đăng nhập.');
        }

        axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + token;

        const response = await axiosInstance.get(`/auth/me`);
        return response.data;
    }catch(error: any){
        throw rejectWithValue(error.response.data);
    }
});

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsertRegister(state, action) {
            state.userRegister = { ...action.payload };
        }
    },
    extraReducers: (builder) => {

        // Generate OTP
        builder.addCase(generateOTP.pending, (state, action) => {
            state.loading = true;
            state.errorResponse = null;
        });
        builder.addCase(generateOTP.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(generateOTP.rejected, (state, action) => {
            state.loading = false;
            state.errorResponse = action.payload;
        });

        // Register
        builder.addCase(register.pending, (state, action) => {
            state.loading = true;
            state.errorResponse = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.errorResponse = null;
            SecureStore.setItemAsync('token', action.payload.data);
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.errorResponse = action.payload;
        });

        // Find User Login
        builder.addCase(findUserLogin.pending, (state, action) => {
            state.loading = true;
            state.userLogin = initialState.userLogin;
            state.errorResponse = null;
        });
        builder.addCase(findUserLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userLogin = action.payload;
        });
        builder.addCase(findUserLogin.rejected, (state, action) => {
            state.loading = false;
            state.errorResponse = action.payload;
        });

    }
});

export const { setUsertRegister } = UserSlice.actions;
export { generateOTP, register, findUserLogin };
export default UserSlice.reducer;