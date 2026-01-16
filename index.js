document.addEventListener('DOMContentLoaded', function () {
    let nextWeight = generateRandomWeight();

    const nextWeightElement = document.getElementById('next-weight');
    const indicatorText = document.getElementById('indicator-text');
    const container = document.getElementById('seesaw-container');
    const indicator = document.getElementById('weight-indicator');
    const plank = document.querySelector('.seesaw-plank');

    updateNextWeightUI();

    if (plank && container && indicator) {
        container.addEventListener('mousemove', function (e) {
            const plankRect = plank.getBoundingClientRect();

            const isWithinBounds =
                e.clientX >= plankRect.left &&
                e.clientX <= plankRect.right &&
                e.clientY >= plankRect.top - 50 &&
                e.clientY <= plankRect.bottom + 50;

            if (isWithinBounds) {
                indicator.style.display = 'flex';

                const containerRect = container.getBoundingClientRect();
                const x = e.clientX - containerRect.left;
                const y = e.clientY - containerRect.top;

                indicator.style.left = x + 'px';
                indicator.style.top = y + 'px';

                if (indicatorText) indicatorText.textContent = nextWeight + 'kg';
            } else {
                indicator.style.display = 'none';
            }
        });

        container.addEventListener('mouseleave', function () {
            indicator.style.display = 'none';
        });

        plank.addEventListener('click', function (e) {
            e.stopPropagation();

            const plankRect = plank.getBoundingClientRect();
            const clickX = e.clientX;

            const plankCenter = plankRect.left + plankRect.width / 2;
            const distPx = clickX - plankCenter;

            addWeight(nextWeight, distPx);

            nextWeight = generateRandomWeight();
            updateNextWeightUI();
        });
    }

    function generateRandomWeight() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function updateNextWeightUI() {
        if (nextWeightElement) nextWeightElement.textContent = nextWeight + ' kg';
        if (indicatorText) {
            indicatorText.textContent = nextWeight + 'kg';
            const size = 40 + (nextWeight * 2);
            indicatorText.style.width = size + 'px';
            indicatorText.style.height = size + 'px';
        }
    }

    function addWeight(weight, distFromCenter) {
        const weightElem = document.createElement('div');
        weightElem.className = 'placed-weight';
        weightElem.textContent = weight + 'kg';

        const size = 30 + (weight * 2);
        weightElem.style.width = size + 'px';
        weightElem.style.height = size + 'px';

        const centerOffset = 200;
        const leftPos = centerOffset + distFromCenter;

        weightElem.style.left = leftPos + 'px';

        plank.appendChild(weightElem);
    }
});
