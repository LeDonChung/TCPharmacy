import { axiosInstance } from "../../../api/APIClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MedicineModel } from "../../../domain/models/MedicineModel";
import { TagGroupModel } from "../../../domain/models/TagGroupModel";


const initialState: {
    tagGroups: TagGroupModel[],
    tagGroupByObject: TagGroupModel,
    tagGroupSuggestions: TagGroupModel

} = {
    tagGroups: [],
    tagGroupByObject: new TagGroupModel(),
    tagGroupSuggestions: new TagGroupModel()
};

const getTagGroupById: any = createAsyncThunk('tagGroup/getTagGroupById', async (id: number, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/tag-groups/${id}`);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});

const getTagGroups: any = createAsyncThunk('tagGroup/getTagGroups', async (__, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/tag-groups`);
        return response.data;
    } catch (error: any) {
        throw rejectWithValue(error.response.data);
    }
});

const tagGroupSlice = createSlice({
    name: 'tagGroup',
    initialState: { value: initialState },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getTagGroups.fulfilled, (state, action) => {
            state.value.tagGroups = action.payload;
            state.value.tagGroupByObject = state.value.tagGroups.filter((value: TagGroupModel) => value.id === 1)[0];
            state.value.tagGroupSuggestions = state.value.tagGroups.filter((value: TagGroupModel) => value.id === 2)[0];
        });
    }
});

export const {  } = tagGroupSlice.actions;
export { getTagGroupById, getTagGroups};
export default tagGroupSlice.reducer;