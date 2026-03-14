import{g as r,c as l,d}from"./global-auth-BbaQ_MtY.js";const n=async()=>(await r(l(d,"courses"))).docs.map(t=>({id:t.id,...t.data()}));document.addEventListener("DOMContentLoaded",async()=>{const a=document.querySelector(".grid.grid-cols-1.md\\:grid-cols-2.xl\\:grid-cols-3");if(a)try{console.log("Fetching courses from Firestore...");const t=await n();t.length>0&&(a.innerHTML="",t.forEach(e=>{const s=document.createElement("div");s.className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col",s.innerHTML=`
                    <div class="h-40 bg-slate-200 dark:bg-slate-800 relative">
                        <div class="absolute inset-0 bg-gradient-to-br from-[var(--brand-green)]/20 to-[var(--brand-green-dark)]/40"></div>
                        <img alt="${e.title}" class="w-full h-full object-cover opacity-90" src="${e.imageUrl||"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500"}">
                        <div class="absolute top-3 left-3 bg-[var(--brand-green)] text-[var(--brand-gold)] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">${e.category||"일반"}</div>
                    </div>
                    <div class="p-5 flex flex-col flex-1">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="text-lg font-bold text-slate-900 dark:text-white leading-snug">${e.title}</h4>
                            <span class="px-2 py-1 ${e.status==="active"?"bg-green-100 text-green-800":"bg-red-100 text-red-800"} rounded text-xs font-bold">${e.status==="active"?"모집 중":"마감"}</span>
                        </div>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">${e.description}</p>
                        <div class="mt-auto flex flex-col gap-2">
                            <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span class="material-symbols-outlined text-base text-[var(--brand-green)]">calendar_month</span>
                                <span class="text-xs font-medium">${e.schedule||"시간 미확정"}</span>
                            </div>
                            <button data-course-id="${e.id}" class="enroll-btn mt-4 w-full bg-[var(--brand-green)] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[var(--brand-green-dark)] transition-all flex items-center justify-center gap-2" onclick="location.href='/src/course-detail.html?id=${e.id}'">
                                <span class="material-symbols-outlined text-sm">edit_calendar</span>
                                상세보기 / 신청하기
                            </button>
                        </div>
                    </div>
                `,a.appendChild(s)}))}catch(t){console.error("Error loading courses:",t)}});
