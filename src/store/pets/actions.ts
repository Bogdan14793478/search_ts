import { actions } from './reducer'
import { AppThunk } from '@/interface/thunk'

export const setPetsToStore =
  (data: any): AppThunk =>
  (dispatch) => {
    dispatch(actions.setAllPets(data))
  }

export const startLoading = (): AppThunk => (dispatch) => {
  dispatch(actions.startLoad(true))
}

export const finishLoading = (): AppThunk => (dispatch) => {
  dispatch(actions.finishLoad(false))
}

export const setLastCurrentPet =
  (data: any): AppThunk =>
  (dispatch) => {
    dispatch(actions.setLastCurrent(data))
  }

export const filteredPets =
  (searchName: string, arr): AppThunk =>
  (dispatch) => {
    console.log('arr', arr)
    const filterPets = arr.filter((item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    )
    console.log('filterPets', filterPets)
    dispatch(actions.setFilteredPets(filterPets))
  }

export default {
  ...actions,
}
