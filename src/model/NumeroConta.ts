export class NumeroConta{
    private _numero: string;

    public constructor(numero: string){
        this.validar(numero);
        this._numero = numero;
    }

    private validar(numero:string):void{
        if(!this.temSeisDigitosNumericos(numero))
            throw new Error("Número de conta inválido");
    }

    private temSeisDigitosNumericos(numero: string):boolean{
        const regExp: RegExp = /^\d{6}$/;

        return regExp.test(numero);
    }

    public get numero(): string{
        return this._numero;
    }
}