class Fiscal {
  // calcular o imposto sobre vendas
  public calcularImpostoVenda(valor: number, taxaImposto: number): number {
    if (valor <= 0 || taxaImposto <= 0) {
      throw new Error("Valor e taxa de imposto devem ser positivos.");
    }
    return valor * (taxaImposto / 100);
  }

  // calcular o desconto em um produto
  public calcularDesconto(valor: number, percentualDesconto: number): number {
    if (valor <= 0 || percentualDesconto < 0 || percentualDesconto > 100) {
      throw new Error("Valor e percentual de desconto devem ser válidos.");
    }
    return valor - valor * (percentualDesconto / 100);
  }

  // calcular o valor final após impostos e descontos
  public calcularValorFinal(
    valor: number,
    taxaImposto: number,
    percentualDesconto: number
  ): number {
    const valorComDesconto = this.calcularDesconto(valor, percentualDesconto);
    const imposto = this.calcularImpostoVenda(valorComDesconto, taxaImposto);
    return valorComDesconto + imposto;
  }
}

export default Fiscal;
