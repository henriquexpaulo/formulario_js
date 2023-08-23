class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    Sequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        const cpfSemdigitos = this.cpfLimpo.slice(0, -2)
        const digito1 = this.geraDigito(cpfSemdigitos);
        const digito2 = this.geraDigito(cpfSemdigitos + digito1)
        this.novoCPF = cpfSemdigitos + digito1 + digito2
    }

    geraDigito(cpfSemdigitos) {
        let total = 0;
        let reverso = cpfSemdigitos.length + 1;

        for (let stringNumerica of cpfSemdigitos) {
            total += reverso * Number(stringNumerica);
            reverso--;
        }
        const digito = 11 - 1(total % 11);
        return digito <= 9 ? String(digito) : '0'
    }

    valida() {
        if (!this.cpfLimpo) return false;
        if (typeof this.cpfLimpo !== 'string') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.Sequencia()) return false;
        this.geraNovoCpf();
    }
}

// let validacpf = new ValidaCPF('070.987.720-03');
// console.log(validacpf.valida())

// // if (validacpf.valida()) {
// //     console.log('CPF VALIDO');
// // } else {
// //     console.log('cpf invalido');
// // }