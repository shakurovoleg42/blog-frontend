import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth'
import { commentReducer } from './slices/commentSlice';


const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        comment: commentReducer,
    },
});

export default store;