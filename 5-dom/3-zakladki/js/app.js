document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetContent = document.getElementById(targetId);
            const clickedListItem = this.closest('.tab-el');

            document.querySelector('.tab-el-active')?.classList.remove('tab-el-active');
            
            if (clickedListItem) {
                clickedListItem.classList.add('tab-el-active');
            }

            document.querySelector('.tab-content-active')?.classList.remove('tab-content-active');
            
            if (targetContent) {
                targetContent.classList.add('tab-content-active');
            }
        });
    });
});