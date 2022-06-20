import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchLocation } from "../../../models/ISearchLocation";
interface SearchLocationState {
    searchLocation: ISearchLocation[];
    searchValue: string;
    searchIsOpen: boolean;
}
const initialState: SearchLocationState = {
    searchLocation: [],
    searchValue: '',
    searchIsOpen: false
}

export const searchLocationSlice = createSlice({
    name: 'searchLocationSlice',
    initialState,
    reducers: {
        locationFetching(state, action: PayloadAction<ISearchLocation[]>) {
            state.searchLocation = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>){
            state.searchValue = action.payload
        },
        setSearchIsOpen(state, action: PayloadAction<boolean>){
            state.searchIsOpen = action.payload
            state.searchValue = state.searchIsOpen ?state.searchValue :''

        }
    }

})

export default searchLocationSlice.reducer