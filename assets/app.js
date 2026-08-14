const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>nav.classList.toggle('open'));
const header=document.querySelector('.site-header');
const syncHeader=()=>header?.classList.toggle('scrolled',window.scrollY>28);
window.addEventListener('scroll',syncHeader,{passive:true}); syncHeader();
document.querySelectorAll('.amounts button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.amounts button').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();alert('Thank you. This demo form is ready for backend integration.');}));
document.querySelectorAll('.language-switch a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelectorAll('.language-switch a').forEach(x=>x.classList.remove('active'));a.classList.add('active');}));

nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
