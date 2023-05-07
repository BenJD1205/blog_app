import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";

export const store = configureStore({
	reducer: {
		// system
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
