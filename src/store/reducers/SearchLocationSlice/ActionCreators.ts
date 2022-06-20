import axios from "axios"
import { AppDispatch } from "../.."
import { IParams } from "../../../models/IParams"
import { ISearchLocation } from "../../../models/ISearchLocation"
import { searchLocationSlice } from "./SearchLocationSlice"

export const {
    locationFetching,
    setSearchIsOpen,
    setSearchValue,
} = searchLocationSlice.actions

export const fetchLocation = (city?: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<ISearchLocation[]>(
            'http://api.weatherapi.com/v1/search.json?', {
                params: <IParams> {
                    key: '4371ead6bca843c796f193609222905', 
                    q: city
                }
            }
        )
        dispatch(locationFetching(response.data))
        console.log(response.data)
    } catch (error: any) {
        console.log(error.message)
    }
}