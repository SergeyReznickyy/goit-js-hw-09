!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=document.querySelector("body"),n=null;function d(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"));a.style.backgroundColor=t}t.addEventListener("click",(function(){n=setInterval(d,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.9b1d9748.js.map