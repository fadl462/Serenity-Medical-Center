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
document.querySelectorAll('form').forEach(f=>{ if(f.id==='partnershipForm') return; f.addEventListener('submit',e=>{e.preventDefault();alert('Thank you. This demo form is ready for backend integration.');}); });
document.querySelectorAll('.language-switch a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelectorAll('.language-switch a').forEach(x=>x.classList.remove('active'));a.classList.add('active');}));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

/* Partner inquiry — polished inline confirmation */
(function(){
  const form=document.querySelector('#partnershipForm');
  const success=form?.querySelector('.form-success');
  if(!form||!success) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    success.hidden=false;
    form.querySelectorAll('input,select,textarea,button').forEach(el=>{el.disabled=true;});
    success.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
})();

/* Book a Visit — inline confirmation */
(function(){
  const form=document.querySelector('#contactBookingForm');
  const success=form?.querySelector('.form-success');
  if(!form||!success) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    success.hidden=false;
    form.querySelectorAll('input,select,textarea,button').forEach(el=>{el.disabled=true;});
    success.scrollIntoView({behavior:'smooth',block:'nearest'});
  });
})();

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

/* Serenity footer — site-wide premium polish */
(function(){
  const footer=document.querySelector('.footer');
  if(!footer) return;

  const style=document.createElement('style');
  style.textContent=`
    .footer{position:relative;overflow:hidden;background:#043e3e;color:#fff;border-top:1px solid rgba(184,232,117,.12)}
    .footer::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 82% 18%,rgba(184,232,117,.10),transparent 28%),linear-gradient(135deg,rgba(255,255,255,.025),transparent 42%)}
    .footer .container{position:relative;z-index:1}
    .footer-top{padding:30px 0;border-bottom:1px solid rgba(255,255,255,.10)}
    .footer-action-bar{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:12px;align-items:stretch}
    .footer-action{min-height:92px;border:1px solid rgba(255,255,255,.11);border-radius:18px;background:rgba(255,255,255,.045);padding:18px 19px;display:flex;align-items:center;gap:14px;transition:.25s ease}
    .footer-action:hover{transform:translateY(-2px);border-color:rgba(184,232,117,.35);background:rgba(255,255,255,.07)}
    .footer-action.primary{background:#b8e875;color:#043e3e;border-color:#b8e875}
    .footer-action.primary:hover{background:#c5ee8c;border-color:#c5ee8c}
    .footer-action-icon{width:40px;height:40px;flex:0 0 40px;border-radius:50%;display:grid;place-items:center;background:rgba(184,232,117,.12);color:#b8e875;font-size:15px;font-weight:800}
    .footer-action.primary .footer-action-icon{background:rgba(4,62,62,.10);color:#043e3e}
    .footer-action small{display:block;font-size:8px;letter-spacing:.14em;text-transform:uppercase;font-weight:800;opacity:.68;margin-bottom:3px}
    .footer-action strong{display:block;font:700 14px Manrope,sans-serif;line-height:1.15}
    .footer-main{padding:55px 0 45px;display:grid;grid-template-columns:1.55fr .8fr .8fr 1fr;gap:50px}
    .footer-brand{display:inline-flex;color:#fff;margin-bottom:17px}
    .footer-brand img{width:42px;height:42px;border-radius:10px;background:#fff}
    .footer-brand strong{font-size:20px}
    .footer-brand small{color:#8eaaa5}
    .footer-intro{max-width:300px;color:#a8c1bd;font-size:11px;line-height:1.75;margin:0 0 20px}
    .footer-note{display:inline-flex;align-items:center;gap:8px;color:#cfe1dc;font-size:9px;font-weight:700;letter-spacing:.04em}
    .footer-note-dot{width:7px;height:7px;border-radius:50%;background:#b8e875;box-shadow:0 0 0 5px rgba(184,232,117,.10)}
    .footer-col h3{font:800 10px Manrope,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#b8e875;margin:4px 0 18px}
    .footer-col a,.footer-col span{display:block;color:#a8c1bd;font-size:10px;line-height:1.55;margin:0 0 10px;transition:.2s ease}
    .footer-col a:hover{color:#fff;transform:translateX(2px)}
    .footer-contact-line{display:flex!important;gap:8px;align-items:flex-start}
    .footer-contact-line b{color:#d7e7e3;font-weight:700}
    .footer-emergency{margin-top:17px;padding:13px 14px;border-radius:14px;background:rgba(184,232,117,.08);border:1px solid rgba(184,232,117,.14)}
    .footer-emergency small{display:block;color:#8fa9a4;font-size:8px;text-transform:uppercase;letter-spacing:.12em;font-weight:800;margin-bottom:3px}
    .footer-emergency a{font-size:13px!important;color:#b8e875!important;font-weight:800;margin:0!important}
    .footer-bottom{min-height:72px;padding:20px 0;display:flex;justify-content:space-between;align-items:center;gap:20px;border-top:1px solid rgba(255,255,255,.10);color:#789692;font-size:8px;letter-spacing:.02em}
    .footer-bottom-links{display:flex;gap:18px;flex-wrap:wrap;justify-content:flex-end}
    .footer-bottom-links a{color:#8ba6a1;transition:.2s}
    .footer-bottom-links a:hover{color:#fff}
    .footer-backtop{display:inline-flex;align-items:center;gap:7px;color:#b8e875!important;font-weight:800}
    @media (max-width:900px){
      .footer-action-bar{grid-template-columns:1fr 1fr}
      .footer-main{grid-template-columns:1.2fr 1fr 1fr;gap:35px}
      .footer-main>div:first-child{grid-column:1/-1}
    }
    @media (max-width:620px){
      .footer-top{padding:20px 0}
      .footer-action-bar{grid-template-columns:1fr;gap:8px}
      .footer-action{min-height:74px;padding:14px 15px}
      .footer-main{padding:40px 0 32px;grid-template-columns:1fr 1fr;gap:30px 22px}
      .footer-main>div:first-child{grid-column:1/-1}
      .footer-col:last-child{grid-column:1/-1}
      .footer-bottom{align-items:flex-start;flex-direction:column;padding:18px 0}
      .footer-bottom-links{justify-content:flex-start;gap:12px 16px}
    }
  `;
  document.head.appendChild(style);

  footer.innerHTML=`
    <div class="footer-top">
      <div class="container footer-action-bar">
        <a class="footer-action primary" href="contact.html">
          <span class="footer-action-icon">→</span>
          <span><small>Ready when you are</small><strong>Book a visit</strong></span>
        </a>
        <a class="footer-action" href="tel:+237683539388">
          <span class="footer-action-icon">☎</span>
          <span><small>Speak with Serenity</small><strong>+237 683 539 388</strong></span>
        </a>
        <a class="footer-action" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Serenity%20Medical%20Center%20Maison%20Damas%20Yaounde">
          <span class="footer-action-icon">⌖</span>
          <span><small>Find the center</small><strong>Get directions</strong></span>
        </a>
        <a class="footer-action" href="contact.html#contactBookingForm">
          <span class="footer-action-icon">24</span>
          <span><small>Every day</small><strong>Open 24 hours</strong></span>
        </a>
      </div>
    </div>

    <div class="container footer-main">
      <div>
        <a class="brand footer-brand" href="index.html"><img src="assets/serenity-logo.jpg" alt="Serenity Medical Center"><span><strong>Serenity</strong><small>MEDICAL CENTER</small></span></a>
        <p class="footer-intro">Care · Innovation · Quality.<br>Patient-centered healthcare in Yaoundé, designed around clear communication, professional care and a calmer patient experience.</p>
        <span class="footer-note"><i class="footer-note-dot"></i> Patient-centered care · Yaoundé</span>
      </div>

      <div class="footer-col">
        <h3>Explore</h3>
        <a href="about.html">About Serenity</a>
        <a href="services.html">Clinical services</a>
        <a href="digital-health.html">Digital health</a>
        <a href="community.html">Health community</a>
        <a href="gallery.html">Gallery</a>
      </div>

      <div class="footer-col">
        <h3>Connect</h3>
        <a href="foundation.html">Health Foundation</a>
        <a href="partner.html">Become a partner</a>
        <a href="contact.html">Contact Serenity</a>
        <a href="contact.html">Book a visit</a>
        <a href="tel:+237683539388">Emergency support</a>
      </div>

      <div class="footer-col">
        <h3>Visit us</h3>
        <span class="footer-contact-line"><b>Address</b> Maison Damas · Chris Complex<br>1st floor · Yaoundé, Cameroon</span>
        <span class="footer-contact-line"><b>Hours</b> Open 24 hours · Monday–Sunday</span>
        <div class="footer-emergency"><small>Call Serenity</small><a href="tel:+237683539388">+237 683 539 388</a></div>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© 2026 Serenity Medical Center. All rights reserved.</span>
      <div class="footer-bottom-links">
        <a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;" class="footer-backtop">Back to top ↑</a>
        <a href="privacy.html">Privacy</a>
        <a href="terms.html">Terms</a>
        <a href="accessibility.html">Accessibility</a>
      </div>
    </div>
  `;
})();
