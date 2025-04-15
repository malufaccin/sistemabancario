import Papa, { ParseResult } from "papaparse";
import { Cliente, Conta, Agencia } from "../types/types";

// Função para carregar CSV usando Fetch e PapaParse
async function carregarCSV<T>(url: string, tipo: "cliente" | "conta" | "agencia"): Promise<T[]> {
  try {
    const response = await fetch(url); //requisição http para o endereço da url
    if (!response.ok) throw new Error(`Response status: ${response.status}`); // tratamento de erro: mostra o codigo do erro caso de errado

    const csvText = await response.text();
    const { data }: ParseResult<any> = Papa.parse(csvText, { header: true, skipEmptyLines: true });

    return data.map((item: any) => {
      switch (tipo) {
        case "cliente": //realizar conversões
          return { 
            ...item, 
            dataNascimento: new Date(item.dataNascimento),
            rendaAnual: +item.rendaAnual, //o + converte em números
            patrimonio: +item.patrimonio,
            codigoAgencia: +item.codigoAgencia,
          } as Cliente;
        case "conta":
          return { 
            ...item, 
            saldo: +item.saldo,
            limiteCredito: +item.limiteCredito,
            creditoDisponivel: +item.creditoDisponivel,
          } as Conta;
        case "agencia":
          return { ...item, codigo: +item.codigo } as Agencia;
        default:
          return item;
      }
    });
  } catch (error: unknown) { //bloco catch para tratamento de erros
    if (error instanceof Error) {
      console.error("Erro ao carregar CSV:", error.message);
    } else {
      console.error("Erro desconhecido ao carregar CSV.");
    }
    throw error; 
  }
}

// Funções para pegar os dados das planilhas
export const carregarClientes = () => carregarCSV<Cliente>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes", "cliente");
export const carregarContas = () => carregarCSV<Conta>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas", "conta");
export const carregarAgencias = () => carregarCSV<Agencia>("https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias", "agencia");
