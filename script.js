// Simple interactivity: typing effect, theme toggle, animate skill bars
document.addEventListener('DOMContentLoaded',()=>{
  // Typing effect
  const typingEl = document.getElementById('typing');
  const phrases = ['Mahasiswa dari Politeknik Caltex Riau', 'Calon Digital Marketer'];
  let pi=0,ci=0;
  function type(){
    const txt = phrases[pi];
    typingEl.textContent = 'Saya adalah ' + txt.slice(0,ci+1);
    ci++;
    if(ci<txt.length) setTimeout(type,80);
    else setTimeout(()=>{ // pause then delete
      let delI = setInterval(()=>{
        typingEl.textContent = 'Saya adalah ' + txt.slice(0,ci-1);
        ci--;
        if(ci<=0){clearInterval(delI);pi=(pi+1)%phrases.length;setTimeout(type,200);}    
      },40);
    },900);
  }
  type();

  // Theme toggle (light/dark simple)
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click',()=>{
    if(document.documentElement.hasAttribute('data-theme')){
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme','light');
    }
  });

  // Year
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // Animate skill bars when visible
  const bars = document.querySelectorAll('.skills .bar > div');
  function animateBars(){
    bars.forEach(b=>{
      const p = b.getAttribute('data-percent') || b.dataset.percent;
      b.style.width = p + '%';
    });
  }
  // simple intersection observer
  const obs = new IntersectionObserver((entries,ob)=>{
    entries.forEach(e=>{if(e.isIntersecting){animateBars();ob.disconnect();}});
  },{threshold:.2});
  const about = document.getElementById('about');
  if(about) obs.observe(about);

  // reveal elements with .fade-up
  const fades = document.querySelectorAll('.fade-up');
  const obs2 = new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('inview');});},{threshold:.15});
  fades.forEach(f=>obs2.observe(f));
});
