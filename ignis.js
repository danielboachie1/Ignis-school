// LOADER
window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1800));

// NAV
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

// MOBILE MENU
function toggleMobile(){document.getElementById('hamburger').classList.toggle('open');document.getElementById('mobileMenu').classList.toggle('open');}
function closeMobile(){document.getElementById('hamburger').classList.remove('open');document.getElementById('mobileMenu').classList.remove('open');}

// SCROLL REVEAL
const ro = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),i*110);ro.unobserve(e.target);}
  });
},{threshold:.08});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>ro.observe(el));

// COUNTER
function animCounter(el){
  const t=parseFloat(el.dataset.count);
  const dec=t%1!==0;
  const s=performance.now();
  (function tick(n){
    const p=Math.min((n-s)/1600,1);
    const e=1-Math.pow(1-p,3);
    el.textContent=dec?(e*t).toFixed(1):Math.floor(e*t)+'+';
    if(p<1)requestAnimationFrame(tick);else el.textContent=dec?t:t+'+';
  })(performance.now());
}
const co=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){animCounter(e.target);co.unobserve(e.target);}});},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

// FAQ
function toggleFaq(el){
  const item=el.closest('.faq-item');
  const open=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!open)item.classList.add('open');
}

// CALCULATOR
const fees={kg:{term:750,annual:750*3*.95},lower:{term:850,annual:850*3*.95},upper:{term:950,annual:950*3*.95}};
function calcFees(){
  const lvl=document.getElementById('calcLevel').value;
  const kids=parseInt(document.getElementById('numChildren').value);
  const plan=document.getElementById('calcPlan').value;
  let base=fees[lvl][plan];
  let total=base*kids;
  if(kids>1)total*=0.95;
  document.getElementById('calcAmount').textContent='GH₵ '+Math.round(total).toLocaleString();
}
function updateRange(el){document.getElementById('numLabel').textContent=el.value;}
calcFees();

// ENQUIRY FORM
function submitEnquiry(){
  const n=document.getElementById('parentName').value.trim();
  const p=document.getElementById('phone').value.trim();
  const c=document.getElementById('childName').value.trim();
  const a=document.getElementById('childAge').value;
  const btn=document.querySelector('.form-submit');
  if(!n||!p||!c||!a){
    btn.textContent='⚠️  Please fill in all required fields';
    btn.style.background='#C8362A';
    setTimeout(()=>{btn.innerHTML='🎓 &nbsp; Submit Enquiry';btn.style.background='';},2500);
    return;
  }
  btn.textContent='⏳  Sending...';btn.style.opacity='.7';
  const prog=document.getElementById('programme').value;
  const notes=document.getElementById('notes').value.trim();
  const msg=encodeURIComponent(`🎓 *New Admission Enquiry — Ignis School*\n\n👤 Parent: ${n}\n📞 Phone: ${p}\n👶 Child: ${c} (Age: ${a})\n📚 Programme: ${prog||'Not specified'}\n${notes?'📝 Notes: '+notes+'\n':''}\nPlease contact me about enrolment. Thank you!`);
  setTimeout(()=>{
    document.getElementById('formContent').style.display='none';
    document.getElementById('formSuccess').classList.add('show');
    window.open(`https://wa.me/233594746841?text=${msg}`,'_blank');
  },1200);
}

// VISIT FORM
function submitVisit(){
  const n=document.getElementById('visitName').value.trim();
  const p=document.getElementById('visitPhone').value.trim();
  if(!n||!p){alert('Please fill in your name and phone number.');return;}
  const d=document.getElementById('visitDate').value;
  const t=document.getElementById('visitTime').value;
  const note=document.getElementById('visitNote').value.trim();
  const msg=encodeURIComponent(`🏫 *School Visit Request — Ignis School*\n\n👤 Name: ${n}\n📞 Phone: ${p}\n📅 Date: ${d||'Flexible'}\n🕐 Time: ${t||'Flexible'}\n${note?'📝 Interest: '+note+'\n':''}\nPlease confirm my visit. Thank you!`);
  window.open(`https://wa.me/233594746841?text=${msg}`,'_blank');
  alert('Your visit request has been sent via WhatsApp! We will confirm shortly.');
}

// CHATBOT
let chatOpen=false;
function toggleChat(e){e.preventDefault();chatOpen=!chatOpen;document.getElementById('chatbot').classList.toggle('open',chatOpen);document.getElementById('chatToggle').textContent=chatOpen?'✕':'🎓';}
function chatMsg(text){window.open(`https://wa.me/233594746841?text=${encodeURIComponent(text)}`,'_blank');}

// Min date
const di=document.getElementById('visitDate');
if(di)di.min=new Date().toISOString().split('T')[0];
