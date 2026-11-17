export type ScheduleItem = { week_day: string; from: string; to: string }

export type TeacherProfile = {
  name: string
  lastName: string
  email: string
  whatsapp: string
  biography: string
  subject: string
  cost: number
  schedule: ScheduleItem[]
  avatarUrl: string
}

export const SUBJECT_OPTIONS = [
  { value: "Artes", label: "Artes" },
  { value: "Biologia", label: "Biologia" },
  { value: "Ciências", label: "Ciências" },
  { value: "Educação física", label: "Educação física" },
  { value: "Física", label: "Física" },
  { value: "Geografia", label: "Geografia" },
  { value: "História", label: "História" },
  { value: "Matemática", label: "Matemática" },
  { value: "Português", label: "Português" },
  { value: "Química", label: "Química" },
]

export const WEEK_DAY_OPTIONS = [
  { value: "0", label: "Domingo" },
  { value: "1", label: "Segunda-feira" },
  { value: "2", label: "Terça-feira" },
  { value: "3", label: "Quarta-feira" },
  { value: "4", label: "Quinta-feira" },
  { value: "5", label: "Sexta-feira" },
  { value: "6", label: "Sábado" },
]

export const INITIAL_TEACHER_PROFILE: TeacherProfile = {
  name: "Rafael",
  lastName: "Rocha",
  email: "rafael.rocha@email.com",
  whatsapp: "",
  biography: "",
  subject: "",
  cost: 0,
  schedule: [{ week_day: "", from: "", to: "" }],
  avatarUrl: "https://avatars.githubusercontent.com/u/15871684?v=4",
}
