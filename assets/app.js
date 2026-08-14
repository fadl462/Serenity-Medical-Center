const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>nav.classList.toggle('open'));
window.addEventListener('scroll',()=>document.querySelector('.site-header')?.classList.toggle('scrolled',scrollY>30));
document.querySelectorAll('.amounts button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.amounts button').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();alert('Thank you. This demo form is ready for backend integration.');}));
