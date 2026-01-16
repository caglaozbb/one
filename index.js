
document.addEventListener('DOMContentLoaded', function () {
    const weightColors = {
        1: '#FF3D68',
        2: '#FF8800',
        3: '#FFD700',
        4: '#2ECC71',
        5: '#3498DB',
        6: '#00BEC4',
        7: '#9B59B6',
        8: '#F1C40F',
        9: '#E67E22',
        10: '#E74C3C'
    };


    let nextWeight = generateRandomWeight();
    let totalLeftWeight = 0;
    let totalRightWeight = 0;
    let placedWeights = [];
    const blingSound = new Audio('bling.mp3');
    blingSound.volume = 0.5;

    const nextWeightElement = document.getElementById('next-weight');
    const leftWeightDisplay = document.getElementById('left-weight-display');
    const rightWeightDisplay = document.getElementById('right-weight-display');
    const indicatorText = document.getElementById('indicator-text');
    const container = document.getElementById('seesaw-container');
    const indicator = document.getElementById('weight-indicator');
    const plank = document.querySelector('.seesaw-plank');
    const tiltAngleDisplay = document.getElementById('tilt-angle-display');

    let totalTorque = 0;

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
            saveGameState();
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

    function addWeight(weight, distFromCenter, isReloading = false) {
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

        if (!isReloading) {
            placedWeights.push({ weight, distFromCenter });
            blingSound.currentTime = 0;
            blingSound.play().catch(e => console.error("Audio playback failed:", e));
        }

        if (distFromCenter < 0) {
            totalLeftWeight += weight;
            if (leftWeightDisplay) leftWeightDisplay.textContent = totalLeftWeight.toFixed(1) + ' kg';
        } else {
            totalRightWeight += weight;
            if (rightWeightDisplay) rightWeightDisplay.textContent = totalRightWeight.toFixed(1) + ' kg';
        }

        totalTorque += weight * distFromCenter;
        updateTilt();
    }

    function saveGameState() {
        const state = {
            nextWeight,
            placedWeights
        };
        localStorage.setItem('seesawState', JSON.stringify(state));
    }

    function loadGameState() {
        const savedState = localStorage.getItem('seesawState');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                nextWeight = state.nextWeight || generateRandomWeight();
                placedWeights = state.placedWeights || [];

                placedWeights.forEach(w => {
                    addWeight(w.weight, w.distFromCenter, true);
                });

                if (leftWeightDisplay) leftWeightDisplay.textContent = totalLeftWeight.toFixed(1) + ' kg';
                if (rightWeightDisplay) rightWeightDisplay.textContent = totalRightWeight.toFixed(1) + ' kg';
                updateTilt();
                updateNextWeightUI();
            } catch (e) {
                console.error('Failed to load saved state', e);
            }
        } else {
            updateNextWeightUI();
        }
    }

    function updateTilt() {

        const sensitivity = 50;
        let angle = totalTorque / sensitivity;

        angle = Math.max(-30, Math.min(30, angle));

        if (plank) {
            plank.style.transform = `rotate(${angle.toFixed(1)}deg)`;
        }

        if (tiltAngleDisplay) {
            tiltAngleDisplay.textContent = angle.toFixed(1) + '°';
        }
    }

    const resetBtn = document.getElementById('reset-seesaw');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            totalLeftWeight = 0;
            totalRightWeight = 0;
            totalTorque = 0;
            placedWeights = [];

            if (leftWeightDisplay) leftWeightDisplay.textContent = '0.0 kg';
            if (rightWeightDisplay) rightWeightDisplay.textContent = '0.0 kg';
            if (tiltAngleDisplay) tiltAngleDisplay.textContent = '0.0°';

            if (plank) {
                plank.style.transform = 'rotate(0deg)';
                const placedWeights = plank.querySelectorAll('.placed-weight');
                placedWeights.forEach(w => w.remove());
            }

            nextWeight = generateRandomWeight();
            updateNextWeightUI();
            saveGameState();
        });
    }

    loadGameState();
});
