export type Gardener = {
  authen_method: string
  avatar: any[] // Replace 'any' with a more specific type if possible
  bonsai: any[] // Replace 'any' with a more specific type if possible
  created_at: string
  date_of_birth: string
  email_verified: boolean
  first_name: string
  fruits: any[] // Replace 'any' with a more specific type if possible
  last_name: string
  phone: string
  phone_verified: boolean
  product_category: any[] // Replace 'any' with a more specific type if possible
  rating_avg: number
  role: string
  special_fruits: any[] // Replace 'any' with a more specific type if possible
  updated_at: string
  __v: number
  _id: string
}

export type GardenersApiResponse = {
  message: string
  statusCode: number
  data: {
    count: number
    items: Gardener[]
  }
}
