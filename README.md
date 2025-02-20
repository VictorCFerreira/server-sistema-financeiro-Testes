# Trabalho final - Testes de Software

Luan Filipe Finatto e Victor Cortelette



Dessa forma, este documento apresenta a análise de quatro métodos, incluindo a elaboração dos Grafos de Fluxo de Controle (GFC), o cálculo da complexidade ciclomática e a identificação dos caminhos independentes de cada grafo.

## Funções e Métodos Analisados

As funções/métodos analisados são:

### 1. **Funções da Classe `Fiscal`**

- `calcularImpostoVenda(valor: number, taxaImposto: number)`
- `calcularDesconto(valor: number, percentualDesconto: number)`

### 2. **Funções do `Usuario`**

- `POST /server/usuario` (Criação de um usuário)
- `GET /server/usuario` (Listagem de usuários)
- `GET /server/usuario/{id}` (Busca de usuário único)
- `DELETE /server/usuario/{id}` (Remoção de usuário)

---

## Detalhamento da Análise

### 1. **Função `calcularImpostoVenda(valor: number, taxaImposto: number)`**

```typescript
public calcularImpostoVenda(valor: number, taxaImposto: number): number {
  if (valor <= 0 || taxaImposto <= 0) {
    throw new Error("Valor e taxa de imposto devem ser positivos.");
  }
  return valor * (taxaImposto / 100);
}
```

- **Grafo de Fluxo de Controle (GFC):**
  - Início → Verifica se o `valor <= 0` ou `taxaImposto <= 0` (condição).
  - Se `verdadeiro`, lança o erro e termina a execução.
  - Se `falso`, realiza o cálculo `valor * (taxaImposto / 100)` e retorna o resultado.
  - **Comentário para código**: Inserir código da função aqui.

- **Complexidade Ciclomática:**
  - Nós: 3 (Início, Decisão, Retorno).
  - Arestas: 3.
  - Complexidade Ciclomática: \( V(G) = 3 - 3 + 2 = 2 \).

- **Caminhos Independentes:**
  - 1. `valor > 0 && taxaImposto > 0` → Cálculo realizado e retorno.
  - 2. `valor <= 0 || taxaImposto <= 0` → Erro lançado.

---

### 2. **Função `calcularDesconto(valor: number, percentualDesconto: number)`**

```typescript
public calcularDesconto(valor: number, percentualDesconto: number): number {
  if (valor <= 0 || percentualDesconto < 0 || percentualDesconto > 100) {
    throw new Error("Valor e percentual de desconto devem ser válidos.");
  }
  return valor - (valor * (percentualDesconto / 100));
}
```

- **Grafo de Fluxo de Controle (GFC):**
  - Início → Verifica se `valor <= 0` ou `percentualDesconto < 0` ou `percentualDesconto > 100` (condição).
  - Se `verdadeiro`, lança o erro e termina a execução.
  - Se `falso`, realiza o cálculo `valor - (valor * (percentualDesconto / 100))` e retorna o resultado.

- **Complexidade Ciclomática:**
  - Nós: 3 (Início, Decisão, Retorno).
  - Arestas: 3.
  - Complexidade Ciclomática: \( V(G) = 3 - 3 + 2 = 2 \).

- **Caminhos Independentes:**
  - 1. `valor > 0 && percentualDesconto >= 0 && percentualDesconto <= 100` → Cálculo realizado e retorno.
  - 2. `valor <= 0 || percentualDesconto < 0 || percentualDesconto > 100` → Erro lançado.

---

### 3. **Função `POST /server/usuario` (Criação de um Usuário)**

```typescript
test("Deve criar um novo usuário", async () => {
  const response = await request(app)
    .post("/server/usuario")
    .send({ nome: "Teste", email: "teste@email.com" });
  
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty("id");
  usuarioId = response.body.id;
});
```

- **Grafo de Fluxo de Controle (GFC):**
  - Início → Envia requisição POST para criar usuário.
  - Se a requisição for bem-sucedida, verifica se o status é 201 e se o corpo da resposta possui o campo `id`.
  - Se a requisição falhar, a execução termina com um erro.

- **Complexidade Ciclomática:**
  - Nós: 2 (Início, Verificação de resposta).
  - Arestas: 3.
  - Complexidade Ciclomática: \( V(G) = 3 - 2 + 2 = 3 \).

- **Caminhos Independentes:**
  - 1. Requisição POST bem-sucedida, com `status 201` e presença de `id`.
  - 2. Requisição POST falha, com erro no status ou falta de `id`.

---

### 4. **Função `GET /server/usuario` (Listagem de Usuários)**

```typescript
test("Deve listar os usuários", async () => {
  const response = await request(app).get("/server/usuario");
  
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
});
```

- **Grafo de Fluxo de Controle (GFC):**
  - Início → Envia requisição GET para listar usuários.
  - Se a requisição for bem-sucedida, verifica se o status é 200 e se o corpo da resposta é um array.
  - Se a requisição falhar, a execução termina com um erro.

- **Complexidade Ciclomática:**
  - Nós: 2 (Início, Verificação de resposta).
  - Arestas: 3.
  - Complexidade Ciclomática: \( V(G) = 3 - 2 + 2 = 3 \).

- **Caminhos Independentes:**
  - 1. Requisição GET bem-sucedida, com `status 200` e corpo sendo um array.
  - 2. Requisição GET falha, com erro no status ou corpo não sendo um array.

---

## Resumo das Complexidades e Caminhos

| Função/Método                      | Complexidade Ciclomática | Caminhos Independentes                                            |
|------------------------------------|--------------------------|-------------------------------------------------------------------|
| `calcularImpostoVenda`             | 2                        | 1. `valor > 0 && taxaImposto > 0` → Cálculo realizado e retorno.<br>2. `valor <= 0 || taxaImposto <= 0` → Erro lançado. |
| `calcularDesconto`                 | 2                        | 1. `valor > 0 && percentualDesconto >= 0 && percentualDesconto <= 100` → Cálculo realizado e retorno.<br>2. `valor <= 0 || percentualDesconto < 0 || percentualDesconto > 100` → Erro lançado. |
| `POST /server/usuario`             | 3                        | 1. Requisição POST bem-sucedida, com `status 201` e presença de `id`.<br>2. Requisição POST falha, com erro no status ou falta de `id`. |
| `GET /server/usuario`              | 3                        | 1. Requisição GET bem-sucedida, com `status 200` e corpo sendo um array.<br>2. Requisição GET falha, com erro no status ou corpo não sendo um array. |

---

## Opção alternativa de testes - Postman

Postman é uma ferramenta intuitiva para realizar testes de APIs RESTful, ideal para validar endpoints, fluxos de autenticação e integração entre sistemas. Com ele, é possível simular requisições HTTP, definir parâmetros e verificar se as respostas são corretas.


No caso deste trabalho, o postman é utilizado para teste das rotas da API criada, sendo elas:

- Inserção de usuários
- Listagem de usuários
- Busca de um usuário
- Remoção de usuários

## Conclusão

- Os gráficos de fluxo de controle foram desenhados, detalhando os fluxos de execução para cada função.
- Calculamos a complexidade ciclomática com base nas condições e decisões nas funções.
- Identificamos os caminhos independentes para cada função, que são os diferentes cenários possíveis de execução.
- Formato alternativo de teste das rotas da API utilizando Postman.

---


