/**
 * Les URL sans locale (/, /mindeasedemo) affichent directement la version
 * française. Ce script, exécuté avant l'affichage, renvoie vers /en/ les
 * visiteurs qui ont choisi l'anglais ou dont le navigateur n'est pas en
 * français mais en anglais : pas d'écran d'attente pour les autres.
 */
export default function EnglishRedirect({ path = "" }: { path?: string }) {
  const script = `(function(){try{
var stored=null;try{stored=localStorage.getItem("preferred-locale")}catch(e){}
var locale=stored==="fr"||stored==="en"?stored:null;
if(!locale){
var langs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]).map(function(l){return String(l).toLowerCase()});
var fr=langs.some(function(l){return l.indexOf("fr")===0});
var en=langs.some(function(l){return l.indexOf("en")===0});
locale=!fr&&en?"en":"fr";
}
if(locale==="en"){location.replace("/en/${path}"+location.search+location.hash)}
}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
