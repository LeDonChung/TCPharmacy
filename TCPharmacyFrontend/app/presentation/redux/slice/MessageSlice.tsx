import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/APIClient";
import { MessageModel } from "../../../domain/models/MessageModel";

const sendMessage: any = createAsyncThunk('message/sendMessage', async (data: any, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/chats/${data.userId}`, data.messageRequest);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    } 
});

const getMessages: any = createAsyncThunk('message/getMessages', async (userId: string, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/chats/${userId}`);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});

const initialState: {
    messages: MessageModel[],
    resquest: any,
    errorResponse: any
} = {
    messages: [],
    resquest: {
        userId: "",
        message: ""
    },
    errorResponse: null
}
const messageSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        setMessages(state, action) {
            state.messages = action.payload;
        }
    },
    extraReducers(builder) {

        builder.addCase(sendMessage.pending, (state, action) => {
            state.errorResponse = initialState.errorResponse;
        });

        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.messages = [...state.messages, action.payload];
            state.errorResponse = initialState.errorResponse;
        });

        builder.addCase(sendMessage.rejected, (state, action) => {
            state.errorResponse = action.payload;
        });

        builder.addCase(getMessages.pending, (state, action) => {
            state.errorResponse = initialState.errorResponse;
            state.messages = initialState.messages;
        });
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.errorResponse = initialState.errorResponse;
            state.messages = action.payload;
        });

    },
});

export const { setMessages } = messageSlice.actions;
export { sendMessage, getMessages };
export default messageSlice.reducer;