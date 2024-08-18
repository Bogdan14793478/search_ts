'use client'

import { getAllPets } from '@/api/pets'
import {
  filteredPets,
  finishLoading,
  setPetsToStore,
  startLoading,
} from '@/store/pets/actions'
import {
  selectAllPets,
  selectFilteredPets,
  selectLoading,
} from '@/store/pets/selectors'
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import Card from './petsCard'
import { debounce } from '@/helpers/utils'
import { AppThunk } from '@/interface/thunk'

const Home = () => {
  const [searchText, setSearchText] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const allPets = useSelector(selectAllPets)
  const isLoad = useSelector(selectLoading)
  const searchablePets = useSelector(selectFilteredPets)

  const dispatch = useDispatch()
  const router = useRouter()

  const clickOnCard = useCallback((id: string) => {
    router.push(`pets/${id}`)
  }, [])

  const loadNewPets = async () => {
    try {
      dispatch(startLoading())
      const newPets = await getAllPets()
      dispatch(setPetsToStore(newPets))
    } catch (err) {
      console.log('err loadNewPets', err)
    } finally {
      dispatch(finishLoading())
    }
  }

  const debouncedSetSearchText = useCallback(
    debounce((value: string) => {
      setSearchText(value)
      dispatch(filteredPets(value, allPets))
    }, 300),
    []
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchText(e.target.value)
  }

  useEffect(() => {
    if (!allPets.length) {
      dispatch(startLoading())
      getAllPets().then((res) => {
        dispatch(setPetsToStore(res))
        dispatch(finishLoading())
      })
    }
  }, [])

  // почему ререндер после нажатия на кнопку загрузить новые???
  console.log('inputRef.current?.value', inputRef.current?.value)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-2xl font-semibold text-gray-800">
        Hello on our pets site
      </div>
      {!isLoad && (
        <>
          <button
            onClick={loadNewPets}
            className="cursor-pointer  top-40 p-[10px] rounded-[10px] bg-green-500"
          >
            Load new pets
          </button>
          <input ref={inputRef} onChange={handleInputChange} type="text" />
        </>
      )}

      {isLoad ? (
        <p>Please wait, data loading ...</p>
      ) : (
        <div className="flex flex-row man-w-screen flex-wrap top-60">
          {!!searchablePets.length && searchText.trim().length > 0
            ? searchablePets.map((item: any) => {
                return (
                  <Card
                    key={item.id}
                    id={item.id}
                    title={item?.name || item?.breeds[0]?.name}
                    image={item?.url || item?.image[0]?.url}
                    onClick={clickOnCard}
                  />
                )
              })
            : allPets.map((item: any) => {
                return (
                  <Card
                    key={item.id}
                    id={item.id}
                    title={item?.name || item?.breeds[0]?.name}
                    image={item?.url || item?.image[0]?.url}
                    onClick={clickOnCard}
                  />
                )
              })}
        </div>
      )}
    </main>
  )
}

export default Home
