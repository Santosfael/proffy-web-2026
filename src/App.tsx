import { RouterProvider } from "react-router"
import { router } from "./routes"
import { Toaster } from "sonner"
import { TeacherProvider } from "./contexts/teacher-context"

export function App() {
  return (
    <TeacherProvider>
      <Toaster richColors />
      <RouterProvider router={router} />
    </TeacherProvider>
  )
}
