export class Recibo{
    private _codigo: string;

    public constructor(){
        this._codigo = Math.floor(Math.random() * 899999 + 100000).toString();
    }

    public get codigo(): string{
        return this._codigo;
    }
}