!function(){function e(){var e=this.$$;this.commands=indexDB||[],this.elm_query=e("query"),this.elm_btn=e("search_btn"),this.elm_result=e("result"),this.elm_search_result=e("search_list_result"),this.root_path=function(){var t=e("current_path");window.location.origin||(window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:""));var n=window.location.origin+window.location.pathname;if(t){var r=t.value;r=r.replace(/\\/g,"/"),r=encodeURI(r),console.log(r);return n.replace(r,"").replace(/\/$/,"")}return""}(),this.query="",this.query_size=5,this.page_size=50,this.init()}e.prototype={$$:function(e){return document.getElementById(e)},bindEvent:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},isSreachIndexOF:function(e,t){var n=!1;if(e&&"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<e.length;r++)e[r].toLowerCase()===t.toLowerCase()&&(n=!0);return n}return!(!e||!t)&&e.toLowerCase().indexOf(t.toLowerCase())>-1},getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=decodeURIComponent(window.location.hash.replace(/^(\#\!|\#)/,"")).match(t);return null!=n?unescape(n[2]):null},pushState:function(){window.history&&window.history.pushState&&(this.query?history.pushState({},"indexDB","#!kw="+this.query):history.pushState({},"indexDB",window.location.pathname))},simple:function(e,t){return e.replace(/\$\w+\$/gi,function(e){var n=t[e.replace(/\$/g,"")];return void 0===n?"":n})},createKeyworldsHTML:function(e,t,n){console.log(e);var r=e.name,i=e.desc,o=new RegExp("("+t+")","ig"),s="";t&&(r=e.name.replace(o,'<i class="kw">$1</i>'),i=e.desc.replace(o,'<i class="kw">$1</i>')||"");var l=this.root_path.replace(/\/$/,"");return console.log("config.out="+config.out),s=n?'<a href="'+l+'/$out$$url$.html"><strong>$name$</strong> - $des$</a><p></p>':'<a href="'+l+'/$out$$url$.html"><strong>$name$</strong> - $des$</a>',console.log(e.pash),this.simple(s,{name:r,url:config.pash&&e.pash?"/"+e.pash:e.path,des:i,out:config.out})},searchResult:function(e){var t=this.commands,n=this,r=0,i=t.length,o=[],s=e?this.page_size:this.query_size;if(t&&t.length&&Object.prototype.toString.call(t).indexOf("Array")>-1)for(var l=0;r<i&&t[r];r++)(n.isSreachIndexOF(t[r].name,n.query)||n.isSreachIndexOF(t[r].desc,n.query))&&l<s&&(o.push(n.createKeyworldsHTML(t[r],n.query,e)),++l);var a=e?this.elm_search_result:this.elm_result;a.innerHTML="";for(var r=0;r<o.length;r++){var u=document.createElement("LI");u.innerHTML=o[r],a.appendChild(u)}if(0===o.length){var u=document.createElement("LI");u.innerHTML=(this.query,"请尝试输入一些字符，进行搜索！</span>"),a.appendChild(u)}},init:function(){var e=this,t=e.getQueryString("kw");t=t&&t.length>0?t:"";var n=null;this.elm_query.value=t,this.query=t||"",this.elm_search_result&&e.searchResult(!0),this.bindEvent(this.elm_query,"input",function(t){e.query=t.target.value,e.pushState(),e.query?e.searchResult():e.elm_result.style.display="none",e.elm_search_result?e.elm_btn.click():e.elm_result.style.display=e.query?"block":"none"}),this.bindEvent(this.elm_btn,"click",function(t){e.elm_result.style.display="none",e.elm_search_result?e.searchResult(!0):window.location.href=e.root_path+"/list.html#!kw="+e.query}),this.bindEvent(this.elm_query,"focus",function(t){e.searchResult(),e.query&&(e.elm_result.style.display="block")}),this.bindEvent(this.elm_query,"blur",function(t){n=setTimeout(function(){e.elm_result.style.display="none"},300)}),this.bindEvent(document,"keyup",function(t){"Enter"==t.key&&e.elm_btn.click()}),t&&e.searchResult()}},new e}();