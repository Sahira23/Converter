// creating side-menu
let menu=document.querySelector('.menu')
let clonedMenu=menu.cloneNode(true);
let nav=document.querySelector('nav');
nav.appendChild(clonedMenu);
clonedMenu.style.display="none"
clonedMenu.classList.add('side-menu');
let menuLogo=document.querySelector('.menu-logo');
const appear=()=>{
  clonedMenu.style.display="block";
  let remove=document.createElement('i');
  let firstli=clonedMenu.querySelector('li:first-child');
  clonedMenu.insertBefore(remove,firstli);
  remove.classList.add('fa-solid','fa-xmark');
  remove.style.position="absolute";
  remove.style.top="20px"
  remove.style.right="20px";
  remove.style.cursor="pointer"
  remove.addEventListener("click",()=>{
    clonedMenu.style.display="none"
  })
}
menuLogo.addEventListener("click",appear);

let allLi=clonedMenu.querySelectorAll('li');

allLi.forEach((item)=>{
  item.addEventListener('click',()=>{
    clonedMenu.style.display="none"
  })
})
