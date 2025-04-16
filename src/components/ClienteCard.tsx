import { Cliente } from "../types/types";
import { formatarCpfCnpj } from "../util/formatarCpfCnpj";

interface Props {
  cliente: Cliente;
  onSelect: (id: string) => void;
}
export function ClienteCard({ cliente, onSelect }: Props) {
  return (
    <div className="linha-cliente">
      <span>{cliente.nome}</span>
      <span>{cliente.cpfCnpj ? formatarCpfCnpj(cliente.cpfCnpj) : "Não informado"}</span>
      <span>{cliente.codigoAgencia}</span>
      <button onClick={() => onSelect(cliente.id)}>Ver mais</button>
    </div>
  );
}

//criar cards com os clientes (Nome, CPF e Agência)
// usar a função formatarCpfCnpj pra deixar organizado
// mostrar "não informado" quando este for o caso