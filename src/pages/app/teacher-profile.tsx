import { zodResolver } from "@hookform/resolvers/zod"
import { Camera } from "lucide-react"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import { useNavigate } from "react-router"

import backgroundFinally from "../../assets/background-finaly.svg"
import { useTeacher } from "../../contexts/teacher-context"
import { formatCostForInput, formatWhatsapp } from "../../lib/formatters"
import { SUBJECT_OPTIONS } from "../../lib/teacher-data"
import {
    teacherProfileSchema,
    type TeacherProfileData,
    type TeacherProfileInput,
} from "../../lib/teacher-schema"
import { FieldError } from "../../components/field-error"
import { FormFooter } from "../../components/form-footer"
import { FormSection } from "../../components/form-section"
import { InputCustom } from "../../components/input-custom"
import { ScheduleRow } from "../../components/schedule-row"
import { Select } from "../../components/select"
import { TeacherPageShell } from "../../components/teacher-page-shell"
import { TextArea } from "../../components/text-area"

export function TeacherProfile() {
    const navigate = useNavigate()
    const { teacher, saveTeacher } = useTeacher()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isValid },
    } = useForm<TeacherProfileInput, unknown, TeacherProfileData>({
        resolver: zodResolver(teacherProfileSchema),
        mode: "onChange",
        defaultValues: {
            name: teacher.name,
            lastName: teacher.lastName,
            email: teacher.email,
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

    const watchedName = useWatch({ control, name: "name" })
    const watchedLastName = useWatch({ control, name: "lastName" })
    const fullName =
        [watchedName ?? teacher.name, watchedLastName ?? teacher.lastName]
            .map((part) => part.trim())
            .filter(Boolean)
            .join(" ") || teacher.name
    const currentSubject = useWatch({ control, name: "subject" }) || teacher.subject

    function addNewScheduleItem() {
        append({ week_day: "", from: "", to: "" })
    }

    function handleSaveProfile(data: TeacherProfileData) {
        saveTeacher({
            ...data,
            avatarUrl: teacher.avatarUrl,
        })

        navigate("/give-classes/register-completed")
    }

    return (
        <TeacherPageShell
            title="Meu perfil"
            backTo="/"
            heroClassName="min-h-[430px]"
            hero={
                <div className="relative w-full min-h-[430px] flex flex-col items-center justify-center overflow-hidden">
                    <img
                        src={backgroundFinally}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={teacher.avatarUrl}
                                alt={fullName}
                                className="w-[180px] h-[180px] rounded-full object-cover"
                            />
                            <button
                                type="button"
                                aria-label="Alterar foto"
                                className="absolute bottom-1 right-1 w-12 h-12 rounded-full bg-green border-4 border-purple flex items-center justify-center text-white cursor-pointer hover:bg-green-dark transition-colors"
                            >
                                <Camera size={20} />
                            </button>
                        </div>

                        <h1 className="font-archivo-bold text-4xl text-white mt-6">
                            {fullName}
                        </h1>
                        <p className="font-poppins-regular text-2xl text-text-purple-base mt-2">
                            {currentSubject || "Matéria não informada"}
                        </p>
                    </div>
                </div>
            }
        >
            <form onSubmit={handleSubmit(handleSaveProfile)} noValidate>
                <div className="px-6 sm:px-16 pt-16 pb-16 flex flex-col gap-16">
                    <FormSection title="Seus dados">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <InputCustom
                                    name="name"
                                    label="Nome"
                                    labelColor="text-text-complement"
                                    bgColor="bg-white-shape"
                                    register={register}
                                    error={errors.name}
                                />
                                <FieldError message={errors.name?.message} />
                            </div>

                            <div className="flex flex-col">
                                <InputCustom
                                    name="lastName"
                                    label="Sobrenome"
                                    labelColor="text-text-complement"
                                    bgColor="bg-white-shape"
                                    register={register}
                                    error={errors.lastName}
                                />
                                <FieldError message={errors.lastName?.message} />
                            </div>

                            <div className="flex flex-col">
                                <InputCustom
                                    name="email"
                                    type="email"
                                    label="E-mail"
                                    labelColor="text-text-complement"
                                    bgColor="bg-white-shape"
                                    register={register}
                                    error={errors.email}
                                />
                                <FieldError message={errors.email?.message} />
                            </div>

                            <div className="flex flex-col">
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
                                    canRemove
                                    onRemove={() => remove(index)}
                                />
                            ))}

                            {scheduleItems.length === 0 && (
                                <FieldError message="Adicione pelo menos um horário." />
                            )}
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
