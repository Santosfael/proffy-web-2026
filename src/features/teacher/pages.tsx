import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, Rocket } from 'lucide-react'
import { toast } from 'sonner'
import avatar from '../../assets/avatar.svg'
import { Finally } from '../../components/finally'
import { Field, FormFooter, FormSection, TeacherHeader } from './components'
import { emptySchedule, emptyTeacher, loadTeacher, maskPhone, saveTeacher, subjects, teacherSchema, weekdays, type Teacher } from './model'
import './teacher.css'

export function TeacherRegistration() { return <TeacherEditor profile={false} /> }
export function TeacherProfile() {
  const [teacher] = useState(loadTeacher)
  return teacher ? <TeacherEditor profile initial={teacher} /> : <Navigate to="/give-classes" replace />
}
export function TeacherSaved() {
  return loadTeacher() ? <div className="teacher-success"><Finally title="Cadastro salvo!" subtitle="Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp." titleButton="Acessar lista" path="/profile" /></div> : <Navigate to="/give-classes" replace />
}
function TeacherEditor({ profile, initial }: { profile: boolean; initial?: Teacher }) {
  const navigate = useNavigate()
  const { register, control, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<Teacher>({
    resolver: zodResolver(teacherSchema), defaultValues: initial ?? loadTeacher() ?? emptyTeacher,
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'schedules' })
  const name = watch('name')
  const lastName = watch('lastName')
  const subject = watch('subject')
  const bio = watch('bio')
  function submit(data: Teacher) {
    try {
      saveTeacher(data)
      if (profile) toast.success('Perfil atualizado com sucesso!')
      else navigate('/give-classes/success')
    } catch { toast.error('Não foi possível salvar. Verifique se o armazenamento do navegador está disponível e tente novamente.') }
  }
  function textField(key: 'name' | 'lastName' | 'email' | 'whatsapp' | 'cost', label: string, type = 'text') {
    const error = errors[key]?.message
    return <Field id={key} label={label} error={error}><div className={key === 'cost' ? 'currency-field' : undefined}>{key === 'cost' && <span>R$</span>}<input id={key} type={type} autoComplete={{ name: 'given-name', lastName: 'family-name', email: 'email', whatsapp: 'tel', cost: 'off' }[key]} step={key === 'cost' ? '0.01' : undefined} min={key === 'cost' ? '0.01' : undefined} placeholder={key === 'whatsapp' ? '(11) 99999-9999' : undefined} aria-invalid={!!error} aria-describedby={error ? `${key}-error` : undefined} {...register(key, key === 'whatsapp' ? { onChange: event => { setValue('whatsapp', maskPhone(event.target.value), { shouldValidate: true, shouldDirty: true }) } } : {})} /></div></Field>
  }
  function subjectField() {
    return <Field id="subject" label="Matéria" error={errors.subject?.message}><select id="subject" {...register('subject')} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined}><option value="">Selecione qual você quer ensinar</option>{subjects.map(item => <option key={item}>{item}</option>)}</select></Field>
  }
  return <main className={`teacher-page ${profile ? 'is-profile' : ''}`}><TeacherHeader profile={profile} /><div className="teacher-hero">{profile ? <div className="profile-identity"><div className="profile-avatar"><img src={avatar} alt="Avatar do professor" /><span title="Avatar ilustrativo"><Camera size={20} /></span></div><h1>{name} {lastName}</h1><p>{subject}</p></div> : <div className="teacher-intro"><div><h1>Que incrível que você<br />quer dar aulas.</h1><p>O primeiro passo, é preencher esse<br />formulário de inscrição.</p></div><p className="intro-aside"><Rocket /><span>Prepare-se!<br />vai ser o máximo.</span></p></div>}</div>
    <form className="teacher-card" noValidate onSubmit={handleSubmit(submit, () => toast.error('Confira os campos indicados no formulário.'))}>
      <div className="teacher-card-body"><FormSection title="Seus dados">{!profile && <div className="registration-identity"><img src={avatar} alt="Avatar do professor" /><strong>{[name, lastName].filter(Boolean).join(' ') || 'Seu nome aqui'}</strong></div>}<div className="teacher-grid">{textField('name', 'Nome')}{textField('lastName', 'Sobrenome')}{textField('email', 'E-mail', 'email')}{textField('whatsapp', 'Whatsapp', 'tel')}</div><Field id="bio" label="Biografia" error={errors.bio?.message}><textarea id="bio" maxLength={300} rows={5} {...register('bio')} aria-invalid={!!errors.bio} aria-describedby={`bio-count${errors.bio ? ' bio-error' : ''}`} /><span className="bio-count" id="bio-count">{bio.length}/300 caracteres</span></Field></FormSection>
      <FormSection title="Sobre a aula">{subjectField()}{textField('cost', 'Custo da sua hora por aula', 'number')}</FormSection>
      <FormSection title="Horários disponíveis" action={<button type="button" className="add-schedule" onClick={() => append(emptySchedule(), { focusName: `schedules.${fields.length}.day` })}>+ Novo horário</button>}>
        {fields.map((field, index) => <div className="schedule-block" key={field.id}><div className="schedule-grid"><Field id={`day-${field.id}`} label="Dia da semana" error={errors.schedules?.[index]?.day?.message}><select id={`day-${field.id}`} {...register(`schedules.${index}.day`)} aria-invalid={!!errors.schedules?.[index]?.day} aria-describedby={errors.schedules?.[index]?.day ? `day-${field.id}-error` : undefined}><option value="">Selecione o dia</option>{weekdays.map(day => <option key={day}>{day}</option>)}</select></Field>{(['from', 'to'] as const).map(key => <Field key={key} id={`${key}-${field.id}`} label={key === 'from' ? 'Das' : 'Até'} error={errors.schedules?.[index]?.[key]?.message}><input id={`${key}-${field.id}`} type="time" {...register(`schedules.${index}.${key}`)} aria-invalid={!!errors.schedules?.[index]?.[key]} aria-describedby={errors.schedules?.[index]?.[key] ? `${key}-${field.id}-error` : undefined} /></Field>)}</div>{(profile || fields.length > 1) && <button type="button" className="remove-schedule" aria-label={`Excluir horário ${index + 1}`} onClick={() => remove(index)}>Excluir horário</button>}</div>)}
        {(errors.schedules?.root?.message || errors.schedules?.message) && <p className="field-error" role="alert">{errors.schedules.root?.message ?? errors.schedules.message}</p>}
      </FormSection></div><FormFooter saving={isSubmitting} />
    </form></main>
}
