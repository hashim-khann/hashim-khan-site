
(function(){
  var INFO={
    tech:{t:'Technical SEO',d:'Where both the Search and Growth lines start. The ground I know best.',sk:['crawling and indexing','site architecture','redirects and migrations','schema','page speed'],a:'/work/shopify-migration/',l:'See it in a field report'},
    content:{t:'Content & on-page',d:'Writing and structuring pages so they match what people search for.',sk:['keyword research','search intent','metadata','internal linking','LLM content workflows'],a:'/work/edtech-growth/',l:'See it in a field report'},
    ai:{t:'AI search',d:'How AI assistants answer questions, and which pages they choose to cite.',sk:['AEO','GEO','AI citations'],a:'/log/',l:'Notes in the log'},
    ecom:{t:'E-commerce SEO',d:'Category and product pages, catalogue structure, and keeping search intact through a platform move.',sk:['category pages','product pages','filters and facets','platform migration'],a:'/work/shopify-migration/',l:'See it in a field report'},
    local:{t:'Local search',d:'Where the Growth and Building lines meet: running listings across many stores led to building a tool for them.',sk:['Business Profiles','verification','multi-location operations','store pages'],a:'/work/local-search/',l:'See it in a field report'},
    crm:{t:'CRM & messaging',d:'Newer ground, learned on the job: reaching customers after the sale.',sk:['WhatsApp journeys','campaigns','feedback surveys','retention'],a:'/lab/whatsapp-feedback/',l:'See it in the lab'},
    data:{t:'UX & site planning',d:'Planning how a site is structured and how people move through it, before and during a build.',sk:['information architecture','page templates','filters and navigation','UX audits','launch QA'],a:'/work/shopify-migration/',l:'See it in a field report'},
    build:{t:'Building with AI',d:'Where the Search and Building lines meet, and where I am now.',sk:['AI-assisted websites','GBP API tool','automation'],a:'/lab/gbp-tool/',l:'Go to the lab'}
  };
  var LINES={search:{n:'Search',st:['tech','content','ai','build']},growth:{n:'Growth',st:['tech','ecom','local','crm']},build:{n:'Building',st:['local','data','build']}};
  var EX={ai:1,crm:1,build:1};
  function linesOf(k){return Object.keys(LINES).filter(function(l){return LINES[l].st.indexOf(k)>-1;});}

  var svg=document.getElementById('metro');if(!svg)return;
  var sts=[].slice.call(document.querySelectorAll('#metro .mt-st')),mbtns=[].slice.call(document.querySelectorAll('.metro-list button'));
  var lines=[].slice.call(svg.querySelectorAll('.mt-line')),lb=[].slice.call(document.querySelectorAll('.metro-legend button'));
  var elLines=document.getElementById('mp-lines'),elT=document.getElementById('mp-t'),elD=document.getElementById('mp-d'),elS=document.getElementById('mp-skills'),elA=document.getElementById('mp-a'),elC=document.getElementById('mp-clear');
  var train=document.getElementById('train');
  var pinned=null,riding=null,raf=null,timer=null;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  function highlight(ls){svg.classList.toggle('focus',!!(ls&&ls.length));lines.forEach(function(g){g.classList.toggle('on',!!ls&&ls.indexOf(g.getAttribute('data-line'))>-1);});sts.forEach(function(g){var k=g.getAttribute('data-s');g.classList.toggle('online',!!ls&&linesOf(k).some(function(l){return ls.indexOf(l)>-1;}));});}
  function mark(k){sts.concat(mbtns).forEach(function(g){var on=g.getAttribute('data-s')===k;g.classList.toggle('on',on);g.setAttribute('aria-pressed',on?'true':'false');});}
  function show(k,ls){
    if(!k){
      elLines.innerHTML='<span class="kicker">Pick a station</span>';elT.textContent='Hover, tap or ride a line';
      elD.textContent='Big stations are interchanges, where two lines of work meet.';elS.innerHTML='';elA.hidden=true;elC.hidden=true;mark(null);highlight(null);return;
    }
    var x=INFO[k],my=linesOf(k);
    elLines.innerHTML=my.map(function(l){return '<span class="chip l-'+l+'"><i></i>'+LINES[l].n+'</span>';}).join('')+(EX[k]?'<span class="chip ex">exploring</span>':'<span class="chip ok">know well</span>');
    elT.textContent=x.t;elD.textContent=x.d;
    elS.innerHTML=x.sk.map(function(t){return '<span>'+t+'</span>';}).join('');
    elA.hidden=false;elA.href=x.a;elA.textContent=x.l;
    elC.hidden=!(pinned||riding);
    mark(k);highlight(ls||my);
  }
  function stopRide(){if(raf)cancelAnimationFrame(raf);clearTimeout(timer);raf=null;riding=null;train.setAttribute('opacity','0');lb.forEach(function(b){b.setAttribute('aria-pressed','false');b.classList.remove('riding');});}
  function clearAll(){stopRide();pinned=null;show(null);}
  function pick(k){
    stopRide();
    if(pinned===k){clearAll();return;}
    pinned=k;show(k);
  }

  // stations: hover previews, click pins, click again unpins
  sts.forEach(function(g){var k=g.getAttribute('data-s');
    g.addEventListener('mouseenter',function(){if(!riding&&!pinned)show(k);});
    g.addEventListener('mouseleave',function(){if(!riding&&!pinned)show(null);});
    g.addEventListener('click',function(e){e.stopPropagation();pick(k);});
    g.addEventListener('keydown',function(e){if(e.key===' '){e.preventDefault();pick(k);}else if(e.key==='Enter'){location.href=INFO[k].a;}});
  });
  mbtns.forEach(function(b){b.addEventListener('click',function(){pick(b.getAttribute('data-s'));});});
  svg.addEventListener('click',function(e){if(!e.target.closest('.mt-st'))clearAll();});
  elC.addEventListener('click',clearAll);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&(pinned||riding))clearAll();});

  // ride a line: a train runs the track and stops at every station
  function ride(L){
    stopRide();pinned=null;riding=L;
    lb.forEach(function(b){var on=b.getAttribute('data-line')===L;b.setAttribute('aria-pressed',on?'true':'false');b.classList.toggle('riding',on);});
    var path=document.getElementById('rp-'+L),len=path.getTotalLength(),seq=LINES[L].st;
    train.setAttribute('class','mt-train t-'+L);
    var stops=seq.map(function(k){var g=svg.querySelector('[data-s="'+k+'"] .hit'),sx=+g.getAttribute('cx'),sy=+g.getAttribute('cy'),best=0,bd=1e9;
      for(var l=0;l<=len;l+=2){var q=path.getPointAtLength(l),d=(q.x-sx)*(q.x-sx)+(q.y-sy)*(q.y-sy);if(d<bd){bd=d;best=l;}}return{k:k,l:best};});
    if(reduce){var e=path.getPointAtLength(len);train.setAttribute('transform','translate('+e.x+' '+e.y+')');train.setAttribute('opacity','1');show(seq[seq.length-1],[L]);return;}
    train.setAttribute('opacity','1');
    var i=0,SPEED=0.32;
    function leg(){
      var from=i===0?0:stops[i-1].l,to=stops[i].l,t0=null,dur=Math.max(1,(to-from)/SPEED);
      function f(t){if(!t0)t0=t;var k=Math.min((t-t0)/dur,1),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,p=path.getPointAtLength(from+(to-from)*e);
        train.setAttribute('transform','translate('+p.x+' '+p.y+')');
        if(k<1){raf=requestAnimationFrame(f);}else{show(stops[i].k,[L]);i++;if(i<stops.length){timer=setTimeout(leg,1100);}else{elC.hidden=false;lb.forEach(function(b){b.classList.remove('riding');});}}}
      raf=requestAnimationFrame(f);
    }
    var p0=path.getPointAtLength(0);train.setAttribute('transform','translate('+p0.x+' '+p0.y+')');highlight([L]);leg();
  }
  lb.forEach(function(b){b.addEventListener('click',function(){var L=b.getAttribute('data-line');if(riding===L){clearAll();}else ride(L);});});

})();
