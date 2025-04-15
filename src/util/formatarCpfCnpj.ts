export function formatarCpfCnpj(valor: string): string {
  console.log('Valor recebido:', valor);

  const num = valor.replace(/\D/g, ''); // remove caracteres não numéricos

  if (num.length >= 11 && num.length < 14) {
    const cpf = num.slice(0, 11); // garante que CPF terá exatamente 11 dígitos, muitos dados estavam com 12 dígitos
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (num.length >= 14) {
    const cnpj = num.slice(0, 14); // garante que CNPJ terá exatamente 14 dígitos
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }

  return valor; // caso não seja um CPF nem um CNPJ válido, retorna o valor original
}

