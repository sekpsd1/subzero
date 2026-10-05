import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
// No resource loading or script execution in this private DOM.
const purifier = createDOMPurify(new JSDOM('').window);
purifier.addHook('uponSanitizeAttribute', (node, data) => {
 if(node.nodeName !== 'A' || !['href','title'].includes(data.attrName)) data.keepAttr=false;
 if(data.attrName==='href' && !/^(?:https?:|mailto:|\/(?!\/)|#)/i.test(data.attrValue)) data.keepAttr=false;
});
purifier.addHook('afterSanitizeAttributes', node => { if(node.nodeName==='A')node.setAttribute('rel','noopener noreferrer'); });
export function sanitizeContent(value) {
 if(typeof value!=='string'||value.length>120000)throw new Error('Content must be text, maximum 120000 characters.');
 return purifier.sanitize(value,{ALLOWED_TAGS:['p','br','h2','h3','h4','strong','em','u','s','blockquote','ul','ol','li','a'],ALLOWED_ATTR:['href','title'],ALLOW_DATA_ATTR:false,ALLOW_ARIA_ATTR:false}).trim();
}
