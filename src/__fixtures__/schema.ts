import * as z from 'zod'

export const schema = z.object({
  category: z.string().min(1),
  order: z.number().int().nonnegative(),
  name: z.string().min(1),
  price: z.number().nonnegative().nullable(),
  priceSmall: z.number().nonnegative().nullable(),
  priceMedium: z.number().nonnegative().nullable(),
  priceLarge: z.number().nonnegative().nullable(),
  description: z.string().nullable(),
  available: z.coerce.boolean().default(false),
  addItem: z.number().nonnegative().nullable(),
})
