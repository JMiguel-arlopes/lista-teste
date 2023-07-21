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

    // const btn = document.createElement("button")
    // btn.innerHTML = '<i class="fa-solid fa-x"></i>'

    const buttons = {}
    buttons.excluir = "excluir"
    buttons.urgente = "urgente"
    buttons.checked = "checked"

    const div = document.createElement("div")
    div.classList.add('interation')

    const btnMenu = document.createElement("i")
    btnMenu.classList.add('fa-solid')
    btnMenu.classList.add('fa-ellipsis')
    menu(btnMenu)

    const btnExit = document.createElement('i')
    btnExit.classList.add('fa-solid')
    btnExit.classList.add('fa-x')
    btnExit.classList.add('exit')


    const listabotao = document.createElement("ul")
    listabotao.classList.add('lista-buttons')

    const item1 = document.createElement("li")
    const item2 = document.createElement("li")
    const item3 = document.createElement("li")
    item1.classList.add('btn-item')
    item2.classList.add('btn-item')
    item3.classList.add('btn-item')

    item1.innerHTML = '<i class="fa-solid fa-trash-can icon-btn"></i>' + buttons.excluir
    item2.innerHTML = '<i class="fa-solid fa-skull-crossbones icon-btn"></i>' + buttons.urgente
    item3.innerHTML = '<i class="fa-solid fa-check icon-btn"></i>' + buttons.checked

    listabotao.appendChild(btnExit)
    listabotao.appendChild(item1)
    listabotao.appendChild(item2)
    listabotao.appendChild(item3)

    div.appendChild(btnMenu)
    div.appendChild(listabotao)


    // ponha todos esses estilos como objetos para pôr no local storage
    item1.addEventListener('click', (el) => {
        el.target.parentNode.parentNode.parentNode.remove()
        itens.splice(itens.findIndex(el => el.id === nameTarefa.id))
        localStorage.setItem("itens", JSON.stringify(itens))
    })

    item2.addEventListener('click', (el) => {
        const estilo = el.target.parentNode.parentNode.parentNode.style
        if (estilo.background == 'red') {
            estilo.background = '#f5f5f5'
            estilo.color = 'black'
            estilo.textShadow = 'none'
        } else {
            estilo.background = 'red'
            estilo.color = 'gold'
            estilo.textShadow = '1px 1px black'
        }
    })

    item3.addEventListener('click', (el) => {
        const estilo = el.target.parentNode.parentNode.parentNode.style
        if (estilo.background == 'darkgreen') {
            estilo.background = '#f5f5f5'
            estilo.color = 'black'
            estilo.textShadow = 'none'
        } else {
            estilo.background = 'darkgreen'
            estilo.color = 'white'
            estilo.textShadow = '-1px 1px black'
        }
    })

    btnExit.addEventListener('click', (el) => {
        el.target.parentNode.classList.toggle('active')
    })

    newItem.appendChild(numeracao)
    newItem.appendChild(text)
    newItem.appendChild(div)

    const lista = document.querySelector('.lista-tarefas')
    lista.appendChild(newItem)
}


function menu(btn) {
    btn.addEventListener('click', (el) => {
        const containerDiv = el.target.parentNode
        const buttonsList = containerDiv.querySelector('.lista-buttons')
        const listaButtons = document.querySelectorAll('.lista-buttons')

        listaButtons.forEach(lista => {
            if (lista == buttonsList) return;
            lista.classList.remove('active')
        })

        buttonsList.classList.toggle('active')
    })
}

// function exit(btn) {
//     btn.addEventListener('click', () => {
//         const containerDiv = el.target.parentNode
//         console.log(containerDiv)
//     })
// }