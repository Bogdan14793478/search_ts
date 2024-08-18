'use client'
import { catApiInstance, dogApiInstance } from '@/api/axios'
import { getPetById } from '@/api/pets'
import {
  finishLoading,
  setLastCurrentPet,
  startLoading,
} from '@/store/pets/actions'
import { selectLastCurrent, selectLoading } from '@/store/pets/selectors'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const PetsInfo = () => {
  const dispatch = useDispatch()
  const isLoad = useSelector(selectLoading)
  const lastCurrent = useSelector(selectLastCurrent)
  const params = useParams()
  const { id } = params

  const containsDigit = (str: string) => /\d/.test(str)

  useEffect(() => {
    dispatch(startLoading())
    const fetchPet = async () => {
      try {
        let petData
        if (containsDigit(id)) {
          petData = await getPetById(id as string, dogApiInstance)
        } else {
          petData = await getPetById(id as string, catApiInstance)
        }
        dispatch(setLastCurrentPet(petData))
      } catch (error) {
        console.error('Error fetching pet data:', error)
      } finally {
        dispatch(finishLoading())
      }
    }
    fetchPet()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-2xl font-semibold text-gray-800">
        It's main info about pet
      </div>

      {isLoad ? (
        <p>Please wait, data loading ...</p>
      ) : (
        <>
          {lastCurrent && lastCurrent.length > 0 && (
            <p>{lastCurrent[0]?.name}</p>
          )}
          <div className="flex flex-wrap justify-center">
            {lastCurrent[0]?.image.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="m-[20px] card cursor-pointer h-[350px] border rounded-lg shadow-lg overflow-hidden w-full sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] flex justify-between"
                >
                  <div className="w-full h-full">
                    <img
                      src={item.url}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )
            })}
            <div className="m-[20px] card cursor-pointer h-[450px] border rounded-lg shadow-lg overflow-hidden w-full sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px] flex">
              <div className="p-4 w-full">
                <h2 className="text-xl text-left font-bold">General Info:</h2>
                {lastCurrent[0]?.name && (
                  <Label label="name" info={lastCurrent[0]?.name} />
                )}
                {lastCurrent[0]?.bred_for && (
                  <Label label="for" info={lastCurrent[0]?.bred_for} />
                )}
                {lastCurrent[0]?.weight?.metric && (
                  <Label label="weight" info={lastCurrent[0]?.weight?.metric} />
                )}
                {lastCurrent[0]?.life_span && (
                  <Label label="life" info={lastCurrent[0]?.life_span} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default PetsInfo

const Label = ({ label, info }) => {
  return (
    <p className="text-sl text-left ">
      {label}: {info}
    </p>
  )
}
