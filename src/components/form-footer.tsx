import attentionIcon from "../assets/attention.svg"

type FormFooterProps = {
  disabled?: boolean
  isSubmitting?: boolean
  title?: string
}

export function FormFooter({
  disabled,
  isSubmitting,
  title = "Salvar cadastro",
}: FormFooterProps) {
  return (
    <footer className="bg-white-shape border-t border-gray-lines-in-white px-6 sm:px-16 py-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={attentionIcon} alt="Atenção" className="w-8 h-8" />
        <div className="flex flex-col text-sm font-poppins-regular">
          <span className="text-text-complement">Importante!</span>
          <span className="text-text-complement">
            Preencha todos os dados corretamente.
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled || isSubmitting}
        className="bg-green hover:bg-green-dark disabled:bg-gray-shape disabled:text-text-complement disabled:cursor-not-allowed text-white font-archivo-semibold rounded-lg px-10 py-4 cursor-pointer transition-colors"
      >
        {isSubmitting ? "Salvando..." : title}
      </button>
    </footer>
  )
}
