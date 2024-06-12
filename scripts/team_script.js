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