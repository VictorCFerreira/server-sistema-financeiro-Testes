import { describe, test, expect } from "@jest/globals"; // Importa o Jest
import Fiscal from "../src/utils/Fiscal";

describe("Testes para a classe Fiscal", () => {
  let fiscal: Fiscal;

  beforeAll(() => {
    fiscal = new Fiscal();
  });

  test("Deve calcular corretamente o imposto sobre venda", () => {
    const resultado = fiscal.calcularImpostoVenda(1000, 10); // 10% de imposto sobre 1000
    expect(resultado).toBe(100); // 1000 * 10% = 100
  });

  test("Deve lançar erro ao calcular imposto com valor negativo", () => {
    expect(() => fiscal.calcularImpostoVenda(-1000, 10)).toThrow(
      "Valor e taxa de imposto devem ser positivos."
    );
  });

  test("Deve calcular corretamente o desconto", () => {
    const resultado = fiscal.calcularDesconto(1000, 20); // 20% de desconto sobre 1000
    expect(resultado).toBe(800); // 1000 - 20% = 800
  });

  test("Deve calcular corretamente o valor final após imposto e desconto", () => {
    const resultado = fiscal.calcularValorFinal(1000, 10, 20); // 10% de imposto e 20% de desconto sobre 1000
    expect(resultado).toBe(880); // (1000 - 20%) = 800, 800 + 10% = 880
  });

});
