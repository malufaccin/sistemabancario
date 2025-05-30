interface Props {
  paginaAtual: number;
  totalPaginas: number;
  onAnterior: () => void;
  onProxima: () => void;
}

export function Paginacao({ paginaAtual, totalPaginas, onAnterior, onProxima }: Props) {
  return (
    <div className="paginacao"> 
      <button id="paginas" onClick={onAnterior} disabled={paginaAtual === 1}>
        ← Anterior
      </button> 
      <span> {paginaAtual} de {totalPaginas}</span>
      <button id="paginas" onClick={onProxima} disabled={paginaAtual === totalPaginas}>
        Próxima →
      </button>
    </div>
  );
}
// só é possivel voltar a partir da página 2 e não é possivel passar após o fim dos dados