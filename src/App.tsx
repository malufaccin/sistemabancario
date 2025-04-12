import { Cliente, Conta, Agencia } from "./types/types";
import { Header } from "./components/Header";
import { Controls } from "./components/Controls"; // import novo
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
      const [clientesRaw, contas, agencias] = await Promise.all([ //Carregando os dados assincronamente
        carregarClientes(),
        carregarContas(),
        carregarAgencias()
      ]);
  
      const codigosAgenciasValidas = agencias.map(a => a.codigo); //Não mostra os clientes com agencias inexistentes (id: 1,18,35,48)
      const clientesFiltrados = clientesRaw.filter(cliente =>
        codigosAgenciasValidas.includes(cliente.codigoAgencia)
      );
  
      setClientes(clientesFiltrados); //atualizando os dados
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

  //retornat agencias e contas do cliente para apresentar
  const agenciaCliente = (cliente: Cliente) => 
    agencias.find((a) => a.codigo === cliente.codigoAgencia)!;
  const contasCliente = (cliente: Cliente) =>
    contas.filter((c) => c.id === cliente.id);

  //caso o site demore carregar, aparecerá uma mensagem
  if (!clientes.length || !contas.length || !agencias.length) {
    return <div style={{ padding: 20 }}>Carregando dados...</div>;
  }
  return (
    <div>
      <Header />
      
      {!clienteSelecionado && (
        <Controls onSearch={setTermoBusca} onFilter={setFiltroAgencia} />
      )}
  
      {!clienteSelecionado ? (
        <>
          <div className="lista-clientes" style={{ paddingTop: "10px" }}>
            {clientesPagina.map((cliente) => (
              <ClienteCard
                key={cliente.id}
                cliente={cliente}
                onSelect={(id) => {
                  const selecionado = clientes.find(c => c.id === id); //encontra o cliente pelo id selecionado
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
            onAnterior={() => setPagina(p => Math.max(1, p - 1))} //determina que o min de páginas é 1
            onProxima={() => setPagina(p => Math.min(totalPaginas, p + 1))} //não deixa passar do total de páginas estabelecido
          />
        </>
      ) : (
        <DetalhesCliente
          cliente={clienteSelecionado}
          contas={contasCliente(clienteSelecionado)}
          agencia={agenciaCliente(clienteSelecionado)}
          onVoltar={() => setClienteSelecionado(null)}
        />
      )}
    </div>
  );  
}