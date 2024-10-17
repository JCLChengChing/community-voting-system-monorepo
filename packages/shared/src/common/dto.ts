import { z } from 'zod'
import { objectIdSchema } from './schema'

export const findDtoSchema = z.object({
  skip: z.coerce.number().int().min(0).optional(),
  limit: z.coerce.number().int().min(0).optional(),
})
export type FindDto = z.infer<typeof findDtoSchema>

export const updateBasicImageDtoSchema = z.object({
  file: z.optional(objectIdSchema),
  alt: z.string().optional(),
})
export type UpdateBasicImageDto = z.infer<typeof updateBasicImageDtoSchema>
