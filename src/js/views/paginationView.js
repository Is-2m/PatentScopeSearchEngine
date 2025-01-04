class PaginationView {
    static update(currentPage, totalPages) {
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';

        if (totalPages <= 1) return;

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.onclick = () => App.searchPatents(currentPage - 1);

        // Page info
        const pageInfo = document.createElement('span');
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        pageInfo.style.margin = '0 10px';

        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.onclick = () => App.searchPatents(currentPage + 1);

        paginationDiv.appendChild(prevButton);
        paginationDiv.appendChild(pageInfo);
        paginationDiv.appendChild(nextButton);
    }
}