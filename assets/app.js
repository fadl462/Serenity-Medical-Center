const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>nav.classList.toggle('open'));
const header=document.querySelector('.site-header');
let headerTicking=false;
const syncHeader=()=>{
  if(!header) return;
  header.classList.toggle('scrolled',window.scrollY>20);
  headerTicking=false;
};
const onScroll=()=>{
  if(headerTicking) return;
  headerTicking=true;
  window.requestAnimationFrame(syncHeader);
};
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('resize',syncHeader,{passive:true});
window.addEventListener('pageshow',syncHeader,{passive:true});
syncHeader();
document.querySelectorAll('.amounts button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.amounts button').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();alert('Thank you. This demo form is ready for backend integration.');}));
document.querySelectorAll('.language-switch a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelectorAll('.language-switch a').forEach(x=>x.classList.remove('active'));a.classList.add('active');}));

nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

/* Current-page navigation state */
(function(){
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const nav=document.querySelector('.nav');
  if(!nav) return;
  nav.querySelectorAll('a[href]').forEach(link=>{
    const href=(link.getAttribute('href')||'').split('#')[0].toLowerCase();
    if(!href || href==='#' || href.startsWith('http')) return;
    const normalized=href || 'index.html';
    let active=false;
    if(path==='index.html' || path==='') active=normalized==='index.html';
    else if(path.startsWith('service-')) active=normalized==='services.html';
    else if(path==='community-post.html') active=normalized==='community.html';
    else if(path==='contact.html') active=normalized==='contact.html';
    else active=normalized===path;
    if(active) link.classList.add('active');
  });
})();
