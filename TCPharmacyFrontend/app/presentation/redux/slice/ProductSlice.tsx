import { axiosInstance } from "../../../api/APIClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MedicineModel } from "../../../domain/models/MedicineModel";
import { BrandModel } from "../../../domain/models/BrandModel";

const getProductById: any = createAsyncThunk('medicines/getProductById', async (id: number, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/medicines/${id}`);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});

const getAllProducts: any = createAsyncThunk('medicines/getAllProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/medicines`);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});

const getProductsRelated: any = createAsyncThunk('medicines/getProductsRelated', async (tagIds, { rejectWithValue }) => {
    try {

        console.log("tagIds", tagIds);
        const response = await axiosInstance.post(`/medicines/getByTags`, tagIds );
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});
const getProductsByCategoryId: any = createAsyncThunk('medicines/getProductsByCategoryId', async (data: any , { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/medicines/getByCategoryId/${data.categoryId}?page=${data.page}&size=${data.size}`);
        return response.data;
    }
    catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});

const getProductsByMedicineName: any = createAsyncThunk('medicines/getProductsByMedicineName', async (data: any , { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/medicines/getByMedicineName?medicineName=${data.medicineName}&page=${data.page}&size=${data.size}`);
        return response.data;
    }
    catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});

const getRecommendationsByProductId: any = createAsyncThunk('medicines/getRecommendationsByProductId', async (productId: number, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/medicines/recommendations/${productId}`);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});
const initialState: {
    product: MedicineModel,
    products: MedicineModel[]
    relatedProducts: MedicineModel[]
} = {
    product: {
        id: 0,
        price: 0,
        init: "",
        specifications: "",
        desShort: "",
        name: "",
        star: 0,
        reviews: 0,
        discount: 0,
        quantity: 0,
        des: "",
        status: 0,
        medicineImages: [],
        sku: "",
        slug: "",
        primaryImage: "",
        brand: {id: 0, title: "", image: "", imageProduct: ""},
        tags: [],
        category: {id: 0, fullPathSlug: "", title: "", level: 0, icon: "", parent: 0, children: []},
    },
    products: [],
    relatedProducts: []
};



const productSlice = createSlice({
    name: 'product',
    initialState: { value: initialState },
    reducers: {
        setProduct(state, action) {
            state.value.product = action.payload;
        },
        setProducts(state, action) {
            state.value.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.value.product = action.payload;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.value.products = action.payload;
        });
        builder.addCase(getProductById.rejected, (state, action) => {
            console.log("extraReducers", action.payload);
        });

        builder.addCase(getProductsRelated.fulfilled, (state, action) => {
            state.value.relatedProducts = action.payload;
        });
        builder.addCase(getProductsByCategoryId.fulfilled, (state, action) => {
            state.value.products = action.payload;
        });
        builder.addCase(getProductsByMedicineName.fulfilled, (state, action) => {
            state.value.products = action.payload;
        });
        builder.addCase(getRecommendationsByProductId.fulfilled, (state, action) => {
            state.value.relatedProducts = action.payload;
        });
    }
});

export const { setProduct, setProducts } = productSlice.actions;
export { getProductById, getAllProducts, getProductsRelated , getProductsByCategoryId, getProductsByMedicineName, getRecommendationsByProductId };
export default productSlice.reducer;