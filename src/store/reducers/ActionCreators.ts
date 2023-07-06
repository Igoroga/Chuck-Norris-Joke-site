import axios from 'axios';
import { AppDispatch } from "../store";
import { userSlice } from "./UserSlice";

import { IJoke } from "../../models/IJoke";

export const fetchJokes = () => async (dispatch: AppDispatch) => {
try {
    dispatch(userSlice.actions.jokesFetching())
    const response = await axios.get<IJoke>('https://api.chucknorris.io/jokes/random')
    dispatch(userSlice.actions.jokesFetchingSuccess([response.data]))
} catch (error:any) {
    dispatch(userSlice.actions.jokesFetchingError(error.message))
}
}