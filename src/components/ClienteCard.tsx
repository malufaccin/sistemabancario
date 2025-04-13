import { Cliente } from "../types/types";
import { formatarCpfCnpj } from "../util/formatarCpfCnpj";

interface Props {
  cliente: Cliente;
  onSelect: (id: string) => void;
}
export function ClienteCard({ cliente, onSelect }: Props) {
  return (
    <div className="card">
      <h3>{cliente.nome}</h3>
      <p><strong>CPF/CNPJ: </strong> {cliente.cpfCnpj ? formatarCpfCnpj(cliente.cpfCnpj) : "Não informado"}</p>
      <p><strong>Email: </strong> {cliente.email}</p>
      <p><strong>Agência: </strong> {cliente.codigoAgencia}</p>
      <button id="vermais" onClick={() => onSelect(cliente.id)}>Ver mais</button>
    </div>
  );
}
//criar cards com os clientes (Nome, CPF, E-mail e Agência)
// usar a função formatarCpfCnpj pra deixar organizado
// mostrar "não informado" quando este for o caso