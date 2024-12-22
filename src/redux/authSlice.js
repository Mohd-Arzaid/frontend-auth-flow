import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signupData: null,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSignupData:(state,action)=>{
        state.signupData = action.payload;
    }
  },
});

export const { setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
