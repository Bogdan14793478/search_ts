import { Breed } from '@/interface/pets'
import { actions } from './reducer'
import { AppThunk } from '@/interface/thunk'

export const setPetsToStore =
  (data: any): any =>
  (dispatch: (arg0: { payload: any; type: 'pets/setAllPets' }) => void) => {
    dispatch(actions.setAllPets(data))
  }

export const startLoading =
  (): any =>
  (dispatch: (arg0: { payload: any; type: 'pets/startLoad' }) => void) => {
    dispatch(actions.startLoad(true))
  }

export const finishLoading =
  (): any =>
  (dispatch: (arg0: { payload: any; type: 'pets/finishLoad' }) => void) => {
    dispatch(actions.finishLoad(false))
  }

export const setLastCurrentPet =
  (data: any): any =>
  (dispatch: (arg0: { payload: any; type: 'pets/setLastCurrent' }) => void) => {
    dispatch(actions.setLastCurrent(data))
  }

export const filteredPets =
  (searchName: string, arr: Breed[]): any =>
  (
    dispatch: (arg0: { payload: any; type: 'pets/setFilteredPets' }) => void
  ) => {
    const filterPets = arr.filter((item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    )
    dispatch(actions.setFilteredPets(filterPets))
  }

export default {
  ...actions,
}
