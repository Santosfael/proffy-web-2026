import type { UseFormRegister } from "react-hook-form"
import { Select } from "./select"
import { InputCustom } from "./input-custom"
import { FieldError } from "./field-error"
import { WEEK_DAY_OPTIONS } from "../lib/teacher-data"

type ScheduleRowProps = {
  index: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  errors?: {
    week_day?: { message?: string }
    from?: { message?: string }
    to?: { message?: string }
  }
  canRemove: boolean
  onRemove?: () => void
}

export function ScheduleRow({
  index,
  register,
  errors,
  canRemove,
  onRemove,
}: ScheduleRowProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
        <div className="flex flex-col sm:col-span-2">
          <Select
            label="Dia da semana"
            name={`schedule.${index}.week_day`}
            optionDefault="Selecione o dia"
            options={WEEK_DAY_OPTIONS}
            labelColor="text-text-complement"
            bgColor="bg-white-shape"
            register={register}
            error={errors?.week_day}
          />
          <FieldError message={errors?.week_day?.message} />
        </div>

        <div className="flex flex-col sm:col-span-1">
          <InputCustom
            label="Das"
            name={`schedule.${index}.from`}
            type="time"
            labelColor="text-text-complement"
            bgColor="bg-white-shape"
            register={register}
            error={errors?.from}
          />
          <FieldError message={errors?.from?.message} />
        </div>

        <div className="flex flex-col sm:col-span-1">
          <InputCustom
            label="Até"
            name={`schedule.${index}.to`}
            type="time"
            labelColor="text-text-complement"
            bgColor="bg-white-shape"
            register={register}
            error={errors?.to}
          />
          <FieldError message={errors?.to?.message} />
        </div>
      </div>

      {canRemove && (
        <div className="flex items-center gap-4 my-6">
          <span className="flex-1 border-t border-gray-lines-in-white" />
          <button
            type="button"
            onClick={onRemove}
            className="font-archivo-semibold text-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Excluir horário
          </button>
          <span className="flex-1 border-t border-gray-lines-in-white" />
        </div>
      )}
    </div>
  )
}
