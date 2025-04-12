//os dados foram passados sem formatação
//formatar os cpf/cnpj pra colocar a pontuação necessária
export function formatarCpfCnpj(valor: string): string {
  console.log('Valor recebido:', valor);

  const num = valor.replace(/\D/g, ''); // Remove caracteres não numérico
  
  if (num.length === 11) {
    // CPF: 000.000.000-00
    return num.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); //divide os numeros em grupos e depois formata
  }
  
  if (num.length === 14) {
    // CNPJ: 00.000.000/0000-00
    return num.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  return valor; // Caso não seja um CPF nem um CNPJ, retorna o valor original
}
