import {createSlice} from '@reduxjs/toolkit';

export const postDataSlice = createSlice({
    name: 'postData',
    initialState: {value:[]},
    reducers: {
        createPost : (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {createPost} = postDataSlice.actions; 
export default postDataSlice.reducer; 