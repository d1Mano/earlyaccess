import{o as e,t}from"./react-Ca03aNmg.js";import{r as n}from"./cn-CmQahY0r.js";import{t as r}from"./OwnerIcon-CZzg_JhQ.js";import{j as i,rn as a}from"./use-owner-data-CoRfbUxW.js";import{t as o}from"./owner-errors-CrWSclsN.js";import{c as s,nt as c}from"./index-wO6FINvN.js";import{t as l}from"./AppSelect-MCkZeRYf.js";import{t as u}from"./OwnerButton-C9n4zsND.js";import{t as d}from"./OwnerActionBar-Byyq6jjB.js";import{t as f}from"./OwnerFormSection-BGjiNQHx.js";import{n as p}from"./sandbox-store-B9Nxx4o6.js";import{t as m}from"./bulk-wizard-store-5s35BSsQ.js";import{t as ee}from"./OwnerProviderSelect-Bv7fEO56.js";import{t as h}from"./MarkdownPreviewCard-BM_llnrc.js";import{t as g}from"./bulk-upload-template-Cl4Dp5dY.js";var _=e(t(),1),v=n();function y(){return(0,v.jsx)(h,{title:`Plantilla para IA (Markdown)`,description:(0,v.jsxs)(v.Fragment,{children:[`Este es el `,(0,v.jsx)(`code`,{className:`font-mono text-secondary`,children:`.md`}),` que le das a la IA — ya incluye plantilla + tablas + ejemplos`]}),content:g,downloadFilename:`plantilla-productos-ia.md`,icon:`copy`,previewHint:`Ver preview renderizado (tablas, ejemplos)`})}var b=`{
  "products": [
    {
      "name": "Panel Solar 500W",
      "slug": "panel-solar-500w",
      "short_description": "Panel monocristalino 500W",
      "description": "Panel de alta eficiencia...",
      "brand": "SunPower",
      "base_price": 450,
      "currency": "USD",
      "unit": "unit",
      "minimum_order_unit": 1,
      "subcategories": ["Energía Solar", "Paneles"],
      "image": "https://...",
      "details": [
        { "title": "Potencia", "value": 500, "details": "Watts", "icon": "bolt" },
        { "title": "Peso", "value": 26, "details": "kg", "icon": "weight-kilograms" }
      ],
      "conditions": [
        { "title": "Garantía", "details": "25 años", "icon": "shield" }
      ],
      "packaging": {
        "kind": "packaging",
        "packagingType": "box",
        "quantity": 1,
        "unitChild": { "kind": "unit", "unitCode": "unit", "quantity": 10, "unitChild": null, "packagingChild": null },
        "packagingChild": null
      },
      "commission": {
        "type": "percentage",
        "value": 15,
        "notes": "15% minorista"
      }
    },
    {
      "name": "Aceite Lubricante 500ml — Sachet",
      "slug": "aceite-lubricante-500ml-sachet",
      "short_description": "Sachet 500ml listo para uso",
      "description": "Aceite sintético 500ml en sachet sellado",
      "brand": "LubriMax",
      "base_price": 12,
      "currency": "USD",
      "unit": "ml",
      "minimum_order_unit": 6,
      "subcategories": ["Lubricantes", "Automotriz"],
      "image": "https://...",
      "details": [
        { "title": "Volumen", "value": 500, "details": "ml", "icon": "glass-water" },
        { "title": "Viscosidad", "details": "10W-40", "icon": "drop-water" }
      ],
      "conditions": [
        { "title": "Entrega", "details": "48hs", "icon": "truck" }
      ],
      "packaging": {
        "kind": "packaging",
        "packagingType": "sachet",
        "quantity": 1,
        "unitChild": { "kind": "unit", "unitCode": "ml", "quantity": 500, "unitChild": null, "packagingChild": null },
        "packagingChild": null
      },
      "commission": {
        "type": "fixed",
        "value": 2,
        "notes": "2 USD por sachet — mayorista"
      }
    },
    {
      "name": "Cables Solares — Crate Mayorista",
      "slug": "cables-solares-crate",
      "short_description": "Crate con 20 rollos de cable solar",
      "description": "Crate de madera con 20 rollos de 100m c/u",
      "brand": "SunCable",
      "base_price": 2400,
      "currency": "USD",
      "unit": "crate",
      "minimum_order_unit": 1,
      "subcategories": ["Energía Solar", "Cables", "Mayorista"],
      "image": "https://...",
      "details": [
        { "title": "Longitud por rollo", "value": 100, "details": "metros", "icon": "ruler" }
      ],
      "conditions": [],
      "packaging": {
        "kind": "packaging",
        "packagingType": "crate",
        "quantity": 1,
        "unitChild": null,
        "packagingChild": {
          "kind": "packaging",
          "packagingType": "bundle",
          "quantity": 20,
          "unitChild": { "kind": "unit", "unitCode": "meter", "quantity": 100, "unitChild": null, "packagingChild": null },
          "packagingChild": null
        }
      }
    }
  ]
}`;function x(){let{aiAccess:e}=s(),t=c(),n=i(),h=p(e=>e.bodies),g=p(e=>e.clearAll),x=m(e=>e.products),S=m(e=>e.clear),C=m(e=>e.setStaging),[w,T]=(0,_.useState)(``),[E,D]=(0,_.useState)(null),[O,k]=(0,_.useState)(null),[A,j]=(0,_.useState)(null),[M,N]=(0,_.useState)(null),[P,F]=(0,_.useState)(!1),[I,L]=(0,_.useState)(!1),[R,z]=(0,_.useState)(`file`),[B,V]=(0,_.useState)(``),[H,U]=(0,_.useState)(!1),[W,G]=(0,_.useState)(!1),K=(0,_.useRef)(null),q=h.length>0,J=x.length>0,Y=(0,_.useCallback)((e,t)=>{k(null),j(null),N(null);try{let n=JSON.parse(e),r=a.safeParse(n);if(!r.success){let e=r.error.issues[0];k(`Error en JSON: ${e.path.join(`.`)} — ${e.message}`);return}N(r.data),j({count:r.data.products.length,filename:t})}catch{k(`No se pudo parsear. Asegúrate de que sea JSON válido.`)}},[]),X=(0,_.useCallback)(async e=>{if(!e.name.endsWith(`.json`)){k(`Solo se aceptan archivos .json`);return}let t=await e.text();Y(t,e.name)},[Y]),te=(0,_.useCallback)(()=>{if(!B.trim()){k(`Pegá el JSON primero.`);return}Y(B,`pegado del portapapeles`)},[B,Y]),Z=(0,_.useCallback)(()=>{j(null),N(null),k(null),V(``),K.current&&(K.current.value=``)},[]),ne=(0,_.useCallback)(()=>{H?(g(),U(!1)):(U(!0),setTimeout(()=>U(!1),3e3))},[H,g]),[re,Q]=(0,_.useState)(!1),ie=(0,_.useCallback)(e=>{e.preventDefault(),Q(!0)},[]),ae=(0,_.useCallback)(()=>{Q(!1)},[]),oe=(0,_.useCallback)(e=>{e.preventDefault(),Q(!1);let t=e.dataTransfer.files[0];t&&X(t)},[X]),se=async()=>{if(!(!w||!M||!A)){k(null);try{let e=M.products;if(E)for(let t of e)t.provider_public_key||=E;C(w,e),t(`/owner/bulk-upload/wizard`)}catch(e){k(o(e).message)}}},ce=()=>{S(),G(!1)},$=!!A;return(0,v.jsxs)(`div`,{className:`animate-fade-in`,children:[(0,v.jsxs)(`div`,{className:`px-margin-mobile py-stack-md`,children:[(0,v.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-2`,children:[(0,v.jsxs)(`div`,{className:`flex-1`,children:[(0,v.jsx)(`h1`,{className:`text-headline-lg font-bold text-on-surface`,children:`Carga masiva de productos`}),(0,v.jsx)(`p`,{className:`text-body-md text-on-surface-variant`,children:`Sube un archivo .json con tus productos y créalos todos de una.`})]}),(0,v.jsxs)(`div`,{className:`flex flex-col gap-2 sm:flex-row sm:items-center`,children:[q&&(0,v.jsxs)(`button`,{type:`button`,onClick:ne,className:`w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-bold transition-all duration-200 active:scale-[0.96] `+(H?`bg-error/10 text-error`:`bg-surface-container-high text-on-surface-variant hover:bg-surface-container`),children:[(0,v.jsx)(r,{name:H?`alert`:`delete`,size:14}),H?`¿Limpiar?`:`Limpiar sandbox`]}),e&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(`button`,{type:`button`,onClick:()=>t(`/owner/catalog-agent`),className:`w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all duration-200 active:scale-[0.96]`,children:[(0,v.jsx)(r,{name:`refresh`,size:18}),(0,v.jsx)(`span`,{className:`text-label-sm font-bold`,children:`Actualizar desde WhatsApp`})]}),(0,v.jsxs)(`button`,{type:`button`,onClick:()=>t(`/owner/sandbox`),className:`relative w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all duration-200 active:scale-[0.96]`,children:[(0,v.jsx)(r,{name:`auto_fix_high`,size:18}),(0,v.jsx)(`span`,{className:`text-label-sm font-bold`,children:`Sandbox`}),q&&(0,v.jsx)(`span`,{className:`absolute -top-1 -right-1 size-2.5 rounded-full bg-secondary animate-pulse`})]})]})]})]}),J&&(0,v.jsx)(`div`,{className:`mt-4 rounded-2xl border border-secondary/30 bg-secondary/5 p-4`,children:(0,v.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3`,children:[(0,v.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-start gap-3 min-w-0`,children:[(0,v.jsx)(`div`,{className:`size-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0`,children:(0,v.jsx)(r,{name:`auto_fix_high`,size:18})}),(0,v.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,v.jsx)(`p`,{className:`text-label-md font-bold text-on-surface`,children:`Tienes una carga en progreso`}),(0,v.jsxs)(`p`,{className:`text-body-sm text-on-surface-variant mt-1`,children:[x.length,` producto`,x.length===1?``:`s`,` en staging, listos para revisar y procesar.`]})]})]}),(0,v.jsxs)(`div`,{className:`flex flex-col sm:flex-row gap-2 w-full sm:w-auto`,children:[(0,v.jsx)(`button`,{type:`button`,onClick:()=>t(`/owner/bulk-upload/wizard`),className:`w-full sm:w-auto px-3 py-1.5 rounded-lg text-label-sm font-bold bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors`,children:`Continuar`}),(0,v.jsx)(`button`,{type:`button`,onClick:()=>{W?ce():(G(!0),setTimeout(()=>G(!1),3e3))},className:`w-full sm:w-auto px-3 py-1.5 rounded-lg text-label-sm font-bold transition-colors `+(W?`bg-error/10 text-error`:`bg-surface-container-high text-on-surface-variant hover:bg-surface-container`),children:W?`¿Limpiar?`:`Limpiar`})]})]})}),(0,v.jsxs)(f,{title:`Catálogo destino`,children:[(0,v.jsx)(l,{value:w,onValueChange:T,options:(n.data??[]).map(e=>({value:e.id,label:e.name})),placeholder:`Selecciona un catálogo…`,"aria-label":`Catálogo destino (obligatorio)`}),(0,v.jsx)(`p`,{className:`text-body-sm text-on-surface-variant`,children:`Los productos sin catalog_id propio se crearán en este catálogo. Los que traigan el suyo lo conservan.`})]}),(0,v.jsx)(f,{title:`Proveedor por defecto (opcional)`,tone:`warn`,help:(0,v.jsxs)(v.Fragment,{children:[`Si lo eliges, todos los productos del JSON que`,` `,(0,v.jsx)(`span`,{className:`font-bold text-on-surface`,children:`no traigan su propio provider_public_key`}),` `,`quedan asociados a este. Si ningún item del JSON trae provider, no se setea nada. Útil cuando vas a crear muchos productos del mismo proveedor y no quieres repetir la key en cada item.`]}),children:(0,v.jsx)(ee,{value:E,onChange:D,label:``})}),(0,v.jsxs)(f,{title:`JSON`,children:[(0,v.jsxs)(`div`,{className:`flex gap-1 p-1 rounded-xl bg-surface-container-low mb-3`,children:[(0,v.jsxs)(`button`,{type:`button`,onClick:()=>{z(`file`),$||Z()},className:`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-label-sm font-bold transition-all duration-200 `+(R===`file`?`bg-surface text-on-surface shadow-sm`:`text-on-surface-variant hover:text-on-surface`),children:[(0,v.jsx)(r,{name:`upload`,size:16}),`Archivo`]}),(0,v.jsxs)(`button`,{type:`button`,onClick:()=>{z(`paste`),$||Z()},className:`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-label-sm font-bold transition-all duration-200 `+(R===`paste`?`bg-surface text-on-surface shadow-sm`:`text-on-surface-variant hover:text-on-surface`),children:[(0,v.jsx)(r,{name:`copy`,size:16}),`Pegar JSON`]})]}),R===`file`&&(0,v.jsxs)(`div`,{onDragOver:ie,onDragLeave:ae,onDrop:oe,onClick:()=>!$&&K.current?.click(),className:`relative flex flex-col items-center justify-center gap-3 min-h-[140px] rounded-2xl border-2 border-dashed transition-all duration-200 `+($?`cursor-default border-success/40 bg-success/5`:`cursor-pointer border-outline-variant/30 bg-surface-container-low hover:border-secondary/40 hover:bg-secondary/5`)+(re?` border-secondary bg-secondary/5 scale-[1.01]`:``),children:[(0,v.jsx)(`input`,{ref:K,type:`file`,accept:`.json`,className:`hidden`,onChange:e=>{let t=e.target.files?.[0];t&&X(t)}}),$?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`div`,{className:`size-10 rounded-full bg-success/10 text-success flex items-center justify-center`,children:(0,v.jsx)(r,{name:`check`,size:20})}),(0,v.jsxs)(`div`,{className:`text-center`,children:[(0,v.jsx)(`p`,{className:`text-label-md font-bold text-on-surface`,children:A.filename}),(0,v.jsxs)(`p`,{className:`text-body-sm text-on-surface-variant`,children:[A.count,` producto`,A.count===1?``:`s`]})]}),(0,v.jsx)(`button`,{type:`button`,onClick:e=>{e.stopPropagation(),Z()},className:`text-label-sm font-bold text-secondary hover:text-secondary/80 transition-colors`,children:`Cambiar`})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`div`,{className:`size-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center`,children:(0,v.jsx)(r,{name:`upload`,size:20})}),(0,v.jsxs)(`div`,{className:`text-center`,children:[(0,v.jsx)(`p`,{className:`text-label-md font-bold text-on-surface`,children:`Arrastra tu archivo .json aquí`}),(0,v.jsx)(`p`,{className:`text-body-sm text-on-surface-variant`,children:`o haz clic para seleccionar`})]})]})]}),R===`paste`&&(0,v.jsxs)(`div`,{className:`space-y-2`,children:[(0,v.jsxs)(`div`,{className:`relative`,children:[(0,v.jsx)(`textarea`,{value:B,onChange:e=>V(e.target.value),placeholder:`{ "products": [ { "name": "..." } ] }`,rows:10,spellCheck:!1,className:`w-full rounded-xl border px-3.5 pt-10 pb-3 text-body-sm font-mono resize-none transition-colors `+($?`border-success/40 bg-success/5 text-on-surface`:`border-outline-variant/40 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/40 focus:border-secondary focus:ring-2 focus:ring-secondary/40`)}),(0,v.jsxs)(`button`,{type:`button`,onClick:async()=>{try{let e=await navigator.clipboard.readText();e&&V(e)}catch{}},className:`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/10 text-secondary text-label-xs font-bold hover:bg-secondary/20 transition-colors`,title:`Pegar desde el portapapeles`,children:[(0,v.jsx)(r,{name:`copy`,size:12}),`Pegar`]})]}),(0,v.jsx)(`div`,{className:`flex items-center gap-2`,children:$?(0,v.jsxs)(`div`,{className:`flex items-center gap-2 flex-1`,children:[(0,v.jsx)(`div`,{className:`size-6 rounded-full bg-success/10 text-success flex items-center justify-center`,children:(0,v.jsx)(r,{name:`check`,size:14})}),(0,v.jsxs)(`span`,{className:`text-label-sm text-on-surface-variant`,children:[A.count,` producto`,A.count===1?``:`s`,` detectado`,A.count===1?``:`s`]}),(0,v.jsx)(`button`,{type:`button`,onClick:Z,className:`ml-auto text-label-sm font-bold text-secondary hover:text-secondary/80 transition-colors`,children:`Limpiar`})]}):(0,v.jsx)(u,{variant:`secondary`,onClick:te,disabled:!B.trim(),children:`Validar JSON`})})]}),O&&(0,v.jsx)(`div`,{className:`mt-3 rounded-xl border border-error/30 bg-error/5 p-3`,children:(0,v.jsx)(`p`,{className:`text-body-sm text-error font-medium`,children:O})}),(0,v.jsxs)(`div`,{className:`mt-3 rounded-xl border border-outline-variant/20 bg-surface-container-low p-3`,children:[(0,v.jsxs)(`div`,{className:`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2`,children:[(0,v.jsx)(`p`,{className:`text-label-md font-bold text-on-surface`,children:`Plantilla JSON`}),(0,v.jsxs)(`div`,{className:`flex flex-col sm:flex-row gap-2 w-full sm:w-auto`,children:[(0,v.jsxs)(`button`,{type:`button`,onClick:()=>{let e=new Blob([b],{type:`application/json`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`plantilla-productos.json`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(t)},className:`w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-bold bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all duration-200 active:scale-[0.96]`,children:[(0,v.jsx)(r,{name:`download`,size:14}),(0,v.jsx)(`span`,{className:`hidden sm:inline`,children:`Descargar .json`}),(0,v.jsx)(`span`,{className:`sm:hidden`,children:`.json`})]}),(0,v.jsxs)(`button`,{type:`button`,onClick:async()=>{try{await navigator.clipboard.writeText(b),F(!0),setTimeout(()=>F(!1),2e3)}catch{let e=document.createElement(`textarea`);e.value=b,document.body.appendChild(e),e.select(),document.execCommand(`copy`),document.body.removeChild(e),F(!0),setTimeout(()=>F(!1),2e3)}},className:`w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-bold transition-all duration-200 active:scale-[0.96] `+(P?`bg-success/10 text-success`:`bg-secondary/10 text-secondary hover:bg-secondary/20`),children:[(0,v.jsx)(r,{name:P?`check`:`copy`,size:14}),(0,v.jsx)(`span`,{className:`hidden sm:inline`,children:P?`¡Copiado!`:`Copiar plantilla`}),(0,v.jsx)(`span`,{className:`sm:hidden`,children:P?`OK`:`Copiar`})]})]})]}),(0,v.jsx)(`p`,{className:`text-body-sm text-on-surface-variant mb-2`,children:`Copiala, pegala en un archivo .json o en el campo de arriba, editala y subila.`}),I?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`pre`,{className:`p-3 rounded-lg bg-surface-container text-body-xs text-on-surface-variant overflow-x-auto max-h-[200px]`,children:b}),(0,v.jsxs)(`button`,{type:`button`,onClick:()=>L(!1),className:`mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-label-sm font-bold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors`,children:[(0,v.jsx)(r,{name:`expand_less`,size:16}),`Compactar`]}),(0,v.jsxs)(`p`,{className:`text-body-sm text-on-surface-variant mt-2`,children:[`Solo `,(0,v.jsx)(`code`,{className:`font-mono text-secondary`,children:`name`}),` es obligatorio. La comisión es `,(0,v.jsx)(`span`,{className:`font-bold`,children:`privada`}),` (solo owners) y se guarda en `,(0,v.jsx)(`code`,{className:`font-mono text-secondary`,children:`product_commissions`}),`, no en condiciones públicas.`]})]}):(0,v.jsxs)(`button`,{type:`button`,onClick:()=>L(!0),className:`w-full flex items-center gap-2 p-2.5 rounded-lg bg-surface-container border border-outline-variant/20 hover:border-secondary/40 transition-colors text-left`,"aria-label":`Desplegar plantilla JSON`,children:[(0,v.jsxs)(`code`,{className:`flex-1 min-w-0 truncate font-mono text-body-xs text-on-surface-variant/70`,children:[b.replace(/\s+/g,` `).slice(0,140),`…`]}),(0,v.jsx)(`span`,{className:`size-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0`,children:(0,v.jsx)(r,{name:`add`,size:16})})]})]}),(0,v.jsx)(`div`,{className:`mt-4`,children:(0,v.jsx)(y,{})})]})]}),(0,v.jsx)(d,{primaryLabel:J?`Reemplazar carga y previsualizar`:`Subir y previsualizar`,primaryDisabled:!w||!A,onPrimary:se,formError:O})]})}export{x as default};