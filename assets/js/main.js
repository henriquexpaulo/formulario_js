class ValidarFormulario {
    constructor() {
        this.eventos
        this.formulario = document.querySelector('.formulario')
    }
    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if (camposValidos && senhasValidas) {
            alert('Formulario Enviado');
            this.formulario.submit();
        }
    }
    senhasSaoValidas() {
        let valid = true
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');
        if (senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(senha, "campos senha e repetir senha precisa ser iguais")
            this.criaErro(repetirSenha, "campos senha e repetir senha precisa ser iguais")
        }
        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false
            this.criaErro(senha, "Senha precisa esta entre 6 e 12 caracteres")
        }

        return valid;
    }

    camposSaoValidos() {
        let valid = true;
        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }
        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = cmapo.previousElementSibling.innerText;
            if (!campo.value) {
                this.criaErro(campo, `Campo "${label}" mão pode estar em branco`);
                valid = false
            }
            if (campo.classList.contains('cpf')) {
                if (this.validaCPF(campo)) valid = false
            }
            if (campo.classList.contains('usuario')) {
                if (this.validarUsuario(campo)) valid = false
            }
        }
        return valid;
    }
    validarUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuario invalido')
            valid = false;
        }
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números');
            valid = false;
        }
        return valid;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);
        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF INVALIDO');
            return false
        }
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);

    }

}

const valida = new ValidarFormulario()