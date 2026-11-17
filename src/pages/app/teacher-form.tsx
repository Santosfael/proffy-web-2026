import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import rocket from "../../assets/rocket.svg"
import { useTeacher } from "../../contexts/teacher-context"
import { formatCostForInput, formatWhatsapp } from "../../lib/formatters"
import { SUBJECT_OPTIONS } from "../../lib/teacher-data"
import {
  teacherFormSchema,
  type TeacherFormData,
  type TeacherFormInput,
} from "../../lib/teacher-schema"
import { FieldError } from "../../components/field-error"
import { FormFooter } from "../../components/form-footer"
import { FormSection } from "../../components/form-section"
import { InputCustom } from "../../components/input-custom"
import { ScheduleRow } from "../../components/schedule-row"
import { Select } from "../../components/select"
import { TeacherPageShell } from "../../components/teacher-page-shell"
import { TextArea } from "../../components/text-area"

export function TeacherForm() {
    const navigate = useNavigate()
    const { teacher, saveTeacher } = useTeacher()
    const fullName = [teacher.name, teacher.lastName].filter(Boolean).join(" ")

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isValid },
    } = useForm<TeacherFormInput, unknown, TeacherFormData>({
        resolver: zodResolver(teacherFormSchema),
        mode: "onChange",
        defaultValues: {
            whatsapp: teacher.whatsapp,
            biography: teacher.biography,
            subject: teacher.subject,
            cost: formatCostForInput(teacher.cost),
            schedule: teacher.schedule.length
                ? teacher.schedule
                : [{ week_day: "", from: "", to: "" }],
        },
    })

    const {
        fields: scheduleItems,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "schedule",
    })

    function addNewScheduleItem() {
        append({ week_day: "", from: "", to: "" })
    }

    function handleCreateClass(data: TeacherFormData) {
        saveTeacher({
            ...teacher,
            whatsapp: data.whatsapp,
            biography: data.biography,
            subject: data.subject,
            cost: data.cost,
            schedule: data.schedule,
        })

        navigate("/give-classes/register-completed")
    }

    return (
        <TeacherPageShell
            title="Dar aulas"
            backTo="/"
            hero={
                <div className="w-full max-w-4xl mx-auto px-4 pt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                    <div>
                        <h1 className="font-archivo-bold text-4xl text-white leading-tight">
                            Que incrível que você
                            <br />
                            quer dar aulas.
                        </h1>
                        <p className="font-poppins-regular text-base text-text-purple-base mt-6 leading-relaxed">
                            O primeiro passo, é preencher esse
                            <br />
                            formulário de inscrição.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 sm:mr-8">
                        <img src={rocket} alt="" className="w-8 h-8" />
                        <span className="font-poppins-regular text-sm text-text-purple-base">
                            Prepare-se!
                            <br />
                            vai ser o máximo.
                        </span>
                    </div>
                </div>
            }
        >
            <form onSubmit={handleSubmit(handleCreateClass)} noValidate>
                <div className="px-6 sm:px-16 pt-16 pb-16 flex flex-col gap-16">
                    <FormSection title="Seus dados">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <img
                                    src={teacher.avatarUrl}
                                    alt={fullName}
                                    className="w-[120px] h-[120px] rounded-full object-cover"
                                />
                                <strong className="font-archivo-semibold text-2xl text-text-title">
                                    {fullName}
                                </strong>
                            </div>

                            <div className="flex flex-col w-full sm:max-w-[288px]">
                                <InputCustom
                                    name="whatsapp"
                                    label="Whatsapp"
                                    placeholder="( ) _____-____"
                                    labelColor="text-text-complement"
                                    bgColor="bg-white-shape"
                                    mask={formatWhatsapp}
                                    register={register}
                                    error={errors.whatsapp}
                                />
                                <FieldError message={errors.whatsapp?.message} />
                            </div>
                        </div>

                        <div className="flex flex-col mt-8">
                            <TextArea
                                name="biography"
                                label="Biografia"
                                spanLabel="(Máximo 300 caracteres)"
                                labelColor="text-text-complement"
                                bgColor="bg-white-shape"
                                maxLength={300}
                                register={register}
                                error={errors.biography}
                            />
                            <FieldError message={errors.biography?.message} />
                        </div>
                    </FormSection>

                    <FormSection title="Sobre a aula">
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-8">
                            <div className="flex flex-col sm:col-span-3">
                                <Select
                                    name="subject"
                                    label="Matéria"
                                    optionDefault="Selecione qual você quer ensinar"
                                    options={SUBJECT_OPTIONS}
                                    labelColor="text-text-complement"
                                    bgColor="bg-white-shape"
                                    register={register}
                                    error={errors.subject}
                                />
                                <FieldError message={errors.subject?.message} />
                            </div>

                            <div className="flex flex-col sm:col-span-2">
                                <InputCustom
                                    name="cost"
                                    label="Custo da sua hora por aula"
                                    placeholder="0,00"
                                    prefix="R$"
                                    inputMode="decimal"
                                    labelColor="text-text-complement"
                                    bgColor="bg-white-shape"
                                    mask={(value) => value.replace(/[^0-9.,]/g, "")}
                                    register={register}
                                    error={errors.cost}
                                />
                                <FieldError message={errors.cost?.message} />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection
                        title="Horários disponíveis"
                        action={
                            <button
                                type="button"
                                onClick={addNewScheduleItem}
                                className="font-archivo-semibold text-base text-purple cursor-pointer hover:text-dark-purple transition-colors"
                            >
                                + Novo horário
                            </button>
                        }
                    >
                        <div className="flex flex-col">
                            {scheduleItems.map((item, index) => (
                                <ScheduleRow
                                    key={item.id}
                                    index={index}
                                    register={register}
                                    errors={errors.schedule?.[index]}
                                    canRemove={index > 0}
                                    onRemove={() => remove(index)}
                                />
                            ))}
                        </div>
                    </FormSection>
                </div>

                <FormFooter
                    disabled={isSubmitting || !isValid}
                    isSubmitting={isSubmitting}
                />
            </form>
        </TeacherPageShell>
    )
}
