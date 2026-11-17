import { z } from "zod"

export const scheduleItemSchema = z
  .object({
    week_day: z.string().min(1, "Selecione o dia da semana."),
    from: z.string().regex(/^\d{2}:\d{2}$/, "Informe o horário inicial."),
    to: z.string().regex(/^\d{2}:\d{2}$/, "Informe o horário final."),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) return true
      return data.from < data.to
    },
    {
      message: "O horário final deve ser posterior ao inicial.",
      path: ["to"],
    }
  )

export const whatsappSchema = z
  .string()
  .trim()
  .min(1, "Informe seu WhatsApp.")
  .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Informe um WhatsApp válido.")

export const biographySchema = z
  .string()
  .trim()
  .min(1, "Informe sua biografia.")
  .max(300, "A biografia deve ter no máximo 300 caracteres.")

export const subjectSchema = z
  .string()
  .min(1, "Selecione a matéria que deseja ensinar.")

export const costSchema = z
  .string()
  .trim()
  .min(1, "Informe o custo da sua hora por aula.")
  .refine((value) => /^\d+([.,]\d{1,2})?$/.test(value), "Informe um valor válido.")
  .transform((value) => Number(value.replace(",", ".")))
  .refine((value) => value > 0, "O custo deve ser maior que zero.")

export const teacherFormSchema = z.object({
  whatsapp: whatsappSchema,
  biography: biographySchema,
  subject: subjectSchema,
  cost: costSchema,
  schedule: z.array(scheduleItemSchema).min(1, "Adicione pelo menos um horário."),
})

export const teacherProfileSchema = z.object({
  name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres."),
  lastName: z.string().trim().min(3, "O sobrenome deve ter pelo menos 3 caracteres."),
  email: z.email("E-mail inválido"),
  whatsapp: whatsappSchema,
  biography: biographySchema,
  subject: subjectSchema,
  cost: costSchema,
  schedule: z.array(scheduleItemSchema).min(1, "Adicione pelo menos um horário."),
})

export type TeacherFormInput = z.input<typeof teacherFormSchema>
export type TeacherFormData = z.output<typeof teacherFormSchema>
export type TeacherProfileInput = z.input<typeof teacherProfileSchema>
export type TeacherProfileData = z.output<typeof teacherProfileSchema>
