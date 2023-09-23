const clientes = [];
const cadastrarBtn = document.getElementById('cadastrarBtn');

function addCliente() {
    const nome = document.getElementById('clienteNome').value;
    const dataNasc = document.getElementById('clienteDataNasc').value;
    const cpf = document.getElementById('clienteCPF').value;
    const origem = document.getElementById('clienteOrigem').value;
    const score = parseInt(document.getElementById('clienteScore').value);

    const cliente = {
        nome: nome,
        dataNasc: dataNasc,
        cpf: cpf,
        origem: origem,
        score: score
    };

    clientes.push(cliente);
    
    limparForm('clienteForm');
}


function limparForm() {
    document.getElementById('clienteNome').value = "";
    document.getElementById('clienteDataNasc').value = "";
    document.getElementById('clienteCPF').value = "";
    document.getElementById('clienteOrigem').value = "";
    document.getElementById('clienteScore').value = "";
}


function mostrarDados() {
    
    if (!clientes.length) {
        resultado.innerHTML = '<br>Nenhum cliente cadastrado!';
    } else {
        const resultado = document.getElementById('resultado');

        resultado.innerHTML = ' ';
        clientes.forEach(cliente => {
            resultado.innerHTML += `
            <p><strong>Nome:</strong> ${cliente.nome}, <strong>CPF:</strong> ${cliente.cpf}, <strong>Origem:</strong> ${cliente.origem}, <strong>Score:</strong> ${cliente.score}</p>
        `;
        });
    }
}


document.getElementById('gerar-relatorio-btn').addEventListener("click", function() {
    const clientesQueryString = JSON.stringify(clientes); 
    const blob = new Blob([clientesQueryString], { type: 'application/json' }); 
    const downloadLink = URL.createObjectURL(blob);
    
    const link = document.createElement("a"); 
    link.href = downloadLink; 
    link.download = "clientes.json";
    link.click(); 
});
