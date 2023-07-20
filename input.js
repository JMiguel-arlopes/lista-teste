const btnInput = document.querySelector('.btn-add-item')
const containerInput = document.querySelector('.add-item-container')
const input = document.getElementById('input')

btnInput.addEventListener('click', () => {
    containerInput.classList.toggle('active')
    input.focus()
})