// Configurações
const dias = 31;
const pontoBody = document.querySelector("#ponto tbody");

// Criar linhas da tabela de ponto
for (let i = 1; i <= dias; i++) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${i}</td>
    <td><input type="time" class="entrada"></td>
    <td><input type="time" class="saida"></td>
    <td><input type="time" class="retorno"></td>
    <td class="status">-</td>
    <td class="desconto">0.00</td>
    <td><input type="checkbox" class="selecionar" checked></td>
  `;
  pontoBody.appendChild(row);
}

// Função para calcular status e descontos
function calcular() {
  let total1 = 0;
  let total2 = 0;
  const rows = document.querySelectorAll("#ponto tbody tr");
  rows.forEach((row, i) => {
    const entrada = row.querySelector(".entrada").value;
    const statusCell = row.querySelector(".status");
    const descontoCell = row.querySelector(".desconto");
    const selecionar = row.querySelector(".selecionar").checked;

    if (entrada) {
      const [h, m] = entrada.split(":").map(Number);
      const atraso = h > 8 || (h === 8 && m > 20);
      statusCell.textContent = atraso ? "Atraso" : "Pontual";
      statusCell.style.color = atraso ? "red" : "green";
      descontoCell.textContent = atraso && selecionar ? "10.00" : "0.00";
    } else {
      statusCell.textContent = "-";
      statusCell.style.color = "black";
      descontoCell.textContent = "0.00";
    }

    // Totais por quinzena
    const desconto = parseFloat(descontoCell.textContent);
    if (i < 15) total1 += 350 - desconto + parseFloat(document.getElementById("vales1").value || 0);
    else total2 += 350 - desconto + parseFloat(document.getElementById("vales2").value || 0);
  });

  document.getElementById("total1").textContent = total1.toFixed(2);
  document.getElementById("total2").textContent = total2.toFixed(2);
  document.getElementById("totalGeral").textContent = (total1 + total2).toFixed(2);
}

// Atualizar automaticamente ao digitar ou mudar checkbox
document.querySelectorAll("input").forEach(inp => {
  inp.addEventListener("input", calcular);
});

