import{a as g,S,i as c}from"./assets/vendor-09d7c26e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const b="https://pixabay.com/api/",v="43803068-e4e7e851cef47a5cf0e066a7d",p=15;g.defaults.baseURL=b;const y=async(o="flower",e=1)=>(await g.get("",{params:{key:v,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,q:o,page:e}})).data,f=o=>o.map(({largeImageURL:e,webformatURL:r,tags:a,likes:t,views:s,comments:n,downloads:P})=>`<li class="gallery-item">
      <a class="gallery-link" href="${e}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${a}"
        />
      </a>
      <ul class="item-gallery-data">
		<li class="item-info">
			<h2 class="item-gallery-title">Likes</h2>
			<p class="item-gallery-result">${t}</p>
		</li>
		<li class="item-info">
			<h2 class="item-gallery-title">Views</h2>
			<p class="item-gallery-result">${s}</p>
		</li>
		<li class="item-info">
			<h2 class="item-gallery-title">Comments</h2>
			<p class="item-gallery-result">${n}</p>
		</li>
		<li class="item-info">
			<h2 class="item-gallery-title">Downloads</h2>
			<p class="item-gallery-result">${P}</p>
		</li>
	</ul>
    </li>`).join(""),h=document.querySelector(".gallery"),E=document.querySelector(".myForm"),i=document.querySelector(".loader"),d=document.querySelector(".js-load-more-btn"),L=new S(".gallery a",{captionsData:"alt",captionDelay:250});let m=null,l=1,u=0;const q=async o=>{o.preventDefault(),h.innerHTML="",d.classList.add("d-none");const e=o.currentTarget;if(m=e.elements.textInput.value.trim(),m===""){c.error({class:"error",message:"Please put your request!",position:"topRight",timeout:2e3}),e.reset();return}l=1;try{i.classList.remove("is-hidden");const{hits:r,totalHits:a}=await y(m,l);if(a===0){c.error({class:"error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3}),e.reset(),i.classList.add("is-hidden");return}h.insertAdjacentHTML("beforeend",f(r)),L.refresh(),i.classList.add("is-hidden"),u=Math.ceil(a/p),u>1&&d.classList.remove("d-none")}catch{i.classList.add("is-hidden"),c.error({class:"error",message:"Search params is not valid!",position:"topRight",timeout:2e3}),e.reset();return}e.reset()};E.addEventListener("submit",q);const w=()=>{const r=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:r,left:0,behavior:"smooth"})},R=async o=>{try{l+=1,console.log(l);const{hits:e,totalHits:r}=await y(m,l);if(h.insertAdjacentHTML("beforeend",f(e)),L.refresh(),w(),i.classList.add("is-hidden"),u=Math.ceil(r/p),l<u)d.classList.remove("d-none");else{d.classList.add("d-none"),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3});return}}catch{i.classList.add("is-hidden"),c.error({message:"Search params is not valid!",position:"topRight",timeout:2e3}),form.reset();return}};d.addEventListener("click",R);
//# sourceMappingURL=commonHelpers.js.map
