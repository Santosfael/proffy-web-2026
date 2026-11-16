import { TeacherRegistration, TeacherProfile, TeacherSaved } from './features/teacher/pages'
import { createBrowserRouter } from 'react-router'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { FinallyRegister } from './pages/auth/finally-register'
import { Home } from './pages/app/home'
import { TeacherList } from './pages/app/teacher-list'

export const router = createBrowserRouter([
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/sign-up/finally-register', element: <FinallyRegister /> },
    { path: '/', element: <Home /> },
    { path: '/study', element: <TeacherList />},
    { path: '/give-classes', element: <TeacherRegistration /> },
    { path: '/give-classes/success', element: <TeacherSaved /> },
    { path: '/profile', element: <TeacherProfile /> }
])
