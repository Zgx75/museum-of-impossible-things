import {existsSync} from 'node:fs';
import {exhibits,categories} from '../data/exhibits.js';
const errors=[],ids=new Set(),slugs=new Set();
const required=['id','slug','name','englishName','category','subtitle','description','year','location','material','function','limitation','story','curatorNote','tags','image','related'];
for(const e of exhibits){
 for(const k of required)if(e[k]===undefined||e[k]===null)errors.push(e.id+': missing '+k);
 if(!/^IM-\d{3}$/.test(e.id)||ids.has(e.id))errors.push('invalid ID '+e.id);ids.add(e.id);
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug)||slugs.has(e.slug))errors.push('invalid slug '+e.slug);slugs.add(e.slug);
 if(!categories.includes(e.category))errors.push('invalid category '+e.id);
 if(!Array.isArray(e.story)||e.story.length<2)errors.push('need two story paragraphs '+e.id);
 if(!Array.isArray(e.tags)||e.tags.length<2)errors.push('need two tags '+e.id);
 if(!Array.isArray(e.related)||e.related.length!==2||new Set(e.related).size!==2)errors.push('need two distinct relations '+e.id);
 if(!existsSync(e.image))errors.push('missing illustration '+e.image);
}
for(const e of exhibits)for(const id of e.related)if(!slugs.has(id)||id===e.slug)errors.push('invalid related slug '+id);
for(const p of ['index.html','collection.html','exhibit.html','about.html','AGENTS.md','README.md','assets/css/style.css','assets/js/app.js'])if(!existsSync(p))errors.push('missing file '+p);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Museum validated: '+exhibits.length+' exhibits, '+categories.length+' categories.');