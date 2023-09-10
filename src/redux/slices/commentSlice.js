import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
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

export const getPostComments = createAsyncThunk('comment/getPostComments', async (postId) => {
    try {
        const { data } = axios.get(`/posts/comments/${postId}`)
        return data;
    } catch (err) {
        console.log(err)
    }
})

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        [createComment.pending]: (state) => {
            state.comment.comments = [];
            state.comment.status = 'loading';
        },
        [createComment.fulfilled]: (state, action) => {
            state.comment.comments = action.payload;
            state.comment.status = 'loaded';
        },
        [createComment.rejected]: (state) => {
            state.comment.status = 'error';
        },
        [getPostComments.pending]: (state) => {
            state.comment.comments = [];
            state.comment.status = 'loading';
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.comment.comments= action.payload;
            state.comment.status = 'loaded';
        },
        [getPostComments.rejected]: (state) => {
            state.comment.comments = [];
            state.comment.status = 'error';
        },
    },
})

export const commentReducer = commentSlice.reducer;