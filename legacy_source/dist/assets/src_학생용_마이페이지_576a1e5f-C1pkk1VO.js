import{a as u,d as f}from"./global-auth-BbaQ_MtY.js";import{onAuthStateChanged as v,signOut as w}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";import{query as k,collection as $,where as E,getDocs as S}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";document.addEventListener("DOMContentLoaded",()=>{v(u,async l=>{var o;if(!l){window.location.href="/src/login.html";return}const g=l.displayName||((o=l.email)==null?void 0:o.split("@")[0])||"학생";document.querySelectorAll(".user-display-name").forEach(e=>{e.textContent=g+" 학생"});const r=document.getElementById("enrollment-list");if(r)try{const e=k($(f,"enrollments"),E("userId","==",l.uid)),n=await S(e);if(n.empty)r.innerHTML=`
              <div class="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
                <span class="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">inbox</span>
                <p class="text-sm text-slate-500 font-medium">아직 신청한 강좌가 없습니다.</p>
                <a href="/src/after_school_course_enrollment_list_34b717b7.html" class="inline-block mt-4 text-xs font-bold text-primary hover:underline">강좌 둘러보기 &rarr;</a>
              </div>
            `;else{let d="";n.forEach(h=>{var b;const t=h.data(),s=(b=t.appliedAt)==null?void 0:b.toDate(),y=s?`${s.getFullYear()}.${String(s.getMonth()+1).padStart(2,"0")}.${String(s.getDate()).padStart(2,"0")}`:"최근";let i="bg-primary/10 text-primary",c="신청 완료",m="school",p="text-primary",x="bg-blue-50 dark:bg-blue-900/20";t.status==="pending"&&(i="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",c="승인 대기",m="pending_actions",p="text-yellow-600",x="bg-yellow-50 dark:bg-yellow-900/20"),d+=`
                <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer" onclick="location.href='/src/course-detail.html?id=${t.courseId}'">
                  <div class="size-16 rounded-lg ${x} flex items-center justify-center ${p}">
                    <span class="material-symbols-outlined text-3xl">${m}</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="px-2 py-0.5 rounded ${i} text-[10px] font-bold">${c}</span>
                      <h5 class="font-bold text-sm">${t.courseTitle}</h5>
                    </div>
                    <p class="text-xs text-slate-500">${t.courseSchedule||""} | ${t.courseLocation||""}</p>
                    <p class="text-[10px] text-slate-400 mt-1">신청일: ${y}</p>
                  </div>
                  <button class="material-symbols-outlined text-slate-400 hover:text-primary">chevron_right</button>
                </div>
              `}),r.innerHTML=d}}catch(e){console.error("Enrollments fetch error:",e),r.innerHTML=`
            <div class="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-900/30">
              <span class="material-symbols-outlined text-4xl text-red-400 mb-2">error</span>
              <p class="text-sm text-red-600 font-medium">데이터를 불러오는 중 오류가 발생했습니다.</p>
            </div>
          `}});const a=document.getElementById("mypage-logout-btn");a&&a.addEventListener("click",async()=>{await w(u),window.location.href="/index.html"})});
