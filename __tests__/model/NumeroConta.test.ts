import { NumeroConta } from "../../src/model/NumeroConta";


describe("Número conta", ()=>{
    test("conta com 6 dígitos", ()=>{
        const numeroConta = new NumeroConta("123456");

        expect(numeroConta.numero).toBe("123456");
        expect(numeroConta.numero.length).toBe(6);
    });

    test("conta com quatro dígitos",()=>{
        expect(() => {
            new NumeroConta("3456");
        }).toThrow("Número de conta inválido");
    });

    test("conta com valor que não sejam digitos", async () => {
        expect(() => { new NumeroConta("abc123"); }).toThrow("Número de conta inválido");
      });
});