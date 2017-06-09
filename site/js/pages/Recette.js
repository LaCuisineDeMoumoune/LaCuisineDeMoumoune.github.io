mc.Recette={oninit:function(e){this.recette=_.find(mc.recettes,{nom:e.attrs.nom})},view:function(e){var t=this;return m("div#body.recette.pure-g",[m("div.pad.pure-u-md-18-24.pure-u-1",[m(mc.Recette.FicheRecette,{parent:t})]),m("div.pad.pure-u-md-6-24.pure-u-1",[m(mc.Pub)])])}},mc.Recette.FicheRecette={oninit:function(e){var t=this;t.parent=e.attrs.parent,t.recette=t.parent.recette,t.difficulteHtml="";for(var n=1;n<=3;n++)n<=t.recette.difficulte?t.difficulteHtml+='<i class="fa fa-star"></i>':t.difficulteHtml+='<i class="fa fa-star-o"></i>';t.motsTitre=_.map(t.recette.nomTraduit.split(" "),function(e){return e.length>=3?m("span.mot-decore",e+" "):m("span",e+" ")}),t.path="data/recettes/"+t.recette.nom+"/",m.request({method:"GET",url:t.path+t.recette.nom+"_"+i18n.language+".json"}).then(function(e){t.data=e,_.each(t.data.etapes,function(e){_.isArray(e.texte)&&(e.texte=e.texte.join(""))})}).catch(function(e){console.log(e)})},view:function(e){var t=this;return m("#fiche-recette.box",[m(mc.NomDecore,{nom:t.recette.nomTraduit,selector:"h1"}),m("div#info",[m("span.info-item",[m("span.label",i18n("preparation")),m("span.value",i18n("_preparations."+t.recette.preparation))]),m("span.info-item",[m("span.label",i18n("origine")),m("span.value",i18n("_origines."+t.recette.origine))]),m("span.info-item",[m("span.label",i18n("prix")),m("span.value",m.trust(i18n("_prix."+t.recette.prix).replace("*",'<i class="fa fa-star" aria-hidden="true"></i>')))]),m("span.info-item",[m("span.label",i18n("difficulte")),m("span.value",m.trust(t.difficulteHtml))])]),m("div.pure-g",[m("div.pad.pure-u-md-12-24.pure-u-1",[m(mc.ContainImage,{selector:"#photo",path:t.path+"/"+t.recette.nom+".md.jpg"})]),m("div.pad.pure-u-md-12-24.pure-u-1",[m(mc.Recette.IngredientList,{parent:t})])]),m("#etapes",i18n("preparation")),m(mc.Recette.EtapeList,{parent:t})])}},mc.Recette.IngredientList={oninit:function(e){var t=this,n=e.attrs.parent;t.recette=n.recette,t.currentNombrePersonnes=0,t.textePour=i18n("pour"),t.textePersonne="",t.texteQuantites=[],t.setNombrePersonnes=function(e){(e=parseInt(e))>=1&&e!=t.currentNombrePersonnes&&(t.currentNombrePersonnes=e,t.textePersonne=i18n.n("personne",t.currentNombrePersonnes),t.texteQuantites=_.map(t.recette.ingredients,function(e,n){var r=e.unite,i=e.quantite,a=[i];if("string"==typeof i&&i.indexOf("-")>0){var s=i.split("-");a=[parseInt(s[0]),parseInt(s[1])]}var o=t.currentNombrePersonnes/t.recette.nombrePersonnes;a=_.map(a,function(e){return"number"==typeof e?e*=o:e.indexOf("/")>0&&(s=e.split("/"),e=parseInt(s[0])/parseInt(s[1]),e*=o),e=Math.round(10*e)/10,r&&r.convert&&(e*=r.volume),e}),r&&r.convert&&(r=_.find(mc.unites,{nom:r.convert}));var p="";return r&&(p=r.nomTraduit,r.nomTraduit.length>2&&(p=" "+p),r.mot_entier&&i>1&&(p+="s")),[m("span.quantite",a.join(i18n("_unites.-"))),m("span.unite",p)]}))},t.setNombrePersonnes(t.recette.nombrePersonnes)},view:function(e){var t=this;return m("#ingredients",[m("h2#ingredients-title",[m("span",i18n("ingredients")),m("span.pour-nombre-personnes",[" ("+t.textePour+" ",m('input[type="number"].nombre-personnes',{min:1,max:99,oninput:m.withAttr("value",t.setNombrePersonnes),value:t.currentNombrePersonnes})," "+t.textePersonne+")"])]),m("div#ingredient-list",_.map(t.recette.ingredients,function(e,n){return m("div.ingredient",[m(mc.IngredientLink,{ingredient:e.ingredient}),t.texteQuantites[n]])}))])}},mc.Recette.EtapeList={oninit:function(e){var t=this;t.parent=e.attrs.parent,t.recette=t.parent.recette,t.path=t.parent.path},view:function(e){var t=this;return t.data=t.parent.data,t.data?m("div",_.map(t.data.etapes,function(e,n){return m("div.etape",[m(mc.CoverImage,{selector:".photo",path:t.path+t.recette.nom+"_"+(n+1)+".sm.jpg"},[m(".index",n+1)]),m(".texte",e.texte)])})):m(mc.Spinner)}};