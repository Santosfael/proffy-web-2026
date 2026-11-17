import { createContext, useContext, useState, type ReactNode } from "react"
import { INITIAL_TEACHER_PROFILE, type TeacherProfile } from "../lib/teacher-data"

const STORAGE_KEY = "proffy:teacher-profile"

export type TeacherContextType = {
  teacher: TeacherProfile
  saveTeacher: (profile: TeacherProfile) => void
}

const TeacherContext = createContext<TeacherContextType | null>(null)

function getStoredTeacherProfile(): TeacherProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return INITIAL_TEACHER_PROFILE
    }
    const parsed = JSON.parse(stored)
    return {
      ...INITIAL_TEACHER_PROFILE,
      ...parsed,
      schedule:
        Array.isArray(parsed?.schedule) && parsed.schedule.length > 0
          ? parsed.schedule
          : INITIAL_TEACHER_PROFILE.schedule,
    }
  } catch {
    return INITIAL_TEACHER_PROFILE
  }
}

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teacher, setTeacher] = useState<TeacherProfile>(getStoredTeacherProfile)

  function saveTeacher(profile: TeacherProfile) {
    setTeacher(profile)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // Ignora falhas de escrita no localStorage
    }
  }

  return (
    <TeacherContext.Provider value={{ teacher, saveTeacher }}>
      {children}
    </TeacherContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTeacher(): TeacherContextType {
  const context = useContext(TeacherContext)
  if (!context) {
    throw new Error("useTeacher deve ser usado dentro de um TeacherProvider")
  }
  return context
}
