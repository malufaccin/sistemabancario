//criar filtros de pesquisa por nome/cpf e agencias
export function Controls({
  onSearch,
  onFilter,
}: {
  onSearch: (term: string) => void;
  onFilter: (agency: string) => void;
}) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Buscar por nome ou CPF/CNPJ"
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="">Todas as agências</option>
        <option value="101">Agência 101</option>
        <option value="255">Agência 255</option>
        <option value="340">Agência 340</option>
        <option value="412">Agência 1412</option>
        <option value="588">Agência 588</option>
        <option value="603">Agência 603</option>
        <option value="771">Agência 771</option>
        <option value="829">Agência 829</option>
        <option value="945">Agência 945</option>
        <option value="1150">Agência 1150</option>
      </select>
    </div>
  );
}
