/**
 * Unified Search Logic for the After-school Portal
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('input[placeholder*="강좌 검색"]');
    
    searchInputs.forEach(input => {
        // Handle 'Enter' key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = input.value.trim();
                if (query) {
                    window.location.href = `/src/courses.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
        
        // Find existing search button next to input if any
        const searchBtn = input.parentElement.querySelector('button');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = input.value.trim();
                if (query) {
                    window.location.href = `/src/courses.html?search=${encodeURIComponent(query)}`;
                }
            });
        }
    });

    // If on courses page, handle the URL search param
    if (window.location.pathname.includes('courses.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery) {
            // Fill the search input on the page
            const mainSearch = document.querySelector('main input[placeholder*="입력하세요"]');
            if (mainSearch) {
                mainSearch.value = searchQuery;
            }
            // Logic to filter the rendered courses could be added here or in render-courses.js
        }
    }
});
