// export interface Breed {
//   adaptability: number
//   affection_level: number
//   bidability: number
//   cat_friendly: number
//   cfa_url: string
//   child_friendly: number
//   country_code: string
//   country_codes: string
//   description: string
//   dog_friendly: number
//   energy_level: number
//   experimental: number
//   grooming: number
//   hairless: number
//   health_issues: number
//   hypoallergenic: number
//   id: string
//   indoor: number
//   intelligence: number
//   lap: number
//   life_span: string
//   name?: string
//   natural: number
//   origin: string
//   rare: number
//   reference_image_id: string
//   rex: number
//   shedding_level: number
//   short_legs: number
//   social_needs: number
//   stranger_friendly: number
//   suppressed_tail: number
//   temperament: string
//   vcahospitals_url: string
//   vetstreet_url: string
//   vocalisation: number
//   weight: Weight
//   wikipedia_url: string
// }

// export interface CatInfo {
//   breeds: Breed[]
//   height: number
//   id: string
//   url?: string
//   width: number
// }

interface Height {
  imperial: string
  metric: string
}

interface Weight {
  imperial: string
  metric: string
}

// export interface CatBreed {
//   adaptability: number
//   affection_level: number
//   alt_names: string
//   cfa_url: string
//   child_friendly: number
//   country_code: string
//   country_codes: string
//   description: string
//   dog_friendly: number
//   energy_level: number
//   experimental: number
//   grooming: number
//   hairless: number
//   health_issues: number
//   hypoallergenic: number
//   id: string
//   indoor: number
//   intelligence: number
//   life_span: string
//   name?: string
//   natural: number
//   origin: string
//   rare: number
//   reference_image_id: string
//   rex: number
//   shedding_level: number
//   short_legs: number
//   social_needs: number
//   stranger_friendly: number
//   suppressed_tail: number
//   temperament: string
//   vcahospitals_url: string
//   vetstreet_url: string
//   vocalisation: number
//   weight: Weight
//   wikipedia_url: string
// }

export interface Breed {
  bred_for: string
  breed_group: string
  height: Height
  id: string
  life_span: string
  name?: string
  origin: string
  reference_image_id: string
  temperament: string
  weight: Weight
}

export interface RespForDogBreed {
  data: Breed
}
