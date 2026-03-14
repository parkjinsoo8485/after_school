import { getCourses } from './db-service.js';
import { auth, db } from './firebase.js';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

/**
 * Renders the course list with the new Blue Portal Design.
 * Includes search filtering via URL parameters.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const courseGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.xl\\:grid-cols-3');
    if (!courseGrid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search')?.toLowerCase() || '';

    try {
        console.log("Fetching courses from Firestore...");
        let courses = await getCourses();
        
        // Filter by search query if it exists
        if (searchQuery) {
            courses = courses.filter(c => 
                c.title.toLowerCase().includes(searchQuery) || 
                c.description.toLowerCase().includes(searchQuery) ||
                c.category?.toLowerCase().includes(searchQuery)
            );
        }

        if (courses.length > 0) {
            courseGrid.innerHTML = ''; // Clear placeholders
            
            courses.forEach(course => {
                const card = document.createElement('div');
                card.className = 'bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col';
                card.innerHTML = `
                    <div class="h-40 bg-slate-200 dark:bg-slate-800 relative">
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-900/20"></div>
                        <img alt="${course.title}" class="w-full h-full object-cover opacity-90" src="${course.imageUrl || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500'}">
                        <div class="absolute top-3 left-3 bg-[#137fec] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">${course.category || '일반'}</div>
                    </div>
                    <div class="p-5 flex flex-col flex-1">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="text-lg font-bold text-slate-900 dark:text-white leading-snug">${course.title}</h4>
                            <span class="px-2 py-1 ${course.status === 'active' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'} rounded-full text-[11px] font-bold">${course.status === 'active' ? '모집 중' : '마감'}</span>
                        </div>
                        <p class="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">${course.description}</p>
                        <div class="mt-auto flex flex-col gap-2">
                            <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <span class="material-symbols-outlined text-base text-[#137fec]">calendar_month</span>
                                <span class="text-xs font-medium">${course.schedule || '시간 미확정'}</span>
                            </div>
                            <button data-course-id="${course.id}" class="enroll-btn mt-4 w-full bg-[#137fec] text-white py-2.5 rounded-full font-bold text-sm hover:bg-blue-600 transition-all flex items-center justify-center gap-2" onclick="location.href='/src/course-detail.html?id=${course.id}'">
                                <span class="material-symbols-outlined text-sm">visibility</span>
                                상세보기
                            </button>
                        </div>
                    </div>
                `;
                courseGrid.appendChild(card);
            });
        } else {
             courseGrid.innerHTML = `
                <div class="col-span-full py-20 flex flex-col items-center text-slate-400">
                    <span class="material-symbols-outlined text-6xl mb-4">search_off</span>
                    <p class="text-lg font-medium">검색 결과가 없습니다.</p>
                </div>
             `;
        }
    } catch (error) {
        console.error("Error loading courses:", error);
    }
});
