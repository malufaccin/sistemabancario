import Papa, { ParseResult } from "papaparse";
import { Cliente, Conta, Agencia } from "../types/types";

//fazer parsing dos dados usando papaparse
function carregarCSV<T>(url: string, tipo: "cliente" | "conta" | "agencia"): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true, //baixar em tempo de execução
      header: true, //1ª linha se torna cabeçalho
      skipEmptyLines: true, //pula linhas vazias 
      complete: (results: ParseResult<any>) => {
        try { //converter dados de string pra number e date
          const dadosConvertidos = results.data.map((item: any) => {
            if (tipo === "cliente") {
              return {
                ...item,
                dataNascimento: new Date(item.dataNascimento),
                rendaAnual: Number(item.rendaAnual),
                patrimonio: Number(item.patrimonio),
                codigoAgencia: Number(item.codigoAgencia),
              } as Cliente;
            }

            if (tipo === "conta") {
              return {
                ...item,
                saldo: Number(item.saldo),
                limiteCredito: Number(item.limiteCredito),
                creditoDisponivel: Number(item.creditoDisponivel),
              } as Conta;
            }

            if (tipo === "agencia") {
              return {
                ...item,
                codigo: Number(item.codigo),
              } as Agencia;
            }

            return item;
          });
//em caso de erro aparece mensagem (procedimento padrao)
          resolve(dadosConvertidos);
        } catch (e) {
          reject(new Error("Erro ao converter dados: " + (e as string)));
        }
      },
      error: (err: Error) => {
        reject(new Error("Erro ao carregar CSV: " + err.message));
      },
    });
  });
}

// Pegar os dados assincronamente das tabelas que foram disponibilizadas
export async function carregarClientes() {
  const url = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";
  return carregarCSV<Cliente>(url, "cliente");
}

export async function carregarContas() {
  const url = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";
  return carregarCSV<Conta>(url, "conta");
}

export async function carregarAgencias() {
  const url = "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";
  return carregarCSV<Agencia>(url, "agencia");
}
