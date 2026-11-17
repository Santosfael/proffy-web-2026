type FieldErrorProps = {
  message?: string
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null

  return (
    <p role="alert" className="mt-1 font-poppins-regular text-xs text-red-500">
      {message}
    </p>
  )
}
