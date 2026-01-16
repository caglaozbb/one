document.addEventListener('DOMContentLoaded', function () {
    const nextWeight = Math.floor(Math.random() * 10) + 1;

    const nextWeightElement = document.getElementById('next-weight');
    const indicatorText = document.getElementById('indicator-text');

    if (nextWeightElement) {
        nextWeightElement.textContent = nextWeight + ' kg';
    }

    if (indicatorText) {
        indicatorText.textContent = nextWeight + 'kg';
    }

    const container = document.getElementById('seesaw-container');
    const indicator = document.getElementById('weight-indicator');
    const plank = document.querySelector('.seesaw-plank');
    const contentArea = document.querySelector('.content-area');

    if (container && indicator && contentArea && plank) {
        contentArea.addEventListener('mousemove', function (e) {
            const containerRect = container.getBoundingClientRect();
            const plankRect = plank.getBoundingClientRect();


            let clientX = e.clientX;
            if (clientX < plankRect.left) clientX = plankRect.left;
            if (clientX > plankRect.right) clientX = plankRect.right;


            const x = clientX - containerRect.left;


            const y = plankRect.top - containerRect.top;

            indicator.style.display = 'flex';
            indicator.style.left = x + 'px';
            indicator.style.top = y + 'px';
        });

        contentArea.addEventListener('mouseleave', function () {
            indicator.style.display = 'none';
        });

        contentArea.addEventListener('mouseenter', function () {
            indicator.style.display = 'flex';
        });
    }
});
