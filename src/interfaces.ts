export interface productSchema{
    category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  rating: {
    count: number,
    rate: number
  },
  title: string
}

export interface cartProductSchema extends productSchema {
    quantity: number
}