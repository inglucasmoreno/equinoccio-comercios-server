import{a as s,b as n}from"./chunk-6M6LJACB.js";function f(o,e){let t=s(o);return isNaN(e)?n(o,NaN):(e&&t.setDate(t.getDate()+e),t)}function m(o,e){let t=s(o);if(isNaN(e))return n(o,NaN);if(!e)return t;let d=t.getDate(),r=n(o,t.getTime());r.setMonth(t.getMonth()+e+1,0);let a=r.getDate();return d>=a?r:(t.setFullYear(r.getFullYear(),r.getMonth(),d),t)}function w(o,e){let{years:t=0,months:d=0,weeks:r=0,days:a=0,hours:u=0,minutes:p=0,seconds:h=0}=e,i=s(o),c=d||t?m(i,d+t*12):i,D=a||r?f(c,a+r*7):c,l=p+u*60,M=(h+l*60)*1e3;return n(o,D.getTime()+M)}export{w as a};
