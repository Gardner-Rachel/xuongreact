export interface IProduct {
    _id?: number | string
    name: string
    category: string
    price: number
    image?: string
    gallery?: string[]
    description?: string
    tags?: string[]
    discount?: number
    countInStock?: number
    featured?: boolean
    attributes?: string[]
    
   
}
