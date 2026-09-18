type ButtonProps = {
    type?: "button" | "submit" | "reset"
    title: string
    disabled?: boolean
}

export function Button({ type = "button", title, disabled }: ButtonProps) {
    return (
        <button
        type={type}
        disabled={disabled}
        className='w-full bg-green p-5 border-none font-archivo-semibold text-white-shape rounded-lg cursor-pointer'
        >
            {title}
        </button>
    )
}