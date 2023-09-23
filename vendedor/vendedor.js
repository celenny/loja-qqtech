const vendedores = [];

function addVendedor() {
    const nome = document.getElementById('vendedorNome').value;
    const matricula = document.getElementById('vendedorMatricula').value;
    if (nome != '' & matricula != '') {
        const vendedor = {
            nome: nome,
            matricula: matricula,
        };
        vendedores.push(vendedor);
        console.log('Novo vendedor cadastrado:', vendedor);
        limparForm('vendedorForm');
    }
}

// limpar formulario
function limparForm(formId) {
    document.getElementById(formId).reset();
}


function mostrarDados() {
    // !array.length -> verificar se um array está vazio 
    if (!vendedores.length) {
        resultado.innerHTML = '<br>Nenhum vendedor(a) cadastrado!';
    } else {
        const resultado = document.getElementById('resultado');

        resultado.innerHTML = '<h2> Funcionários </h2>';
        vendedores.forEach(vendedor => {
            resultado.innerHTML += `
            <p><strong>Nome:</strong> ${vendedor.nome}, <strong>Matricula:</strong> ${vendedor.matricula}</p>
        `;
        });
    }
}

// Esconder Div de 'container-consultar-matricula', 'container-apagar-vendedor' e 'container-editar-vendedor'
document.getElementById('consultar-matricula-btn').addEventListener('click', function () {
    let containerConsultarMatricula = document.querySelector('.container-consultar-matricula');
    containerConsultarMatricula.classList.toggle("hide");
});

document.getElementById('editar-vendedor-btn').addEventListener('click', function(){
    let containerEditarVendedor = document.querySelector('.container-editar-vendedor');
    containerEditarVendedor.classList.toggle("hide");
});

document.getElementById('apagar-vendedor-btn').addEventListener('click', function () {
    let containerApagarVendedor = document.querySelector('.container-apagar-vendedor');
    containerApagarVendedor.classList.toggle("hide");
});

function consultarMatricula() {
    const matriculaSelecionada = document.getElementById('consultaMatricula').value;

    if (matriculaSelecionada === '') {
        return; // Não fazer nada se nenhuma matricula for selecionada
    }

    const matriculaDiv = document.getElementById('matricula');
    const vendedoresPorMatricula = vendedores.filter(vendedor => vendedor.matricula === matriculaSelecionada);

    if (!vendedoresPorMatricula.length) {
        matriculaDiv.innerHTML = ' ';
        matriculaDiv.innerHTML += 'Matrícula não encontrada por favor tente novamente.'
    } else {
        matriculaDiv.innerHTML = '<h2>Matrícula: ' + matriculaSelecionada + '</h2>';
        console.log(vendedoresPorMatricula);
        vendedoresPorMatricula.forEach(vendedor => {
            matriculaDiv.innerHTML += `
            <p><strong>Nome:</strong> ${vendedor.nome}, <strong>Matricula:</strong> ${vendedor.matricula}</p>
        `;
        });
    }
}


function apagarVendedor() {
   const matriculaSelecionada = document.getElementById('matricula-vendedor').value;
   let index = vendedores.findIndex(vendedor => vendedor.matricula === matriculaSelecionada);
   vendedores.splice(index, 1);
   alert("Vendedor apagado com sucesso!");

}


function editarVendedor() {
    const matriculaSelecionada = document.getElementById('editar-matricula-vendedor').value;
    let index = vendedores.findIndex(vendedor => vendedor.matricula === matriculaSelecionada);
    let vendedorNovoNome = document.getElementById('vendedorNovoNome').value;
    let vendedorNovaMatricula = document.getElementById('vendedorNovaMatricula').value;

    vendedores[index].nome = vendedorNovoNome;
    vendedores[index].matricula = vendedorNovaMatricula;

    alert("Dados atualizados com sucesso!");
}

// vendedores
document.getElementById('gerar-relatorio-btn').addEventListener("click", function() {
    const vendedoresQueryString = JSON.stringify(vendedores); 
    const blob = new Blob([vendedoresQueryString], { type: 'application/json' }); 
    const downloadLink = URL.createObjectURL(blob);
    
    const link = document.createElement("a"); 
    link.href = downloadLink; 
    link.download = "vendedores.json";
    link.click(); 
});
