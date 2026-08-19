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


/* Gallery filters + accessible lightbox */
(function(){
  const page=document.querySelector('.gallery-page');
  if(!page) return;
  const items=[...page.querySelectorAll('.gallery-item')];
  const filters=[...page.querySelectorAll('[data-gallery-filter]')];
  const empty=page.querySelector('.gallery-empty');
  const box=document.querySelector('#galleryLightbox');
  const image=box?.querySelector('img');
  const title=box?.querySelector('h3');
  const desc=box?.querySelector('p');
  const count=box?.querySelector('.gallery-lightbox-count');
  let visible=items.slice();
  let current=0;

  const render=(filter)=>{
    visible=[];
    items.forEach(item=>{
      const show=filter==='all'||item.dataset.category===filter;
      item.hidden=!show;
      if(show) visible.push(item);
    });
    if(empty) empty.hidden=visible.length!==0;
  };
  filters.forEach(button=>button.addEventListener('click',()=>{
    filters.forEach(x=>x.classList.remove('active'));
    button.classList.add('active');
    render(button.dataset.galleryFilter);
  }));

  const update=()=>{
    const item=visible[current];
    if(!item||!box) return;
    const img=item.querySelector('img');
    image.src=img.currentSrc||img.src;
    image.alt=img.alt;
    title.textContent=item.dataset.title||'';
    desc.textContent=item.dataset.description||'';
    count.textContent=String(current+1).padStart(2,'0')+' / '+String(visible.length).padStart(2,'0');
  };
  const open=(index)=>{
    current=index;
    update();
    box.classList.add('open');
    box.setAttribute('aria-hidden','false');
    document.body.classList.add('gallery-lock');
  };
  const close=()=>{
    box.classList.remove('open');
    box.setAttribute('aria-hidden','true');
    document.body.classList.remove('gallery-lock');
  };
  page.querySelectorAll('.gallery-open').forEach(button=>button.addEventListener('click',()=>{
    const item=button.closest('.gallery-item');
    open(visible.indexOf(item));
  }));
  box?.querySelector('.gallery-close')?.addEventListener('click',close);
  box?.addEventListener('click',e=>{if(e.target===box) close();});
  box?.querySelector('.gallery-prev')?.addEventListener('click',()=>{current=(current-1+visible.length)%visible.length;update();});
  box?.querySelector('.gallery-next')?.addEventListener('click',()=>{current=(current+1)%visible.length;update();});
  document.addEventListener('keydown',e=>{
    if(!box?.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowLeft'){current=(current-1+visible.length)%visible.length;update();}
    if(e.key==='ArrowRight'){current=(current+1)%visible.length;update();}
  });
  render('all');
})();
