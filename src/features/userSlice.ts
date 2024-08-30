import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  name:string;
  username:string;
  email:string;
  phone:string;
}

interface UserState{
  users:User[];
  loading:boolean;
  error:string | null;
}

const initialState: UserState = {
  users: [],
  loading:false,
  error: null,
};

export const fetchUsers =
createAsyncThunk('users/fetchUsers', async () =>{
  const response = await
  axios.get('http://jsonplaceholder.typicode.com/users');
  return response.data;
});

const userSlice = createSlice ({
  name:'users',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
  builder.addCase(fetchUsers.pending, (state)=>{
    state.loading = true;
    state.error = null;
  }).addCase(fetchUsers.fulfilled, (state, action)=>{
    state.loading= false;
    state.users = action.payload;
  }).addCase(fetchUsers.rejected, (state, action)=>{
    state.loading = false;
    state.error = 'Error fetching users';
  });
  },
});
export default userSlice.reducer;