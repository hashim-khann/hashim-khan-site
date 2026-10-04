
(function(){
  /* hero: AI answer / search result toggle + typed answer */
  var btns=[].slice.call(document.querySelectorAll('.ask-tabs button'));
  btns.forEach(function(b){b.addEventListener('click',function(){
    var v=b.getAttribute('data-view');
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    document.querySelectorAll('.ask [data-panel]').forEach(function(p){p.hidden=p.getAttribute('data-panel')!==v;});
  });});
  var ans=document.getElementById('ai-answer');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce&&ans){
    var nodes=[].slice.call(ans.childNodes).map(function(n){return n.cloneNode(true);});
    ans.innerHTML='';ans.classList.add('typing');
    var i=0,txt=null,pos=0;
    function step(){
      if(i>=nodes.length){ans.classList.remove('typing');return;}
      var n=nodes[i];
      if(n.nodeType===3){
        if(!txt){txt=document.createTextNode('');ans.appendChild(txt);pos=0;}
        var chunk=Math.max(1,Math.round(Math.random()*3));txt.data+=n.data.slice(pos,pos+chunk);pos+=chunk;
        if(pos>=n.data.length){i++;txt=null;}
        setTimeout(step,18+Math.random()*28);
      }else{ans.appendChild(n);i++;setTimeout(step,120);}
    }
    var started=false;document.querySelectorAll('.ask-tabs button').forEach(function(b){b.addEventListener('click',function(){if(b.getAttribute('data-view')==='ai'&&!started){started=true;setTimeout(step,250);}});});
  }
  /* hero: auto-show the AI answer once, unless the visitor has already used the toggle */
  var touched=false,tabs=[].slice.call(document.querySelectorAll('.ask-tabs button'));
  tabs.forEach(function(t){t.addEventListener('click',function(){touched=true;});});
  if(!reduce)setTimeout(function(){if(!touched&&tabs[1]){tabs[1].click();touched=false;}},5200);
})();
