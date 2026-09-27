const WA="555432296789";
const vehicles=[
{code:"3085",brand:"Renault",model:"Duster",version:"1.6 Dynamique 4x2 16V",price:58900,year:2015,km:114000,fuel:"Flex",gear:"Manual",state:"Usado",tag:"",img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"},
{code:"3024",brand:"Hyundai",model:"HB20",version:"1.0 Unique 12V",price:58900,year:2019,km:79000,fuel:"Flex",gear:"Manual",state:"Semi-novo",tag:"Único Dono",img:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"},
{code:"4224",brand:"Jeep",model:"Renegade",version:"1.8 Sport 4x2 16V",price:72900,year:2019,km:56000,fuel:"Flex",gear:"Automático",state:"Semi-novo",tag:"Único Dono",img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"},
{code:"3683",brand:"Volkswagen",model:"Nivus",version:"1.0 Comfortline 200 TSI",price:128900,year:2025,km:17000,fuel:"Flex",gear:"Automático",state:"Semi-novo",tag:"Super Novo",img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"},
{code:"3017",brand:"Toyota",model:"Corolla",version:"2.0 XEi 16V",price:68900,year:2012,km:166000,fuel:"Flex",gear:"Automático",state:"Usado",tag:"Raridade",img:"https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80"},
{code:"3568",brand:"Peugeot",model:"208",version:"1.6 Griffe 16V",price:59900,year:2017,km:110000,fuel:"Flex",gear:"Automático",state:"Usado",tag:"Único Dono",img:"https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80"},
{code:"3019",brand:"Nissan",model:"Kicks",version:"1.6 SL 16V",price:86900,year:2018,km:107000,fuel:"Flex",gear:"Automático",state:"Semi-novo",tag:"Super Novo",img:"https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"},
{code:"3023",brand:"Hyundai",model:"HB20X",version:"1.6 Premium 16V",price:72900,year:2017,km:103000,fuel:"Flex",gear:"Automático",state:"Usado",tag:"",img:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"},
{code:"4396",brand:"Citroen",model:"Aircross",version:"1.6 Live 16V",price:61900,year:2019,km:80000,fuel:"Flex",gear:"Manual",state:"Semi-novo",tag:"",img:"https://images.unsplash.com/photo-1494976388531-d105aaa8c08b?auto=format&fit=crop&w=800&q=80"},
{code:"3033",brand:"Jeep",model:"Renegade",version:"1.8 Longitude 4x2 16V",price:86900,year:2021,km:90000,fuel:"Flex",gear:"Automático",state:"Semi-novo",tag:"Único Dono",img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80"},
{code:"1786",brand:"Fiat",model:"Toro",version:"2.0 Volcano Diesel 4x4",price:119900,year:2020,km:89000,fuel:"Diesel",gear:"Automático",state:"Semi-novo",tag:"Único Dono",img:"https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80"},
{code:"4205",brand:"Chevrolet",model:"Onix",version:"1.0 LT 8V",price:54900,year:2017,km:101000,fuel:"Flex",gear:"Manual",state:"Semi-novo",tag:"",img:"https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80"}
];
const brands=["Fiat","Hyundai","Nissan","Peugeot","Honda","Citroen","Renault","Volkswagen","Ford","Chevrolet","Jeep","Toyota"];
const icons={Fiat:"🚗",Hyundai:"🚙",Nissan:"🏎️",Peugeot:"🦁",Honda:"🔴",Citroen:"⚙️",Renault:"💎",Volkswagen:"🚐",Ford:"🔵",Chevrolet:"➕",Jeep:"🧭",Toyota:"⛰️"};
let favs=new Set(JSON.parse(localStorage.getItem("brcar_favs")||"[]"));
let estadoFiltro="todos";

const $=id=>document.getElementById(id);
const fmt=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});

function toast(m){const t=$("toast");t.textContent=m;t.style.display="block";clearTimeout(t._x);t._x=setTimeout(()=>t.style.display="none",2600)}

function renderBrands(){
  $("brandsRow").innerHTML=brands.map(b=>`<div class="brand-chip" data-b="${b}"><span>${icons[b]||"🚗"}</span>${b}</div>`).join("");
  document.querySelectorAll(".brand-chip").forEach(c=>c.onclick=()=>{$("fMarca").value=c.dataset.b;applyFilters();document.getElementById("estoque").scrollIntoView({behavior:"smooth"})});
  $("dropMarcas").innerHTML=brands.map(b=>`<a href="#estoque" data-b="${b}">${b}</a>`).join("");
  document.querySelectorAll("#dropMarcas a").forEach(a=>a.onclick=()=>{$("fMarca").value=a.dataset.b;applyFilters()});
  const sel=$("fMarca");brands.forEach(b=>{const o=document.createElement("option");o.textContent=b;sel.appendChild(o)});
}

function card(v){
  const isFav=favs.has(v.code);
  return `<div class="card">
   <div class="card-img"><img loading="lazy" src="${v.img}" alt="${v.brand} ${v.model}">
   <span class="badge ${v.tag?"oferta":""}">${v.state}</span>
   <button class="fav ${isFav?"on":""}" data-fav="${v.code}">${isFav?"❤":"♡"}</button></div>
   <div class="card-body"><span class="code">Código: ${v.code} ${v.tag?"• "+v.tag:""}</span>
   <h3>${v.brand} ${v.model}<br><span style="font-weight:600;font-size:13px">${v.version}</span></h3>
   <div class="price">${fmt(v.price)}</div>
   <div class="meta"><span>📅 ${v.year}</span><span>🛣️ ${v.km.toLocaleString("pt-BR")} Km</span></div>
   <div class="meta"><span>⛽ ${v.fuel}</span><span>⚙️ ${v.gear}</span></div>
   <div class="card-foot"><button class="btn-det" data-det="${v.code}">Ver Detalhes</button>
   <a class="btn-wa" target="_blank" href="https://wa.me/${WA}?text=${encodeURIComponent("Olá! Quero agendar uma visita para ver o "+v.brand+" "+v.model+" "+v.version+" ("+v.year+") código "+v.code+" de "+fmt(v.price)+".")}">WhatsApp</a></div>
   </div></div>`;
}

function applyFilters(){
  const cod=$("fCodigo").value.trim(),busca=$("fBusca").value.toLowerCase(),marca=$("fMarca").value,
  cambio=$("fCambio").value,comb=$("fComb").value,maxV=+$("fValor").value,ordem=$("fOrdem").value,soFav=$("fFav").checked;
  $("valLabel").textContent="R$ "+Math.round(maxV/1000)+" mil";
  let list=vehicles.filter(v=>{
    if(cod&&!v.code.includes(cod))return false;
    if(marca!=="todas"&&v.brand!==marca)return false;
    if(estadoFiltro!=="todos"&&v.state!==estadoFiltro)return false;
    if(cambio!=="todos"&&v.gear!==cambio)return false;
    if(comb!=="todos"&&v.fuel!==comb)return false;
    if(v.price>maxV)return false;
    if(soFav&&!favs.has(v.code))return false;
    if(busca&&!(v.brand+v.model+v.version).toLowerCase().includes(busca))return false;
    return true;
  });
  if(ordem==="menor")list.sort((a,b)=>a.price-b.price);
  if(ordem==="maior")list.sort((a,b)=>b.price-a.price);
  if(ordem==="menorkm")list.sort((a,b)=>a.km-b.km);
  if(ordem==="recente")list.sort((a,b)=>b.year-a.year);
  $("vehicleGrid").innerHTML=list.length?list.map(card).join(""):`<p style="grid-column:1/-1;background:#fff;padding:20px;border-radius:12px">Nenhum veículo encontrado com esses filtros. <button class="link" onclick="location.reload()">Limpar</button></p>`;
  $("countTxt").textContent="Exibindo: "+list.length;
  $("totalTxt").textContent=vehicles.length;
  // destaques: 3 primeiros
  $("destaqueGrid").innerHTML=vehicles.slice(2,5).map(card).join("");
  bindCards();
  $("favCount").textContent=favs.size;
}
function bindCards(){
  document.querySelectorAll("[data-fav]").forEach(b=>b.onclick=e=>{e.stopPropagation();const c=b.dataset.fav;
    favs.has(c)?favs.delete(c):favs.add(c);localStorage.setItem("brcar_favs",JSON.stringify([...favs]));applyFilters();toast(favs.has(c)?"Adicionado aos favoritos ❤":"Removido dos favoritos")});
  document.querySelectorAll("[data-det]").forEach(b=>b.onclick=()=>openDet(b.dataset.det));
}
function openDet(code){
  const v=vehicles.find(x=>x.code===code);if(!v)return;
  $("detBody").innerHTML=`<div class="det-grid"><div><img src="${v.img}"><div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap"><span class="badge" style="position:static">${v.state}</span>${v.tag?`<span class="badge oferta" style="position:static">${v.tag}</span>`:""}</div></div>
  <div><span class="code">Código ${v.code}</span><h2>${v.brand} ${v.model}</h2><p>${v.version}</p>
  <div class="price" style="font-size:28px;margin:8px 0">${fmt(v.price)}</div>
  <p>📅 ${v.year} • 🛣️ ${v.km.toLocaleString("pt-BR")} km<br>⛽ ${v.fuel} • ⚙️ ${v.gear}<br>📍 BR Car Multimarcas – BR-116, 13205, Caxias do Sul</p>
  <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><a class="btn-red" target="_blank" href="https://wa.me/${WA}?text=${encodeURIComponent("Olá! Tenho interesse no "+v.brand+" "+v.model+" "+v.version+" código "+v.code+". Ainda está disponível?")}">Tenho interesse</a>
  <button class="btn-outline" onclick="document.getElementById('ovDet').classList.remove('open')">Fechar</button></div></div></div>`;
  $("ovDet").classList.add("open");document.body.style.overflow="hidden";
}
// eventos filtros
["fCodigo","fBusca","fMarca","fValor","fCambio","fComb","fOrdem","fFav"].forEach(id=>$(id).addEventListener("input",applyFilters));
document.querySelectorAll("#fEstado button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#fEstado button").forEach(x=>x.classList.remove("on"));b.classList.add("on");estadoFiltro=b.dataset.v;applyFilters()});
$("clearFilters").onclick=()=>{$("fCodigo").value="";$("fBusca").value="";$("fMarca").value="todas";$("fValor").value=130000;$("fCambio").value="todos";$("fComb").value="todos";$("fFav").checked=false;estadoFiltro="todos";document.querySelectorAll("#fEstado button").forEach((x,i)=>x.classList.toggle("on",i===0));applyFilters()};
$("linkFavs").onclick=()=>{$("fFav").checked=true;applyFilters()};
// menu mobile
$("menuToggle").onclick=()=>$("mobileNav").classList.toggle("open");
document.querySelectorAll("#mobileNav a").forEach(a=>a.addEventListener("click",()=>$("mobileNav").classList.remove("open")));
// modais
const openSim=()=>{$("ovSim").classList.add("open");document.body.style.overflow="hidden"};
["openSimulador","openSimulador2","openSimuladorM"].forEach(id=>{const el=$(id);if(el)el.onclick=e=>{e.preventDefault();$("mobileNav").classList.remove("open");openSim()}});
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>{b.closest(".overlay").classList.remove("open");document.body.style.overflow=""});
document.querySelectorAll(".overlay").forEach(o=>o.addEventListener("click",e=>{if(e.target===o){o.classList.remove("open");document.body.style.overflow=""}}));
document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelectorAll(".overlay.open").forEach(o=>{o.classList.remove("open");document.body.style.overflow=""})});
// simulador Price com 1,49% a.m.
$("sCalc").onclick=()=>{
  const V=+$("sValor").value||0,E=+$("sEntrada").value||0,N=+$("sN").value||36,fin=V-E,i=0.0149;
  if(fin<=0){$("sRes").textContent="A entrada não pode ser maior que o valor.";return}
  const p=fin*i/(1-Math.pow(1+i,-N));
  $("sRes").innerHTML=`Financiado: <strong>${fmt(fin)}</strong><br>${N}x de <strong>${fmt(p)}</strong> (1,49% a.m. estimado)<br><small>Simulação aproximada. Fale com a loja para condições reais.</small>`;
  $("sWa").href=`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Simulei no site: veículo de "+fmt(V)+", entrada "+fmt(E)+", "+N+"x de "+fmt(p)+". Quero uma proposta!")}`;
};
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("vis")}),{threshold:.12});
document.querySelectorAll(".reveal,.card").forEach(el=>io.observe(el));
renderBrands();applyFilters();
