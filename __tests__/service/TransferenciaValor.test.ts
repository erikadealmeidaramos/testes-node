import { Conta } from "../../src/model/Conta";
import { TransferenciaValor } from "../../src/model/service/TransferenciaValor";

describe("Transferência Valor", ()=>{
    test("Transferência de valor entre duas contas", ()=>{
        const contaOrigem = new Conta("123456", 1000.0);
        const contaDestino = new Conta("654321", 1000.0);

        const transferenciaValor = new TransferenciaValor();
        const recibo = transferenciaValor.transferir(contaOrigem, contaDestino, 100.0);

        expect(contaOrigem.saldo).toBe(900.0);
        expect(contaDestino.saldo).toBe(1100.0);

        expect(recibo.codigo.length).toBe(6);
    });
});