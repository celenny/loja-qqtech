const produtos = [];

function addProduto() {
    const nome = document.getElementById('produtoNome').value;
    const valor = parseFloat(document.getElementById('produtoValor').value);
    const categoria = document.getElementById('produtoCategoria').value;

    const produto = {
        nome: nome,
        valor: valor,
        categoria: categoria
    };
    produtos.push(produto);
    limparForm('produtoForm');
}


function limparForm(formId) {
    document.getElementById(formId).reset();
}


function mostrarDados() {

    const resultado = document.getElementById('resultado');

    resultado.innerHTML = ' ';
    produtos.forEach(produto => {
        resultado.innerHTML += `
            <p><strong>Nome:</strong> ${produto.nome}, <strong>Valor:</strong> ${produto.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}, <strong>Categoria:</strong> ${produto.categoria}</p>
        `;
    });
}

// Esconder Div de 'container-consulta-categoria'
document.getElementById('consultar-produtos-btn').addEventListener('click', function () {
    let containerConsultarCategoria = document.querySelector('.container-consulta-categoria');
    containerConsultarCategoria.classList.toggle("hide");
});

function consultarCategoria() {
    const categoriaSelecionada = document.getElementById('consultaCategoria').value;

    if (categoriaSelecionada === '') {
        return; // Não fazer nada se nenhuma categoria for selecionada
    }

    const produtosPorCategoria = produtos.filter(produto => produto.categoria === categoriaSelecionada);

    const categoriaDiv = document.getElementById('categoria');
    categoriaDiv.innerHTML = '<h2>Categoria: ' + categoriaSelecionada + '</h2>';

    produtosPorCategoria.forEach(produto => {
        categoriaDiv.innerHTML += `
            <p><strong>Nome:</strong> ${produto.nome}, <strong>Valor:</strong> ${produto.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}, <strong>Categoria:</strong> ${produto.categoria}</p>
        `;
    });
}


document.getElementById('gerar-relatorio-btn').addEventListener("click", function() {
    const produtosQueryString = JSON.stringify(produtos); 
    const blob = new Blob([produtosQueryString], { type: 'application/json' }); 
    const downloadLink = URL.createObjectURL(blob);
    
    const link = document.createElement("a"); 
    link.href = downloadLink; 
    link.download = "produtos.json";
    link.click(); 
});
