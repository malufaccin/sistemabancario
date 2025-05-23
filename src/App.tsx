import { Cliente, Conta, Agencia } from "./types/types";
import { Header } from "./components/Header";
import { Controls } from "./components/Controls"; 
import { formatarCpfCnpj } from "./util/formatarCpfCnpj";
import { ClienteCard } from "./components/ClienteCard";
import { Paginacao } from "./components/Paginacao";
import { DetalhesCliente } from "./components/DetalhesCliente";
import "./App.css";
import { useEffect, useState } from "react";
import { carregarClientes, carregarContas, carregarAgencias } from "../src/util/carregarDados";

export default function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [pagina, setPagina] = useState(1);
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroAgencia, setFiltroAgencia] = useState("");

  useEffect(() => {
    async function carregarTudo() {
      const [clientesRaw, contas, agencias] = await Promise.all([
        carregarClientes(),
        carregarContas(),
        carregarAgencias()
      ]);
  
      setClientes(clientesRaw); // mantém todos, mesmo com agência inválida
      setContas(contas);
      setAgencias(agencias);
    }
  
    carregarTudo();
  }, []);
  

  const clientesFiltrados = clientes.filter(c => { //função para filtrar os clientes por nome ou cpf/cnpj
    const nomeValido = c.nome?.toLowerCase() || '';
    const busca = nomeValido.includes(termoBusca.toLowerCase()) || c.cpfCnpj?.includes(termoBusca);
    const filtro = filtroAgencia ? c.codigoAgencia.toString() === filtroAgencia : true; //filtro por agencia
    return busca && filtro;
  });

  const totalPaginas = Math.ceil(clientesFiltrados.length / 10); // cada página com 10 cards apenas
  const clientesPagina = clientesFiltrados.slice((pagina - 1) * 10, pagina * 10); //divide o arquivo de 10 em 10 (slice)

  //retornar agências e contas do cliente para apresentar
  const agenciaCliente = (cliente: Cliente): Agencia | undefined =>
    agencias.find((a) => a.codigo === cliente.codigoAgencia);  
  const contasCliente = (cliente: Cliente) =>
    contas.filter((c) =>
      formatarCpfCnpj(c.cpfCnpjCliente) === formatarCpfCnpj(cliente.cpfCnpj) //houve uma alteração na planilha no meio do processo e foram inseridos cpf já com pontuação, tive que fazer esse ajuste para aparecer as contas
    );
  
  

  //caso o site demore carregar, aparecerá uma mensagem
  if (!clientes.length || !contas.length || !agencias.length) {
    return <div style={{ padding: 20 }}>Carregando dados...</div>;
  }
  return (
    <div>
      <Header />
  
      {!clienteSelecionado ? (
        <section className="conteudo-principal">
          <Controls onSearch={setTermoBusca} onFilter={setFiltroAgencia} />
          <div className="cabecalho-lista">
          <span>Nome</span>
          <span>CPF/CNPJ</span>
          <span>Agência</span>
          <span>Ações</span>
          </div>

          <div className="lista-clientes" style={{ paddingTop: "10px" }}>
            {clientesPagina.map((cliente) => (
              <ClienteCard
                key={cliente.id}
                cliente={cliente}
                onSelect={(id) => {
                  const selecionado = clientes.find(c => c.id === id);
                  if (selecionado) {
                    setClienteSelecionado(selecionado);
                  }
                }}
              />
            ))}
          </div>
  
          <Paginacao
            paginaAtual={pagina}
            totalPaginas={totalPaginas}
            onAnterior={() => setPagina(p => Math.max(1, p - 1))}
            onProxima={() => setPagina(p => Math.min(totalPaginas, p + 1))}
          />
        </section>
      ) : (
        <section className="conteudo-principal">
        <DetalhesCliente
          cliente={clienteSelecionado}
          contas={contasCliente(clienteSelecionado)}
          agencia={agenciaCliente(clienteSelecionado)}
          onVoltar={() => setClienteSelecionado(null)}
        />
        </section>
      )}
    </div>
  );
}