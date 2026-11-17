import type { ReactNode } from "react"

type FormSectionProps = {
  title: string
  action?: ReactNode
  children: ReactNode
}

export function FormSection({ title, action, children }: FormSectionProps) {
  return (
    <fieldset className="border-none p-0 m-0">
      <legend className="flex w-full items-center justify-between border-b border-gray-lines-in-white pb-3 mb-10 font-archivo-semibold text-2xl text-text-title">
        <span>{title}</span>
        {action}
      </legend>
      {children}
    </fieldset>
  )
}
