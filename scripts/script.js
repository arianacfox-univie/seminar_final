document.addEventListener('DOMContentLoaded', () => {


    // // Function to handle scroll events
    // function handleScroll() {
    //     const steps = document.querySelectorAll('.step');
    //     const scrollY = window.scrollY;
    //     const progressBar = document.getElementById('progress-bar');
    //     const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    //     const scrollFraction = scrollY / scrollHeight;
    //     const progressPercent = Math.min(scrollFraction * 100, 100);

    //     progressBar.style.width = `${progressPercent}%`;

    //     steps.forEach((step, index) => {
    //         const rect = step.getBoundingClientRect();
    //         if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    //             updateVisualization(index + 1);
    //         }
    //     });
    // }

    

    // document.addEventListener('scroll', handleScroll);

    // function createTimeline() {
    //     const steps = document.querySelectorAll('.step');
    //     const progressContainer = document.querySelector('.progress-container');
    //     const totalSteps = steps.length;
    //     const ticks = 8;

    //     for (let i = 0; i < ticks; i++) {
    //         const stepIndex = Math.floor(i * totalSteps / ticks);
    //         const step = steps[stepIndex];
    //         const date = step.querySelector('.date').textContent;

    //         const tickMark = document.createElement('div');
    //         tickMark.className = 'tick-mark';
    //         const tickLabel = document.createElement('div');
    //         tickLabel.className = 'tick-label';
    //         tickLabel.textContent = date;

    //         // Calculate the position of the tick mark
    //         const stepPosition = i / (ticks - 1);
    //         tickMark.style.left = `${stepPosition * 100}%`;
    //         tickLabel.style.left = `${stepPosition * 100}%`;

    //         progressContainer.appendChild(tickMark);
    //         progressContainer.appendChild(tickLabel);
    //     }
    // }


    // createTimeline();
// 
    // console.log('Script loaded and DOM fully loaded');


    const pages = [
        { startDate: new Date('1804-05-14'), endDate: new Date('1804-07-17') },
        { startDate: new Date('1804-07-18'), endDate: new Date('1804-08-20') },
        { startDate: new Date('1804-08-21'), endDate: new Date('1804-09-07') },
        { startDate: new Date('1804-09-08'), endDate: new Date('1804-11-01') },
        { startDate: new Date('1804-11-02'), endDate: new Date('1805-04-03') },
        { startDate: new Date('1805-04-04'), endDate: new Date('1805-06-04') },
        { startDate: new Date('1805-06-05'), endDate: new Date('1805-07-14') },
        { startDate: new Date('1805-07-15'), endDate: new Date('1805-08-18') },
        { startDate: new Date('1805-08-19'), endDate: new Date('1805-09-08') },
        { startDate: new Date('1805-09-09'), endDate: new Date('1805-09-30') },
        { startDate: new Date('1805-10-01'), endDate: new Date('1805-10-16') },
        { startDate: new Date('1805-10-17'), endDate: new Date('1805-11-30') },
        { startDate: new Date('1805-12-01'), endDate: new Date('1806-03-18') },
        { startDate: new Date('1806-03-19'), endDate: new Date('1806-06-08') },
        { startDate: new Date('1806-06-09'), endDate: new Date('1806-07-07') },
        { startDate: new Date('1806-07-08'), endDate: new Date('1806-08-13') },
        { startDate: new Date('1806-08-14'), endDate: new Date('1806-09-23') }
    ];

    const totalStartDate = pages[0].startDate.getTime();
    const totalEndDate = pages[pages.length - 1].endDate.getTime();

    function handleScroll() {
        // console.log('Scroll event detected');
        const currentPageIndex = getCurrentPageIndex();
        if (currentPageIndex < 0 || currentPageIndex >= pages.length) return;

        const currentPage = pages[currentPageIndex];
        const currentStartDate = currentPage.startDate.getTime();
        const currentEndDate = currentPage.endDate.getTime();

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        const scrollFraction = scrollTop / docHeight;
        const currentScrollDate = currentStartDate + (currentEndDate - currentStartDate) * scrollFraction;
        const progressFraction = (currentScrollDate - totalStartDate) / (totalEndDate - totalStartDate);
        const progressPercent = Math.min(progressFraction * 100, 100);

        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${progressPercent}%`;
    }
    function getCurrentPageIndex() {
        const currentPageUrl = window.location.pathname;
        const match = currentPageUrl.match(/scrollytelling(\d+)/);
        // console.log(match);
        if (match) {
            let currentPageNumber = parseInt(match[1]) - 1;
            // Handle the special case for scrollytelling17.html
            if (currentPageNumber === 16) {
                currentPageNumber = 15; // Map scrollytelling17.html to the index of scrollytelling16.html
            }
            if (currentPageNumber === 17){
                currentPageNumber = 16;
            }
            return currentPageNumber;
        }
        return -1;
    }

    function createTimeline() {
        const progressContainer = document.querySelector('.progress-container');
        const ticks = 8;

        // for (let i = 0; i < ticks; i++) {
        //     const pageIndex = Math.floor(i * pages.length / ticks);
        //     const page = pages[pageIndex];
        //     const date = page.startDate.toDateString();

        //     const tickMark = document.createElement('div');
        //     tickMark.className = 'tick-mark';
        //     const tickLabel = document.createElement('div');
        //     tickLabel.className = 'tick-label';
        //     tickLabel.textContent = date;

        //     const tickPosition = i / (ticks - 1);
        //     tickMark.style.left = `${tickPosition * 100}%`;
        //     tickLabel.style.left = `${tickPosition * 100}%`;

        //     progressContainer.appendChild(tickMark);
        //     progressContainer.appendChild(tickLabel);
        // }
        const totalDuration = totalEndDate - totalStartDate;

        for (let i = 0; i < ticks; i++) {
            const tickTime = totalStartDate + (i / (ticks - 1)) * totalDuration;
            const date = new Date(tickTime).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });

            const tickMark = document.createElement('div');
            tickMark.className = 'tick-mark';
            const tickLabel = document.createElement('div');
            tickLabel.className = 'tick-label';
            tickLabel.textContent = date;

            const tickPosition = i / (ticks - 1);
            tickMark.style.left = `${tickPosition * 100}%`;
            tickLabel.style.left = `${tickPosition * 100}%`;

            progressContainer.appendChild(tickMark);
            progressContainer.appendChild(tickLabel);
        }
    }

    document.addEventListener('scroll', handleScroll);
    createTimeline();
    handleScroll(); // Initialize the progress bar on load














    // const pages = [
    //     { startDate: new Date('1804-05-14'), endDate: new Date('1804-07-17') },
    //     { startDate: new Date('1804-07-18'), endDate: new Date('1804-08-20') },
    //     { startDate: new Date('1804-08-21'), endDate: new Date('1804-09-07') },
    //     { startDate: new Date('1804-09-08'), endDate: new Date('1804-11-01') },
    //     { startDate: new Date('1804-11-02'), endDate: new Date('1805-04-03') },
    //     { startDate: new Date('1805-04-04'), endDate: new Date('1805-06-04') },
    //     { startDate: new Date('1805-06-05'), endDate: new Date('1805-07-14') },
    //     { startDate: new Date('1805-07-15'), endDate: new Date('1805-08-18') },
    //     { startDate: new Date('1805-08-19'), endDate: new Date('1805-09-08') },
    //     { startDate: new Date('1805-09-09'), endDate: new Date('1805-09-30') },
    //     { startDate: new Date('1805-10-01'), endDate: new Date('1805-10-16') },
    //     { startDate: new Date('1805-10-17'), endDate: new Date('1805-11-30') },
    //     { startDate: new Date('1805-12-01'), endDate: new Date('1806-03-18') },
    //     { startDate: new Date('1806-03-19'), endDate: new Date('1806-06-08') },
    //     { startDate: new Date('1806-06-09'), endDate: new Date('1806-07-07') },
    //     { startDate: new Date('1806-07-08'), endDate: new Date('1806-08-13') },
    //     { startDate: new Date('1806-08-14'), endDate: new Date('1806-09-22') }
    // ];

    // function updateTimeline() {
    //     const currentPageIndex = getCurrentPageIndex();
    //     if (currentPageIndex < 0 || currentPageIndex >= pages.length) return;

    //     const scrollTop = window.scrollY;
    //     const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    //     const scrollFraction = scrollTop / docHeight;
    //     const progressPercent = scrollFraction * 100;

    //     const progressBar = document.getElementById('progress-bar');
    //     progressBar.style.width = `${progressPercent}%`;
    // }

    // // Function to get the index of the current page based on the scroll position
    // function getCurrentPageIndex() {
    //     const currentPageUrl = window.location.pathname;
    //     const match = currentPageUrl.match(/\d+/);
    //     if (match) {
    //         const currentPageNumber = parseInt(match[0]) - 1;
    //         return currentPageNumber;
    //     }
    //     return -1;
    // }


    // // Event listener for scroll events
    // document.addEventListener('scroll', updateTimeline);

    // // Update timeline when the page loads
    // updateTimeline();
});
    

document.addEventListener('DOMContentLoaded', () => {
        const width = 800;
        const height = 400;
    
    function openPopup(popupId) {
        document.getElementById(popupId).style.display = 'block';
    }
    
    function closePopup(popupId) {
        document.getElementById(popupId).style.display = 'none';
    }

    window.openPopup = openPopup;
    window.closePopup = closePopup;
    
    // Optional: Close the popup if the user clicks outside of the popup content
    window.onclick = function(event) {
        const popups = document.getElementsByClassName('popup');
        for (let i = 0; i < popups.length; i++) {
            if (event.target == popups[i]) {
                popups[i].style.display = 'none';
            }
        }
    }

    
});


document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const hoverArea = document.querySelector('.hover-area');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.style.top = '-120px'; // Adjust the value to the height of your header
        } else {
            header.style.top = '0';
        }
        lastScrollTop = scrollTop;
    });

    hoverArea.addEventListener('mouseenter', function() {
        header.style.top = '0';
    });

    hoverArea.addEventListener('mouseleave', function() {
        if (window.pageYOffset > 0) {
            header.style.top = '-120px';
        }
    });
});