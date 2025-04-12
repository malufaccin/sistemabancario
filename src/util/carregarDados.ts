import Papa, { ParseResult } from "papaparse";
import { Cliente, Conta, Agencia } from "../types/types";

function carregarCSV<T>(path: string, tipo: "cliente" | "conta" | "agencia"): Promise<T[]> {
  return new Promise((resolve, reject) => { //usar a biblioteca papaparse pra processar os arquivos csv
    Papa.parse(path, {
      download: true, //baixar arquivo
      header: true, //usar a 1ª linha como header
      skipEmptyLines: true, //pular linhas vazias
      complete: (results: ParseResult<any>) => {
        try {
          const dadosConvertidos = results.data.map((item: any) => { //fazer conversões necessárias para processamento dos dados
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
//tratamento de erros ^

//carregar dados dos arquivos csv 
export async function carregarClientes() {
  return carregarCSV<Cliente>("/clientes.csv", "cliente");
}

export async function carregarContas() {
  return carregarCSV<Conta>("/contas.csv", "conta");
}

export async function carregarAgencias() {
  return carregarCSV<Agencia>("/agencias.csv", "agencia");
}
