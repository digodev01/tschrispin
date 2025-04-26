const SHEET_ID = '1Zef9LdgPZs_pFnjVZ2zgzEC8o45nx39lny0xeqUugds';
const SHEET_NAME = 'Página1';
const API_KEY = 'AIzaSyD4lPrD_oztsM-x76Ka3I4U4UxGz7lYkhc';
const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

async function buscarSerial() {
  const input = document.getElementById("serial").value;
  // Dividir o input em uma lista de termos separados por vírgula, espaço ou nova linha
  const termosBusca = input
    .split(/[\n,;\s]+/)
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 0);

  const response = await fetch(API_URL);
  const data = await response.json();
  const linhas = data.values;
  const cabecalho = linhas[0];

  // Filtrar os resultados para incluir tanto serial quanto palete
  const resultados = linhas.slice(1).filter(l => {
    // Verificar se a busca está no serial (coluna B) ou no palete (coluna C)
    const serialMatch = termosBusca.some(termo => l[1]?.toLowerCase().includes(termo));
    const paleteMatch = termosBusca.some(termo => l[2]?.toLowerCase().includes(termo));  // Coluna C para palete
    return serialMatch || paleteMatch;
  });

  const thead = document.querySelector("#resultado thead");
  const tbody = document.querySelector("#resultado tbody");

  // Atualiza o cabeçalho da tabela sem a coluna E (índice 4)
  thead.innerHTML = "<tr>" + cabecalho.map((h, i) => i !== 4 ? `<th>${h}</th>` : '').join('') + "</tr>";
  tbody.innerHTML = "";

  // Preencher a tabela com os resultados encontrados
  resultados.forEach(linha => {
    const row = "<tr>" + cabecalho.map((_, i) => i !== 4 ? `<td>${linha[i] || ''}</td>` : '').join('') + "</tr>";
    tbody.innerHTML += row;
  });
}

function copiarTabela() {
  const tabela = document.getElementById("resultado");
  const range = document.createRange();
  range.selectNode(tabela);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  selection.removeAllRanges();
  alert("Tabela copiada para a área de transferência!");
}

function limpar() {
  document.getElementById("serial").value = "";
  document.querySelector("#resultado thead").innerHTML = "";
  document.querySelector("#resultado tbody").innerHTML = "";
}
