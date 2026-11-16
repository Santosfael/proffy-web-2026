import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, Info } from 'lucide-react'
import logo from '../../assets/proffy-logo.svg'
import { Button } from '../../components/button'

export function TeacherHeader({ profile }: { profile: boolean }) {
  return <header className="teacher-header"><nav><Link to="/" aria-label="Voltar para o início"><ArrowLeft /></Link><span>{profile ? 'Meu perfil' : 'Dar aulas'}</span><Link to="/" aria-label="Proffy, início"><img src={logo} alt="Proffy" /></Link></nav></header>
}
export function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return <div className="teacher-field"><label htmlFor={id}>{label}</label>{children}{error && <p className="field-error" id={`${id}-error`} role="alert">{error}</p>}</div>
}
export function FormSection({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return <fieldset className="teacher-section"><legend>{title}</legend>{action && <div className="section-action">{action}</div>}<div className="section-content">{children}</div></fieldset>
}
export function FormFooter({ saving }: { saving: boolean }) {
  return <footer className="teacher-footer"><p><Info aria-hidden="true" /><span><strong>Importante!</strong><br />Preencha todos os dados corretamente.</span></p><Button title={saving ? 'Salvando…' : 'Salvar cadastro'} type="submit" disabled={saving} /></footer>
}
