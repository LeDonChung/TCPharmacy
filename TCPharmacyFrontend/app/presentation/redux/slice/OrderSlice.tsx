import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderModel } from "../../../domain/models/OrderModel";
import { axiosInstance } from "../../../api/APIClient";

const createOrder: any = createAsyncThunk('order/createOrder', async (order: OrderModel, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/orders`, order);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    } 
});

const initialState: {
    order: OrderModel,
    errorResponse: any
} = {
    order: new OrderModel(),
    errorResponse: null
}
const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        setOrder(state, action) {
            state.order = action.payload;
        }
    },
    extraReducers(builder) {

        builder.addCase(createOrder.pending, (state, action) => {
            state.errorResponse = initialState.errorResponse;
            state.order = initialState.order;
        });

        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.order = action.payload;
            state.errorResponse = initialState.errorResponse;
        });

        builder.addCase(createOrder.rejected, (state, action) => {
            state.errorResponse = action.payload;
            state.order = initialState.order;
        });
    },
});

export const {setOrder} = orderSlice.actions;
export { createOrder }
export default orderSlice.reducer