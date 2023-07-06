import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJokes } from './ActionCreators';
import { IJoke } from '../../models/IJoke';

interface UserState {
    jokes: IJoke[];
    likeJokeList: string[];
    isLoading: boolean;
    error: string;
    count: number;
}

const initialState: UserState = {
    jokes: [],
    likeJokeList: [],
    isLoading: true,
    error: "",
    count: 0
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        jokesFetching(state) {
            state.isLoading = true;
        },
        jokesFetchingSuccess(state, action: PayloadAction<IJoke[]>) {
            state.isLoading = false;
            state.error = ''
            state.jokes = action.payload
        },
        jokesFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },
        jokesFetchFavoriteList(state, action: PayloadAction<string[]>) {
            state.likeJokeList = action.payload
        },
        addLikeJokeList(state, action: PayloadAction<string>) {
            const newJoke = action.payload;
            const jokeIndex = state.likeJokeList.indexOf(newJoke);
          
            if (jokeIndex === -1) {
              // Шутка не существует в массиве, добавляем её
              const updatedLikeJokeList = [...state.likeJokeList, newJoke];
              state.likeJokeList = updatedLikeJokeList.slice(-10); // Ограничиваем до 10 шуток
            } else {
              // Шутка уже существует в массиве, удаляем её
              const updatedLikeJokeList = [...state.likeJokeList];
              updatedLikeJokeList.splice(jokeIndex, 1);
              state.likeJokeList = updatedLikeJokeList;
            }
          },
          deleteLikeJokeList(state) {
            state.likeJokeList = [];
        },
    },
  });



export default userSlice.reducer
