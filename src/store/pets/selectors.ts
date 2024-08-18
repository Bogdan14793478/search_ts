import { createSelector } from '@reduxjs/toolkit'

const appSelector = (state: any) => state.pets

export const selectAllPets = createSelector(
  appSelector,
  ({ allPets }) => allPets
)

export const selectLoading = createSelector(
  appSelector,
  ({ loading }) => loading
)

export const selectLastCurrent = createSelector(
  appSelector,
  ({ lastCurrent }) => lastCurrent
)

export const selectFilteredPets = createSelector(
  appSelector,
  ({ filteredPets }) => filteredPets
)
