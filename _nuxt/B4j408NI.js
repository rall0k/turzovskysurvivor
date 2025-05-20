import r from"./CepdalC5.js";import{K as o,L as s,q as n,c as l,o as d,r as i,b as p,a5 as a}from"./B7O7fdp7.js";var v=o`
    .p-overlaybadge {
        position: relative;
    }

    .p-overlaybadge .p-badge {
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
        outline-width: dt('overlaybadge.outline.width');
        outline-style: solid;
        outline-color: dt('overlaybadge.outline.color');
    }

    .p-overlaybadge .p-badge:dir(rtl) {
        transform: translate(-50%, -50%);
    }
`,c={root:"p-overlaybadge"},g=s.extend({name:"overlaybadge",style:v,classes:c}),m={name:"OverlayBadge",extends:r,style:g,provide:function(){return{$pcOverlayBadge:this,$parentInstance:this}}},y={name:"OverlayBadge",extends:m,inheritAttrs:!1,components:{Badge:r}};function u(e,b,B,f,$,h){var t=n("Badge");return d(),l("div",a({class:e.cx("root")},e.ptmi("root")),[i(e.$slots,"default"),p(t,a(e.$props,{pt:e.ptm("pcBadge")}),null,16,["pt"])],16)}y.render=u;export{y as default};
