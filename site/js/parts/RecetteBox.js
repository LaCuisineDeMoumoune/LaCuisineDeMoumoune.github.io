mc.RecetteBox={oninit:function(e){var t=this;t.recette=e.attrs.recette,delete e.attrs.recette,t.imgPath="data/recettes/"+t.recette.nom+"/"+t.recette.nom+".md.jpg"},view:function(e){var t=this;return m("div.recette-box.box",e.attrs,[m(mc.NomDecore,{nom:t.recette.nomTraduit}),m("img",{src:t.imgPath})])}},mc.RecetteLink={oninit:function(){var e=this;e.mouseover=!1,e.boxElement=null,e.onMouseEnter=function(t){e.mouseover=!0,e.updateRecetteBox(t.target)},e.onMouseLeave=function(t){e.mouseover=!1},e.updateRecetteBox=function(t){if(e.boxElement&&e.mouseover){var o=e.boxElement.offsetWidth,n=(e.boxElement.offsetHeight,t.offsetTop);e.boxElement.style.left=t.offsetWidth/2-o/2+"px",e.boxElement.style.display="absolute",n<100?(e.boxElement.style.top="100%",e.boxElement.style.bottom=""):(e.boxElement.style.bottom="100%",e.boxElement.style.top="")}}},onupdate:function(e){var t=this;mc.size.rollover&&(t.mouseover&&!t.boxElement?(t.boxElement=e.dom.querySelector(".recette-box"),t.updateRecetteBox(e.dom)):t.boxElement=null)},view:function(e){var t=this,o=e.attrs.recette;return m(mc.ARoute,{className:"recette-link "+e.attrs.className,route:"recettes/"+o.nom,onmouseenter:mc.size.rollover&&t.onMouseEnter,onmouseleave:mc.size.rollover&&t.onMouseLeave},[o.nomTraduit,t.mouseover&&m(mc.RecetteBox,{recette:o,className:"shadow floating-box"})])}};