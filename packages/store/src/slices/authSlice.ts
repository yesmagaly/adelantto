import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const authSessionState = window.sessionStorage.getItem("auth") || null;

    if (authSessionState) {
      return JSON.parse(authSessionState);
    }

    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      window.sessionStorage.setItem("auth", JSON.stringify(state));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      window.sessionStorage.removeItem("auth");
    },
  },

  selectors: {
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
    selectToken: (state) => state.token,
  },
});

export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;
