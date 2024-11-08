import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserRegisterRequest } from "../../../domain/models/request/UserRegisterRequest";
import { UserModel } from "../../../domain/models/UserModel";
import { Gender } from "../../../domain/models/Gender";
import axios from "axios";
import { axiosInstance } from "../../../api/APIClient";
const initialState: {
    userLogin: UserModel,
    userRegister: UserRegisterRequest,
    loading: 'reject' | 'pending' | 'fulfill',
} = {
    userLogin: new UserModel(0, '', '', '', new Date(), Gender.Female, ''),
    userRegister: new UserRegisterRequest('', '', 0),
    loading: 'pending'
}

const generateOTP: any = createAsyncThunk('userRegister/generateOTP', async (
    phoneNumber: string, { rejectWithValue }
) => {
    try {

        const response = await axiosInstance.get(`/otp/generate?phoneNumber=${phoneNumber}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(response.data);
        }
    } catch (error) {
        throw rejectWithValue(error)
    }
});

const register: any = createAsyncThunk('userRegister/register', async (
    request: UserRegisterRequest, { rejectWithValue }
) => {
    try {

        const response = await axiosInstance.post(`/auth/register`, request);

        if (response.status === 200) {
            return response.data;
        } else {
            return rejectWithValue(response.data);
        }
    } catch (error) {
        throw rejectWithValue(error)
    }
});

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsertRegister(state, action) {
            state.userRegister = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(generateOTP.fulfilled, (state, action) => {
            state.loading = 'fulfill';
        });
        builder.addCase(generateOTP.rejected, (state, action) => {
            state.loading = 'reject';
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = 'fulfill';
            console.log(action.payload);
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = 'reject';
        });

    }
});

export const {setUsertRegister } = UserSlice.actions;
export { generateOTP, register };
export default UserSlice.reducer;