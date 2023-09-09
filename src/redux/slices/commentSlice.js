import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';

const initialState = {
    comments: [],
    status: 'loading',
}

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ postId, comment }) => {
        try {
            const { data } = await axios.post(`/comments/${postId}`, {
                postId,
                comment,
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание поста
        [createComment.pending]: (state) => {
            state.comment.items = [];
            state.comment.status = 'loading';
        },
        [createComment.fulfilled]: (state, action) => {
            state.comment.items = action.payload;
            state.comment.status = 'loaded';
        },
        [createComment.rejected]: (state) => {
            state.comment.items = [];
            state.comment.status = 'error';
        },
    },
})

export const commentReducer = commentSlice