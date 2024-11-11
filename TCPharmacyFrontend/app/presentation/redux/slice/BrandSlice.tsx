import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "../../../domain/models/CategoryModel";
import { axiosInstance } from "../../../api/APIClient";
import { BrandModel } from "../../../domain/models/BrandModel";

const getBrandsFavorite: any = createAsyncThunk('brand/getBrandsFavorite', async (_, {rejectWithValue}) => {
    try{
        const response = await axiosInstance.get(`/brands/favorite`);
        return response.data; 
    }catch(error: any){
        throw rejectWithValue(error.response.data);
    }
});

const initialState: {
    brands: BrandModel[],
} = {
    brands: [],
};

const BrandSlice = createSlice({
    name: 'brand',
    initialState: initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(getBrandsFavorite.fulfilled, (state, action) => {
            state.brands = action.payload;
            console.log(state.brands[0]);
        })
        builder.addCase(getBrandsFavorite.rejected, (state, action) => {
            console.log("extraReducers", action.payload);
        })
    }
})

export const {  } = BrandSlice.actions
export { getBrandsFavorite }
export default BrandSlice.reducer