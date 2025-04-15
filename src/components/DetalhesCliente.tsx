//criar página de detalhes dos clientes
//mostrar cliente, conta e agência
//botão de voltar ao final da página
import { Cliente, Conta, Agencia } from "../types/types";
import { formatarCpfCnpj } from "../util/formatarCpfCnpj"; 
import {formatarRg} from "../util/formatarRg"; 

interface Props {
  cliente: Cliente;
  contas: Conta[];
  agencia: Agencia;
  onVoltar: () => void;
}

export function DetalhesCliente({ cliente, contas, agencia, onVoltar }: Props) {
  return (

    <div className="detalhes" style={{ padding: "20px" }}>
      <h2>Informações do Cliente</h2>
      <p><strong>Nome:</strong> {cliente.nome}</p>
      {cliente.nomeSocial && <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>}
      <p><strong>CPF/CNPJ:</strong>{" "}{cliente.cpfCnpj ? formatarCpfCnpj(cliente.cpfCnpj) : "Não informado"}</p>
      <p><strong>RG:</strong>{" "}{cliente.rg ? formatarRg(cliente.rg) : "Não informado"}</p>
      <p><strong>Data de nascimento:</strong> {new Date(cliente.dataNascimento).toLocaleDateString()}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Endereço:</strong> {cliente.endereco}</p>
      <p><strong>Estado civil:</strong> {cliente.estadoCivil}</p>
      <p><strong>Renda anual:</strong> R$ {cliente.rendaAnual.toLocaleString()}</p>
      <p><strong>Patrimônio:</strong> R$ {cliente.patrimonio.toLocaleString()}</p>

      <hr style={{ margin: "20px 0" }} />

      <h2>Conta(s) Bancária(s)</h2>
      {contas.length === 0 ? (
        <p>Conta não encontrada. Verifique se os dados foram inseridos corretamente</p>
      ) : (
        contas.map(conta => (
          <div key={conta.id} style={{ marginBottom: "15px" }}>
            <p><strong>Tipo:</strong> {conta.tipo}</p>
            <p><strong>Saldo:</strong> R$ {conta.saldo.toLocaleString()}</p>
            <p><strong>Limite de crédito:</strong> R$ {conta.limiteCredito.toLocaleString()}</p>
            <p><strong>Crédito disponível:</strong> R$ {conta.creditoDisponivel.toLocaleString()}</p>
            <hr />
          </div>
        ))
      )}

      <h2>Agência</h2>
      <p><strong>Nome:</strong> {agencia.nome}</p>
      <p><strong>Endereço:</strong> {agencia.endereco}</p>
      <p><strong>Código:</strong> {agencia.codigo}</p>
      <button onClick={onVoltar} style={{ marginBottom: "20px" }}>← Voltar</button>
    </div>

  );
}
