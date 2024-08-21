import {z} from 'zod'

 export const productsSchema = z.object({
    category: z.string(),
    description: z.string(),
    id: z.number().positive(),
    image: z.string().url(),
    price: z.number().positive(),
    rating: z.object({
        count: z.number().positive(),
        rate: z.number().positive()
    }),
    title: z.string()
}
)
