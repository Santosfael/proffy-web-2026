import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import { AppHeader } from "./app-header"

type TeacherPageShellProps = {
  title: string
  backTo?: string
  hero: ReactNode
  children: ReactNode
  heroClassName?: string
}

export function TeacherPageShell({
  title,
  backTo = "/",
  hero,
  children,
  heroClassName,
}: TeacherPageShellProps) {
  return (
    <div className="w-full min-h-screen bg-background antialiased flex flex-col">
      <AppHeader title={title} backTo={backTo} />
      <section
        className={twMerge(
          "w-full bg-purple min-h-[352px] flex flex-col items-center justify-center",
          heroClassName
        )}
      >
        {hero}
      </section>
      <main className="w-full max-w-4xl mx-auto px-4 -mt-16 relative z-10 mb-16">
        <div className="bg-white border border-gray-lines-in-white rounded-lg shadow-sm overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}
