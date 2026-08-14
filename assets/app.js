const header=document.getElementById('header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30));
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
 if(!e.isIntersecting)return;
 const el=e.target, target=+el.dataset.count; let n=0;
 const step=Math.max(1,Math.ceil(target/35));
 const tick=()=>{n=Math.min(target,n+step);el.textContent=n;if(n<target)requestAnimationFrame(tick)};
 tick();counterObserver.unobserve(el);
}),{threshold:.7});
counters.forEach(el=>counterObserver.observe(el));

const toast=document.getElementById('toast');
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3000)}
document.querySelectorAll('.donation-options button').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.donation-options button').forEach(b=>b.classList.remove('active'));
 btn.classList.add('active');document.getElementById('customAmount').value=btn.dataset.amount;
}));
document.getElementById('donateBtn')?.addEventListener('click',()=>{
 const amount=document.getElementById('customAmount').value;
 if(!amount||+amount<1){showToast('Please enter a donation amount.');return}
 showToast(`Donation of GHS ${amount} selected — payment gateway ready for integration.`);
});
document.getElementById('contactForm')?.addEventListener('submit',e=>{
 e.preventDefault();document.getElementById('formNote').textContent='Thank you. Your enquiry has been received in this demo.';
 e.target.reset();
});
