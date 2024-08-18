import { AxiosInstance } from 'axios'
import { catApiInstance, dogApiInstance } from './axios'
import { Breed } from '@/interface/pets'

export const getBreeds = async (instance: AxiosInstance) => {
  try {
    const response = await instance.get('/breeds')
    return response.data
  } catch (error) {
    console.error('Error fetching dog breeds:', error)
    throw error
  }
}

export const getBreedImage = async (
  breedId: string,
  instance: AxiosInstance,
  limit = 1
) => {
  try {
    const response = await instance.get(`/images/search`, {
      params: { breed_id: breedId, limit },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching breed images:', error)
    throw error
  }
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const updateAnimalsWithImages = async (
  animals: Breed[],
  instance: AxiosInstance,
  limit = 1
): Promise<Breed[]> => {
  return Promise.all(
    animals.map(async (el) => {
      const image = await getBreedImage(el.id, instance, limit)
      return { ...el, image: image }
    })
  )
}

const getInfoPets = async (instance: AxiosInstance) => {
  try {
    const breeds = await getBreeds(instance)
    const getNumber = getRandomNumber(1, breeds.length - 1)
    const animals = breeds.slice(getNumber, getNumber + 10)

    const updatedAnimals = {
      data: await updateAnimalsWithImages(animals, instance),
    }

    return updatedAnimals
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const getAllPets = async () => {
  let allPets: Breed[] = []
  const results = await Promise.allSettled([
    getInfoPets(catApiInstance),
    getInfoPets(dogApiInstance),
  ])

  for (const elem of results) {
    if (elem.status === 'fulfilled' && !!elem?.value?.data.length) {
      allPets.push(...elem?.value?.data)
    }
  }
  return allPets
}

export const getPetById = async (id: string, instance: AxiosInstance) => {
  try {
    const response = await instance.get(`breeds/${id}`)
    const updatedAnimal = {
      data: await updateAnimalsWithImages([response.data], instance, 3),
    }
    return updatedAnimal.data
  } catch (error) {
    console.error('Error fetching breed images:', error)
    throw error
  }
}
