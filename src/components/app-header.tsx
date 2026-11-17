import { Link } from "react-router"
import goBackIcon from "../assets/goback-another-purple.svg"
import proffyLogo from "../assets/proffy-logo.svg"

type AppHeaderProps = {
  title: string
  backTo?: string
  backLabel?: string
}

export function AppHeader({
  title,
  backTo = "/",
  backLabel = "Voltar para o início",
}: AppHeaderProps) {
  return (
    <header className="w-full bg-dark-purple h-16 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          to={backTo}
          aria-label={backLabel}
          className="flex items-center justify-center p-2 -ms-2 rounded hover:opacity-80 transition-opacity"
        >
          <img src={goBackIcon} alt="" className="w-6 h-6" />
        </Link>
        <h1 className="font-archivo-semibold text-base text-text-purple-base">
          {title}
        </h1>
        <img src={proffyLogo} alt="Proffy" className="w-12 h-4" />
      </div>
    </header>
  )
}
