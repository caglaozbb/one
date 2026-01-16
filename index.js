
document.addEventListener('DOMContentLoaded', function () {
    let nextWeight = generateRandomWeight();
    let totalLeftWeight = 0;
    let totalRightWeight = 0;

    const nextWeightElement = document.getElementById('next-weight');
    const leftWeightDisplay = document.getElementById('left-weight-display');
    const rightWeightDisplay = document.getElementById('right-weight-display');
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

    const weightColors = {
        1: '#FFB3BA',
        2: '#FFDFBA',
        3: '#FFFFBA',
        4: '#BAFFC9',
        5: '#BAE1FF',
        6: '#A0CED9',
        7: '#ADF7B6',
        8: '#FFEE93',
        9: '#FFC09F',
        10: '#FF9AA2'
    };

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
        weightElem.style.backgroundColor = weightColors[weight];

        const centerOffset = 200;
        const leftPos = centerOffset + distFromCenter;

        weightElem.style.left = leftPos + 'px';

        plank.appendChild(weightElem);

        if (distFromCenter < 0) {
            totalLeftWeight += weight;
            if (leftWeightDisplay) leftWeightDisplay.textContent = totalLeftWeight + ' kg';
        } else {
            totalRightWeight += weight;
            if (rightWeightDisplay) rightWeightDisplay.textContent = totalRightWeight + ' kg';
        }
    }
});
