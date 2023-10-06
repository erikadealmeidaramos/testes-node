import { TransferenciaServico } from "../../src/application/TransferenciaServico";
import { TransferenciaDTO } from "../../src/application/dto/TransferenciaDTO";
import { Conta } from "../../src/model/Conta";
import { Repositorio } from "../../src/model/contract/Repositorio";

describe("Transferencia servico mock", ()=>{
    test("transferencia com sucesso", ()=>{
        const {repositorio, contaOrigem, contaDestino } = criarMock();

        const transferenciaServico = new TransferenciaServico(repositorio);

        const dto = new TransferenciaDTO("123456","654321", 100.0);

        const recibo = transferenciaServico.transferir(dto);

        expect(repositorio.buscar).toBeCalledTimes(2);
        expect(repositorio.adicionar).toBeCalledTimes(2);
        expect(repositorio.buscar).toBeCalledWith("123456");
        expect(repositorio.buscar).toBeCalledWith("654321");
        expect(repositorio.adicionar).toBeCalledWith(contaOrigem);
        expect(repositorio.adicionar).toBeCalledWith(contaDestino);
        expect(repositorio.buscar("123456")!.saldo).toBe(4900.0);
        expect(repositorio.buscar("654321")!.saldo).toBe(5100.0);
        expect(recibo.length).toBe(6);
    });


    test("conta de origem não encontrada", () => {
        const { repositorio, contaOrigem, contaDestino } = criarMock();
    
        const transferenciaServico = new TransferenciaServico(repositorio);
    
        const dto = new TransferenciaDTO("111111", "654321", 100.0);
    
        expect(() => { transferenciaServico.transferir(dto); }).toThrow("conta de origem não encontrada");
        expect(repositorio.buscar).toBeCalledWith("111111");
        expect(repositorio.buscar).toBeCalledWith("654321");
        expect(repositorio.buscar).toBeCalledTimes(2);
        expect(repositorio.adicionar).not.toBeCalled();
    });
    
    test("conta de destino não encontrada", () => {
        const { repositorio, contaOrigem, contaDestino } = criarMock();
    
        const transferenciaServico = new TransferenciaServico(repositorio);
    
        const dto = new TransferenciaDTO("123456", "222222", 100.0);
    
        expect(() => { transferenciaServico.transferir(dto); }).toThrow("conta de destino não encontrada");
        expect(repositorio.buscar).toBeCalledWith("123456");
        expect(repositorio.buscar).toBeCalledWith("222222");
        expect(repositorio.buscar).toBeCalledTimes(2);
        expect(repositorio.adicionar).not.toBeCalled();
    });

});


function criarMock(){
    const contaOrigem = new Conta("123456", 5000.0);
    const contaDestino = new Conta("123456", 5000.0);


    const repositorio: jest.Mocked<Repositorio<Conta, string>> = {
        adicionar: jest.fn((entidade:Conta) => {

        }),
        buscar: jest.fn((numero: string) => {
            if(numero === "123456"){
                return contaOrigem;
            }else if(numero === "654321"){
                return contaDestino;
            }else{
                return undefined;
            }
        })
    };

    return {repositorio, contaOrigem, contaDestino}
}