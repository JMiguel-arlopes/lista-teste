const form = document.getElementById('formulario');
let itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach(item => criarElemento(item))

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const tarefa = evento.target.elements.tarefa

    const itemAtual = {
        "name": tarefa.value
    }

    const existe = itens.find(el => el.name === tarefa.value)

    if (existe) {
        itemAtual.id = existe.id
    } else {
        itemAtual.id = itens.length
        criarElemento(itemAtual)
        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))
})

function criarElemento(nameTarefa) {
    const newItem = document.createElement('li')
    newItem.classList.add('item-tarefa')

    newItem.innerHTML = nameTarefa.name;
    newItem.dataset.id = nameTarefa.id;

    newItem.appendChild(botaoDeleta());

    const lista = document.querySelector('.lista-tarefas')
    lista.appendChild(newItem)
}

function botaoDeleta() {
    const btn = document.createElement('button')
    btn.innerHTML = 'X'


    btn.addEventListener('click', () => {
        console.log(this)
    })
} 