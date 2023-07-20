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
        itens[itens.findIndex(el => el.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0
        criarElemento(itemAtual)
        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    evento.target.elements.tarefa.value = ""
})


function criarElemento(nameTarefa) {
    const newItem = document.createElement('li')
    newItem.classList.add('item-tarefa')
    newItem.dataset.id = nameTarefa.id;

    const numeracao = document.createElement('strong')
    nameTarefa.id < 10 ? numeracao.innerHTML = "0" + (nameTarefa.id + 1) : numeracao.innerHTML = nameTarefa.id + 1


    const text = document.createElement('span')
    text.innerHTML = nameTarefa.name;

    const btn = document.createElement("button")
    btn.innerHTML = '<i class="fa-solid fa-x"></i>'
    btn.addEventListener('click', (el) => {
        console.log(el.target.parentNode)
        el.target.parentNode.remove()

        itens.splice(itens.findIndex(elemento => elemento.id == nameTarefa.id), 1)
        localStorage.setItem("itens", JSON.stringify(itens))
    })


    newItem.appendChild(numeracao)
    newItem.appendChild(text)
    newItem.appendChild(btn)

    const lista = document.querySelector('.lista-tarefas')
    lista.appendChild(newItem)
}
