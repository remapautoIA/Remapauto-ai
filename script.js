
const toggle=document.getElementById("mobileToggle");
const menu=document.getElementById("menu");
if(toggle&&menu){
  toggle.addEventListener("click",()=>{menu.classList.toggle("open");toggle.textContent=menu.classList.contains("open")?"✕":"☰"});
  menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("open");toggle.textContent="☰"}));
}
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
const stats=document.querySelector(".stats");
let started=false;
if(stats){
  const statObs=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting&&!started){started=true;document.querySelectorAll("[data-target]").forEach(c=>{
      const target=Number(c.dataset.target);let current=0;const step=Math.max(1,Math.ceil(target/45));
      const timer=setInterval(()=>{current+=step;if(current>=target){current=target;clearInterval(timer)}c.textContent=current+"+"},28);
    })}
  }),{threshold:.35});
  statObs.observe(stats);
}
document.querySelectorAll("form[data-mail-form]").forEach(form=>{
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const d=new FormData(form);
    const subject=encodeURIComponent("Demande RemapAuto AI - "+(d.get("brand")||"Contact"));
    const body=encodeURIComponent(
      "Nom : "+(d.get("name")||"")+"\n"+
      "Téléphone : "+(d.get("phone")||"")+"\n"+
      "E-mail : "+(d.get("email")||"")+"\n"+
      "Marque : "+(d.get("brand")||"")+"\n"+
      "Modèle : "+(d.get("model")||"")+"\n"+
      "Année : "+(d.get("year")||"")+"\n"+
      "Motorisation : "+(d.get("engine")||"")+"\n"+
      "Prestation : "+(d.get("service")||"")+"\n\n"+
      "Message :\n"+(d.get("message")||"")
    );
    window.location.href="mailto:remapauto@gmail.com?subject="+subject+"&body="+body;
  });
});
