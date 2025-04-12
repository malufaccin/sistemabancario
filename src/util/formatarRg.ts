//os dados foram passados sem formatação
//formatar os RG pra colocar a pontuação necessária
export function formatarRg(valor: string): string {
  console.log('Valor recebido:', valor);

  const num = valor.replace(/\D/g, ''); // Remove caracteres não numérico
  
  if (num.length === 7) {
    // RG 123456-7
    return num.replace(/(\d{6})(\d{1})/, "$1-$2"); //divide os numeros em grupos e depois formata
  }

  return valor; // Caso não seja um RG, retorna o valor original
}