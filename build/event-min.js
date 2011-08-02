/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 2 18:05
*/
KISSY.add("event/base",function(q,b,h,j){function p(a,e,n){if((n=q.trim(n))&&n.indexOf(r)>0){var t=q.makeArray(arguments);q.each(n.split(r),function(w){var c=q.clone(t);c.splice(0,3,e,w);g[a].apply(g,c)});return true}return j}function f(a){return a&&a.nodeType!==3&&a.nodeType!==8}function l(a,e,n,t,w){var c=g.special[e]||{};if(!t.length&&(!c.setup||c.setup.call(a)===false))d(a,e,n);c.add&&c.add.call(a,w)}var m=document,d=m.addEventListener?function(a,e,n,t){a.addEventListener&&a.addEventListener(e,
n,!!t)}:function(a,e,n){a.attachEvent&&a.attachEvent("on"+e,n)},o=m.removeEventListener?function(a,e,n,t){a.removeEventListener&&a.removeEventListener(e,n,!!t)}:function(a,e,n){a.detachEvent&&a.detachEvent("on"+e,n)},r=" ",v="",i="trigger-none-"+q.now(),k="ksEventTargetId"+q.now(),g={_data:function(){var a=q.makeArray(arguments);a.splice(1,0,k);return b.data.apply(b,a)},_removeData:function(){var a=q.makeArray(arguments);a.splice(1,0,k);return b.removeData.apply(b,a)},special:{},add:function(a,e,
n,t,w){if(p("add",a,e,n,t,w))return a;b.query(a).each(function(c){var u=!c.isCustomEventTarget,s;if(!(!c||!e||!q.isFunction(n)||u&&!f(c))){(s=g._data(c))||g._data(c,s={});var A=s.events=s.events||{};A=A[e]=A[e]||[];var y={fn:n,scope:t||c,data:w},z=s.handler;if(!z){z=s.handler=function(x,B){if(!(x&&x.type==v)){var D=z.target;if(!x||!x.fixed)x=new h(D,x);q.isPlainObject(B)&&q.mix(x,B);return g._handle(D,x)}};z.target=c}if(u){l(c,e,z,A,y);c=null}A.push(y)}});return a},__getListeners:function(a,e){return(g.__getEvents(a)||
{})[e]||[]},__getEvents:function(a){return(a=g._data(a))&&a.events},remove:function(a,e,n,t,w){if(p("remove",a,e,n,t))return a;b.query(a).each(function(c){var u=g._data(c),s=u&&u.events,A,y,z,x,B,D=!c.isCustomEventTarget,F=D&&g.special[e]||{};if(!(!c||!D&&!f(c)||!s))if(e===j)for(e in s)g.remove.call(g,c,e);else{t=t||c;if(A=s[e]){y=A.length;if(n&&y){x=z=0;for(B=[];z<y;++z){var G=false,C=A[z];if(n!==C.fn||t!==C.scope){B[x++]=C;G=true}else if(w!==E){var E=C.data;if(!w&&E||E&&!w){B[x++]=C;G=true}else if(w&&
E)if(w.equals&&E.equals)if(!E.equals(w)){B[x++]=C;G=true}}!G&&F.remove&&F.remove.call(c,C)}s[e]=B;y=B.length}if(n===j||y===0){if(D&&(!F.tearDown||F.tearDown.call(c)===false))o(c,e,u.handler);delete s[e]}}if(q.isEmptyObject(s)){u.handler.target=null;delete u.handler;delete u.events;g._removeData(c)}}});return a},_handle:function(a,e){for(var n=g.__getListeners(a,e.type).slice(0),t,w,c=0,u=n.length;c<u;++c){t=n[c];t=t.fn.call(t.scope,e,t.data);if(t!==j){if(w!==false)w=t;t===false&&e.halt()}if(e.isImmediatePropagationStopped)break}return w},
fire:function(a,e,n,t){if(!p("fire",a,e,n)){var w;b.query(a).each(function(c){var u=!c.isCustomEventTarget;n=n||{};n.type=e;if(u){var s=n,A;if(f(c)){u=new h(c);q.mix(u,s);if(t){u.stopPropagation();u.preventDefault()}s=u.target=c;var y="on"+e;do{var z=(g._data(s)||{}).handler;u.currentTarget=s;z&&z.call(s,u);if(s[y]&&s[y].call(s)===false){A=false;u.preventDefault()}s=s.parentNode||s.ownerDocument||s===c.ownerDocument&&window}while(s&&!u.isPropagationStopped);if(!u.isDefaultPrevented)if(!(e==="click"&&
c.nodeName.toLowerCase()=="a")){var x;try{if(y&&c[e]){if(x=c[y])c[y]=null;v=e;c[e]()}}catch(B){}if(x)c[y]=x;v=i}}c=A;if(c!==j)w=c}else if((c=g._data(c))&&q.isFunction(c.handler))w=c.handler(j,n)});return w}},_batchForType:p,_simpleAdd:d,_simpleRemove:o};g.on=g.add;g.detach=g.remove;return g},{requires:["dom","event/object"]});
KISSY.add("event/delegate",function(q,b,h){function j(d){return d.fn===undefined&&d.selector===undefined?true:d.fn===undefined?this.selector==d.selector:this.fn==d.fn&&this.selector==d.selector&&this.scope==d.scope}function p(d,o){var r=b.closest(d.target,[o.selector],this),v;if(r)for(var i=0;i<r.length;i++){d.currentTarget=r[i];var k=o.fn.call(o.scope||this,d);if(k===false||d.isPropagationStopped||d.isImmediatePropagationStopped){if(k===false)v=k;if(d.isPropagationStopped||d.isImmediatePropagationStopped)break}}return v}
function f(d,o){var r=d.target,v=d.relatedTarget;d.type=o.preType;if(r=b.closest(r,o.selector,this))if(r!==v&&(!v||!b.contains(r,v)))return o.fn.call(o.scope||this,d)}var l=h._batchForType,m={focus:{type:"focusin"},blur:{type:"focusout"},mouseenter:{type:"mouseover",handler:f},mouseleave:{type:"mouseout",handler:f}};q.mix(h,{delegate:function(d,o,r,v,i){if(l("delegate",d,o,r,v,i))return d;b.query(d).each(function(k){if(!k.isCustomEventTarget){var g=o,a=p;if(m[o]){o=m[g].type;a=m[g].handler||a}h.on(k,
o,a,k,{fn:v,selector:r,preType:g,scope:i,equals:j})}});return d},undelegate:function(d,o,r,v,i){if(l("undelegate",d,o,r,v,i))return d;b.query(d).each(function(k){if(!k.isCustomEventTarget){var g=o,a=p;if(m[o]){o=m[g].type;a=m[g].handler||a}h.remove(k,o,a,k,{fn:v,selector:r,preType:g,scope:i,equals:j})}});return d}});return h},{requires:["dom","./base"]});
KISSY.add("event/focusin",function(q,b,h){b.ie||q.each([{name:"focusin",fix:"focus"},{name:"focusout",fix:"blur"}],function(j){function p(l){return h.fire(l.target,j.name)}var f=0;h.special[j.name]={setup:function(){f++===0&&document.addEventListener(j.fix,p,true)},tearDown:function(){--f===0&&document.removeEventListener(j.fix,p,true)}}});return h},{requires:["ua","./base"]});
KISSY.add("event/hashchange",function(q,b,h,j){j=f||j.ie;if(!("onhashchange"in window)||j<8){var p=window,f=document.documentMode,l=function(){return"#"+location.href.replace(/^[^#]*#?(.*)$/,"$1")},m,d=l(),o=function(){var g=l();if(g!==d){r(g);d=g}m=setTimeout(o,50)},r=j<8?function(g){g="<html><body>"+g+"</body></html>";var a=k.contentWindow.document;try{a.open();a.write(g);a.close();return true}catch(e){return false}}:function(){b.fire(p,"hashchange")},v=function(){m||o()},i=function(){m&&clearTimeout(m);
m=null},k;if(j<8){v=function(){if(!k){k=h.create('<iframe style="display: none" height="0" width="0" tabindex="-1" title="empty"/>');h.prepend(k,document.documentElement);b.add(k,"load",function(){b.remove(k,"load");r(l());b.add(k,"load",g);o()});var g=function(){var a=q.trim(k.contentWindow.document.body.innerHTML),e=l();if(a!=e)d=location.hash=a;b.fire(p,"hashchange")}}};i=function(){m&&clearTimeout(m);m=null;b.detach(k);h.remove(k);k=null}}b.special.hashchange={setup:function(){this===p&&v()},
tearDown:function(){this===p&&i()}}}},{requires:["./base","dom","ua"]});
KISSY.add("event/mouseenter",function(q,b,h,j){j.ie||q.each([{name:"mouseenter",fix:"mouseover"},{name:"mouseleave",fix:"mouseout"}],function(p){function f(l){var m=l.relatedTarget;l.type=p.name;try{if(!(m&&m!==document&&!m.parentNode))if(m!==this&&(!m||!h.contains(this,m)))b._handle(this,l)}catch(d){}}b.special[p.name]={setup:function(){b.add(this,p.fix,f)},tearDown:function(){b.remove(this,p.fix,f)}}});return b},{requires:["./base","dom","ua"]});
KISSY.add("event/object",function(q,b){function h(f,l,m){this.currentTarget=f;this.originalEvent=l||{};if(l){this.type=l.type;this._fix()}else{this.type=m;this.target=f}this.currentTarget=f;this.fixed=true}var j=document,p="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" ");
q.augment(h,{_fix:function(){var f=this.originalEvent,l=p.length,m,d=this.currentTarget;for(d=d.nodeType===9?d:d.ownerDocument||j;l;){m=p[--l];this[m]=f[m]}if(!this.target)this.target=this.srcElement||j;if(this.target.nodeType===3)this.target=this.target.parentNode;if(!this.relatedTarget&&this.fromElement)this.relatedTarget=this.fromElement===this.target?this.toElement:this.fromElement;if(this.pageX===b&&this.clientX!==b){f=d.documentElement;l=d.body;this.pageX=this.clientX+(f&&f.scrollLeft||l&&l.scrollLeft||
0)-(f&&f.clientLeft||l&&l.clientLeft||0);this.pageY=this.clientY+(f&&f.scrollTop||l&&l.scrollTop||0)-(f&&f.clientTop||l&&l.clientTop||0)}if(this.which===b)this.which=this.charCode!==b?this.charCode:this.keyCode;if(this.metaKey===b)this.metaKey=this.ctrlKey;if(!this.which&&this.button!==b)this.which=this.button&1?1:this.button&2?3:this.button&4?2:0},preventDefault:function(){var f=this.originalEvent;if(f.preventDefault)f.preventDefault();else f.returnValue=false;this.isDefaultPrevented=true},stopPropagation:function(){var f=
this.originalEvent;if(f.stopPropagation)f.stopPropagation();else f.cancelBubble=true;this.isPropagationStopped=true},stopImmediatePropagation:function(){var f=this.originalEvent;f.stopImmediatePropagation?f.stopImmediatePropagation():this.stopPropagation();this.isImmediatePropagationStopped=true},halt:function(f){f?this.stopImmediatePropagation():this.stopPropagation();this.preventDefault()}});return h});
KISSY.add("event/target",function(q,b){return{isCustomEventTarget:true,fire:function(h,j){return b.fire(this,h,j)},on:function(h,j,p){b.add(this,h,j,p);return this},detach:function(h,j,p){b.remove(this,h,j,p);return this}}},{requires:["./base"]});
KISSY.add("event/valuechange",function(q,b,h){function j(i){h.removeData(i,o);if(h.hasData(i,r)){var k=h.data(i,r);clearTimeout(k);h.removeData(i,r)}}function p(i){j(i.target)}function f(i){h.hasData(i,r)||h.data(i,r,setTimeout(function(){var k=i.value,g=h.data(i,o);if(k!==g){b.fire(i,d,{prevVal:g,newVal:k},true);h.data(i,o,k)}h.data(i,r,setTimeout(arguments.callee,v))},v))}function l(i){var k=i.target;i.type=="focus"&&h.data(k,o,k.value);f(k)}function m(i){j(i);b.remove(i,"blur",p);b.remove(i,"mousedown keyup keydown focus",
l)}var d="valuechange",o="event/valuechange/history",r="event/valuechange/poll",v=50;b.special[d]={setup:function(){var i=this.nodeName.toLowerCase();if("input"==i||"textarea"==i){m(this);b.on(this,"blur",p);b.on(this,"mousedown keyup keydown focus",l)}},tearDown:function(){m(this)}};return b},{requires:["./base","dom"]});
KISSY.add("event",function(q,b,h,j){b.Target=h;b.Object=j;return b},{requires:["event/base","event/target","event/object","event/focusin","event/hashchange","event/valuechange","event/delegate","event/mouseenter"]});