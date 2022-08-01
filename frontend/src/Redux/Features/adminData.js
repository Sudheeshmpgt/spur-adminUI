import {createSlice} from '@reduxjs/toolkit';

export const adminDataSlice = createSlice({
    name: 'adminData',
    initialState: {value:{}},
    reducers: {
        adminLogin : (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {adminLogin} = adminDataSlice.actions; 
export default adminDataSlice.reducer; 