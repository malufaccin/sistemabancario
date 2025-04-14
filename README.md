# Sistema de Listagem de Clientes Bancários

Este projeto é uma aplicação web responsiva, desenvolvida com **React**, **TypeScript** e **CSS**, voltada para exibição e filtragem de informações de clientes bancários. Os dados são consumidos de forma assíncrona e manipulados com eficiência, garantindo uma experiência fluida e intuitiva para o usuário final.

---

## Funcionalidades

- Consumo assíncrono de dados por meio da `Fetch API`.
- Conversão de arquivos CSV em objetos JavaScript utilizando a biblioteca [PapaParse](https://www.papaparse.com/).
- Formatação automática de documentos como CPF, CNPJ e RG.
- Tratamento de erros com exibição de mensagens amigáveis e claras.
- Indicação visual de carregamento enquanto os dados são processados.
- Lista de clientes com exibição de informações essenciais:
  - Nome completo
  - CPF
  - Email
  - Agência

---

## Filtros e Paginação

- Filtros de pesquisa por:
  - Nome
  - CPF
  - Agência
- Paginação com limite de 10 clientes por página.
- Botões de navegação "Anterior" e "Próximo" com as seguintes regras:
  - "Anterior" aparece apenas a partir da segunda página.
  - "Próximo" é desativado ao atingir a última página.

---

## Interface

- Responsiva: adaptada para diferentes tamanhos de tela.
- Acessível: estrutura semântica, contrastes adequados e navegação por teclado.
- Intuitiva: foco na usabilidade e clareza das informações.

---

## Código e Arquitetura

- Projeto desenvolvido com **TypeScript** para maior segurança e organização.
- Estilização com **CSS puro**, mantendo leveza e desempenho.
- Código limpo, modularizado e bem comentado, seguindo boas práticas de desenvolvimento.
- Testes de carregamento e performance realizados por meio das **DevTools**.

---

## Regras de Dados

- Clientes com informações de **agências inválidas** são **omitidos da exibição**, mas **mantidos no banco de dados**.
- Clientes que **não informaram CPF e/ou RG** terão os campos exibidos como `"Não informado"`.

---

## Paleta de Cores Utilizada

| Elemento        | Cor Hex   |
|-----------------|-----------|
| Fundo (body)    | `#E7ECEF` |
| Cabeçalho       | `#274C77` |
| Destaques       | `#6096BA` |
| Secundária      | `#A3CEF1` |
| Cinza neutro    | `#8B8C89` |

---
