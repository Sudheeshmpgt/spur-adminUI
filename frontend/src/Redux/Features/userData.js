import {createSlice} from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
    name: 'userData',
    initialState: {value:{}},
    reducers: {
        login : (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {login} = userDataSlice.actions; 
export default userDataSlice.reducer; 