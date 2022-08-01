import {createSlice} from '@reduxjs/toolkit';

export const notificationDataSlice = createSlice({
    name: 'notificationData',
    initialState: {value:[]},
    reducers: {
        notification : (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { notification} = notificationDataSlice.actions; 
export default notificationDataSlice.reducer; 