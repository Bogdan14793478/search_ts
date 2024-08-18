interface Height {
  imperial: string
  metric: string
}

interface Weight {
  imperial: string
  metric: string
}

export interface Breed {
  bred_for: string
  breed_group: string
  height: Height
  id: string
  life_span: string
  name: string
  origin: string
  reference_image_id: string
  temperament: string
  weight: Weight
}

export interface RespForDogBreed {
  data: Breed
}
