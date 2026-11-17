import { Finally } from "../../components/finally"

export function TeacherFormCompleted() {
    return (
        <Finally
            title="Cadastro salvo!"
            subtitle={
                <>
                    Tudo certo, seu cadastro está na nossa lista de professores.
                    <br />
                    Agora é só ficar de olho no seu WhatsApp.
                </>
            }
            titleButton="Acessar lista"
            path="/my-profile"
            buttonClassName="w-auto px-10 mt-10"
        />
    )
}
