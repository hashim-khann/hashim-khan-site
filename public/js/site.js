(function(){
  var root=document.documentElement;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- theme ---- */
  var btn=document.getElementById('theme');
  function cur(){var t=root.getAttribute('data-theme');if(t)return t;return window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
  function label(){if(btn)btn.textContent=cur()==='dark'?'Light':'Dark';}
  label();
  if(btn)btn.addEventListener('click',function(){var n=cur()==='dark'?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('hk-theme',n);}catch(e){}label();});

  /* ---- typed name + blinking caret (home page types it, other pages show it) ---- */
  var input=document.getElementById('site-q'),caret=document.querySelector('.fake-caret');
  if(!input)return;
  var cv=document.createElement('canvas').getContext('2d'),NAME='hashim khan';
  function place(){var cs=getComputedStyle(input);cv.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;caret.style.left=Math.min(cv.measureText(input.value).width+1,input.clientWidth-2)+'px';}
  var home=location.pathname==='/'||location.pathname==='/index.html';
  if(reduce||!home){input.value=NAME;place();caret.classList.add('blink');}
  else{input.value='';place();var i=0;setTimeout(function step(){if(document.activeElement===input)return;input.value=NAME.slice(0,++i);place();if(i<NAME.length)setTimeout(step,70+Math.random()*90);else caret.classList.add('blink');},650);}
  input.addEventListener('input',place);
  input.addEventListener('blur',function(){if(!input.value)input.value=NAME;place();caret.classList.add('blink');});
  window.addEventListener('resize',place);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(place);

  /* ---- site search, from /search.json ---- */
  var box=document.getElementById('q-results'),IDX=null,sel=-1,HOST=location.host||'this site';
  function load(){if(IDX)return Promise.resolve(IDX);return fetch('/search.json').then(function(r){return r.json();}).then(function(j){IDX=j;return j;}).catch(function(){IDX=[];return IDX;});}
  function esc(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function hl(t,terms){var o=esc(t);terms.forEach(function(w){if(w.length<2)return;o=o.replace(new RegExp('('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig'),'<mark>$1</mark>');});return o;}
  function find(v){var terms=v.toLowerCase().split(/\s+/).filter(Boolean);
    if(!terms.length||v.toLowerCase()===NAME)return IDX.slice(0,6);
    return IDX.map(function(it){var h=(it.t+' '+it.d+' '+it.k).toLowerCase(),s=0;terms.forEach(function(t){if(h.indexOf(t)>-1)s++;if(it.t.toLowerCase().indexOf(t)>-1)s+=2;});return{it:it,s:s};})
      .filter(function(x){return x.s>=terms.length;}).sort(function(a,b){return b.s-a.s;}).map(function(x){return x.it;});}
  function render(){load().then(function(){
    var v=input.value.trim(),terms=v.toLowerCase()===NAME?[]:v.toLowerCase().split(/\s+/).filter(Boolean),res=find(v);sel=-1;
    box.innerHTML=res.length?res.slice(0,7).map(function(it){return '<a href="'+it.u+'" role="option"><span class="u">'+HOST+(it.s?' › '+it.s:'')+'</span><span class="t">'+hl(it.t,terms)+'</span><span class="d">'+hl(it.d,terms)+'</span></a>';}).join('')
      :'<div class="empty">Nothing here matches “'+esc(v)+'”. Try migration, GBP, CRM or AI.</div>';
    box.hidden=false;input.setAttribute('aria-expanded','true');});}
  function close(){box.hidden=true;input.setAttribute('aria-expanded','false');}
  input.addEventListener('focus',function(){if(input.value===NAME)input.select();render();});
  input.addEventListener('input',render);
  input.addEventListener('keydown',function(e){var items=box.querySelectorAll('a');
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!items.length)return;sel=(sel+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items.forEach(function(a,i){a.setAttribute('aria-selected',i===sel?'true':'false');});}
    else if(e.key==='Enter'){var t=items[sel>-1?sel:0];if(t)location.href=t.getAttribute('href');}
    else if(e.key==='Escape'){close();input.blur();}});
  document.addEventListener('click',function(e){if(!e.target.closest('.q'))close();});
})();
