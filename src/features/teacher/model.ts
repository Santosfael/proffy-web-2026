import { z } from 'zod'

export const subjects = ['Artes', 'Biologia', 'Ciências', 'Educação física', 'Física', 'Geografia', 'História', 'Inglês', 'Matemática', 'Português', 'Química']
export const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
export const teacherSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.'),
  lastName: z.string().trim().min(2, 'Informe seu sobrenome.'),
  email: z.email('Informe um e-mail válido.'),
  whatsapp: z.string().refine(value => /^\d{10,11}$/.test(value.replace(/\D/g, '')), 'Informe o telefone com DDD.'),
  bio: z.string().trim().min(1, 'Conte um pouco sobre você.').max(300, 'Use no máximo 300 caracteres.'),
  subject: z.string().refine(value => subjects.includes(value), 'Selecione uma matéria.'),
  cost: z.string().refine(value => Number.isFinite(Number(value)) && Number(value) > 0, 'Informe um valor maior que zero.'),
  schedules: z.array(z.object({
    day: z.string().refine(value => weekdays.includes(value), 'Selecione o dia.'),
    from: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Informe o início.'),
    to: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Informe o término.'),
  }).refine(value => value.to > value.from, { message: 'O término deve ser após o início.', path: ['to'] }))
    .min(1, 'Adicione pelo menos um horário.')
    .superRefine((items, ctx) => {
      items.forEach((item, index) => {
        if (items.slice(0, index).some(other => other.day === item.day && item.from < other.to && item.to > other.from)) {
          ctx.addIssue({ code: 'custom', path: [index, 'from'], message: 'Este horário coincide com outro no mesmo dia.' })
        }
      })
    }),
})
export type Teacher = z.infer<typeof teacherSchema>
const storageKey = 'proffy.teacher.v1'
export const emptySchedule = () => ({ day: '', from: '', to: '' })
export const emptyTeacher: Teacher = { name: '', lastName: '', email: '', whatsapp: '', bio: '', subject: '', cost: '', schedules: [emptySchedule()] }
export function loadTeacher(): Teacher | null {
  try {
    const parsed = teacherSchema.safeParse(JSON.parse(localStorage.getItem(storageKey) ?? 'null'))
    return parsed.success ? parsed.data : null
  } catch { return null }
}
export function saveTeacher(teacher: Teacher) { localStorage.setItem(storageKey, JSON.stringify(teacher)) }
export function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  if (digits.length < 3) return `(${digits}`
  const local = digits.slice(2)
  const split = local.length > 8 ? 5 : 4
  return `(${digits.slice(0, 2)}) ${local.slice(0, split)}${local.length > split ? '-' + local.slice(split) : ''}`
}
