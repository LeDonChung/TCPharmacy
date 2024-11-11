import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "../../../domain/models/CategoryModel";
import { axiosInstance } from "../../../api/APIClient";

const getAllCategories: any = createAsyncThunk('category/getAllCategories', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/categories`);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});

const initialState: {
    categories: CategoryModel[],
    search: CategoryModel[],
    level1: CategoryModel[],
    level2: CategoryModel[],
    level3: CategoryModel[],
    outstanding: CategoryModel[],
    draw: CategoryModel[]
} = {
    categories: [],
    search: [],
    level1: [],
    level2: [],
    level3: [],
    outstanding: [],
    draw: []
};

const CategorySlice = createSlice({
    name: 'category',
    initialState: { value: initialState },
    reducers: {
        setOutstanding(state) {
            state.value.outstanding = state.value.categories[0].children;
            if (state.value.outstanding.length % 2 !== 0) {
                state.value.outstanding.push(
                    new CategoryModel(0, "", "", 0, "", 0, [])
                );
            }
        },
        setDraw(state) {

            state.value.draw = state.value.categories.filter(value => value.level === 1);
            state.value.draw.unshift(
                new CategoryModel(999, "", "Thông báo", 1, "", 0, []),
                new CategoryModel(997, "", "Điểm thưởng", 1, "", 0, [])
            );
        },
        setCategoryLevel1(state) {
            state.value.level1 = state.value.categories.filter(value => value.level === 1);
        },
        setCategoryLevel2(state) {
            state.value.level2 = state.value.categories.filter(value => value.level === 2);
        },
        setCategoryLevel3(state) {
            state.value.level3 = state.value.categories.filter(value => value.level === 3);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.value.categories = action.payload;
        })
        builder.addCase(getAllCategories.rejected, (state, action) => {
            console.log("extraReducers", action.payload);
        })
    }
})

export const { setOutstanding, setDraw, setCategoryLevel1, setCategoryLevel2, setCategoryLevel3 } = CategorySlice.actions
export { getAllCategories }
export default CategorySlice.reducer