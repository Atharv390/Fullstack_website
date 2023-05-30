const bar = document.querySelector('.bar')
const close = document.querySelector('.close')
const hero = document.querySelector('.hero')
const remove = document.querySelector('.remove')
const pro1 = document.querySelector('.pro1')
const nav = document.querySelector('.sidebar')

bar.addEventListener("click", function(){
    nav.classList.toggle("show-sidebar")
})
close.addEventListener("click", function(){
    nav.classList.remove("show-sidebar")
})
hero.addEventListener("click", function(){
    nav.classList.remove("show-sidebar")
})
hero.addEventListener("click", function(){
    nav.classList.remove("show-sidebar")
})
remove.addEventListener("click", function(){
    pro1.classList.remove("pro1")
})
