import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import memoryService from "./memoryService";

export const getMemory = createAsyncThunk('memory/getMemory', async(data,thunkAPI) => {
    try{
        // const token = thunkAPI.getState().auth.user.token;
        return await memoryService.getMemory(data);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const setMemory = createAsyncThunk('memory/setMemory', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        //console.log(data);
       
        return await memoryService.addMemory(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateMemory = createAsyncThunk('memory/updateMemory', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        
        //console.log(data)
        return await memoryService.updateMemory(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const likeMemory = createAsyncThunk('memory/likeMemory', async(data,thunkAPI) => {
    
    try{
        const token = thunkAPI.getState().auth.user.token;
        //console.log(data)
        return await memoryService.likeMemory(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteMemory = createAsyncThunk('memory/deleteMemory', async(id,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await memoryService.deleteMemory(id, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

const initialState = {
    memories: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: false
}

export const memorySlice = createSlice({
    name: 'memory',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(setMemory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(setMemory.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories.push(action.payload)
        })
        .addCase(setMemory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateMemory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateMemory.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories = state.memories.map(memory => {
                if(memory?._id === action.payload?._id) return action.payload
                else{
                    return memory;
                }
            })
        })
        .addCase(updateMemory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(likeMemory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(likeMemory.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories = state.memories.map(memory => {
                if(memory?._id === action.payload?._id) return action.payload
                else{
                    return memory;
                }
            })
        })
        .addCase(likeMemory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getMemory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMemory.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories = (action.payload)
        })
        .addCase(getMemory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message   = action.payload;
        })

        .addCase(deleteMemory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteMemory.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.memories.pop(action.payload)
        })
        .addCase(deleteMemory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

    }
})

export const {reset} = memorySlice.actions;
export default memorySlice.reducer;