document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // ── Sticky catalog header: measure page-header + inner-tabs height and sync thead top ──
    function updateStickyTabsTop() {
        // Tab Cameras
        const camHeader = document.querySelector('#tab-cameras .page-header');
        const camTabs = document.querySelector('#tab-cameras .inner-tabs');
        if (camHeader && camTabs && camHeader.offsetHeight > 0) {
            const tabTop = camHeader.offsetHeight - 32;
            camTabs.style.top = tabTop + 'px';
            const theadTop = tabTop + camTabs.offsetHeight;
            document.querySelectorAll('#tab-cameras .data-table thead th').forEach(th => {
                th.style.top = theadTop + 'px';
            });
        }

        // Tab Lenses
        const lensHeader = document.querySelector('#tab-lenses .page-header');
        const lensTabs = document.querySelector('#tab-lenses .inner-tabs');
        if (lensHeader && lensTabs && lensHeader.offsetHeight > 0) {
            const tabTop = lensHeader.offsetHeight - 32;
            lensTabs.style.top = tabTop + 'px';
            const theadTop = tabTop + lensTabs.offsetHeight;
            document.querySelectorAll('#tab-lenses .data-table thead th').forEach(th => {
                th.style.top = theadTop + 'px';
            });
        }
    }
    // Run after initial paint and on resize
    requestAnimationFrame(updateStickyTabsTop);
    window.addEventListener('resize', updateStickyTabsTop);


    // Global processing canvas for lighting simulation (shared with converter)
    let processingCanvas = document.createElement('canvas');

    // Lens FA Data from Hikrobotics
    let lensData = [
        { model: 'MVL-HF0628M-6MPE', focalLength: '6 mm', imageSize: 'Ø9 mm (1/1.8\'\')' },
        { model: 'MVL-HF0828M-6MPE', focalLength: '8 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF1228M-6MPE', focalLength: '12 mm', imageSize: 'Ø9 mm (1/1.8\'\')' },
        { model: 'MVL-HF1628M-6MPE', focalLength: '16 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF2528M-6MPE', focalLength: '25 mm', imageSize: 'Ø9 mm (1/1.8\'\')' },
        { model: 'MVL-HF3028M-6MPE', focalLength: '30 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF4028M-6MPE', focalLength: '40 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF5028M-6MPE', focalLength: '50 mm', imageSize: 'Ø9 mm (1/1.8\'\')' },
        { model: 'MVL-HF0624M-10MP', focalLength: '6 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF0824M-10MP', focalLength: '8 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF1224M-10MP', focalLength: '12 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF1624M-10MP', focalLength: '16 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF2524M-10MP', focalLength: '25 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF3524M-10MP', focalLength: '35 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-HF5024M-10MP', focalLength: '50 mm', imageSize: 'Ø9 mm (1/1.8")' },
        { model: 'MVL-MF0824M-5MPE', focalLength: '8 mm', imageSize: 'Φ11 mm (2/3\'\')' },
        { model: 'MVL-MF1224M-5MPE', focalLength: '12 mm', imageSize: 'Φ11 mm (2/3\'\')' },
        { model: 'MVL-MF1618M-5MPE', focalLength: '16 mm', imageSize: 'Φ11 mm (2/3\'\')' },
        { model: 'MVL-MF2518M-5MPE', focalLength: '25 mm', imageSize: 'Φ11 mm (2/3\'\')' },
        { model: 'MVL-MF3518M-5MPE', focalLength: '35 mm', imageSize: 'Φ11 mm (2/3\'\')' },
        { model: 'MVL-MF5028M-5MPE', focalLength: '50 mm', imageSize: 'Φ11 mm (2/3\'\')' },
        { model: 'MVL-MF0828M-8MP', focalLength: '8 mm', imageSize: 'Ø11 mm (2/3")' },
        { model: 'MVL-MF1228M-8MP', focalLength: '12 mm', imageSize: 'Ø11 mm (2/3")' },
        { model: 'MVL-MF1628M-8MP', focalLength: '16 mm', imageSize: 'Ø11 mm (2/3")' },
        { model: 'MVL-MF2528M-8MP', focalLength: '25 mm', imageSize: 'Ø11 mm (2/3")' },
        { model: 'MVL-MF3528M-8MP', focalLength: '35 mm', imageSize: 'Ø11 mm (2/3")' },
        { model: 'MVL-MF5028M-8MP', focalLength: '50 mm', imageSize: 'Ø11 mm (2/3")' },
        { model: 'MVL-MF0828M-10MPE', focalLength: '8 mm', imageSize: 'Ø11.2 mm (2/3")' },
        { model: 'MVL-MF1228M-10MPE', focalLength: '12 mm', imageSize: 'Ø11.2 mm (2/3")' },
        { model: 'MVL-MF1628M-10MPE', focalLength: '16 mm', imageSize: 'Ø11.2 mm (2/3")' },
        { model: 'MVL-MF2528M-10MPE', focalLength: '25 mm', imageSize: 'Ø11.2 mm (2/3")' },
        { model: 'MVL-MF3528M-10MPE', focalLength: '35 mm', imageSize: 'Ø11.2 mm (2/3")' },
        { model: 'MVL-MF5028M-10MPE', focalLength: '50 mm', imageSize: 'Ø11.2 mm (2/3")' },
        { model: 'MVL-KF0618M-12MPE', focalLength: '6 mm', imageSize: 'Ø17.6 mm (1.1")' },
        { model: 'MVL-KF0814M-12MPE', focalLength: '8 mm', imageSize: 'Ø17.6 mm (1.1")' },
        { model: 'MVL-KF1228M-12MPE', focalLength: '12 mm', imageSize: 'Ø17.6 mm (1.1")' },
        { model: 'MVL-KF1628M-12MPE', focalLength: '16 mm', imageSize: 'Ø17.6 mm (1.1")' },
        { model: 'MVL-KF2528M-12MPE', focalLength: '25 mm', imageSize: 'Ø17.6 mm (1.1")' },
        { model: 'MVL-KF3528M-12MPE', focalLength: '35 mm', imageSize: 'Ø17.6 mm (1.1")' },
        { model: 'MVL-KF5028M-12MPE', focalLength: '50 mm', imageSize: 'Ø17.6 mm (1.1")' },
        { model: 'MVL-KF1224M-25MP', focalLength: '12 mm', imageSize: 'Ø19.3 mm (1.2\'\')' },
        { model: 'MVL-KF1624M-25MP', focalLength: '16 mm', imageSize: 'Ø19.3 mm (1.2\'\')' },
        { model: 'MVL-KF2524M-25MP', focalLength: '25 mm', imageSize: 'Ø19.3 mm (1.2\'\')' },
        { model: 'MVL-KF3524M-25MP', focalLength: '35 mm', imageSize: 'Ø19.3 mm (1.2\'\')' },
        { model: 'MVL-KF5024M-25MP', focalLength: '50 mm', imageSize: 'Ø19.3 mm (1.2\'\')' },
        { model: 'MVL-KF1640-25MP', focalLength: '16 mm', imageSize: 'Ø19.3 mm (1.2")' },
        { model: 'MVL-KF2540-25MP', focalLength: '25 mm', imageSize: 'Ø19.3 mm (1.2")' },
        { model: 'MVL-KF3540-25MP', focalLength: '35 mm', imageSize: 'Ø19.3 mm (1.2\'\')' },
        { model: 'MVL-KF5040-25MP', focalLength: '50 mm', imageSize: 'Ø19.3 mm (1.2\'\')' },
        { model: 'MVL-KF0818M-12MP', focalLength: '8 mm', imageSize: 'Φ16 mm (1")' },

        // New FA Lenses - MVL-AF (Active/Autofocus Large Format series)
        { model: 'MVL-AF1828M-M42B', focalLength: '18 mm', imageSize: 'Φ30 mm' },
        { model: 'MVL-AF2045M-M42', focalLength: '20 mm', imageSize: 'Φ30 mm' },
        { model: 'MVL-AF2524M-M42', focalLength: '25 mm', imageSize: 'Φ29 mm' },
        { model: 'MVL-AF2840M-M42', focalLength: '28 mm', imageSize: 'Φ30 mm' },
        { model: 'MVL-AF3528M-M42', focalLength: '35 mm', imageSize: 'Φ42 mm' },
        { model: 'MVL-AF3528M-M42A', focalLength: '35 mm', imageSize: 'Φ29 mm' },
        { model: 'MVL-AF4028M-M42', focalLength: '40 mm', imageSize: 'Φ37 mm' },
        { model: 'MVL-AF5028M-M42A', focalLength: '50 mm', imageSize: 'Φ29 mm' },
        { model: 'MVL-AF5040M-M42', focalLength: '50 mm', imageSize: 'Φ37 mm' },

        // New FA Lenses - MVL-LF (Large Format series)
        { model: 'MVL-LF3528M-F', focalLength: '35 mm', imageSize: 'Φ43.2 mm' },
        { model: 'MVL-LF3540M-F', focalLength: '35 mm', imageSize: 'Φ43.2 mm' },
        { model: 'MVL-LF5040M-F', focalLength: '50 mm', imageSize: 'Ø56 mm' },
        { model: 'MVL-LF8040M-F', focalLength: '80 mm', imageSize: 'Ø56 mm' },
        { model: 'MVL-LF3040M-005-M72', focalLength: '30 mm', imageSize: 'Ø58 mm' },
        { model: 'MVL-LF4040M-01-M72', focalLength: '40 mm', imageSize: 'Ø58 mm' },
        { model: 'MVL-LF6040M-013-M72', focalLength: '60 mm', imageSize: 'Ø58 mm' },
        { model: 'MVL-LF6040M-0168V-M72', focalLength: '60 mm', imageSize: 'Φ60 mm' },
        { model: 'MVL-LF8040M-021V-M72', focalLength: '80 mm', imageSize: 'Ø60 mm' },
        { model: 'MVL-LF2540M-M58-65MP', focalLength: '25 mm', imageSize: 'Ø46 mm' },
        { model: 'MVL-LF3540M-M58-65MP', focalLength: '35 mm', imageSize: 'Ø42 mm' },
        { model: 'MVL-LF5036M-M58-65MP', focalLength: '50 mm', imageSize: 'Ø46 mm' }
    ];

    try {
        const savedLensData = localStorage.getItem('vision_lensData');
        if (savedLensData) {
            const parsed = JSON.parse(savedLensData);
            const existingModels = new Set(parsed.map(item => item.model));
            const newDefaults = lensData.filter(item => !existingModels.has(item.model));
            lensData = [...parsed, ...newDefaults];
            localStorage.setItem('vision_lensData', JSON.stringify(lensData));
        }
    } catch (e) { }

    const saveLensData = () => {
        localStorage.setItem('vision_lensData', JSON.stringify(lensData));
    };

    // Lens Table Elements
    const lensTbody = document.getElementById('lens-tbody');
    const lensShowingCount = document.getElementById('lens-showing-count');
    const lensTotalCount = document.getElementById('lens-total-count');

    // Render Lens Table
    function renderLensTable(data) {
        if (!lensTbody) return;
        lensTbody.innerHTML = '';
        data.forEach((lens, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span class="model-name">${lens.model}</span></td>
                <td><span class="focal-badge">${lens.focalLength}</span></td>
                <td><span class="sensor-badge">${lens.imageSize}</span></td>
            `;
            row.addEventListener('click', () => {
                const parentTbody = row.parentElement;
                parentTbody.querySelectorAll('tr').forEach(r => r.classList.remove('selected-row'));
                row.classList.add('selected-row');
            });
            lensTbody.appendChild(row);
        });
        if (lensShowingCount) lensShowingCount.textContent = data.length;
        if (lensTotalCount) lensTotalCount.textContent = lensData.length;
    }

    renderLensTable(lensData);


    // Telecentric Lens Data from Computar (TEC-V and TEC-M Series)
    let teleLensData = [
        // TEC-V Series (1" and 1.1" Sensor)
        { model: 'TEC-V10110MPW WI', sensorSize: '1"', workingDistance: '110.2 mm' },
        { model: 'TEC-V05110MPW WI', sensorSize: '1"', workingDistance: '110.2 mm' },
        { model: 'TEC-V10110MPW', sensorSize: '1"', workingDistance: '110.2 mm' },
        { model: 'TEC-V05110MPW', sensorSize: '1"', workingDistance: '110.2 mm' },
        { model: 'TEC-V1065MPW', sensorSize: '1"', workingDistance: '65.2 mm' },
        { model: 'TEC-V0565MPW', sensorSize: '1"', workingDistance: '65.2 mm' },
        { model: 'TEC-V0345165MPY-WI', sensorSize: '1.1"', workingDistance: '165.2 mm' },
        { model: 'TEC-V7X', sensorSize: '1.1"', workingDistance: '182 - 577.2 mm' },
        // TEC-M Series (2/3" Sensor)
        { model: 'TEC-M60110MPC', sensorSize: '2/3"', workingDistance: '110 mm' },
        { model: 'TEC-M60110MP', sensorSize: '2/3"', workingDistance: '110 mm' },
        { model: 'TEC-M40110MPC', sensorSize: '2/3"', workingDistance: '110.5 mm' },
        { model: 'TEC-M40110MP', sensorSize: '2/3"', workingDistance: '110.5 mm' },
        { model: 'TEC-M30110MPC', sensorSize: '2/3"', workingDistance: '111.4 mm' },
        { model: 'TEC-M30110MP', sensorSize: '2/3"', workingDistance: '111.4 mm' },
        { model: 'TEC-M6065MPC', sensorSize: '2/3"', workingDistance: '64 mm' },
        { model: 'TEC-M6065MP', sensorSize: '2/3"', workingDistance: '64 mm' },
        { model: 'TEC-M4065MPC', sensorSize: '2/3"', workingDistance: '65.3 mm' },
        { model: 'TEC-M4065MP', sensorSize: '2/3"', workingDistance: '65.3 mm' },
        { model: 'TEC-M20110MPC', sensorSize: '2/3"', workingDistance: '110.9 mm' },
        { model: 'TEC-M20110MP', sensorSize: '2/3"', workingDistance: '110.9 mm' },
        { model: 'TEC-M15110MPC', sensorSize: '2/3"', workingDistance: '110.7 mm' },
        { model: 'TEC-M15110MP', sensorSize: '2/3"', workingDistance: '110.7 mm' },
        { model: 'TEC-M10110MPC', sensorSize: '2/3"', workingDistance: '111.5 mm' },
        { model: 'TEC-M10110MP', sensorSize: '2/3"', workingDistance: '111.5 mm' },
        { model: 'TEC-M08110MPC', sensorSize: '2/3"', workingDistance: '111 mm' },
        { model: 'TEC-M08110MP', sensorSize: '2/3"', workingDistance: '111 mm' },
        { model: 'TEC-M05110MPC', sensorSize: '2/3"', workingDistance: '111.8 mm' },
        { model: 'TEC-M05110MP', sensorSize: '2/3"', workingDistance: '111.8 mm' },
        { model: 'TEC-M03110MPC', sensorSize: '2/3"', workingDistance: '111 mm' },
        { model: 'TEC-M03110MP', sensorSize: '2/3"', workingDistance: '111 mm' },
        { model: 'TEC-M2065MPC', sensorSize: '2/3"', workingDistance: '65.4 mm' },
        { model: 'TEC-M2065MP', sensorSize: '2/3"', workingDistance: '65.4 mm' },
        { model: 'TEC-M1065MPC', sensorSize: '2/3"', workingDistance: '65.5 mm' },
        { model: 'TEC-M1065MP', sensorSize: '2/3"', workingDistance: '65.5 mm' },
        { model: 'TEC-M0865MPC', sensorSize: '2/3"', workingDistance: '66 mm' },
        { model: 'TEC-M0865MP', sensorSize: '2/3"', workingDistance: '66 mm' },
        { model: 'TEC-M0565MPC', sensorSize: '2/3"', workingDistance: '65.5 mm' },
        { model: 'TEC-M0565MP', sensorSize: '2/3"', workingDistance: '65.5 mm' },
        { model: 'TEC-M55MPW', sensorSize: '2/3"', workingDistance: '139 - 1000 mm' },
        { model: 'TEC-M55', sensorSize: '2/3"', workingDistance: '140 mm - Inf.' }
    ];

    try {
        const savedTeleLensData = localStorage.getItem('vision_teleLensData');
        if (savedTeleLensData) {
            const parsed = JSON.parse(savedTeleLensData);
            const existingModels = new Set(parsed.map(item => item.model));
            const newDefaults = teleLensData.filter(item => !existingModels.has(item.model));
            teleLensData = [...parsed, ...newDefaults];
            localStorage.setItem('vision_teleLensData', JSON.stringify(teleLensData));
        }
    } catch (e) { }

    const saveTeleLensData = () => {
        localStorage.setItem('vision_teleLensData', JSON.stringify(teleLensData));
    };

    // Tele Lens Table Elements
    const teleTbody = document.getElementById('tele-tbody');
    const teleShowingCount = document.getElementById('tele-showing-count');
    const teleTotalCount = document.getElementById('tele-total-count');

    // Render Tele Lens Table
    function renderTeleTable(data) {
        if (!teleTbody) return;
        teleTbody.innerHTML = '';
        data.forEach((lens, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span class="model-name">${lens.model}</span></td>
                <td><span class="sensor-badge">${lens.sensorSize}</span></td>
                <td><span class="dimension-badge">${lens.workingDistance}</span></td>
            `;
            row.addEventListener('click', () => {
                const parentTbody = row.parentElement;
                parentTbody.querySelectorAll('tr').forEach(r => r.classList.remove('selected-row'));
                row.classList.add('selected-row');
            });
            teleTbody.appendChild(row);
        });
        if (teleShowingCount) teleShowingCount.textContent = data.length;
        if (teleTotalCount) teleTotalCount.textContent = teleLensData.length;
    }

    renderTeleTable(teleLensData);


    // Sensor size to dimensions mapping (Width × Height in mm) - Reference: Vision-Doctor Sensor Sizes
    const sensorDimensionsMap = {
        '1"': '12.80 × 9.30',      // Diagonal 16mm
        '2/3"': '8.80 × 6.60',     // Diagonal 11mm
        '1/1.8"': '7.20 × 5.40',   // Diagonal 9mm
        '1/2"': '6.40 × 4.80',     // Diagonal 8mm
        '1/2.5"': '5.80 × 4.30',   // Diagonal 7mm
        '1/2.9"': '5.60 × 4.20',   // ~7mm diagonal
        '1/3"': '4.80 × 3.60',     // Diagonal 6mm
        '1/4"': '3.20 × 2.40',     // Diagonal 4mm
        '1.1"': '14.20 × 10.40',
        '1.2"': '15.80 × 11.30',
        '1/1.2"': '10.67 × 8.00',
        '4/3"': '17.30 × 13.00',
        'APS-H': '28.70 × 19.00',
        '66.4mm': '53.10 × 40.00',
        '1.5"': '18.70 × 14.00',
        '1/2.3"': '6.17 × 4.55',
        '1/2.8"': '4.80 × 3.60',
        '1/3.6"': '4.00 × 3.00'
    };

    // Camera Data from Hikrobotics - CH & CS Area Scan Camera series
    let cameraData = [
        // ===== CH Series (GigE High-End) =====
        { model: 'MV-CH100-60GM/GC', resolution: '4096 × 2460', sensorSize: '1"', dimensions: '14.13 × 8.49' },
        { model: 'MV-CH120-10GM/GC', resolution: '4096 × 3000', sensorSize: '1.1"', dimensions: '14.13 × 10.35' },
        { model: 'MV-CH120-20GM/GC', resolution: '4096 × 3072', sensorSize: '1"', dimensions: '13.11 × 9.83' },
        { model: 'MV-CH120-60GM/GC', resolution: '4096 × 3000', sensorSize: '1.1"', dimensions: '14.13 × 10.35' },
        { model: 'MV-CH140-60GM/GC', resolution: '4708 × 2824', sensorSize: '1"', dimensions: '14.12 × 8.47' },
        { model: 'MV-CH160-60GM', resolution: '4000 × 4000', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH250-21GM/GC', resolution: '5120 × 5120', sensorSize: '23x23mm', dimensions: '23.00 × 23.00' },
        { model: 'MV-CH250-90GM/GC/GN', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH310-10GM/GC', resolution: '6464 × 4852', sensorSize: 'APS-C', dimensions: '22.30 × 16.70' },
        { model: 'MV-CH1520-90GM', resolution: '16320 × 9600', sensorSize: 'Large Format', dimensions: '53.00 × 29.40' },

        // Classic CH models
        { model: 'MV-CH050-10UM/UC', resolution: '2448 × 2048', sensorSize: '2/3"', dimensions: '8.45 × 7.07' },
        { model: 'MV-CH089-10GM/GC', resolution: '4096 × 2160', sensorSize: '1"', dimensions: '14.13 × 7.45' },
        { model: 'MV-CH210-90YM', resolution: '5120 × 4096', sensorSize: '4/3"', dimensions: '18.43 × 14.75' },
        { model: 'MV-CH250-20XM', resolution: '5120 × 5120', sensorSize: 'APS-H', dimensions: '23.04 × 23.04' },

        // CH120 - 10GigE (IMX253, 1.1" sensor)
        { model: 'MV-CH120-15TM-M58S-NF', resolution: '4096 × 3000', sensorSize: '1.1"', dimensions: '14.13 × 10.35' },
        { model: 'MV-CH120-15TC-M58S-NF', resolution: '4096 × 3000', sensorSize: '1.1"', dimensions: '14.13 × 10.35' },

        // CH250 - PYTHON25K (23x23mm sensor)
        { model: 'MV-CH250-20CM-M58S-NN', resolution: '5120 × 5120', sensorSize: '23x23mm', dimensions: '23.04 × 23.04' },
        { model: 'MV-CH250-25TM-M58S-NF', resolution: '5120 × 5120', sensorSize: '23x23mm', dimensions: '23.04 × 23.04' },
        { model: 'MV-CH250-25TM-F-NF', resolution: '5120 × 5120', sensorSize: '23x23mm', dimensions: '23.04 × 23.04' },
        { model: 'MV-CH250-25TC-M58S-NF', resolution: '5120 × 5120', sensorSize: '23x23mm', dimensions: '23.04 × 23.04' },

        // CH250 - BSI (1.1" sensor)
        { model: 'MV-CH250-60UM', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH250-60UC', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },

        // CH250 - GMAX0505 (1.1" sensor)
        { model: 'MV-CH250-90UM V4', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH250-90UC V4', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH250-90TM-M58S-NF', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH250-90TC-M58S-NF', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH250-90VM', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH250-90VC', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH250-92TM-C-NF V2', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },
        { model: 'MV-CH250-92TC-C-NF V2', resolution: '5120 × 5120', sensorSize: '1.1"', dimensions: '12.80 × 12.80' },

        // CH500 - GMAX (22.4mm square sensor)
        { model: 'MV-CH500-90TM-M58S-NF V2', resolution: '7008 × 7000', sensorSize: '22x22mm', dimensions: '22.43 × 22.40' },
        { model: 'MV-CH500-90TC-M58S-NF V2', resolution: '7008 × 7000', sensorSize: '22x22mm', dimensions: '22.43 × 22.40' },
        { model: 'MV-CH500-90TM-F-NF V2', resolution: '7008 × 7000', sensorSize: '22x22mm', dimensions: '22.43 × 22.40' },

        // CH610 - IMX455 (Full Frame 36×24mm sensor)
        { model: 'MV-CH610-10TM-F-TF', resolution: '9568 × 6380', sensorSize: 'Full Frame', dimensions: '35.96 × 23.99' },
        { model: 'MV-CH610-10TC-F-TF', resolution: '9568 × 6380', sensorSize: 'Full Frame', dimensions: '35.96 × 23.99' },

        // CH650 - GMAX3265 (30×22mm sensor)
        { model: 'MV-CH650-90TM-M58S-NF', resolution: '9344 × 7000', sensorSize: 'Large Format', dimensions: '29.90 × 22.40' },
        { model: 'MV-CH650-90TC-M58S-NF', resolution: '9344 × 7000', sensorSize: 'Large Format', dimensions: '29.90 × 22.40' },
        { model: 'MV-CH650-90TM-F-NF', resolution: '9344 × 7000', sensorSize: 'Large Format', dimensions: '29.90 × 22.40' },
        { model: 'MV-CH650-90TC-F-NF', resolution: '9344 × 7000', sensorSize: 'Large Format', dimensions: '29.90 × 22.40' },
        { model: 'MV-CH650-90TM-M58S-NF V2', resolution: '9344 × 7000', sensorSize: 'Large Format', dimensions: '29.90 × 22.40' },
        { model: 'MV-CH650-90TC-M58S-NF V2', resolution: '9344 × 7000', sensorSize: 'Large Format', dimensions: '29.90 × 22.40' },
        { model: 'MV-CH650-90TM-F-NF V2', resolution: '9344 × 7000', sensorSize: 'Large Format', dimensions: '29.90 × 22.40' },
        { model: 'MV-CH650-90TC-F-NF V2', resolution: '9344 × 7000', sensorSize: 'Large Format', dimensions: '29.90 × 22.40' },

        // CH1010 - IMX461 (Medium Format 44×33mm sensor)
        { model: 'MV-CH1010-10CM-M72-NF', resolution: '11648 × 8740', sensorSize: 'Medium Format', dimensions: '43.80 × 32.86' },
        { model: 'MV-CH1010-10CM-M72-TF', resolution: '11648 × 8740', sensorSize: 'Medium Format', dimensions: '43.80 × 32.86' },

        // CH1510 - IMX411 (Large Format 54×40mm sensor)
        { model: 'MV-CH1510-10FM-M72-TF', resolution: '14208 × 10640', sensorSize: 'Large Format', dimensions: '53.42 × 40.01' },

        // ===== CS Series (Standard) - 77 models =====
        { model: 'MV-CS004-10GM', resolution: '720 × 540', sensorSize: '1/2.9"' },
        { model: 'MV-CS004-10GC', resolution: '720 × 540', sensorSize: '1/2.9"' },
        { model: 'MV-CS004-10UM', resolution: '720 × 540', sensorSize: '1/2.9"' },
        { model: 'MV-CS004-10UM V5', resolution: '720 × 540', sensorSize: '1/2.9"' },
        { model: 'MV-CS004-10UC', resolution: '720 × 540', sensorSize: '1/2.9"' },
        { model: 'MV-CS004-10UC V5', resolution: '720 × 540', sensorSize: '1/2.9"' },
        { model: 'MV-CS004-11GM', resolution: '720 × 540', sensorSize: '1/2.9"' },
        { model: 'MV-CS004-11GC', resolution: '720 × 540', sensorSize: '1/2.9"' },
        { model: 'MV-CS013-60GN', resolution: '1224 × 1024', sensorSize: '1/2"' },
        { model: 'MV-CS016-10GM', resolution: '1440 × 1080', sensorSize: '1/2.9"' },
        { model: 'MV-CS016-10GC', resolution: '1440 × 1080', sensorSize: '1/2.9"' },
        { model: 'MV-CS016-10UM', resolution: '1440 × 1080', sensorSize: '1/2.9"' },
        { model: 'MV-CS016-10UM V5', resolution: '1440 × 1080', sensorSize: '1/2.9"' },
        { model: 'MV-CS016-10UC', resolution: '1440 × 1080', sensorSize: '1/2.9"' },
        { model: 'MV-CS016-10UC V5', resolution: '1440 × 1080', sensorSize: '1/2.9"' },
        { model: 'MV-CS016-11GM', resolution: '1440 × 1080', sensorSize: '1/2.9"' },
        { model: 'MV-CS020-10GM', resolution: '1624 × 1240', sensorSize: '1/1.8"' },
        { model: 'MV-CS020-10GC', resolution: '1624 × 1240', sensorSize: '1/1.8"' },
        { model: 'MV-CS020-10UM', resolution: '1624 × 1240', sensorSize: '1/1.8"' },
        { model: 'MV-CS020-10UC', resolution: '1624 × 1240', sensorSize: '1/1.8"' },
        { model: 'MV-CS020-60GM', resolution: '1624 × 1240', sensorSize: '1/1.8"' },
        { model: 'MV-CS020-60GC', resolution: '1624 × 1240', sensorSize: '1/1.8"' },
        { model: 'MV-CS023-10GM', resolution: '1920 × 1200', sensorSize: '1/1.2"' },
        { model: 'MV-CS023-10GC', resolution: '1920 × 1200', sensorSize: '1/1.2"' },
        { model: 'MV-CS028-10UM', resolution: '1936 × 1464', sensorSize: '1/1.8"' },
        { model: 'MV-CS032-10GM', resolution: '2048 × 1536', sensorSize: '1/1.8"' },
        { model: 'MV-CS032-10GC', resolution: '2048 × 1536', sensorSize: '1/1.8"' },
        { model: 'MV-CS032-60GM', resolution: '2048 × 1536', sensorSize: '1/1.8"' },
        { model: 'MV-CS032-60GM V5', resolution: '2048 × 1536', sensorSize: '1/1.8"' },
        { model: 'MV-CS032-60GC', resolution: '2048 × 1536', sensorSize: '1/1.8"' },
        { model: 'MV-CS032-60GC V5', resolution: '2048 × 1536', sensorSize: '1/1.8"' },
        { model: 'MV-CS040-A0UM', resolution: '2048 × 2048', sensorSize: '1"' },
        { model: 'MV-CS040-A0UC', resolution: '2048 × 2048', sensorSize: '1"' },
        { model: 'MV-CS050-10GM', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-10GC', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-10GM-PRO', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-10GC-PRO', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-10UM', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-10UC', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-20GM', resolution: '2592 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-20GC', resolution: '2592 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-60GM', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-60GM V5', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-60GC', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-60GC V5', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-60GN', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-60UM', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-60UM V5', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-60UC', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-60UC V5', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-90GM', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS050-90GC', resolution: '2448 × 2048', sensorSize: '2/3"' },
        { model: 'MV-CS060-10GM', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS060-10GM V5', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS060-10GC', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS060-10GC V5', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS060-10GM-PRO', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS060-10GC-PRO', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS060-10UM', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS060-10UC', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS060-10UM-PRO', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS060-10UC-PRO', resolution: '3072 × 2048', sensorSize: '1/1.8"' },
        { model: 'MV-CS120-10GM V5', resolution: '4024 × 3036', sensorSize: '1/1.8"' },
        { model: 'MV-CS120-10GC V5', resolution: '4024 × 3036', sensorSize: '1/1.8"' },
        { model: 'MV-CS120-10UM', resolution: '4024 × 3036', sensorSize: '1/1.8"' },
        { model: 'MV-CS120-10UC', resolution: '4024 × 3036', sensorSize: '1/1.8"' },
        { model: 'MV-CS200-10GM', resolution: '5472 × 3648', sensorSize: '1"' },
        { model: 'MV-CS200-10GC', resolution: '5472 × 3648', sensorSize: '1"' },
        { model: 'MV-CS200-10GM V5', resolution: '5472 × 3648', sensorSize: '1"' },
        { model: 'MV-CS200-10GC V5', resolution: '5472 × 3648', sensorSize: '1"' },
        { model: 'MV-CS200-10UM', resolution: '5472 × 3648', sensorSize: '1"' },
        { model: 'MV-CS200-10UM V5', resolution: '5472 × 3648', sensorSize: '1"' },
        { model: 'MV-CS200-10UC', resolution: '5472 × 3648', sensorSize: '1"' },
        { model: 'MV-CS200-10UC V5', resolution: '5472 × 3648', sensorSize: '1"' },
        { model: 'MV-CS200-10GM-ADV', resolution: '5472 × 3648', sensorSize: '1"' },
        { model: 'MV-CS200-RC', resolution: '5472 × 3648', sensorSize: '1"' },

        // ===== CU Series (GigE Area Scan) =====
        { model: 'MV-CU004-10GM', resolution: '720 × 540', sensorSize: '1/2.9"', dimensions: '4.97 × 3.73' },
        { model: 'MV-CU004-10GC', resolution: '720 × 540', sensorSize: '1/2.9"', dimensions: '4.97 × 3.73' },
        { model: 'MV-CU013-80GM', resolution: '1280 × 1024', sensorSize: '1/2.7"', dimensions: '5.12 × 4.10' },
        { model: 'MV-CU013-80GC', resolution: '1280 × 1024', sensorSize: '1/2.7"', dimensions: '5.12 × 4.10' },
        { model: 'MV-CU013-A0GM', resolution: '1280 × 1024', sensorSize: '1/2"', dimensions: '6.14 × 4.92' },
        { model: 'MV-CU013-A0GC', resolution: '1280 × 1024', sensorSize: '1/2"', dimensions: '6.14 × 4.92' },
        { model: 'MV-CU016-10GM', resolution: '1440 × 1080', sensorSize: '1/2.9"', dimensions: '4.97 × 3.73' },
        { model: 'MV-CU016-10GC', resolution: '1440 × 1080', sensorSize: '1/2.9"', dimensions: '4.97 × 3.73' },
        { model: 'MV-CU020-19GM', resolution: '1920 × 1080', sensorSize: '1/2.8"', dimensions: '5.57 × 3.13' },
        { model: 'MV-CU020-19GC', resolution: '1920 × 1080', sensorSize: '1/2.8"', dimensions: '5.57 × 3.13' },
        { model: 'MV-CU020-19GC (850nm)', resolution: '1920 × 1080', sensorSize: '1/2.8"', dimensions: '5.57 × 3.13' },
        { model: 'MV-CU020-80GM', resolution: '1600 × 1200', sensorSize: '1/2.6"', dimensions: '5.52 × 4.14' },
        { model: 'MV-CU020-80GC', resolution: '1600 × 1200', sensorSize: '1/2.6"', dimensions: '5.52 × 4.14' },
        { model: 'MV-CU020-90GM', resolution: '2048 × 1200', sensorSize: '1/1.7"', dimensions: '8.19 × 4.80' },
        { model: 'MV-CU020-90GC', resolution: '2048 × 1200', sensorSize: '1/1.7"', dimensions: '8.19 × 4.80' },
        { model: 'MV-CU050-30GM', resolution: '2592 × 1944', sensorSize: '1/2.5"', dimensions: '5.70 × 4.28' },
        { model: 'MV-CU050-30GC', resolution: '2592 × 1944', sensorSize: '1/2.5"', dimensions: '5.70 × 4.28' },
        { model: 'MV-CU050-90GM', resolution: '2600 × 2160', sensorSize: '1/2"', dimensions: '6.50 × 5.40' },
        { model: 'MV-CU050-90GC', resolution: '2600 × 2160', sensorSize: '1/2"', dimensions: '6.50 × 5.40' },
        { model: 'MV-CU060-10GM', resolution: '3072 × 2048', sensorSize: '1/1.8"', dimensions: '7.37 × 4.92' },
        { model: 'MV-CU060-10GC', resolution: '3072 × 2048', sensorSize: '1/1.8"', dimensions: '7.37 × 4.92' },
        { model: 'MV-CU060-60GM', resolution: '3200 × 1944', sensorSize: '1/2.4"', dimensions: '11.04 × 6.71' },
        { model: 'MV-CU060-60GC', resolution: '3200 × 1944', sensorSize: '1/2.4"', dimensions: '11.04 × 6.71' },
        { model: 'MV-CU120-10GM', resolution: '4024 × 3036', sensorSize: '1/1.7"', dimensions: '7.44 × 5.62' },
        { model: 'MV-CU120-10GC', resolution: '4024 × 3036', sensorSize: '1/1.7"', dimensions: '7.44 × 5.62' },
        { model: 'MV-CU200-20GM', resolution: '5120 × 3840', sensorSize: '1/1.8"', dimensions: '7.17 × 5.38' },
        { model: 'MV-CU200-20GC', resolution: '5120 × 3840', sensorSize: '1/1.8"', dimensions: '7.17 × 5.38' },

        // ===== Basler cameras =====
        { model: 'a2A5328-4gcBAS', resolution: '5328 × 4608', sensorSize: '1.2"', dimensions: '14.57 × 12.60' },
        { model: 'a2A5328-4gmPRO', resolution: '5328 × 4608', sensorSize: '1.2"', dimensions: '14.57 × 12.60' },
        { model: 'a2A5060-4gmBAS', resolution: '5064 × 5064', sensorSize: '1.1"', dimensions: '12.65 × 12.65' },
        { model: 'a2A4504-5gmBAS', resolution: '4504 × 4504', sensorSize: '1.1"', dimensions: '12.34 × 12.34' },
        { model: 'a2A2464-115g5mBAS', resolution: '2448 × 2048', sensorSize: '2/3"', dimensions: '8.45 × 7.07' },
        { model: 'acA5472-5gm', resolution: '5472 × 3648', sensorSize: '1"', dimensions: '13.13 × 8.76' },
        { model: 'acA4024-29um', resolution: '4024 × 3036', sensorSize: '1/1.7"', dimensions: '7.44 × 5.61' },
        { model: 'acA3800-14um', resolution: '3840 × 2748', sensorSize: '1/2.3"', dimensions: '6.41 × 4.59' },
        { model: 'acA3088-16gm', resolution: '3088 × 2064', sensorSize: '1/1.8"', dimensions: '7.41 × 4.95' },
        { model: 'acA2500-14gm', resolution: '2592 × 1944', sensorSize: '1/2.5"', dimensions: '5.70 × 4.28' },
        { model: 'acA2440-35gm', resolution: '2448 × 2048', sensorSize: '2/3"', dimensions: '8.45 × 7.07' },
        { model: 'acA2040-90um', resolution: '2048 × 2048', sensorSize: '1"', dimensions: '11.26 × 11.26' },
        { model: 'acA1920-50gm', resolution: '1920 × 1200', sensorSize: '1/1.2"', dimensions: '11.25 × 7.03' },
        { model: 'acA1920-40gm', resolution: '1920 × 1200', sensorSize: '1/1.2"', dimensions: '11.25 × 7.03' },
        { model: 'acA1600-20um', resolution: '1600 × 1200', sensorSize: '1/1.8"', dimensions: '7.06 × 5.30' },
        { model: 'acA1300-60gm', resolution: '1280 × 1024', sensorSize: '1/3"', dimensions: '4.80 × 3.84' },
        { model: 'acA640-750um', resolution: '640 × 480', sensorSize: '1/4"', dimensions: '3.65 × 2.74' },
        { model: 'daA2500-14um', resolution: '2592 × 1944', sensorSize: '1/2.5"', dimensions: '5.70 × 4.28' },
        { model: 'puA1280-54um', resolution: '1280 × 960', sensorSize: '1/3"', dimensions: '4.80 × 3.60' },
        { model: 'a4A2440-75ucMED', resolution: '2448 × 2048', sensorSize: '2/3"', dimensions: '8.45 × 7.07' },

        // ===== Cognex cameras =====
        // ===== Cognex DataMan (ID Readers used as cameras) =====
        { model: 'DM50/60/70', resolution: '752 × 480', sensorSize: '1/3"', dimensions: '4.51 × 2.88' },
        { model: 'DM72', resolution: '1280 × 960', sensorSize: '1/3"', dimensions: '4.80 × 3.60' },
        { model: 'DM150/260', resolution: '752 × 480', sensorSize: '1/3"', dimensions: '4.51 × 2.88' },
        { model: 'DM152/262', resolution: '1280 × 960', sensorSize: '1/3"', dimensions: '4.80 × 3.60' },
        { model: 'DM360', resolution: '800 × 600', sensorSize: '1/3"', dimensions: '4.24 × 3.18' },
        { model: 'DM362', resolution: '1280 × 1024', sensorSize: '1/1.8"', dimensions: '6.78 × 5.43' },
        { model: 'DM363', resolution: '1600 × 1200', sensorSize: '1/1.8"', dimensions: '7.20 × 5.40' },
        { model: 'DM374/470', resolution: '2048 × 1536', sensorSize: '1/1.8"', dimensions: '7.07 × 5.30' },

        // ===== Cognex In-Sight 2D Vision Systems (Direct from Website) =====
        // In-Sight 9000 Series
        { model: 'IS9912 / 9912C', resolution: '4096 × 3000', sensorSize: '1.1"', dimensions: '14.10 × 10.40' },

        // In-Sight 8000 Series (Ultra-Compact)
        { model: 'IS8100/8101', resolution: '640 × 480', sensorSize: '1/3"', dimensions: '4.80 × 3.60' },
        { model: 'IS8200/8400', resolution: '640 × 480', sensorSize: '1/3"', dimensions: '4.80 × 3.60' },
        { model: 'IS8401', resolution: '1280 × 1024', sensorSize: '1/1.8"', dimensions: '7.20 × 5.40' },
        { model: 'IS8402', resolution: '1600 × 1200', sensorSize: '1/1.8"', dimensions: '7.20 × 5.40' },
        { model: 'IS8405', resolution: '2592 × 1944', sensorSize: '1/1.8"', dimensions: '7.20 × 5.40' },

        // In-Sight 8500 Series (High-Performance Ultra-Compact)
        { model: 'IS8500P', resolution: '800 × 600', sensorSize: '1/4"', dimensions: '2.76 × 2.07' },
        { model: 'IS8501P', resolution: '1280 × 1024', sensorSize: '1/3"', dimensions: '4.42 × 3.53' },
        { model: 'IS8502P', resolution: '1920 × 1200', sensorSize: '1/1.8"', dimensions: '6.62 × 4.14' },
        { model: 'IS8502CP', resolution: '1920 × 1200', sensorSize: '1/1.8"', dimensions: '6.62 × 4.14' },
        { model: 'IS8505P', resolution: '2448 × 2048', sensorSize: '2/3"', dimensions: '8.44 × 7.07' },
        { model: 'IS8505CP', resolution: '2448 × 2048', sensorSize: '2/3"', dimensions: '8.44 × 7.07' },

        // In-Sight 7000 Series (Modular/Rugged)
        { model: 'IS7500/7600/7900', resolution: '640 × 480', sensorSize: '1/3"', dimensions: '4.80 × 3.60' },
        { model: 'IS7501/7801/7901', resolution: '1280 × 1024', sensorSize: '1/1.8"', dimensions: '7.20 × 5.40' },
        { model: 'IS7802/7902', resolution: '1600 × 1200', sensorSize: '1/1.8"', dimensions: '7.20 × 5.40' },
        { model: 'IS7905', resolution: '2448 × 2048', sensorSize: '2/3"', dimensions: '8.80 × 6.60' },

        // In-Sight 3800 Series (Next-Gen AI)
        { model: 'IS3801 M/C', resolution: '1440 × 1080', sensorSize: '1/2.3"', dimensions: '6.17 × 4.55' },
        { model: 'IS3803 M/C', resolution: '2048 × 1536', sensorSize: '1/1.8"', dimensions: '7.18 × 5.32' },
        { model: 'IS3805 M/C', resolution: '2448 × 2048', sensorSize: '2/3"', dimensions: '8.80 × 6.60' },
        { model: 'IS3812 M/C', resolution: '4096 × 3000', sensorSize: '1/1.1"', dimensions: '11.20 × 8.20' },
        { model: 'IS3816 M/C', resolution: '5320 × 3032', sensorSize: '1.1"', dimensions: '14.60 × 8.30' },

        // In-Sight 2800 Series
        { model: 'IS2800', resolution: '720 × 540', sensorSize: '1/2.8"', dimensions: '5.10 × 3.80' },
        { model: 'IS2801', resolution: '1440 × 1080', sensorSize: '1/2.8"', dimensions: '5.10 × 3.80' },
        { model: 'IS2802', resolution: '1920 × 1080', sensorSize: '1/2.8"', dimensions: '5.40 × 3.00' },

        // In-Sight 5000/2000 Series (Classic & Vision Sensors)
        { model: 'IS5100/5400/5600', resolution: '640 × 480', sensorSize: '1/3"', dimensions: '4.80 × 3.60' },
        { model: 'IS5403/5603', resolution: '1600 × 1200', sensorSize: '1/1.8"', dimensions: '7.20 × 5.40' },
        { model: 'IS5605/5705', resolution: '2448 × 2048', sensorSize: '2/3"', dimensions: '8.80 × 6.60' },
        { model: 'IS2000-110/120/130', resolution: '640 × 480', sensorSize: '1/3"', dimensions: '4.80 × 3.60' },
        { model: 'IS1050M', resolution: '640 × 480', sensorSize: '1/3"', dimensions: '4.74 × 3.55' }
    ];

    try {
        const savedCameraData = localStorage.getItem('vision_cameraData');
        if (savedCameraData) {
            const parsed = JSON.parse(savedCameraData);
            const existingModels = new Set(parsed.map(item => item.model));
            const newDefaults = cameraData.filter(item => !existingModels.has(item.model));
            cameraData = [...parsed, ...newDefaults];
            localStorage.setItem('vision_cameraData', JSON.stringify(cameraData));
        }
    } catch (e) { }

    const saveCameraData = () => {
        localStorage.setItem('vision_cameraData', JSON.stringify(cameraData));
    };

    const tbody = document.getElementById('camera-tbody');
    const searchInput = document.getElementById('search-input');
    const showingCount = document.getElementById('showing-count');
    const totalCount = document.getElementById('total-count');
    const paginationContainer = document.getElementById('pagination-container');
    let currentPage = 1;
    const itemsPerPage = 50;
    let currentFilteredData = []; // To store the currently filtered data for pagination

    function renderTable(data) {
        tbody.innerHTML = '';

        const totalPages = Math.ceil(data.length / itemsPerPage);
        if (currentPage > totalPages) currentPage = totalPages || 1;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = data.slice(start, end);

        paginatedItems.forEach((cam, index) => {
            const dimensions = cam.dimensions || sensorDimensionsMap[cam.sensorSize] || 'N/A';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${start + index + 1}</td>
                <td><span class="model-name">${cam.model}</span></td>
                <td><span class="resolution-badge">${cam.resolution}</span></td>
                <td><span class="sensor-badge">${cam.sensorSize}</span></td>
                <td><span class="dimension-badge">${dimensions}</span></td>
            `;
            row.addEventListener('click', () => {
                const parentTbody = row.parentElement;
                parentTbody.querySelectorAll('tr').forEach(r => r.classList.remove('selected-row'));
                row.classList.add('selected-row');
            });
            tbody.appendChild(row);
        });

        showingCount.textContent = data.length;
        totalCount.textContent = cameraData.length;
        renderPagination(data.length);
    }

    function renderPagination(totalItems) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (totalPages <= 1) return;

        const prevBtn = document.createElement('button');
        prevBtn.className = `page-btn ${currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i data-lucide="chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(currentFilteredData);
            }
        };
        paginationContainer.appendChild(prevBtn);

        // Show max 5 page buttons
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.onclick = () => {
                currentPage = i;
                renderTable(currentFilteredData);
            };
            paginationContainer.appendChild(pageBtn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.className = `page-btn ${currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '<i data-lucide="chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(currentFilteredData);
            }
        };
        paginationContainer.appendChild(nextBtn);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Initial render: Filter for HIK by default to match the active tab
    currentFilteredData = cameraData.filter(cam => cam.model.startsWith('MV-'));
    renderTable(currentFilteredData);



    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        // Filter Cameras
        currentFilteredData = cameraData.filter(cam =>
            cam.model.toLowerCase().includes(query) ||
            (cam.sensorSize && cam.sensorSize.toLowerCase().includes(query)) ||
            (cam.resolution && cam.resolution.toLowerCase().includes(query))
        );
        currentPage = 1;
        renderTable(currentFilteredData);

        // Filter FA Lenses
        const filteredFALenses = lensData.filter(lens =>
            lens.model.toLowerCase().includes(query) ||
            lens.focalLength.toLowerCase().includes(query) ||
            lens.imageSize.toLowerCase().includes(query)
        );
        renderLensTable(filteredFALenses);

        // Filter Tele Lenses
        const filteredTeleLenses = teleLensData.filter(lens =>
            lens.model.toLowerCase().includes(query) ||
            lens.sensorSize.toLowerCase().includes(query) ||
            lens.workingDistance.toLowerCase().includes(query)
        );
        renderTeleTable(filteredTeleLenses);
    });

    // Login State Management
    // Session-only: always start logged out on each app open/reload (no localStorage persistence)
    let isLoggedIn = false;
    let currentUserRole = '';

    const navItems = document.querySelectorAll('.nav-item');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const loginModal = document.getElementById('login-modal');
    const loginTrigger = document.getElementById('user-login-trigger');
    const loginForm = document.getElementById('login-form');
    const closeLoginBtn = document.getElementById('close-login-btn');
    const loginError = document.getElementById('login-error');
    const displayUserName = document.getElementById('display-user-name');
    const displayUserRole = document.getElementById('display-user-role');
    const userAvatarTrigger = document.getElementById('user-avatar-trigger');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');

    function switchTab(targetTabId) {
        navItems.forEach(i => i.classList.remove('active'));
        const targetNav = document.querySelector(`.nav-item[data-tab="${targetTabId}"]`);
        if (targetNav) targetNav.classList.add('active');

        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `tab-${targetTabId}`) {
                panel.classList.add('active');
            }
        });

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            if (targetTabId === 'lenses') {
                searchInput.placeholder = 'Search lenses...';
            } else if (targetTabId === 'cameras') {
                searchInput.placeholder = 'Search cameras...';
            } else if (targetTabId === 'vision-lab') {
                searchInput.placeholder = 'Search tools...';
            } else {
                searchInput.placeholder = 'Search...';
            }
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();
        requestAnimationFrame(updateStickyTabsTop);
    }


    // ===== LANGUAGE / I18N SYSTEM =====
    let currentLang = localStorage.getItem('vision_app_lang') || 'en';

    const translations = {
        en: {
            navCameras: "Camera Products",
            navLenses: "Lens Products",
            navCalc: "Calculation Vision",
            navExtCalc: "EXT Calculate",
            navVisionLab: "Vision Lab",
            themeMode: "Theme Mode",
            dataManagement: "Data Management",
            exportData: "Export Data",
            importData: "Import Data",
            searchPlaceholder: "Search cameras...",
            loginRequired: "Login required to enable this section",
            notLoggedIn: "Not Logged In - Click to Log In",
            loggedInAdmin: "Logged In (Admin) - Click to Log Out",
            logoutConfirm: "Are you sure you want to log out?"
        },
        vi: {
            navCameras: "Sản Phẩm Camera",
            navLenses: "Sản Phẩm Lens",
            navCalc: "Tính Toán Vision",
            navExtCalc: "Tính Vòng Nối (EXT)",
            navVisionLab: "Phòng Thử Vision",
            themeMode: "Giao Diện Ngày/Đêm",
            dataManagement: "Quản Lý Dữ Liệu",
            exportData: "Xuất Dữ Liệu",
            importData: "Nhập Dữ Liệu",
            searchPlaceholder: "Tìm kiếm camera...",
            loginRequired: "Cần đăng nhập để sử dụng mục này",
            notLoggedIn: "Chưa đăng nhập - Bấm để đăng nhập",
            loggedInAdmin: "Đã đăng nhập (Admin) - Bấm để đăng xuất",
            logoutConfirm: "Bạn có chắc chắn muốn đăng xuất không?"
        }
    };

    function updateLanguageUI() {
        const langBtnText = document.getElementById('lang-btn-text');
        if (langBtnText) langBtnText.textContent = currentLang.toUpperCase();

        const t = translations[currentLang] || translations.en;

        // Nav items
        const navCam = document.querySelector('.nav-item[data-tab="cameras"] span');
        const navLens = document.querySelector('.nav-item[data-tab="lenses"] span');
        const navCalc = document.querySelector('.nav-item[data-tab="analytics"] span');
        const navExt = document.querySelector('.nav-item[data-tab="ext-calc"] span');
        const navLab = document.querySelector('.nav-item[data-tab="vision-lab"] span');

        if (navCam) navCam.textContent = t.navCameras;
        if (navLens) navLens.textContent = t.navLenses;
        if (navCalc) navCalc.textContent = t.navCalc;
        if (navExt) navExt.textContent = t.navExtCalc;
        if (navLab) navLab.textContent = t.navVisionLab;

        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.placeholder = t.searchPlaceholder;

        // Sidebar labels
        const themeLabel = document.querySelector('.theme-toggle .status-label');
        if (themeLabel) themeLabel.textContent = t.themeMode;

        const dataLabel = document.querySelector('.admin-data-controls .status-label');
        if (dataLabel) dataLabel.textContent = t.dataManagement;

        const exportBtn = document.getElementById('export-data-btn');
        if (exportBtn) {
            exportBtn.innerHTML = `<i data-lucide="download" style="width: 14px; height: 14px;"></i> ${t.exportData}`;
        }

        const importBtn = document.getElementById('import-data-btn');
        if (importBtn) {
            importBtn.innerHTML = `<i data-lucide="upload" style="width: 14px; height: 14px;"></i> ${t.importData}`;
        }

        updateProtectedTabsUI();
    }

    function toggleLanguage() {
        currentLang = (currentLang === 'en') ? 'vi' : 'en';
        localStorage.setItem('vision_app_lang', currentLang);
        updateLanguageUI();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', toggleLanguage);
    }
    updateLanguageUI();

    function updateProtectedTabsUI() {
        const lockBtn = document.getElementById('user-login-trigger');
        const lockIcon = document.getElementById('lock-auth-icon');
        const adminControls = document.querySelector('.admin-data-controls');
        const protectedNavItems = document.querySelectorAll('.protected-nav');
        const t = translations[currentLang] || translations.en;

        if (isLoggedIn) {
            if (lockBtn) {
                lockBtn.title = t.loggedInAdmin;
                lockBtn.style.background = 'rgba(34, 197, 94, 0.15)';
                lockBtn.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                lockBtn.style.color = '#22c55e';
                lockBtn.style.boxShadow = '0 0 10px rgba(34, 197, 94, 0.2)';
            }
            if (lockIcon) {
                lockIcon.setAttribute('data-lucide', 'lock');
            }
            if (adminControls) {
                adminControls.style.display = 'flex';
            }
            protectedNavItems.forEach(item => {
                item.style.display = 'flex';
                item.style.opacity = '1';
                item.style.pointerEvents = 'auto';
                item.style.cursor = 'pointer';
                item.classList.remove('disabled');
                item.removeAttribute('title');
            });
        } else {
            if (lockBtn) {
                lockBtn.title = t.notLoggedIn;
                lockBtn.style.background = 'rgba(249, 115, 22, 0.15)';
                lockBtn.style.borderColor = 'rgba(249, 115, 22, 0.4)';
                lockBtn.style.color = '#f97316';
                lockBtn.style.boxShadow = '0 0 10px rgba(249, 115, 22, 0.15)';
            }
            if (lockIcon) {
                lockIcon.setAttribute('data-lucide', 'lock-keyhole-open');
            }
            if (adminControls) {
                adminControls.style.display = 'none';
            }
            protectedNavItems.forEach(item => {
                item.style.display = 'flex';
                item.style.opacity = '0.4';
                item.style.pointerEvents = 'none';
                item.style.cursor = 'not-allowed';
                item.classList.add('disabled');
                item.title = t.loginRequired;
            });

            // If a protected tab is currently active, switch back to 'cameras'
            const activeTab = document.querySelector('.nav-item.active');
            if (activeTab && activeTab.classList.contains('protected-nav')) {
                switchTab('cameras');
            }
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Tab Navigation (Sidebar) - All tabs are 100% accessible to all users
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.classList.contains('disabled') || (!isLoggedIn && item.classList.contains('protected-nav'))) {
                return;
            }
            const tabId = item.dataset.tab;
            switchTab(tabId);
        });
    });

    // Login Trigger (User Header / Avatar / Mobile Login)
    function handleUserLoginClick() {
        const t = translations[currentLang] || translations.en;
        if (isLoggedIn) {
            if (confirm(t.logoutConfirm)) {
                isLoggedIn = false;
                currentUserRole = '';
                updateProtectedTabsUI();
            }
        } else {
            if (loginError) {
                loginError.textContent = '';
                loginError.style.display = 'none';
            }
            if (loginModal) loginModal.style.display = 'flex';
        }
    }

    if (loginTrigger) loginTrigger.addEventListener('click', handleUserLoginClick);
    if (userAvatarTrigger) userAvatarTrigger.addEventListener('click', handleUserLoginClick);
    if (mobileLoginBtn) mobileLoginBtn.addEventListener('click', handleUserLoginClick);

    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', () => {
            if (loginModal) loginModal.style.display = 'none';
        });
    }

    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const idInput = document.getElementById('login-id');
            const passInput = document.getElementById('login-pass');
            const idVal = idInput ? idInput.value.trim() : '';
            const passVal = passInput ? passInput.value.trim() : '';

            if ((idVal === 'Admin' || idVal.length > 0) && (passVal === '123' || passVal.length > 0)) {
                isLoggedIn = true;
                currentUserRole = 'Admin';
                if (loginModal) loginModal.style.display = 'none';
                if (loginError) loginError.style.display = 'none';
                updateProtectedTabsUI();
            } else {
                if (loginError) {
                    loginError.textContent = 'Invalid Username or Password';
                    loginError.style.display = 'block';
                }
            }
        });
    }

    // Initialize Protected Tabs UI State
    updateProtectedTabsUI();

    // Mobile Sidebar Logic
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.add('mobile-active');
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-active');
        });
    }

    // Close sidebar when clicking nav items on mobile
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('mobile-active');
            }
        });
    });

    // Inner Tab Navigation (Camera Categories)
    const innerTabBtns = document.querySelectorAll('.inner-tab-btn');
    innerTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find parent panel to only target buttons within the same group if needed, 
            // but here we can just use the data attribute to distinguish
            if (btn.dataset.category) {
                // Camera categories
                const cameraBtns = document.querySelectorAll('.inner-tab-btn[data-category]');
                cameraBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;
                if (category === 'hik') {
                    currentFilteredData = cameraData.filter(cam => cam.model.startsWith('MV-'));
                } else if (category === 'basler') {
                    currentFilteredData = cameraData.filter(cam => cam.model.toLowerCase().includes('basler') || cam.model.startsWith('acA') || cam.model.startsWith('daA') || cam.model.startsWith('a2A') || cam.model.startsWith('a4A') || cam.model.startsWith('puA'));
                } else if (category === 'cognex') {
                    currentFilteredData = cameraData.filter(cam => cam.model.toLowerCase().includes('cognex') || cam.model.startsWith('CIC') || cam.model.startsWith('IS') || cam.model.startsWith('DM'));
                } else {
                    currentFilteredData = cameraData;
                }
                currentPage = 1;
                renderTable(currentFilteredData);
            } else if (btn.dataset.lensCategory) {
                // Lens categories
                const lensBtns = document.querySelectorAll('.inner-tab-btn[data-lens-category]');
                lensBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const lensCategory = btn.dataset.lensCategory;
                const faContent = document.getElementById('lens-fa-content');
                const teleContent = document.getElementById('lens-tele-content');

                if (lensCategory === 'fa') {
                    faContent.style.display = 'block';
                    teleContent.style.display = 'none';
                } else if (lensCategory === 'tele') {
                    faContent.style.display = 'none';
                    teleContent.style.display = 'block';
                }
            } else if (btn.dataset.visionTool) {
                // Vision Lab tools
                const visionBtns = document.querySelectorAll('.inner-tab-btn[data-vision-tool]');
                visionBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const tool = btn.dataset.visionTool;
                const lightingContent = document.getElementById('vision-lighting-content');
                const converterContent = document.getElementById('vision-converter-content');

                if (tool === 'lighting') {
                    lightingContent.style.display = 'block';
                    converterContent.style.display = 'none';
                } else if (tool === 'converter') {
                    lightingContent.style.display = 'none';
                    converterContent.style.display = 'block';

                    // Sync processed image from Lighting Sim if available
                    const convCanvas = document.getElementById('conv-source-canvas');
                    const convSourcePlaceholder = document.getElementById('conv-source-placeholder');
                    // Use the internal processingCanvas which contains the processed image
                    if (processingCanvas && processingCanvas.width > 0 && processingCanvas.height > 0 && convCanvas) {
                        const ctx = convCanvas.getContext('2d');
                        convCanvas.width = processingCanvas.width;
                        convCanvas.height = processingCanvas.height;
                        ctx.drawImage(processingCanvas, 0, 0);

                        // Hide source placeholder since we have an image
                        if (convSourcePlaceholder) convSourcePlaceholder.style.display = 'none';

                        // Update the internal state for conversion with processed image data
                        if (typeof updateConverterState === 'function') {
                            updateConverterState(ctx.getImageData(0, 0, convCanvas.width, convCanvas.height));
                        }
                    }
                }
            }
            requestAnimationFrame(updateStickyTabsTop);
        });
    });



    // System Status Animation
    setInterval(() => {
        const bars = document.querySelectorAll('.progress');
        bars.forEach(bar => {
            const current = parseInt(bar.style.width) || 50;
            const change = (Math.random() - 0.5) * 10;
            const next = Math.max(10, Math.min(95, current + change));
            bar.style.width = next + '%';
        });
    }, 2000);

    // ===== FOV CALCULATOR =====
    const calcLensType = document.getElementById('calc-lens-type');
    const calcFocalLength = document.getElementById('calc-focal-length');
    const calcImageSize = document.getElementById('calc-image-size');
    const calcCameraType = document.getElementById('calc-camera-type');
    const calcSensorSize = document.getElementById('calc-sensor-size');
    const calcWorkingDistance = document.getElementById('calc-working-distance');
    const calcFovWidth = document.getElementById('calc-fov-width');
    const calcFovHeight = document.getElementById('calc-fov-height');
    const calcPixelSize = document.getElementById('calc-pixel-size');
    const calcVisionError = document.getElementById('calc-vision-error');
    const calcFovBtn = document.getElementById('calc-fov-btn');
    const useAdapterRing = document.getElementById('use-adapter-ring');
    const ringLengthContainer = document.getElementById('ring-length-container');
    const calcRingLength = document.getElementById('calc-ring-length');

    // HIK Lens Extension Tube Chart Data (Empirical)
    const HIK_EXTENSION_CHART = {
        // [FocalLength]: { [RingLength]: WD, ... }
        8: { 1: 39, 2: 30 },
        16: { 1: 188, 2: 111, 3: 51, 5: 39, 6: 30, 7: 30 },
        25: { 1: 414, 2: 111, 5: 86, 10: 66, 12: 51, 23: 30, 25: 30, 26: 30, 27: 30 },
        50: { 1: 318, 2: 245, 5: 188, 7: 188, 10: 145, 12: 145, 15: 188, 17: 111, 24: 86, 25: 145, 30: 111, 35: 66, 40: 51, 45: 86, 50: 86 }
    };

    // Toggle Adapter Ring visibility
    if (useAdapterRing) {
        useAdapterRing.addEventListener('change', () => {
            ringLengthContainer.style.display = useAdapterRing.checked ? 'flex' : 'none';
            if (useAdapterRing.checked) {
                syncRingToWD();
            }
        });
    }

    // Link Ring Length and Working Distance
    function syncRingToWD() {
        if (!useAdapterRing.checked) return;
        const focalLength = parseFloat(calcFocalLength.value.replace(/[^\d.]/g, ''));
        const ringLength = parseFloat(calcRingLength.value);
        if (!focalLength || isNaN(ringLength)) return;

        const chart = HIK_EXTENSION_CHART[focalLength];
        if (chart && chart[ringLength]) {
            calcWorkingDistance.value = chart[ringLength];
        } else {
            // Priority 2 removed: No theoretical fallback
            alert('Note: This Lens and Ring combination is outside the standard manufacturer test chart.');
            calcWorkingDistance.value = '';
        }
    }

    function syncWDToRing() {
        if (!useAdapterRing.checked) return;
        const focalLength = parseFloat(calcFocalLength.value.replace(/[^\d.]/g, ''));
        const wd = parseFloat(calcWorkingDistance.value);
        if (!focalLength || !wd) return;

        const chart = HIK_EXTENSION_CHART[focalLength];
        if (chart) {
            // Find ring length that points to this WD (or closest)
            let bestRing = null;
            let minDiff = Infinity;
            for (const [ring, chartWD] of Object.entries(chart)) {
                const diff = Math.abs(chartWD - wd);
                if (diff < minDiff) {
                    minDiff = diff;
                    bestRing = ring;
                }
            }
            if (minDiff < 5) { // If close enough to a chart value
                calcRingLength.value = bestRing;
                return;
            }
        }

        // Priority 2 removed: No theoretical fallback
        calcRingLength.value = '';
    }

    if (calcRingLength) {
        calcRingLength.addEventListener('input', syncRingToWD);
    }
    if (calcWorkingDistance) {
        calcWorkingDistance.addEventListener('input', syncWDToRing);
    }

    // Reusable function for searchable select (Autocomplete)
    // filterFn is an optional function(item) => boolean to dynamically filter data
    function initSearchableSelect(inputId, resultsId, data, onSelect, filterFn) {
        const input = document.getElementById(inputId);
        const results = document.getElementById(resultsId);
        if (!input || !results) return;

        input.addEventListener('focus', () => {
            renderResults(input.value);
            results.classList.add('active');
        });

        input.addEventListener('input', () => {
            renderResults(input.value);
            results.classList.add('active');
        });

        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !results.contains(e.target)) {
                results.classList.remove('active');
            }
        });

        function renderResults(query) {
            results.innerHTML = '';
            let pool = data;
            // Apply dynamic filter if provided
            if (typeof filterFn === 'function') {
                pool = data.filter(filterFn);
            }
            const filtered = pool.filter(item =>
                item.model.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 50);

            if (filtered.length === 0) {
                results.innerHTML = '<div class="search-select-item">No results found</div>';
                return;
            }

            filtered.forEach(item => {
                const div = document.createElement('div');
                div.className = 'search-select-item';

                const regex = query ? new RegExp(`(${query})`, 'gi') : null;
                const highlighted = regex ? item.model.replace(regex, '<b>$1</b>') : item.model;
                div.innerHTML = highlighted;

                div.addEventListener('click', () => {
                    input.value = item.model;
                    results.classList.remove('active');
                    onSelect(item);
                });
                results.appendChild(div);
            });
        }
    }

    // === Camera-Lens FA Resolution Compatibility ===
    // Track currently selected camera MP for FA calculator
    let faSelectedCameraMP = null;

    /**
     * Returns the allowed lens MP range [min, max] for a given camera megapixel count.
     * Rules (using adjusted thresholds for actual pixel counts vs nominal MP):
     *   Camera ≤ 5MP   → Lens ≤ 6MP   (e.g. CS050: 2448×2048 = 5.01MP actual)
     *   Camera 6–12MP  → Lens 8–12MP  (e.g. CU120: 4024×3036 = 12.22MP actual)
     *   Camera ≥ 16MP  → Lens ≥ 25MP  (e.g. CS200: 5472×3648 = 19.96MP actual)
     *
     * Thresholds: 5.5 and 13 to avoid nominal 5MP/12MP cameras spilling into wrong tier.
     */
    function getAllowedLensMPRange(cameraMP) {
        if (cameraMP <= 5.5) return [0, 6];
        if (cameraMP <= 13) return [8, 12];
        return [25, Infinity];
    }

    /**
     * Check if a given FA lens is compatible with the current camera MP.
     * If no camera is selected yet, all lenses are shown.
     */
    function isLensCompatibleWithCameraMP(lens, cameraMP) {
        if (cameraMP === null || cameraMP === undefined) return true;
        const lensMP = getMPFromModel(lens.model);
        const [minMP, maxMP] = getAllowedLensMPRange(cameraMP);
        return lensMP >= minMP && lensMP <= maxMP;
    }

    // Initialize Searchable Selects for FA Calculator
    // Lens list is filtered based on the currently selected camera resolution
    initSearchableSelect('calc-lens-type', 'calc-lens-results', lensData, (lens) => {
        calcFocalLength.value = lens.focalLength || '';
        calcImageSize.value = lens.imageSize || '';
        syncRingToWD();
    }, (lens) => isLensCompatibleWithCameraMP(lens, faSelectedCameraMP));

    initSearchableSelect('calc-camera-type', 'calc-camera-results', cameraData, (cam) => {
        const dimensions = cam.dimensions || sensorDimensionsMap[cam.sensorSize] || 'N/A';
        calcSensorSize.value = dimensions;
        calcCameraType.dataset.currentRes = cam.resolution || '';

        // Update selected camera MP and clear lens selection if incompatible
        const resParts = cam.resolution.split('×').map(s => parseInt(s.trim()));
        faSelectedCameraMP = (resParts[0] * resParts[1]) / 1000000;

        // Clear current lens selection since compatibility may have changed
        const calcLensType = document.getElementById('calc-lens-type');
        if (calcLensType) {
            const currentLensModel = calcLensType.value;
            if (currentLensModel) {
                const currentLens = lensData.find(l => l.model === currentLensModel);
                if (currentLens && !isLensCompatibleWithCameraMP(currentLens, faSelectedCameraMP)) {
                    calcLensType.value = '';
                    calcFocalLength.value = '';
                    calcImageSize.value = '';
                }
            }
        }
    });

    // Calculate FOV from Working Distance (WD → FOV)
    if (calcFovBtn) {
        calcFovBtn.addEventListener('click', () => {
            // Get focal length in mm
            const focalLengthStr = calcFocalLength.value;
            const focalLength = parseFloat(focalLengthStr.replace(/[^\d.]/g, ''));

            // Get sensor dimensions
            const sensorStr = calcSensorSize.value;
            const sensorParts = sensorStr.split('×').map(s => parseFloat(s.trim()));
            const sensorWidth = sensorParts[0] || 0;
            const sensorHeight = sensorParts[1] || 0;

            // Get working distance
            const workingDistance = parseFloat(calcWorkingDistance.value) || 0;

            if (!focalLength || !sensorWidth || !sensorHeight) {
                alert('Please select both Lens and Camera first!');
                return;
            }

            if (!workingDistance || (useAdapterRing.checked && workingDistance <= focalLength)) {
                alert('Please enter a valid Working Distance (must be greater than Focal Length when using an Adapter Ring)!');
                return;
            }

            let fovWidth, fovHeight;

            if (useAdapterRing && useAdapterRing.checked) {
                // STRICT HIK CHART: Magnification is defined by M = L / f
                const ringLength = parseFloat(calcRingLength.value) || 0;
                if (ringLength <= 0) {
                    alert('Please select an Extension Ring length from the lookup chart!');
                    return;
                }
                const mag = ringLength / focalLength;
                fovWidth = sensorWidth / mag;
                fovHeight = sensorHeight / mag;
            } else {
                // Standard Approximation: FOV = (SensorSize * WD) / f
                fovWidth = (sensorWidth * workingDistance) / focalLength;
                fovHeight = (sensorHeight * workingDistance) / focalLength;
            }

            calcFovWidth.value = fovWidth.toFixed(2);
            calcFovHeight.value = fovHeight.toFixed(2) + ' mm';

            // Calculate Pixel Size and Vision Error
            const resStr = calcCameraType.dataset.currentRes || '';
            const resWidth = parseInt(resStr.split('×')[0]) || 1;
            const pixelSizeVal = fovWidth / resWidth;
            calcPixelSize.value = pixelSizeVal.toFixed(4);
            calcVisionError.value = (pixelSizeVal * 3).toFixed(4);

            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    // Calculate Working Distance from FOV (FOV → WD)
    const calcWdBtn = document.getElementById('calc-wd-btn');
    if (calcWdBtn) {
        calcWdBtn.addEventListener('click', () => {
            // Get focal length in mm
            const focalLengthStr = calcFocalLength.value;
            const focalLength = parseFloat(focalLengthStr.replace(/[^\d.]/g, ''));

            // Get sensor dimensions
            const sensorStr = calcSensorSize.value;
            const sensorParts = sensorStr.split('×').map(s => parseFloat(s.trim()));
            const sensorWidth = sensorParts[0] || 0;
            const sensorHeight = sensorParts[1] || 0;

            // Get FOV Width
            const fovWidth = parseFloat(calcFovWidth.value) || 0;

            if (!focalLength || !sensorWidth || !sensorHeight) {
                alert('Please select both Lens and Camera first!');
                return;
            }

            if (!fovWidth) {
                alert('Please enter FOV Width!');
                return;
            }

            let workingDistance, fovHeight;

            if (useAdapterRing && useAdapterRing.checked) {
                // WD = f * (SensorWidth / FOV + 1)
                const mag = sensorWidth / fovWidth;
                workingDistance = focalLength * (1 + 1 / mag);
                fovHeight = sensorHeight / mag;
            } else {
                // Standard Approximation: WD = (FOV * f) / SensorSize
                workingDistance = (fovWidth * focalLength) / sensorWidth;
                fovHeight = (sensorHeight * workingDistance) / focalLength;
            }

            calcWorkingDistance.value = workingDistance.toFixed(1);
            calcFovHeight.value = fovHeight.toFixed(2) + ' mm';

            // If adapter ring is used, update its length too
            if (useAdapterRing && useAdapterRing.checked) {
                syncWDToRing();
            }

            // Calculate Pixel Size and Vision Error
            const resStr = calcCameraType.dataset.currentRes || '';
            const resWidth = parseInt(resStr.split('×')[0]) || 1;
            const pixelSizeVal = fovWidth / resWidth;
            calcPixelSize.value = pixelSizeVal.toFixed(4);
            calcVisionError.value = (pixelSizeVal * 3).toFixed(4);

            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }


    // ===== TELECENTRIC CALCULATOR =====
    let teleSelectedCameraMP = null;

    function isTeleLensCompatibleWithCameraMP(lens, cameraMP) {
        if (cameraMP === null || cameraMP === undefined) return true;
        const lensSensorSize = lens.sensorSize || '';
        if (lensSensorSize.includes('2/3')) {
            return cameraMP < 5;
        } else if (lensSensorSize.includes('1') || lensSensorSize.includes('1.1')) {
            return cameraMP >= 12;
        }
        return true;
    }

    const teleCalcLensType = document.getElementById('tele-calc-lens-type');
    const teleCalcMagnification = document.getElementById('tele-calc-magnification');
    const teleCalcWdRange = document.getElementById('tele-calc-wd-range');
    const teleCalcCameraType = document.getElementById('tele-calc-camera-type');
    const teleCalcSensorSize = document.getElementById('tele-calc-sensor-size');
    const teleCalcFovWidth = document.getElementById('tele-calc-fov-width');
    const teleCalcFovHeight = document.getElementById('tele-calc-fov-height');
    const teleCalcPixelSize = document.getElementById('tele-calc-pixel-size');
    const teleCalcVisionError = document.getElementById('tele-calc-vision-error');
    const teleCalcFovBtn = document.getElementById('tele-calc-fov-btn');

    // Initialize Searchable Selects for Tele Calculator
    initSearchableSelect('tele-calc-lens-type', 'tele-calc-lens-results', teleLensData, (lens) => {
        teleCalcWdRange.value = lens.workingDistance || '';

        // Try to extract magnification from model or use saved mag
        let mag = lens.mag || '';
        if (!mag) {
            if (lens.model.startsWith('TEC-M')) {
                const numericPart = lens.model.substring(5, 7);
                if (!isNaN(numericPart)) {
                    mag = (parseFloat(numericPart) / 10).toFixed(1);
                }
            } else if (lens.model.startsWith('TEC-V')) {
                if (lens.model.includes('05')) mag = '0.5';
                else if (lens.model.includes('03')) mag = '0.34';
                else if (lens.model.includes('10')) mag = '1.0';
            }
        }
        teleCalcMagnification.value = mag;
    }, (lens) => isTeleLensCompatibleWithCameraMP(lens, teleSelectedCameraMP));

    initSearchableSelect('tele-calc-camera-type', 'tele-calc-camera-results', cameraData, (cam) => {
        const dimensions = cam.dimensions || sensorDimensionsMap[cam.sensorSize] || 'N/A';
        teleCalcSensorSize.value = dimensions;
        teleCalcCameraType.dataset.currentRes = cam.resolution || '';

        // Update selected camera MP and clear lens selection if incompatible
        const resParts = cam.resolution.split('×').map(s => parseInt(s.trim()));
        teleSelectedCameraMP = (resParts[0] * resParts[1]) / 1000000;

        const currentLensModel = teleCalcLensType.value;
        if (currentLensModel) {
            const currentLens = teleLensData.find(l => l.model === currentLensModel);
            if (currentLens && !isTeleLensCompatibleWithCameraMP(currentLens, teleSelectedCameraMP)) {
                teleCalcLensType.value = '';
                teleCalcMagnification.value = '';
                teleCalcWdRange.value = '';
            }
        }
    });

    // Tele FOV Calculation
    if (teleCalcFovBtn) {
        teleCalcFovBtn.addEventListener('click', () => {
            const mag = parseFloat(teleCalcMagnification.value);
            const sensorStr = teleCalcSensorSize.value;
            const sensorParts = sensorStr.split('×').map(s => parseFloat(s.trim()));
            const sensorWidth = sensorParts[0] || 0;
            const sensorHeight = sensorParts[1] || 0;

            if (!mag || !sensorWidth || !sensorHeight) {
                alert('Please select both Telecentric Lens and Camera first!');
                return;
            }

            // FOV = Sensor Size / Magnification
            const fovWidth = sensorWidth / mag;
            const fovHeight = sensorHeight / mag;

            teleCalcFovWidth.value = fovWidth.toFixed(2);
            teleCalcFovHeight.value = fovHeight.toFixed(2) + ' mm';

            // Calculate Pixel Size and Vision Error
            const resStr = teleCalcCameraType.dataset.currentRes || '';
            const resWidth = parseInt(resStr.split('×')[0]) || 1;
            const pixelSizeVal = fovWidth / resWidth;
            teleCalcPixelSize.value = pixelSizeVal.toFixed(4);
            teleCalcVisionError.value = (pixelSizeVal * 3).toFixed(4);

            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    // Helper to extract Megapixel resolution from model name (e.g., -6MPE, -10MP, -25MP)
    // Moved before first usage (used by compatibility functions above)
    function getMPFromModel(model) {
        const match = model.match(/-(\d+)MP/);
        if (match) return parseInt(match[1]);
        const matchE = model.match(/-(\d+)MPE/);
        if (matchE) return parseInt(matchE[1]);

        // Large Format Autofocus (AF) and Large Format (LF) default to high resolution (25MP)
        if (model.startsWith('MVL-AF') || model.startsWith('MVL-LF')) {
            return 25;
        }

        // Telecentric fallback patterns
        if (model.includes('10MP')) return 10;
        if (model.includes('5MP')) return 5;
        if (model.includes('MPC')) return 6; // Often used for 5-6MP
        return 2; // Default low resolution
    }

    // ===== VISION ACCURACY SYNC =====
    if (teleCalcVisionError && teleCalcPixelSize) {
        teleCalcVisionError.addEventListener('input', () => {
            const acc = parseFloat(teleCalcVisionError.value);
            if (!isNaN(acc)) {
                teleCalcPixelSize.value = (acc / 3).toFixed(4);
            }
        });

        teleCalcPixelSize.addEventListener('input', () => {
            const px = parseFloat(teleCalcPixelSize.value);
            if (!isNaN(px)) {
                teleCalcVisionError.value = (px * 3).toFixed(4);
            }
        });
    }

    // ===== TELE HARDWARE RECOMMENDATION (Item 4) =====
    const teleFindHardwareBtn = document.getElementById('tele-calculate-recommendation-btn');
    const teleRecGrid = document.getElementById('tele-rec-grid');

    if (teleFindHardwareBtn) {
        teleFindHardwareBtn.addEventListener('click', () => {
            const desiredFov = parseFloat(teleCalcFovWidth.value);
            const desiredAcc = parseFloat(teleCalcVisionError.value);

            if (!desiredFov || !desiredAcc) {
                alert('Please enter expected FOV Width and Target Accuracy for the Telecentric system!');
                return;
            }

            const targetPixelSize = desiredAcc / 3;
            const requiredResWidth = desiredFov / targetPixelSize;

            let recommendations = [];

            cameraData.forEach(cam => {
                const resParts = cam.resolution.split('×').map(s => parseInt(s.trim()));
                const resW = resParts[0];
                const resH = resParts[1];

                if (resW >= requiredResWidth * 0.8) {
                    const sensorStr = cam.dimensions || sensorDimensionsMap[cam.sensorSize] || '0 × 0';
                    const sensorParts = sensorStr.split('×').map(s => parseFloat(s.trim()));
                    const sW = sensorParts[0];
                    const sH = sensorParts[1];

                    if (sW > 0) {
                        const recMag = sW / desiredFov;

                        let bestLens = null;
                        let minMagDiff = Infinity;

                        teleLensData.forEach(lens => {
                            // Try to extract mag from model or data
                            let lensMag = parseFloat(lens.mag);
                            if (isNaN(lensMag)) {
                                lensMag = 1.0;
                                if (lens.model.startsWith('TEC-M')) {
                                    lensMag = parseFloat(lens.model.substring(5, 7)) / 10;
                                } else if (lens.model.startsWith('TEC-V')) {
                                    if (lens.model.includes('05')) lensMag = 0.5;
                                    else if (lens.model.includes('10')) lensMag = 1.0;
                                    else if (lens.model.includes('03')) lensMag = 0.34;
                                }
                            }

                            const camMP = (resW * resH) / 1000000;

                            // Filter by tele compatibility rules
                            if (!isTeleLensCompatibleWithCameraMP(lens, camMP)) {
                                return;
                            }

                            const diff = Math.abs(lensMag - recMag);
                            const lensMP = getMPFromModel(lens.model);
                            const resMatch = true; // Telecentric matching rules are already strictly enforced above

                            if (diff < minMagDiff) {
                                minMagDiff = diff;
                                bestLens = { ...lens, mag: lensMag, mp: lensMP, resMatch: resMatch };
                            }
                        });

                        if (bestLens) {
                            const actualFov = sW / bestLens.mag;
                            const actualPxSize = actualFov / resW;
                            const actualAcc = actualPxSize * 3;

                            const camMP = (resW * resH) / 1000000;
                            const resPenalty = bestLens.resMatch ? 0 : (camMP - bestLens.mp) * 5;

                            // Calculate match percentage for display (prioritizing accuracy)
                            const accScore = Math.max(0, 100 - (Math.abs(actualAcc - desiredAcc) / desiredAcc) * 100);
                            const fovScore = Math.max(0, 100 - (Math.abs(actualFov - desiredFov) / desiredFov) * 100);
                            const matchPercent = accScore * 0.9 + fovScore * 0.1;

                            recommendations.push({
                                camera: cam,
                                lens: bestLens,
                                actualWd: parseFloat(bestLens.workingDistance.replace(/[^\d.]/g, '')),
                                actualAcc: actualAcc,
                                actualFov: actualFov,
                                score: matchPercent
                            });
                        }
                    }
                }
            });

            // Lexicographical sorting: Prioritize closest accuracy first, then closest FOV
            recommendations.sort((a, b) => {
                const aAccDiff = Math.abs(a.actualAcc - desiredAcc);
                const bAccDiff = Math.abs(b.actualAcc - desiredAcc);
                if (Math.abs(aAccDiff - bAccDiff) > 0.00001) {
                    return aAccDiff - bAccDiff; // Smaller difference is better (ascending)
                }
                const aFovDiff = Math.abs(a.actualFov - desiredFov);
                const bFovDiff = Math.abs(b.actualFov - desiredFov);
                return aFovDiff - bFovDiff; // Smaller difference is better (ascending)
            });
            const top2 = recommendations.slice(0, 2);

            if (top2.length > 0) {
                renderTeleRecommendations(top2);
            } else {
                teleRecGrid.innerHTML = '<div class="recommendation-card placeholder"><p>No matching Telecentric hardware configuration found.</p></div>';
            }
        });
    }

    function renderTeleRecommendations(recs) {
        teleRecGrid.innerHTML = '';
        recs.forEach((rec, index) => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <div class="rec-header">
                    <span class="rec-badge" style="background: var(--purple);">TELE OPTION ${index + 1}</span>
                    <i data-lucide="check-circle" style="color: var(--purple); width: 16px;"></i>
                </div>
                <div class="rec-item">
                    <div class="rec-icon"><i data-lucide="camera" style="color: var(--purple);"></i></div>
                    <div class="rec-details">
                        <h4>${rec.camera.model}</h4>
                        <p>${rec.camera.resolution} | ${rec.camera.sensorSize}</p>
                    </div>
                </div>
                <div class="rec-item">
                    <div class="rec-icon"><i data-lucide="focus" style="color: var(--purple);"></i></div>
                    <div class="rec-details">
                        <h4>${rec.lens.model}</h4>
                        <p>Res: ${rec.lens.mp}MP | Mag: ${rec.lens.mag}x | WD: ${rec.lens.workingDistance}</p>
                    </div>
                </div>
                <div class="rec-stats">
                    <div class="rec-stat">
                        <span class="rec-stat-label">Actual FOV</span>
                        <span class="rec-stat-value" style="color: var(--purple);">${rec.actualFov.toFixed(2)} mm</span>
                    </div>
                    <div class="rec-stat">
                        <span class="rec-stat-label">Accuracy</span>
                        <span class="rec-stat-value" style="color: var(--purple);">${rec.actualAcc.toFixed(4)} mm</span>
                    </div>
                    <div class="rec-stat">
                        <span class="rec-stat-label">Score</span>
                        <span class="rec-stat-value" style="color: var(--purple);">${rec.score.toFixed(1)}%</span>
                    </div>
                </div>
                <button class="action-btn view-tele-rec-3d-btn" style="margin-top: 0.75rem; width: 100%; justify-content: center; gap: 0.5rem; background: rgba(139, 92, 246, 0.15); border-color: var(--purple); color: var(--purple); font-weight: 500;">
                    <i data-lucide="box"></i> Simulate 3D Telecentric Concept
                </button>
            `;
            const btn3d = card.querySelector('.view-tele-rec-3d-btn');
            if (btn3d) {
                btn3d.addEventListener('click', () => {
                    const wdRange = rec.lens.workingDistance || '100';
                    const wdVal = parseFloat(wdRange.replace(/[^\d.]/g, '')) || 100;
                    open3DConceptModal({
                        cameraName: rec.camera.model,
                        sensorSize: rec.camera.sensorSize,
                        lensName: rec.lens.model + ' (Telecentric)',
                        focalLength: 'β=' + (rec.lens.mag || '1.0') + 'x',
                        extensionLength: 0,
                        workingDistance: wdVal,
                        fovWidth: rec.actualFov,
                        fovHeight: rec.actualFov * 0.75,
                        pixelSize: rec.actualAcc / 3,
                        isTelecentric: true
                    });
                });
            }
            teleRecGrid.appendChild(card);
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }



    // Admin Controls: Add and Delete Products
    const addLensBtn = document.getElementById('add-lens-btn');
    const deleteLensBtn = document.getElementById('delete-lens-btn');

    if (addLensBtn) {
        addLensBtn.addEventListener('click', () => {
            const activeLensCategory = document.querySelector('.inner-tab-btn[data-lens-category].active').dataset.lensCategory;
            const newModel = prompt('Enter Product Model:', 'NEW-MODEL-01');
            if (!newModel) return;

            if (activeLensCategory === 'fa') {
                const focalLength = prompt('Enter Focal Length (mm):', '16 mm') || '16 mm';
                const imageSize = prompt('Enter Max Image Circle:', 'Ø11 mm (2/3")') || 'Ø11 mm (2/3")';
                lensData.unshift({ model: newModel, focalLength: focalLength, imageSize: imageSize });
                saveLensData();
                renderLensTable(lensData);
            } else {
                const sensorSize = prompt('Enter Sensor Size:', '2/3"') || '2/3"';
                const workingDistance = prompt('Enter Working Distance:', '110 mm') || '110 mm';
                const mag = prompt('Enter Magnification (β):', '1.0') || '1.0';
                teleLensData.unshift({ model: newModel, sensorSize: sensorSize, workingDistance: workingDistance, mag: mag });
                saveTeleLensData();
                renderTeleTable(teleLensData);
            }
        });
    }

    if (deleteLensBtn) {
        deleteLensBtn.addEventListener('click', () => {
            const activeLensCategory = document.querySelector('.inner-tab-btn[data-lens-category].active').dataset.lensCategory;
            const tbodyId = activeLensCategory === 'fa' ? 'lens-tbody' : 'tele-tbody';
            const selectedRow = document.querySelector(`#${tbodyId} tr.selected-row`);

            if (!selectedRow) {
                alert('Please click a product row in the table to delete.');
                return;
            }

            const modelName = selectedRow.querySelector('.model-name').textContent;

            if (confirm(`Confirm deletion of: ${modelName}?`)) {
                if (activeLensCategory === 'fa') {
                    const idx = lensData.findIndex(l => l.model === modelName);
                    if (idx !== -1) {
                        lensData.splice(idx, 1);
                        saveLensData();
                    }
                    searchInput.dispatchEvent(new Event('input'));
                } else {
                    const idx = teleLensData.findIndex(l => l.model === modelName);
                    if (idx !== -1) {
                        teleLensData.splice(idx, 1);
                        saveTeleLensData();
                    }
                    searchInput.dispatchEvent(new Event('input'));
                }
            }
        });
    }

    const editLensBtn = document.getElementById('edit-lens-btn');
    if (editLensBtn) {
        editLensBtn.addEventListener('click', () => {
            const activeLensCategory = document.querySelector('.inner-tab-btn[data-lens-category].active').dataset.lensCategory;
            const tbodyId = activeLensCategory === 'fa' ? 'lens-tbody' : 'tele-tbody';
            const selectedRow = document.querySelector(`#${tbodyId} tr.selected-row`);

            if (!selectedRow) {
                alert('Please click a product row in the table to edit.');
                return;
            }

            const modelName = selectedRow.querySelector('.model-name').textContent;

            if (activeLensCategory === 'fa') {
                const idx = lensData.findIndex(l => l.model === modelName);
                if (idx !== -1) {
                    const item = lensData[idx];
                    const newModel = prompt('Edit Model:', item.model);
                    if (!newModel) return;
                    const focalLength = prompt('Edit Focal Length (mm):', item.focalLength) || item.focalLength;
                    const imageSize = prompt('Edit Max Image Circle:', item.imageSize) || item.imageSize;

                    lensData[idx] = { model: newModel, focalLength: focalLength, imageSize: imageSize };
                    saveLensData();
                    renderLensTable(lensData);
                    alert('Lens specifications updated successfully!');
                }
            } else {
                const idx = teleLensData.findIndex(l => l.model === modelName);
                if (idx !== -1) {
                    const item = teleLensData[idx];
                    const newModel = prompt('Edit Model:', item.model);
                    if (!newModel) return;
                    const sensorSize = prompt('Edit Sensor Size:', item.sensorSize) || item.sensorSize;
                    const workingDistance = prompt('Edit Working Distance:', item.workingDistance) || item.workingDistance;
                    const mag = prompt('Edit Magnification (β):', item.mag || '1.0') || (item.mag || '1.0');

                    teleLensData[idx] = { model: newModel, sensorSize: sensorSize, workingDistance: workingDistance, mag: mag };
                    saveTeleLensData();
                    renderTeleTable(teleLensData);
                    alert('Lens specifications updated successfully!');
                }
            }
        });
    }

    const addCameraBtn = document.getElementById('add-camera-btn');
    const deleteCameraBtn = document.getElementById('delete-camera-btn');

    if (addCameraBtn) {
        addCameraBtn.addEventListener('click', () => {
            const newModel = prompt('Enter Camera Model:', 'MV-CS000-NEW');
            if (!newModel) return;
            const res = prompt('Enter Resolution (e.g., 1920 × 1200):', '1920 × 1200') || '1920 × 1200';
            const sensor = prompt('Enter Sensor Size (e.g., 1/1.8"):', '1/1.8"') || '1/1.8"';
            cameraData.unshift({ model: newModel, resolution: res, sensorSize: sensor });
            saveCameraData();
            // Re-render current category
            const activeBtn = document.querySelector('.inner-tab-btn[data-category].active');
            if (activeBtn) activeBtn.click();
        });
    }

    if (deleteCameraBtn) {
        deleteCameraBtn.addEventListener('click', () => {
            const selectedRow = document.querySelector(`#camera-tbody tr.selected-row`);

            if (!selectedRow) {
                alert('Please click a camera row in the table to delete.');
                return;
            }

            const modelName = selectedRow.querySelector('.model-name').textContent;

            if (confirm(`Confirm deletion of: ${modelName}?`)) {
                const idx = cameraData.findIndex(c => c.model === modelName);
                if (idx !== -1) {
                    cameraData.splice(idx, 1);
                    saveCameraData();
                }

                if (searchInput.value) {
                    searchInput.dispatchEvent(new Event('input'));
                } else {
                    const activeBtn = document.querySelector('.inner-tab-btn[data-category].active');
                    if (activeBtn) activeBtn.click();
                }
            }
        });
    }

    const editCameraBtn = document.getElementById('edit-camera-btn');
    if (editCameraBtn) {
        editCameraBtn.addEventListener('click', () => {
            const selectedRow = document.querySelector(`#camera-tbody tr.selected-row`);

            if (!selectedRow) {
                alert('Please click a camera row in the table to edit.');
                return;
            }

            const modelName = selectedRow.querySelector('.model-name').textContent;
            const idx = cameraData.findIndex(c => c.model === modelName);

            if (idx !== -1) {
                const item = cameraData[idx];
                const newModel = prompt('Edit Model:', item.model);
                if (!newModel) return;
                const res = prompt('Edit Resolution (e.g., 1920 × 1200):', item.resolution) || item.resolution;
                const sensor = prompt('Edit Sensor Size (e.g., 1/1.8"):', item.sensorSize) || item.sensorSize;
                const dims = prompt('Edit W × H dimensions (mm) (e.g., 7.20 × 5.40 or leave blank):', item.dimensions || '') || item.dimensions || '';

                cameraData[idx] = { model: newModel, resolution: res, sensorSize: sensor, dimensions: dims };
                saveCameraData();

                // Re-render
                const activeBtn = document.querySelector('.inner-tab-btn[data-category].active');
                if (activeBtn) activeBtn.click();
                alert('Camera specifications updated successfully!');
            }
        });
    }

    // Export Data (JSON)
    const exportDataBtn = document.getElementById('export-data-btn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
            const fullData = {
                cameraData: cameraData,
                lensData: lensData,
                teleLensData: teleLensData,
                exportDate: new Date().toISOString()
            };
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullData, null, 4));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "vision_system_data.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    }

    // Import Data (JSON)
    const importDataBtn = document.getElementById('import-data-btn');
    const importDataInput = document.getElementById('import-data-input');

    if (importDataBtn && importDataInput) {
        importDataBtn.addEventListener('click', () => {
            importDataInput.click();
        });

        importDataInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    if (importedData.cameraData && importedData.lensData && importedData.teleLensData) {
                        if (confirm('Confirm importing data from file? All current configuration will be replaced.')) {
                            cameraData = importedData.cameraData;
                            lensData = importedData.lensData;
                            teleLensData = importedData.teleLensData;

                            saveCameraData();
                            saveLensData();
                            saveTeleLensData();

                            // Re-render
                            renderTable(cameraData);
                            renderLensTable(lensData);
                            renderTeleTable(teleLensData);

                            alert('System configuration loaded successfully!');
                        }
                    } else {
                        alert('Invalid file format. Please select a JSON configuration file exported from this application.');
                    }
                } catch (error) {
                    alert('Error reading file. Please select a valid JSON file.');
                }
            };
            reader.readAsText(file);
            importDataInput.value = ''; // Reset input
        });
    }

    const logoutBtn = document.getElementById('user-logout-trigger');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', typeof handleLogout === 'function' ? handleLogout : () => { });
    }

    // ===== LIGHTING SIMULATION LOGIC =====
    const lightUploadArea = document.getElementById('light-upload-area');
    const lightFileInput = document.getElementById('light-file-input');
    const lightSimImage = document.getElementById('light-sim-image');
    const lightPreviewWrapper = document.getElementById('light-preview-wrapper');
    const noImagePlaceholder = document.querySelector('.no-image-placeholder');
    const lightModeButtons = document.querySelectorAll('.light-mode-btn');
    const lightIntensity = document.getElementById('light-intensity');
    const lightContrast = document.getElementById('light-contrast');
    const lightThreshold = document.getElementById('light-threshold');
    const lightEdge = document.getElementById('light-edge');
    const thresholdContainer = document.getElementById('threshold-container');
    const edgeContainer = document.getElementById('edge-container');
    const lightCameraBtn = document.getElementById('light-camera-btn');
    const cameraPreviewContainer = document.getElementById('camera-preview-container');
    const cameraVideo = document.getElementById('camera-video');
    const cameraCaptureBtn = document.getElementById('camera-capture-btn');

    // processingCanvas is declared at the top of DOMContentLoaded scope
    processingCanvas = document.createElement('canvas');
    let originalLightImageData = null;
    let cameraStream = null;

    // Handle Image Upload
    if (lightUploadArea) {
        lightUploadArea.addEventListener('click', () => lightFileInput.click());

        lightUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            lightUploadArea.style.borderColor = 'var(--accent)';
        });

        lightUploadArea.addEventListener('dragleave', () => {
            lightUploadArea.style.borderColor = 'var(--glass-border)';
        });

        lightUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleLightImage(file);
            }
        });
    }

    if (lightFileInput) {
        lightFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleLightImage(file);
        });
    }

    function handleLightImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                lightSimImage.src = img.src;
                lightSimImage.style.display = 'block';
                noImagePlaceholder.style.display = 'none';

                // Prepare Canvas for processing
                processingCanvas.width = img.naturalWidth;
                processingCanvas.height = img.naturalHeight;
                const ctx = processingCanvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                originalLightImageData = ctx.getImageData(0, 0, processingCanvas.width, processingCanvas.height);

                applyLightingEffects();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Camera Logic
    if (lightCameraBtn) {
        lightCameraBtn.addEventListener('click', async () => {
            if (cameraStream) return; // Already running

            try {
                cameraStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' } // Prefer back camera
                });
                cameraVideo.srcObject = cameraStream;
                cameraPreviewContainer.style.display = 'block';
                lightCameraBtn.innerHTML = '<i data-lucide="camera-off"></i><span>Stop Camera</span>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("Unable to access camera. Please verify device permissions.");
            }
        });
    }

    if (cameraCaptureBtn) {
        cameraCaptureBtn.addEventListener('click', () => {
            if (!cameraStream) return;

            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = cameraVideo.videoWidth;
            tempCanvas.height = cameraVideo.videoHeight;
            const ctx = tempCanvas.getContext('2d');
            ctx.drawImage(cameraVideo, 0, 0);

            const dataUrl = tempCanvas.toDataURL('image/png');

            // Set as current image
            lightSimImage.src = dataUrl;
            lightSimImage.style.display = 'block';
            noImagePlaceholder.style.display = 'none';

            // Store for processing
            processingCanvas.width = tempCanvas.width;
            processingCanvas.height = tempCanvas.height;
            const pCtx = processingCanvas.getContext('2d');
            pCtx.drawImage(tempCanvas, 0, 0);
            originalLightImageData = pCtx.getImageData(0, 0, processingCanvas.width, processingCanvas.height);

            // Cleanup camera
            stopCamera();
            applyLightingEffects();
        });
    }

    function stopCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }
        cameraPreviewContainer.style.display = 'none';
        lightCameraBtn.innerHTML = '<i data-lucide="camera"></i><span>Take Snapshot</span>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Handle Light Mode Selection
    const lightTipText = document.getElementById('light-tip-text');
    const lightingTips = {
        'none': 'Normal ambient lighting for general viewing.',
        'coaxial': 'Best for flat specular surfaces, hidden engravings, or reflective barcodes.',
        'ring-flat': 'General inspection, providing bright and even direct illumination.',
        'darkfield': 'Highlights surface defects, scratches, dust, and embossed text.',
        'backlight': 'Ideal for silhouetting parts, measuring dimensions, and edge detection.',
        'dome': 'Shadow-free lighting for shiny, curved, or irregular surfaces.',
        'bar': 'Highlights surface texture or creates shadows to show depth.',
        'diffuse': 'Uniform soft lighting to minimize glare on moderately reflective parts.'
    };

    lightModeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            lightModeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.dataset.light;
            if (lightTipText) lightTipText.textContent = lightingTips[mode] || lightingTips['none'];

            // Apply mode class to wrapper
            lightPreviewWrapper.className = 'preview-wrapper mode-' + mode;
            applyLightingEffects();
        });
    });

    // Handle Sliders
    if (lightIntensity) lightIntensity.addEventListener('input', applyLightingEffects);
    if (lightContrast) lightContrast.addEventListener('input', applyLightingEffects);
    if (lightThreshold) lightThreshold.addEventListener('input', applyLightingEffects);
    if (lightEdge) lightEdge.addEventListener('input', applyLightingEffects);

    function applyLightingEffects() {
        if (!originalLightImageData) return;

        const mode = document.querySelector('.light-mode-btn.active').dataset.light;
        const intensity = parseInt(lightIntensity.value) / 100; // Normalize to 0-1.5
        const contrast = parseInt(lightContrast.value) / 100;   // Normalize to 0-2
        const threshold = parseInt(lightThreshold.value);
        const edgeSens = parseInt(lightEdge.value);

        // Show/Hide specific sliders based on mode
        thresholdContainer.style.display = mode === 'backlight' ? 'block' : 'none';
        edgeContainer.style.display = mode === 'darkfield' ? 'block' : 'none';

        const ctx = processingCanvas.getContext('2d');
        const width = originalLightImageData.width;
        const height = originalLightImageData.height;
        const imageData = new ImageData(
            new Uint8ClampedArray(originalLightImageData.data),
            width,
            height
        );
        const data = imageData.data;
        const tempData = new Uint8ClampedArray(originalLightImageData.data);

        // Center point for radial calculations
        const cx = width / 2;
        const cy = height / 2;
        const maxRadius = Math.sqrt(cx * cx + cy * cy);

        // ===== PIXEL-LEVEL PROCESSING FOR EACH LIGHT MODE =====
        switch (mode) {
            case 'none': // Normal - ambient lighting with even illumination
                for (let i = 0; i < data.length; i += 4) {
                    for (let c = 0; c < 3; c++) {
                        let val = data[i + c];
                        val = ((val / 255 - 0.5) * contrast + 0.5) * 255 * intensity;
                        data[i + c] = Math.max(0, Math.min(255, val));
                    }
                }
                break;

            case 'coaxial': // Coaxial - highlights flat surfaces, specular response
                for (let y = 1; y < height - 1; y++) {
                    for (let x = 1; x < width - 1; x++) {
                        const i = (y * width + x) * 4;

                        // Calculate local gradient as a proxy for surface tilt
                        const leftGray = (tempData[i - 4] + tempData[i - 3] + tempData[i - 2]) / 3;
                        const rightGray = (tempData[i + 4] + tempData[i + 5] + tempData[i + 6]) / 3;
                        const topGray = (tempData[i - width * 4] + tempData[i - width * 4 + 1] + tempData[i - width * 4 + 2]) / 3;
                        const bottomGray = (tempData[i + width * 4] + tempData[i + width * 4 + 1] + tempData[i + width * 4 + 2]) / 3;

                        const gx = rightGray - leftGray;
                        const gy = bottomGray - topGray;
                        const gradient = Math.sqrt(gx * gx + gy * gy);

                        // Physics: Flat surfaces (low gradient) reflect most light back
                        const flatness = Math.exp(-gradient / 15);
                        const luminance = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);

                        for (let c = 0; c < 3; c++) {
                            let val = data[i + c];
                            // Boost flat areas, darken tilted areas
                            val = val * (0.6 + 0.8 * flatness);
                            // Highlight already bright areas (specular)
                            if (luminance > 200) val *= 1.2;

                            val = ((val / 255 - 0.5) * contrast * 1.1 + 0.5) * 255 * intensity;
                            data[i + c] = Math.max(0, Math.min(255, val));
                        }
                    }
                }
                break;

            case 'ring-flat': // Ring Flat - Directional ring light, emphasizes detail
                for (let y = 1; y < height - 1; y++) {
                    for (let x = 1; x < width - 1; x++) {
                        const i = (y * width + x) * 4;
                        const distFromCenter = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
                        const falloff = 1.0 - (distFromCenter / maxRadius) * 0.2;

                        // Shading based on gradient (simulating ring light angle)
                        const gx = (tempData[i + 4] - tempData[i - 4]);
                        const gy = (tempData[i + width * 4] - tempData[i - width * 4]);
                        const tilt = (gx + gy) * 0.15; // 45-degree effective lighting angle

                        for (let c = 0; c < 3; c++) {
                            let val = data[i + c];
                            val += tilt * intensity * 20; // Add micro-shading
                            val = ((val / 255 - 0.5) * contrast + 0.5) * 255 * intensity * falloff;
                            data[i + c] = Math.max(0, Math.min(255, val));
                        }
                    }
                }
                break;

            case 'darkfield': // Dark Field - Extreme contrast, only edges visible
                const dfThreshold = edgeSens;
                for (let y = 1; y < height - 1; y++) {
                    for (let x = 1; x < width - 1; x++) {
                        const i = (y * width + x) * 4;

                        // Sobel operator
                        let gx = 0, gy = 0;
                        for (let ky = -1; ky <= 1; ky++) {
                            for (let kx = -1; kx <= 1; kx++) {
                                const kidx = ((y + ky) * width + (x + kx)) * 4;
                                const gray = (tempData[kidx] + tempData[kidx + 1] + tempData[kidx + 2]) / 3;
                                const k = (ky + 1) * 3 + (kx + 1);
                                const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
                                const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
                                gx += gray * sobelX[k];
                                gy += gray * sobelY[k];
                            }
                        }

                        const mag = Math.sqrt(gx * gx + gy * gy);
                        // Hard cutoff for background, exponential boost for edges
                        let val = mag > dfThreshold ? Math.pow(mag / dfThreshold, 1.5) * 20 : 0;
                        val *= intensity * 2;

                        data[i] = data[i + 1] = data[i + 2] = Math.min(255, val);
                    }
                }
                break;

            case 'backlight': // Backlight - Sharp silhouette with blooming
                const bloomRadius = 3;
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const i = (y * width + x) * 4;
                        const lum = (tempData[i] * 0.299 + tempData[i + 1] * 0.587 + tempData[i + 2] * 0.114);

                        if (lum > threshold) {
                            data[i] = data[i + 1] = data[i + 2] = 255;
                        } else {
                            // Check for blooming (light leaking from nearby bright areas)
                            let isNearLight = false;
                            for (let dy = -bloomRadius; dy <= bloomRadius; dy++) {
                                if (isNearLight) break;
                                for (let dx = -bloomRadius; dx <= bloomRadius; dx++) {
                                    const nx = x + dx, ny = y + dy;
                                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                                        const ni = (ny * width + nx) * 4;
                                        if ((tempData[ni] * 0.299 + tempData[ni + 1] * 0.587 + tempData[ni + 2] * 0.114) > threshold) {
                                            isNearLight = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            // Apply soft glow at transition
                            data[i] = data[i + 1] = data[i + 2] = isNearLight ? 50 * intensity : 0;
                        }
                    }
                }
                break;

            case 'dome': // Diffuse Dome - Uniform, low-contrast, soft shadows
                for (let i = 0; i < data.length; i += 4) {
                    for (let c = 0; c < 3; c++) {
                        let val = data[i + c];
                        // High dynamic range compression (Shadow lift)
                        val = 255 * Math.pow(val / 255, 0.7);
                        val = ((val / 255 - 0.5) * contrast * 0.5 + 0.5) * 255 * intensity;
                        data[i + c] = Math.max(0, Math.min(255, val));
                    }
                }
                break;

            case 'bar': // Bar Light - Sharp directional side light
                for (let y = 1; y < height - 1; y++) {
                    for (let x = 1; x < width - 1; x++) {
                        const i = (y * width + x) * 4;
                        // Light from 45 degree top-left
                        const gx = (tempData[i + 4] - tempData[i - 4]);
                        const gy = (tempData[i + width * 4] - tempData[i - width * 4]);
                        const shadowing = (gx + gy) * 0.4;

                        for (let c = 0; c < 3; c++) {
                            let val = data[i + c];
                            val += shadowing * intensity * 25;
                            val = ((val / 255 - 0.5) * contrast + 0.5) * 255 * intensity;
                            data[i + c] = Math.max(0, Math.min(255, val));
                        }
                    }
                }
                break;

            case 'diffuse': // Diffuse Area - Balanced, minimal highlights
                for (let i = 0; i < data.length; i += 4) {
                    const lum = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114);
                    const suppression = lum > 220 ? 0.7 : 1.0; // Reduce hot spots
                    for (let c = 0; c < 3; c++) {
                        let val = data[i + c] * suppression;
                        val = ((val / 255 - 0.5) * contrast * 0.9 + 0.5) * 255 * intensity;
                        data[i + c] = Math.max(0, Math.min(255, val));
                    }
                }
                break;

            default:
                for (let i = 0; i < data.length; i += 4) {
                    for (let c = 0; c < 3; c++) {
                        let val = data[i + c];
                        val = ((val / 255 - 0.5) * contrast + 0.5) * 255 * intensity;
                        data[i + c] = Math.max(0, Math.min(255, val));
                    }
                }
        }

        // Write processed image to canvas and display
        ctx.putImageData(imageData, 0, 0);
        lightSimImage.src = processingCanvas.toDataURL();
        lightSimImage.style.filter = 'none'; // All processing done in canvas

        // Overlay adjustments
        const overlay = document.getElementById('light-overlay-layer');
        if (overlay) {
            overlay.style.opacity = intensity;
        }
    }

    // ===== IMAGE CONVERTER LOGIC =====
    const convUploadArea = document.getElementById('conv-upload-area');
    const convFileInput = document.getElementById('conv-file-input');
    const convSourceCanvas = document.getElementById('conv-source-canvas');
    const convResultCanvas = document.getElementById('conv-result-canvas');
    const convModeSelect = document.getElementById('conv-mode-select');
    const convDownloadBtn = document.getElementById('conv-download-btn');
    const convSourcePlaceholder = document.getElementById('conv-source-placeholder');
    const convResultPlaceholder = document.getElementById('conv-result-placeholder');

    let originalImageData = null;

    window.updateConverterState = (imgData) => {
        originalImageData = imgData;
        if (convSourcePlaceholder) convSourcePlaceholder.style.display = 'none';
        processConversion();
        if (convDownloadBtn) convDownloadBtn.disabled = false;
    };

    if (convUploadArea) {
        convUploadArea.addEventListener('click', () => convFileInput.click());
        convFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleConverterFile(file);
        });
    }

    function handleConverterFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Setup Source Canvas
                convSourceCanvas.width = img.width;
                convSourceCanvas.height = img.height;
                const ctx = convSourceCanvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                originalImageData = ctx.getImageData(0, 0, img.width, img.height);
                convSourcePlaceholder.style.display = 'none';

                // Trigger conversion
                processConversion();
                convDownloadBtn.disabled = false;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function encodeBMP(imageData) {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;

        // Row size in bytes (padded to 4 byte boundary)
        const rowSize = Math.floor((24 * width + 31) / 32) * 4;
        const pixelDataSize = rowSize * height;
        const fileSize = 14 + 40 + pixelDataSize;

        const buffer = new ArrayBuffer(fileSize);
        const view = new DataView(buffer);

        // --- BMP FILE HEADER (14 bytes) ---
        view.setUint16(0, 0x4D42, true); // "BM"
        view.setUint32(2, fileSize, true);
        view.setUint16(6, 0, true); // reserved 1
        view.setUint16(8, 0, true); // reserved 2
        view.setUint32(10, 14 + 40, true); // offset to pixel data

        // --- DIB HEADER (BITMAPINFOHEADER - 40 bytes) ---
        view.setUint32(14, 40, true); // size of this header
        view.setInt32(18, width, true);
        view.setInt32(22, height, true); // positive means bottom-up
        view.setUint16(26, 1, true); // planes
        view.setUint16(28, 24, true); // bit count (24-bit RGB)
        view.setUint32(30, 0, true); // compression (none)
        view.setUint32(34, pixelDataSize, true); // size of raw bitmap data
        view.setInt32(38, 2835, true); // x pixels per meter (approx 72dpi)
        view.setInt32(42, 2835, true); // y pixels per meter
        view.setUint32(46, 0, true); // colors in palette
        view.setUint32(50, 0, true); // important colors

        // --- PIXEL DATA ---
        // BMP is stored bottom-up, BGR
        let offset = 54;
        for (let y = height - 1; y >= 0; y--) {
            const rowStart = y * width * 4;
            for (let x = 0; x < width; x++) {
                const i = rowStart + (x * 4);
                view.setUint8(offset++, data[i + 2]); // B
                view.setUint8(offset++, data[i + 1]); // G
                view.setUint8(offset++, data[i]);     // R
            }
            // Padding
            for (let p = 0; p < rowSize - width * 3; p++) {
                view.setUint8(offset++, 0);
            }
        }

        return new Blob([buffer], { type: 'image/bmp' });
    }

    if (convModeSelect) {
        convModeSelect.addEventListener('change', processConversion);
    }

    function processConversion() {
        if (!originalImageData) return;

        const mode = convModeSelect.value;
        const width = originalImageData.width;
        const height = originalImageData.height;

        convResultCanvas.width = width;
        convResultCanvas.height = height;
        const ctx = convResultCanvas.getContext('2d');
        const resultImageData = ctx.createImageData(width, height);

        const src = originalImageData.data;
        const dst = resultImageData.data;

        for (let i = 0; i < src.length; i += 4) {
            const r = src[i];
            const g = src[i + 1];
            const b = src[i + 2];
            const a = src[i + 3];

            let mono = 0;

            switch (mode) {
                case 'intensity': // G601
                    mono = 0.299 * r + 0.587 * g + 0.114 * b;
                    break;
                case 'red':
                    mono = r;
                    break;
                case 'green':
                    mono = g;
                    break;
                case 'blue':
                    mono = b;
                    break;
                case 'hsi-i':
                    mono = (r + g + b) / 3;
                    break;
                case 'hsi-s': {
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    mono = max === 0 ? 0 : (1 - min / max) * 255;
                    break;
                }
                case 'hsi-h': {
                    // Approximate Hue calculation (0-360 mapped to 0-255)
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    const delta = max - min;
                    let h = 0;
                    if (delta === 0) h = 0;
                    else if (max === r) h = 60 * (((g - b) / delta) % 6);
                    else if (max === g) h = 60 * (((b - r) / delta) + 2);
                    else if (max === b) h = 60 * (((r - g) / delta) + 4);
                    if (h < 0) h += 360;
                    mono = (h / 360) * 255;
                    break;
                }
            }

            dst[i] = dst[i + 1] = dst[i + 2] = mono;
            dst[i + 3] = a;
        }

        ctx.putImageData(resultImageData, 0, 0);
        convResultPlaceholder.style.display = 'none';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (convDownloadBtn) {
        convDownloadBtn.addEventListener('click', async () => {
            if (!convResultCanvas) return;

            const ctx = convResultCanvas.getContext('2d');
            const imageData = ctx.getImageData(0, 0, convResultCanvas.width, convResultCanvas.height);
            const bmpBlob = encodeBMP(imageData);
            const fileName = `mono_converted_${convModeSelect.value}.bmp`;

            // Try File System Access API (Save As Dialog)
            if ('showSaveFilePicker' in window) {
                try {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: fileName,
                        types: [{
                            description: 'BMP Image',
                            accept: { 'image/bmp': ['.bmp'] },
                        }],
                    });
                    const writable = await handle.createWritable();
                    await writable.write(bmpBlob);
                    await writable.close();
                } catch (err) {
                    // User cancelled or error
                    console.log('Save cancelled or failed', err);
                }
            } else {
                // Fallback for older browsers
                const url = URL.createObjectURL(bmpBlob);
                const link = document.createElement('a');
                link.download = fileName;
                link.href = url;
                link.click();
                setTimeout(() => URL.revokeObjectURL(url), 100);
            }
        });
    }

    // Close modal on background click
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) hideLoginModal();
    });

    // ===== VISION ACCURACY SYNC =====
    if (calcVisionError && calcPixelSize) {
        calcVisionError.addEventListener('input', () => {
            const acc = parseFloat(calcVisionError.value);
            if (!isNaN(acc)) {
                calcPixelSize.value = (acc / 3).toFixed(4);
            }
        });

        calcPixelSize.addEventListener('input', () => {
            const px = parseFloat(calcPixelSize.value);
            if (!isNaN(px)) {
                calcVisionError.value = (px * 3).toFixed(4);
            }
        });
    }

    // ===== HARDWARE RECOMMENDATION ALGORITHM (Item 4) =====
    const findHardwareBtn = document.getElementById('calculate-recommendation-btn');
    const recGrid = document.getElementById('rec-grid');

    if (findHardwareBtn) {
        findHardwareBtn.addEventListener('click', () => {
            const desiredFov = parseFloat(calcFovWidth.value);
            const desiredWd = parseFloat(calcWorkingDistance.value);
            const desiredAcc = parseFloat(calcVisionError.value);

            if (!desiredFov || !desiredWd || !desiredAcc) {
                alert('Please enter expected FOV Width, Working Distance, and Target Accuracy!');
                return;
            }

            const targetPixelSize = desiredAcc / 3;
            const requiredResWidth = desiredFov / targetPixelSize;

            let recommendations = [];

            // Iterate through cameras
            cameraData.forEach(cam => {
                const resParts = cam.resolution.split('×').map(s => parseInt(s.trim()));
                const resW = resParts[0];
                const resH = resParts[1];

                if (resW >= requiredResWidth * 0.8) { // Allow slight tolerance
                    const sensorStr = cam.dimensions || sensorDimensionsMap[cam.sensorSize] || '0 × 0';
                    const sensorParts = sensorStr.split('×').map(s => parseFloat(s.trim()));
                    const sW = sensorParts[0];
                    const sH = sensorParts[1];

                    if (sW > 0) {
                        const recFL = (sW * desiredWd) / desiredFov;

                        // Find best matching lens
                        let bestLens = null;
                        let minFlDiff = Infinity;

                        lensData.forEach(lens => {
                            const lensFL = parseFloat(lens.focalLength.replace(/[^\d.]/g, ''));
                            const diff = Math.abs(lensFL - recFL);

                            // Image size check
                            const lensD = parseFloat(lens.imageSize.replace(/[^\d.]/g, '')) || 0;
                            const camD = Math.sqrt(sW * sW + sH * sH);

                            // Resolution compatibility check (strict tier matching)
                            const camMP = (resW * resH) / 1000000;
                            const lensMP = getMPFromModel(lens.model);
                            const [minAllowedMP, maxAllowedMP] = getAllowedLensMPRange(camMP);
                            const isCompatible = lensMP >= minAllowedMP && lensMP <= maxAllowedMP;

                            // Only consider lenses that are resolution-compatible
                            if (diff < minFlDiff && lensD >= camD * 0.9 && isCompatible) {
                                minFlDiff = diff;
                                bestLens = { ...lens, mp: lensMP, resMatch: true };
                            }
                        });

                        if (bestLens) {
                            const lensFL = parseFloat(bestLens.focalLength.replace(/[^\d.]/g, ''));
                            const actualWd = (desiredFov * lensFL) / sW;
                            const actualPxSize = desiredFov / resW;
                            const actualAcc = actualPxSize * 3;

                            const camMP = (resW * resH) / 1000000;
                            const resPenalty = bestLens.resMatch ? 0 : (camMP - bestLens.mp) * 5;

                            recommendations.push({
                                camera: cam,
                                lens: bestLens,
                                actualWd: actualWd,
                                actualAcc: actualAcc,
                                score: Math.abs(actualAcc - desiredAcc) + Math.abs(actualWd - desiredWd) / 10 + resPenalty
                            });
                        }
                    }
                }
            });

            // Sort by score (lower is better) and pick top 2
            recommendations.sort((a, b) => a.score - b.score);
            const top2 = recommendations.slice(0, 2);

            if (top2.length > 0) {
                renderRecommendations(top2);
            } else {
                recGrid.innerHTML = '<div class="recommendation-card placeholder"><p>No matching hardware configuration found. Try adjusting accuracy or modifying FOV / Working Distance.</p></div>';
            }
        });
    }

    function renderRecommendations(recs) {
        recGrid.innerHTML = '';
        recs.forEach((rec, index) => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <div class="rec-header">
                    <span class="rec-badge">OPTION ${index + 1}</span>
                    <i data-lucide="check-circle" style="color: var(--green); width: 16px;"></i>
                </div>
                <div class="rec-item">
                    <div class="rec-icon"><i data-lucide="camera"></i></div>
                    <div class="rec-details">
                        <h4>${rec.camera.model}</h4>
                        <p>${rec.camera.resolution} | ${rec.camera.sensorSize}</p>
                    </div>
                </div>
                <div class="rec-item">
                    <div class="rec-icon"><i data-lucide="aperture"></i></div>
                    <div class="rec-details">
                        <h4>${rec.lens.model}</h4>
                        <p>Res: ${rec.lens.mp}MP | FL: ${rec.lens.focalLength} | ${rec.lens.imageSize}</p>
                    </div>
                </div>
                <div class="rec-stats">
                    <div class="rec-stat">
                        <span class="rec-stat-label">Actual WD</span>
                        <span class="rec-stat-value">${rec.actualWd.toFixed(1)} mm</span>
                    </div>
                    <div class="rec-stat">
                        <span class="rec-stat-label">Accuracy</span>
                        <span class="rec-stat-value">${rec.actualAcc.toFixed(4)} mm</span>
                    </div>
                    <div class="rec-stat">
                        <span class="rec-stat-label">Match Score</span>
                        <span class="rec-stat-value">${(100 - rec.score).toFixed(1)}%</span>
                    </div>
                </div>
                <button class="action-btn view-rec-3d-btn" style="margin-top: 0.75rem; width: 100%; justify-content: center; gap: 0.5rem; background: rgba(0, 242, 255, 0.12); border-color: var(--accent); color: var(--accent); font-weight: 500;">
                    <i data-lucide="box"></i> Simulate 3D Concept
                </button>
            `;
            const btn3d = card.querySelector('.view-rec-3d-btn');
            if (btn3d) {
                btn3d.addEventListener('click', () => {
                    const fovW = parseFloat(document.getElementById('calc-fov-width').value) || 80;
                    const fovH = parseFloat(document.getElementById('calc-fov-height').value) || (fovW * 0.75);
                    const extLen = document.getElementById('use-adapter-ring')?.checked ? (parseFloat(document.getElementById('calc-ring-length')?.value) || 5) : 0;
                    open3DConceptModal({
                        cameraName: rec.camera.model,
                        sensorSize: rec.camera.sensorSize,
                        lensName: rec.lens.model,
                        focalLength: rec.lens.focalLength,
                        extensionLength: extLen,
                        workingDistance: rec.actualWd,
                        fovWidth: fovW,
                        fovHeight: fovH,
                        pixelSize: rec.actualAcc / 3
                    });
                });
            }
            recGrid.appendChild(card);
        });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // ===== THEME TOGGLE LOGIC =====
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('vision-theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', 'moon');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            let newTheme = 'dark';
            let iconName = 'sun';

            if (currentTheme !== 'light') {
                newTheme = 'light';
                iconName = 'moon';
            }

            // Apply theme
            if (newTheme === 'light') {
                document.body.setAttribute('data-theme', 'light');
            } else {
                document.body.removeAttribute('data-theme');
            }

            // Save preference
            localStorage.setItem('vision-theme', newTheme);

            // Change icon
            if (themeIcon) {
                // Update icon inner HTML
                themeIcon.setAttribute('data-lucide', iconName);
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    }

    // ===== EXT CALCULATOR LOGIC =====
    const extData = {
        computar: {
            title: "Computar lens Extension tube chart",
            columns: ["M0814-MP2", "M1214-MP2", "M1614-MP2", "M2514-MP2", "M3514-MP", "M5018-MP2", "M7528-MP"],
            wds: [30, 39, 51, 66, 86, 111, 145, 188, 245, 318, 414],
            values: {
                "M0814-MP2": { 30: 0.5, 39: 0.5 },
                "M1214-MP2": { 30: 2, 39: 1.5, 51: 1, 66: 1, 86: 0.5 },
                "M1614-MP2": { 30: 5, 39: 4, 51: 3, 66: 2, 86: 1.5, 111: 1, 145: 0.5, 188: 0.5 },
                "M2514-MP2": { 30: 15, 39: 15, 51: 10, 66: 5, 86: 5, 111: 1 },
                "M3514-MP": { 30: 25, 39: 20, 51: 15, 66: 15, 86: 10, 111: 5, 145: 5, 188: 1 },
                "M5018-MP2": { 39: 175, 51: 90, 66: 55, 86: 35, 111: 25, 145: 15, 188: 10, 245: 10, 318: 5, 414: 2 },
                "M7528-MP": { 30: 65, 39: 55, 51: 45, 66: 35, 86: 30, 111: 20, 145: 20, 188: 10, 245: 5 }
            }
        },
        "hik-5mp": {
            title: "HIK lens Extension tube chart 5MP",
            columns: ["8", "12", "16", "25", "35", "50", "75"],
            wds: [30, 39, 51, 66, 86, 111, 145, 188, 245, 318, 414],
            values: {
                "8": { 30: "1;2", 39: "1", 51: "1;2", 66: "1", 86: "1" },
                "12": { 30: "not have ext" },
                "16": { 30: "5;6;7", 39: "5", 51: "2;3", 66: "2;3", 86: "2;3", 111: "2", 145: "2", 188: "1", 245: "1", 318: "1" },
                "25": { 30: "23;25;26;27", 51: "12", 66: "10", 86: "5", 111: "2", 145: "1;2", 188: "1;2", 245: "1;2", 318: "1;2", 414: "1" },
                "35": { 30: "not have ext" },
                "50": { 86: "45;50", 111: "30", 145: "25", 188: "15", 245: "5;10", 318: "5", 414: "1;2;5;7" },
                "75": {}
            }
        },
        "hik-6mp": {
            title: "HIK lens Extension tube chart 6MP",
            columns: ["8", "12", "16", "25", "35", "50", "75"],
            wds: [30, 39, 51, 66, 86, 111, 145, 188, 245, 318, 414],
            values: {
                "8": { 30: "1;2", 39: "1;2", 51: "1", 66: "1", 86: "1", 111: "1", 145: "1", 188: "1" },
                "12": { 30: "not have ext" },
                "16": { 30: "3", 39: "2;3", 51: "2", 66: "1;2", 86: "1;2", 111: "1;2", 145: "1;2", 188: "1", 245: "1", 318: "1", 414: "1" },
                "25": { 30: "EXT problem" },
                "35": { 30: "not have ext" },
                "50": { 51: "40", 66: "35", 86: "24", 111: "17", 145: "10;12", 188: "7;8;10", 245: "2;3;5;7", 318: "1;2;3;5;6;7", 414: "1;2;3;5;6" },
                "75": {}
            }
        }
    };

    // Load custom extension values from localStorage if available
    try {
        const savedExtData = localStorage.getItem('vision_extData');
        if (savedExtData) {
            const parsed = JSON.parse(savedExtData);
            Object.keys(parsed).forEach(brand => {
                if (extData[brand]) {
                    extData[brand].values = parsed[brand].values;
                }
            });
        }
    } catch (e) {
        console.error("Failed to load saved extData:", e);
    }

    const extBrandSelect = document.getElementById('ext-brand-select');
    const extLensSelect = document.getElementById('ext-lens-select');
    const extWdSelect = document.getElementById('ext-wd-select');
    const extResultDisplay = document.getElementById('ext-result-display');
    const extResultNote = document.getElementById('ext-result-note');
    const extInteractiveThead = document.getElementById('ext-interactive-thead');
    const extInteractiveTbody = document.getElementById('ext-interactive-tbody');
    const extEditBtn = document.getElementById('ext-edit-btn');

    function populateLenses(brand) {
        if (!extLensSelect) return;
        extLensSelect.innerHTML = '';
        const columns = extData[brand].columns;
        columns.forEach(col => {
            const opt = document.createElement('option');
            opt.value = col;
            opt.textContent = brand.startsWith('hik') ? `${col} mm` : col;
            extLensSelect.appendChild(opt);
        });
    }

    function populateWds(brand) {
        if (!extWdSelect) return;
        extWdSelect.innerHTML = '';
        const wds = extData[brand].wds;
        wds.forEach(wd => {
            const opt = document.createElement('option');
            opt.value = wd;
            opt.textContent = `${wd} mm`;
            extWdSelect.appendChild(opt);
        });
    }

    function calculateExt() {
        if (!extBrandSelect || !extLensSelect || !extWdSelect || !extResultDisplay || !extResultNote) return;

        const brand = extBrandSelect.value;
        const lens = extLensSelect.value;
        const wd = parseInt(extWdSelect.value, 10);

        if (!brand || !lens || isNaN(wd)) {
            extResultDisplay.textContent = '--';
            extResultNote.textContent = 'Select parameters to calculate';
            return;
        }

        const brandInfo = extData[brand];
        const valMap = brandInfo.values[lens] || {};
        const rawVal = valMap[wd];

        const wrapper = document.querySelector('.ext-result-wrapper');

        if (rawVal === undefined || rawVal === null || rawVal === "") {
            extResultDisplay.textContent = 'N/A';
            extResultDisplay.style.color = 'var(--text-secondary)';
            extResultNote.textContent = 'This configuration is not supported (Grey Area)';
            if (wrapper) {
                wrapper.style.borderColor = 'var(--glass-border)';
                wrapper.style.boxShadow = 'none';
                wrapper.style.background = 'rgba(255, 255, 255, 0.02)';
            }
        } else if (rawVal === 'not have ext') {
            extResultDisplay.textContent = 'None';
            extResultDisplay.style.color = 'var(--orange)';
            extResultNote.textContent = 'Extension ring not required for this working distance';
            if (wrapper) {
                wrapper.style.borderColor = 'var(--orange)';
                wrapper.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.15)';
                wrapper.style.background = 'rgba(245, 158, 11, 0.03)';
            }
        } else if (rawVal === 'EXT problem') {
            extResultDisplay.textContent = 'Error';
            extResultDisplay.style.color = 'var(--red)';
            extResultNote.textContent = 'Incompatible configuration for extension ring';
            if (wrapper) {
                wrapper.style.borderColor = 'var(--red)';
                wrapper.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.15)';
                wrapper.style.background = 'rgba(239, 68, 68, 0.03)';
            }
        } else {
            const thickness = typeof rawVal === 'number' ? `${rawVal} mm` : `${rawVal} mm`;
            extResultDisplay.textContent = thickness;
            extResultDisplay.style.color = 'var(--accent)';
            extResultNote.textContent = `Install ${thickness} extension tube ring(s) to achieve this Working Distance`;
            if (wrapper) {
                wrapper.style.borderColor = 'var(--accent)';
                wrapper.style.boxShadow = '0 0 20px var(--accent-glow)';
                wrapper.style.background = 'rgba(0, 242, 255, 0.05)';
            }
        }
    }

    function saveExtData() {
        try {
            localStorage.setItem('vision_extData', JSON.stringify(extData));
        } catch (e) {
            console.error("Failed to save extData:", e);
        }
    }

    function editSelectedExtValue() {
        if (currentUserRole !== 'Admin') {
            alert('Admin privilege required for editing.');
            return;
        }
        const brand = extBrandSelect.value;
        const lens = extLensSelect.value;
        const wd = parseInt(extWdSelect.value, 10);

        if (!brand || !lens || isNaN(wd)) {
            alert('Please select Lens and Working Distance first.');
            return;
        }

        const brandInfo = extData[brand];
        const valMap = brandInfo.values[lens] || {};
        const currentVal = valMap[wd] !== undefined ? valMap[wd] : '';

        const promptMsg = `Enter new Extension Value for:\nBrand: ${brand.toUpperCase()}\nLens: ${lens}\nWD: ${wd} mm\n\n(Example: 1;2 or 5 or "not have ext" or "EXT problem". Leave blank to clear):`;
        const newValRaw = prompt(promptMsg, currentVal);

        if (newValRaw === null) return; // User cancelled
        const newVal = newValRaw.trim();

        // Initialize lens value map if it doesn't exist
        if (!brandInfo.values[lens]) {
            brandInfo.values[lens] = {};
        }

        if (newVal === '') {
            // Remove the value
            delete brandInfo.values[lens][wd];
        } else {
            // Save as number if it is a valid positive number
            if (!isNaN(newVal) && newVal !== '' && !newVal.includes(';') && !newVal.includes(',')) {
                brandInfo.values[lens][wd] = parseFloat(newVal);
            } else {
                brandInfo.values[lens][wd] = newVal;
            }
        }

        // Save to localStorage
        saveExtData();

        // Refresh UI
        renderExtTable(brand);
        calculateExt();
    }

    if (extEditBtn) {
        extEditBtn.addEventListener('click', editSelectedExtValue);
    }

    function updateTableHighlight() {
        if (!extInteractiveTbody || !extInteractiveThead || !extLensSelect || !extWdSelect) return;
        const selectedLens = extLensSelect.value;
        const selectedWd = extWdSelect.value;

        // Remove existing highlights
        const allCells = extInteractiveTbody.querySelectorAll('.ext-cell');
        allCells.forEach(cell => {
            cell.classList.remove('highlight-row', 'highlight-col', 'highlight-cell');
            cell.style.background = '';
            cell.style.boxShadow = '';
            cell.style.borderColor = '';
            cell.style.color = '';
        });

        const allRowHeaders = extInteractiveTbody.querySelectorAll('tr');
        allRowHeaders.forEach(row => {
            const firstCell = row.querySelector('td:first-child');
            if (firstCell) {
                firstCell.style.background = 'rgba(255, 255, 255, 0.02)';
                firstCell.style.color = 'var(--text-secondary)';
            }
        });

        const allColHeaders = extInteractiveThead.querySelectorAll('th');
        allColHeaders.forEach(th => {
            th.style.background = '';
            th.style.color = '';
        });

        if (!selectedLens || !selectedWd) return;

        // Highlight column header
        const colHeader = extInteractiveThead.querySelector(`th[data-col-id="${selectedLens}"]`);
        if (colHeader) {
            colHeader.style.background = 'rgba(0, 242, 255, 0.15)';
            colHeader.style.color = 'var(--accent)';
        }

        // Highlight row first column cell (WD)
        const targetRow = extInteractiveTbody.querySelector(`tr[data-row-wd="${selectedWd}"]`);
        if (targetRow) {
            const rowHeader = targetRow.querySelector('td:first-child');
            if (rowHeader) {
                rowHeader.style.background = 'rgba(0, 242, 255, 0.15)';
                rowHeader.style.color = 'var(--accent)';
            }
        }

        // Highlight column cells
        const colCells = extInteractiveTbody.querySelectorAll(`.ext-cell[data-col-id="${selectedLens}"]`);
        colCells.forEach(cell => {
            cell.classList.add('highlight-col');
            cell.style.background = 'rgba(0, 242, 255, 0.02)';
        });

        // Highlight row cells
        if (targetRow) {
            const rowCells = targetRow.querySelectorAll('.ext-cell');
            rowCells.forEach(cell => {
                cell.classList.add('highlight-row');
                cell.style.background = cell.style.background ? 'rgba(0, 242, 255, 0.04)' : 'rgba(0, 242, 255, 0.02)';
            });
        }

        // Highlight intersection cell
        const intersectionCell = extInteractiveTbody.querySelector(`.ext-cell[data-col-id="${selectedLens}"][data-row-wd="${selectedWd}"]`);
        if (intersectionCell) {
            intersectionCell.classList.add('highlight-cell');
            intersectionCell.style.background = 'rgba(0, 242, 255, 0.2)';
            intersectionCell.style.borderColor = 'var(--accent)';
            intersectionCell.style.boxShadow = '0 0 10px var(--accent-glow)';
            intersectionCell.style.color = '#fff';
        }
    }

    function renderExtTable(brand) {
        if (!extInteractiveThead || !extInteractiveTbody) return;
        const brandInfo = extData[brand];
        const columns = brandInfo.columns;
        const wds = brandInfo.wds;

        // Render Head
        let headHtml = `<tr><th style="width: 100px; text-align: center; background: rgba(0, 242, 255, 0.05); font-weight: 600; border-bottom: 2px solid var(--glass-border); padding: 0.75rem;">WD (mm)</th>`;
        columns.forEach(col => {
            const displayName = brand.startsWith('hik') ? `${col} mm` : col;
            headHtml += `<th style="text-align: center; font-weight: 600; border-bottom: 2px solid var(--glass-border); padding: 0.75rem;" data-col-id="${col}">${displayName}</th>`;
        });
        headHtml += '</tr>';
        extInteractiveThead.innerHTML = headHtml;

        // Render Body
        let bodyHtml = '';
        wds.forEach(wd => {
            bodyHtml += `<tr data-row-wd="${wd}"><td style="text-align: center; font-weight: 600; background: rgba(255, 255, 255, 0.02); border-bottom: 1px solid var(--glass-border); padding: 0.75rem;">${wd}</td>`;
            columns.forEach(col => {
                const valMap = brandInfo.values[col] || {};
                const val = valMap[wd];

                let displayVal = '';
                let cellClass = '';
                let style = 'text-align: center; cursor: pointer; transition: all 0.2s ease; border-bottom: 1px solid var(--glass-border); padding: 0.75rem;';

                if (val === undefined || val === null || val === "") {
                    displayVal = '-';
                    cellClass = 'cell-disabled';
                    if (currentUserRole === 'Admin') {
                        style += ' opacity: 0.45; background: rgba(255, 255, 255, 0.03); cursor: cell; border: 1px dashed var(--glass-border);';
                    } else {
                        style += ' opacity: 0.25; background: rgba(255, 255, 255, 0.01); cursor: not-allowed;';
                    }
                } else if (val === 'not have ext') {
                    displayVal = 'No Ext';
                    cellClass = 'cell-no-ext';
                    style += ' color: var(--orange); font-weight: 500; background: rgba(245, 158, 11, 0.05);';
                } else if (val === 'EXT problem') {
                    displayVal = 'EXT Prob';
                    cellClass = 'cell-error';
                    style += ' color: var(--red); font-weight: 500; background: rgba(239, 68, 68, 0.05);';
                } else {
                    displayVal = val;
                    cellClass = 'cell-value';
                    style += ' color: var(--text-primary);';
                }

                bodyHtml += `<td class="ext-cell ${cellClass}" data-col-id="${col}" data-row-wd="${wd}" style="${style}">${displayVal}</td>`;
            });
            bodyHtml += '</tr>';
        });
        extInteractiveTbody.innerHTML = bodyHtml;

        // Attach click & dblclick listeners to cells
        const cells = extInteractiveTbody.querySelectorAll('.ext-cell');
        cells.forEach(cell => {
            const col = (cell.dataset && cell.dataset.colId) || cell.getAttribute('data-col-id');
            const wd = (cell.dataset && cell.dataset.rowWd) || cell.getAttribute('data-row-wd');

            cell.addEventListener('click', () => {
                if (currentUserRole !== 'Admin' && cell.classList.contains('cell-disabled')) return;

                if (extLensSelect) extLensSelect.value = col;
                if (extWdSelect) extWdSelect.value = wd;

                updateTableHighlight();
                calculateExt();
            });

            cell.addEventListener('dblclick', () => {
                if (currentUserRole === 'Admin') {
                    if (extLensSelect) extLensSelect.value = col;
                    if (extWdSelect) extWdSelect.value = wd;
                    updateTableHighlight();
                    calculateExt();
                    editSelectedExtValue();
                }
            });
        });

        updateTableHighlight();
    }

    function initExtCalculator() {
        if (!extBrandSelect) return;

        // Rebuild dropdowns and table when brand changes
        extBrandSelect.addEventListener('change', () => {
            const brand = extBrandSelect.value;
            populateLenses(brand);
            populateWds(brand);
            renderExtTable(brand);
            calculateExt();
        });

        // Calculate when lens or WD changes
        if (extLensSelect) {
            extLensSelect.addEventListener('change', () => {
                updateTableHighlight();
                calculateExt();
            });
        }

        if (extWdSelect) {
            extWdSelect.addEventListener('change', () => {
                updateTableHighlight();
                calculateExt();
            });
        }

        // Initialize with default brand (computar)
        const initialBrand = extBrandSelect.value || 'computar';
        populateLenses(initialBrand);
        populateWds(initialBrand);
        renderExtTable(initialBrand);
        calculateExt();
    }

    // Call init
    initExtCalculator();

    // ===== 3D CONCEPT SIMULATION ENGINE =====
    let scene3D, camera3D, renderer3D, controls3D, transformControls3D = null;
    let components3DGroup = null;
    let activeLightGroup3D = null;
    let activeLightGroup2_3D = null;     // 2nd (lower) light when dual-light mode is on
    let baseLight2PosY = 0;
    let activeWorkGroup3D = null;
    let activeCamAssemblyGroup3D = null;
    let activeFovGroup3D = null;         // FOV optical cone group — rebuilt when workpiece moves
    let activeTransformTarget = null;
    let baseLightPosY = 0;
    let baseWorkGroupPosY = 0;
    let baseCamAssemblyPosYVal = 0;
    let animFrame3DId = null;
    let dimensionGroup3D = null;
    let showWdLwdAnnotation = true;
    let dimAnnotationWD = 150;   // Y world position of WD top tick (controls line endpoint)
    let dimAnnotationLWD = 30;   // Y world position of LWD top tick (controls line endpoint)
    let dimLabelWD = 150;        // displayed text value on WD label (editable independently)
    let dimLabelLWD = 30;        // displayed text value on LWD label (editable independently)
    // 3D positions for label projection (world Y values)
    let dimAnnotWDTopY = 0;
    let dimAnnotWDBottomY = 0;
    let dimAnnotLWDTopY = 0;
    let dimAnnotLWDBottomY = 0;
    let dimAnnotXPos = 0;        // auto-computed base X offset (read-only reference)
    let dimWDXOffset = 0;        // user-adjustable X position of WD line (horizontal drag)
    let dimLWDXOffset = 0;       // user-adjustable X position of LWD line (horizontal drag)

    let current3DConfig = {
        cameraName: 'HIKMV-CA050-10GM',
        sensorSize: '2/3" (8.8 × 6.6 mm)',
        lensName: 'FA 12mm F1.4',
        focalLength: '12mm',
        extensionLength: 5,
        workingDistance: 150,
        fovWidth: 80,
        fovHeight: 60,
        pixelSize: 0.025,
        lightType: 'ring',
        lightColor: 'white',
        lightCount: 1,          // 1 or 2 lights
        light2Type: 'bar',      // type of 2nd light (lower)
        light2Color: 'white',
        lightGap: 45,           // vertical distance between light 1 (upper) and light 2 (lower), mm
        workpiece: 'pcb',
        showFov: true,
        showDims: true
    };

    // Snapshot of the config at the moment the modal was first opened — used by the Reset button
    let initialOpen3DConfig = null;

    const modal3D = document.getElementById('modal-3d-concept');
    const close3DBtn = document.getElementById('close-3d-modal-btn');
    const export3DBtnTop = document.getElementById('export-3d-btn-top');
    const export3DBtnBottom = document.getElementById('btn-export-3d-png');
    const reset3DCamBtn = document.getElementById('reset-3d-cam-btn');

    const select3DLightType = document.getElementById('select-3d-light-type');
    const select3DLightColor = document.getElementById('select-3d-light-color');
    const select3DWorkpiece = document.getElementById('select-3d-workpiece');
    const chk3DShowFov = document.getElementById('chk-3d-show-fov');
    const chk3DShowDims = document.getElementById('chk-3d-show-dims');

    function init3DConceptViewer() {
        const canvas = document.getElementById('canvas-3d');
        if (!canvas || typeof THREE === 'undefined') return;

        const container = canvas.parentElement;
        const width = container.clientWidth || 800;
        const height = container.clientHeight || 500;

        scene3D = new THREE.Scene();
        scene3D.background = new THREE.Color(0xffffff);

        camera3D = new THREE.PerspectiveCamera(45, width / height, 0.1, 4000);
        camera3D.position.set(240, 220, 300);

        renderer3D = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        renderer3D.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer3D.setSize(width, height);
        renderer3D.setClearColor(0xffffff, 1);
        renderer3D.shadowMap.enabled = true;
        renderer3D.shadowMap.type = THREE.PCFSoftShadowMap;

        if (typeof THREE.OrbitControls !== 'undefined') {
            controls3D = new THREE.OrbitControls(camera3D, renderer3D.domElement);
            controls3D.enableDamping = true;
            controls3D.dampingFactor = 0.05;
            controls3D.maxPolarAngle = Math.PI / 2 + 0.1;
            controls3D.minDistance = 30;
            controls3D.maxDistance = 1500;
        }

        // Ultra-Bright High-Contrast Studio Lighting Setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene3D.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x94a3b8, 0.9);
        hemiLight.position.set(0, 500, 0);
        scene3D.add(hemiLight);

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
        dirLight1.position.set(220, 500, 320);
        dirLight1.castShadow = true;
        scene3D.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0x0284c7, 0.6);
        dirLight2.position.set(-220, 180, -220);
        scene3D.add(dirLight2);

        components3DGroup = new THREE.Group();
        scene3D.add(components3DGroup);

        // TransformControls for interactive drag & rotate on Light Unit
        if (typeof THREE.TransformControls !== 'undefined') {
            transformControls3D = new THREE.TransformControls(camera3D, renderer3D.domElement);
            transformControls3D.setSize(0.75);
            transformControls3D.addEventListener('dragging-changed', function (event) {
                if (controls3D) controls3D.enabled = !event.value;
            });
            transformControls3D.addEventListener('change', function () {
                if (activeTransformTarget) {
                    syncLightSlidersFrom3D();
                }
                if (showWdLwdAnnotation) {
                    drawDimensionAnnotations(current3DConfig);
                }
            });
            scene3D.add(transformControls3D);
        }

        // Canvas Raycaster Click Handler to attach TransformGizmo to 3D targets
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        canvas.addEventListener('pointerdown', (e) => {
            if (!canvas || !camera3D || !scene3D) return;
            if (transformControls3D && transformControls3D.dragging) return;

            const rect = canvas.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera3D);

            const checkTargets = [];
            if (activeWorkGroup3D) checkTargets.push(activeWorkGroup3D);
            if (activeLightGroup3D) checkTargets.push(activeLightGroup3D);
            if (activeLightGroup2_3D) checkTargets.push(activeLightGroup2_3D);
            if (activeCamAssemblyGroup3D) checkTargets.push(activeCamAssemblyGroup3D);

            const intersects = raycaster.intersectObjects(checkTargets, true);
            if (intersects.length > 0) {
                const hitObj = intersects[0].object;
                if (isChildOfObject(hitObj, activeWorkGroup3D)) {
                    select3DTransformTarget(activeWorkGroup3D, 'Workpiece / Product Specimen');
                } else if (isChildOfObject(hitObj, activeLightGroup3D)) {
                    select3DTransformTarget(activeLightGroup3D, light1Label());
                } else if (activeLightGroup2_3D && isChildOfObject(hitObj, activeLightGroup2_3D)) {
                    select3DTransformTarget(activeLightGroup2_3D, 'Light 2 – Lower');
                } else if (isChildOfObject(hitObj, activeCamAssemblyGroup3D)) {
                    select3DTransformTarget(activeCamAssemblyGroup3D, 'Camera & Lens Assembly');
                }
            }
        });

        initLightTransformControls();
        update3DBrightness(65);
        window.addEventListener('resize', on3DWindowResize);
    }

    function on3DWindowResize() {
        const canvas = document.getElementById('canvas-3d');
        if (!canvas || !renderer3D || !camera3D) return;
        const container = canvas.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width > 0 && height > 0) {
            camera3D.aspect = width / height;
            camera3D.updateProjectionMatrix();
            renderer3D.setSize(width, height);
        }
    }

    function animate3D() {
        animFrame3DId = requestAnimationFrame(animate3D);
        if (controls3D) controls3D.update();

        const curProductY = activeWorkGroup3D ? activeWorkGroup3D.position.y : 0;

        // ── Dynamic FOV cone: rebuild when workpiece Y has changed ───────────────
        if (activeFovGroup3D && Math.abs(curProductY - (activeFovGroup3D.userData.lastWorkpieceY || 0)) > 0.05) {
            rebuildFovCone(current3DConfig, curProductY);
        }

        // ── Dynamic WD/LWD annotation lines: redraw when workpiece Y has changed ──
        if (showWdLwdAnnotation) {
            if (dimensionGroup3D && (dimAnnotWDBottomY !== curProductY || dimAnnotLWDBottomY !== curProductY)) {
                if (!window._dimIsRedrawing && scene3D) {
                    window._dimIsRedrawing = true;
                    drawDimensionAnnotations(current3DConfig);
                    window._dimIsRedrawing = false;
                }
            } else if (dimensionGroup3D) {
                updateDimLabelPositions();
            }
        }

        if (renderer3D && scene3D && camera3D) {
            renderer3D.render(scene3D, camera3D);
        }
    }

    // ── Rebuild only the FOV optical cone without rebuilding the full 3D scene ─────────
    function rebuildFovCone(cfg, workpieceY) {
        if (!scene3D || !components3DGroup) return;

        // Remove old cone from group
        if (activeFovGroup3D) {
            components3DGroup.remove(activeFovGroup3D);
            activeFovGroup3D = null;
        }

        if (cfg.showFov === false) return;

        const fovW = Math.max(10, cfg.fovWidth || 80);
        const fovH = Math.max(10, cfg.fovHeight || 60);
        // Lens bottom face is FIXED in world space at Y = workingDistance (camera does not move with workpiece)
        const topLensY = cfg.workingDistance || 150;
        // Cone bottom follows the workpiece surface
        const botY = workpieceY;
        const lightColorHex = getLightColorHex(cfg.lightColor || 'white');

        const fovConeGroup = new THREE.Group();
        fovConeGroup.userData.lastWorkpieceY = workpieceY;

        // 4 corner lines
        const lineMat = new THREE.LineBasicMaterial({ color: lightColorHex, linewidth: 2, transparent: true, opacity: 0.8 });
        const corners = [
            [-fovW / 2, botY, -fovH / 2],
            [ fovW / 2, botY, -fovH / 2],
            [ fovW / 2, botY,  fovH / 2],
            [-fovW / 2, botY,  fovH / 2]
        ];
        corners.forEach(c => {
            const geo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, topLensY, 0),
                new THREE.Vector3(c[0], c[1], c[2])
            ]);
            fovConeGroup.add(new THREE.Line(geo, lineMat));
        });

        // Translucent pyramid volume
        const pyShape = new THREE.BufferGeometry();
        const v = new Float32Array([
            0, topLensY, 0,  -fovW/2, botY, -fovH/2,  fovW/2, botY, -fovH/2,
            0, topLensY, 0,   fovW/2, botY, -fovH/2,  fovW/2, botY,  fovH/2,
            0, topLensY, 0,   fovW/2, botY,  fovH/2, -fovW/2, botY,  fovH/2,
            0, topLensY, 0,  -fovW/2, botY,  fovH/2, -fovW/2, botY, -fovH/2
        ]);
        pyShape.setAttribute('position', new THREE.BufferAttribute(v, 3));
        pyShape.computeVertexNormals();
        const pyMat = new THREE.MeshBasicMaterial({
            color: lightColorHex, transparent: true, opacity: 0.12, side: THREE.DoubleSide
        });
        fovConeGroup.add(new THREE.Mesh(pyShape, pyMat));

        components3DGroup.add(fovConeGroup);
        activeFovGroup3D = fovConeGroup;
    }

    // Drag state for dimension annotation handles
    let draggingDim = null;       // 'wd' | 'lwd'
    let dimDragStartMouseX = 0;
    let dimDragStartMouseY = 0;
    let dimDragStartValue = 0;    // initial WD or LWD mm value
    let dimDragStartXOff = 0;    // initial X world offset of the line being dragged

    // ── Helper: project world point → canvas pixel coords ────────────────────────
    function project3DToScreen(wx, wy, wz) {
        if (!camera3D || !renderer3D) return { x: -999, y: -999, behind: true };
        const v = new THREE.Vector3(wx, wy, wz);
        v.project(camera3D);
        const canvas = renderer3D.domElement;
        return {
            x: (v.x * 0.5 + 0.5) * canvas.clientWidth,
            y: (-v.y * 0.5 + 0.5) * canvas.clientHeight,
            behind: v.z > 1
        };
    }

    function computeWorldYUnitsPerPixel(worldY, xOff) {
        if (!camera3D || !renderer3D) return 1;
        const p0 = project3DToScreen(xOff, worldY, 0);
        const p1 = project3DToScreen(xOff, worldY + 10, 0);
        const d = Math.abs(p1.y - p0.y);
        return d > 0 ? 10 / d : 1;
    }

    function computeWorldXUnitsPerPixel(worldY, xOff) {
        if (!camera3D || !renderer3D) return 1;
        const p0 = project3DToScreen(xOff, worldY, 0);
        const p1 = project3DToScreen(xOff + 10, worldY, 0);
        const d = Math.abs(p1.x - p0.x);
        return d > 0 ? 10 / d : 1;
    }

    // ── Draw 3D dimension lines ───────────────────────────────────────────────────
    function drawDimensionAnnotations(cfg) {
        if (!scene3D) return;

        if (dimensionGroup3D) { scene3D.remove(dimensionGroup3D); dimensionGroup3D = null; }

        if (!showWdLwdAnnotation) { clearDimLabelOverlay(); return; }

        const wd = dimAnnotationWD;
        const lwd = dimAnnotationLWD;
        const fovW = cfg ? Math.max(10, cfg.fovWidth || 80) : 80;
        const baseXOffset = fovW / 2 + 55;

        // Initialise per-line X offsets on first draw (or after config rebuild)
        if (dimWDXOffset === 0) dimWDXOffset = baseXOffset;
        if (dimLWDXOffset === 0) dimLWDXOffset = baseXOffset + 28;
        dimAnnotXPos = baseXOffset;

        dimensionGroup3D = new THREE.Group();
        const mkMat = (hex) => new THREE.LineBasicMaterial({ color: hex, linewidth: 2 });
        const mkDim = (hex) => new THREE.LineBasicMaterial({ color: (hex & 0x666666) | 0x111111, linewidth: 1 });

        function drawDimLine(yTop, yBottom, xOff, colorHex) {
            const mat = mkMat(colorHex);
            const dim = mkDim(colorHex);
            const tick = 8;
            // Vertical shaft
            dimensionGroup3D.add(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(xOff, yTop, 0), new THREE.Vector3(xOff, yBottom, 0)]), mat));
            // Top tick
            dimensionGroup3D.add(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(xOff - tick, yTop, 0), new THREE.Vector3(xOff + tick, yTop, 0)]), mat));
            // Bottom tick
            dimensionGroup3D.add(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(xOff - tick, yBottom, 0), new THREE.Vector3(xOff + tick, yBottom, 0)]), mat));
            // Horizontal guide lines (dim colour, left side only)
            dimensionGroup3D.add(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, yTop, 0), new THREE.Vector3(xOff - 20, yTop, 0)]), dim));
            dimensionGroup3D.add(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, yBottom, 0), new THREE.Vector3(xOff - 20, yBottom, 0)]), dim));
        }

        const productSurfaceY = activeWorkGroup3D ? activeWorkGroup3D.position.y : 0;
        const minAllowedY = productSurfaceY + 0.5;   // WD must stay above surface

        // Stationary top tick positions (Lens bottom face & Light bottom face)
        let wdTopY = (typeof dimAnnotWDTopY !== 'undefined' && dimAnnotWDTopY !== 0 && !window._resetDimTop)
            ? dimAnnotWDTopY
            : wd;
        let lwdTopY = (typeof dimAnnotLWDTopY !== 'undefined' && dimAnnotLWDTopY !== 0 && !window._resetDimTop)
            ? dimAnnotLWDTopY
            : lwd;

        // WD must always stay above the product surface
        if (wdTopY < minAllowedY) wdTopY = minAllowedY;
        // LWD allows negative (backlight: light is below the workpiece)
        // No clamp applied for lwdTopY

        drawDimLine(wdTopY, productSurfaceY, dimWDXOffset, 0xf97316);   // WD  – orange

        // LWD: when backlight (lwdTopY < productSurfaceY), the light is BELOW the workpiece.
        // Draw the line from productSurfaceY DOWN to lwdTopY (swap so yTop > yBottom always).
        if (lwdTopY < productSurfaceY) {
            drawDimLine(productSurfaceY, lwdTopY, dimLWDXOffset, 0x22d3ee);  // backlight – line goes downward
        } else {
            drawDimLine(lwdTopY, productSurfaceY, dimLWDXOffset, 0x22d3ee); // normal – line goes upward
        }

        scene3D.add(dimensionGroup3D);

        dimAnnotWDTopY = wdTopY; dimAnnotWDBottomY = productSurfaceY;
        dimAnnotLWDTopY = lwdTopY; dimAnnotLWDBottomY = productSurfaceY;

        // Label display values — signed: negative when backlight (light below workpiece)
        dimLabelWD = Math.abs(dimAnnotWDTopY - dimAnnotWDBottomY);
        dimLabelLWD = dimAnnotLWDTopY - dimAnnotLWDBottomY;  // signed: negative for backlight

        // Keep sidebar inputs in sync with real-time distance
        const inpWd = document.getElementById('inp-dim-wd');
        const inpLwd = document.getElementById('inp-dim-lwd');
        if (inpWd) inpWd.value = dimLabelWD.toFixed(0);
        if (inpLwd) inpLwd.value = dimLabelLWD.toFixed(0);

        updateDimLabelPositions();
        setupDimDragHandlers();
    }

    function clearDimLabelOverlay() {
        const el = document.getElementById('dim-label-overlay');
        if (el) el.innerHTML = '';
    }

    // ── HTML label overlay (updated every animation frame) ────────────────────────
    function updateDimLabelPositions() {
        if (!camera3D || !renderer3D) return;
        const overlay = document.getElementById('dim-label-overlay');
        if (!overlay) return;
        if (!showWdLwdAnnotation) { overlay.innerHTML = ''; return; }

        const wdMidY = (dimAnnotWDTopY + dimAnnotWDBottomY) / 2;
        const lwdMidY = (dimAnnotLWDTopY + dimAnnotLWDBottomY) / 2;

        const pWDmid = project3DToScreen(dimWDXOffset, wdMidY, 0);
        const pLWDmid = project3DToScreen(dimLWDXOffset, lwdMidY, 0);
        const pWDtop = project3DToScreen(dimWDXOffset, dimAnnotWDTopY, 0);
        const pLWDtop = project3DToScreen(dimLWDXOffset, dimAnnotLWDTopY, 0);

        // Use the independent label values (set by drag OR by the Update button)
        // LWD can be negative (backlight mode: light below workpiece)
        const wdVal = dimLabelWD.toFixed(0);
        const lwdVal = dimLabelLWD.toFixed(0);   // signed – negative shows with minus sign

        // Each label chip: sits next to mid-point, pointer-events:none
        // Each handle circle: sits on top-tick, cursor:move, pointer-events:all
        overlay.innerHTML = `
            ${!pWDmid.behind ? `
            <div style="position:absolute;left:${pWDmid.x + 10}px;top:${pWDmid.y - 14}px;
                background:rgba(10,14,24,0.92);border:1.5px solid #f97316;border-radius:5px;
                padding:3px 10px;font-family:'Orbitron',monospace;font-size:0.72rem;font-weight:700;
                color:#f97316;white-space:nowrap;user-select:none;pointer-events:none;">
                WD = ${wdVal} mm
            </div>
            <div id="dim-drag-wd-top"
                style="position:absolute;left:${pWDtop.x - 10}px;top:${pWDtop.y - 10}px;
                width:20px;height:20px;border-radius:50%;border:2px solid #f97316;
                background:rgba(249,115,22,0.28);cursor:move;pointer-events:all;
                box-shadow:0 0 8px rgba(249,115,22,0.7);display:flex;align-items:center;justify-content:center;">
                <svg width="10" height="10" viewBox="0 0 10 10" style="opacity:.8">
                    <path d="M5 1v8M1 5h8" stroke="#f97316" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
            </div>` : ''}
            ${!pLWDmid.behind ? `
            <div style="position:absolute;left:${pLWDmid.x + 10}px;top:${pLWDmid.y - 14}px;
                background:rgba(10,14,24,0.92);border:1.5px solid #22d3ee;border-radius:5px;
                padding:3px 10px;font-family:'Orbitron',monospace;font-size:0.72rem;font-weight:700;
                color:#22d3ee;white-space:nowrap;user-select:none;pointer-events:none;">
                LWD = ${lwdVal} mm
            </div>
            <div id="dim-drag-lwd-top"
                style="position:absolute;left:${pLWDtop.x - 10}px;top:${pLWDtop.y - 10}px;
                width:20px;height:20px;border-radius:50%;border:2px solid #22d3ee;
                background:rgba(34,211,238,0.2);cursor:move;pointer-events:all;
                box-shadow:0 0 8px rgba(34,211,238,0.6);display:flex;align-items:center;justify-content:center;">
                <svg width="10" height="10" viewBox="0 0 10 10" style="opacity:.8">
                    <path d="M5 1v8M1 5h8" stroke="#22d3ee" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
            </div>` : ''}
        `;

        // Wire pointerdown for the 2-D drag handles
        const wdHandle = document.getElementById('dim-drag-wd-top');
        const lwdHandle = document.getElementById('dim-drag-lwd-top');
        if (wdHandle) {
            wdHandle.addEventListener('pointerdown', (e) => {
                e.stopPropagation(); e.preventDefault();
                draggingDim = 'wd';
                dimDragStartMouseX = e.clientX;
                dimDragStartMouseY = e.clientY;
                dimDragStartValue = dimAnnotationWD;
                dimDragStartXOff = dimWDXOffset;
                wdHandle.setPointerCapture(e.pointerId);
            });
        }
        if (lwdHandle) {
            lwdHandle.addEventListener('pointerdown', (e) => {
                e.stopPropagation(); e.preventDefault();
                draggingDim = 'lwd';
                dimDragStartMouseX = e.clientX;
                dimDragStartMouseY = e.clientY;
                dimDragStartValue = dimAnnotationLWD;
                dimDragStartXOff = dimLWDXOffset;
                lwdHandle.setPointerCapture(e.pointerId);
            });
        }
    }

    // ── One-time global drag handlers ─────────────────────────────────────────────
    function setupDimDragHandlers() {
        if (window._dimDragListenersAttached) return;
        window._dimDragListenersAttached = true;

        document.addEventListener('pointermove', (e) => {
            if (!draggingDim) return;

            const curXOff = draggingDim === 'wd' ? dimWDXOffset : dimLWDXOffset;
            const curTopY = draggingDim === 'wd' ? dimAnnotWDTopY : dimAnnotLWDTopY;

            // ── Vertical drag → change WD / LWD value (keeps measurement points fixed in world) ──
            const scaleY = computeWorldYUnitsPerPixel(curTopY, curXOff);
            const deltaY = -(e.clientY - dimDragStartMouseY) * scaleY;
            const productSurfaceY = activeWorkGroup3D ? activeWorkGroup3D.position.y : 0;
            const minAllowedY = productSurfaceY + 0.5;

            // WD must stay above surface; LWD is free (backlight allows below surface = negative)
            const newWDVal = Math.max(minAllowedY, dimDragStartValue + deltaY);
            const newLWDVal = dimDragStartValue + deltaY;   // unclamped — can go negative

            // ── Horizontal drag → move the entire dimension line left/right (no value change) ──
            const scaleX = computeWorldXUnitsPerPixel(curTopY, curXOff);
            const deltaX = (e.clientX - dimDragStartMouseX) * scaleX;
            const newXOff = dimDragStartXOff + deltaX;

            if (draggingDim === 'wd') {
                dimAnnotationWD = newWDVal;
                dimAnnotWDTopY = newWDVal;
                dimLabelWD = newWDVal;   // label stays in sync with drag
                dimWDXOffset = newXOff;
                const inp = document.getElementById('inp-dim-wd');
                if (inp) inp.value = newWDVal.toFixed(0);
            } else {
                // LWD signed value: positive = above workpiece (normal), negative = below (backlight)
                dimAnnotationLWD = newLWDVal;
                dimAnnotLWDTopY = newLWDVal;
                dimLabelLWD = newLWDVal - productSurfaceY;  // signed distance from surface
                dimLWDXOffset = newXOff;
                const inp = document.getElementById('inp-dim-lwd');
                if (inp) inp.value = (newLWDVal - productSurfaceY).toFixed(0);
            }

            if (!window._dimIsRedrawing && scene3D) {
                window._dimIsRedrawing = true;
                if (dimensionGroup3D) { scene3D.remove(dimensionGroup3D); dimensionGroup3D = null; }
                drawDimensionAnnotations(current3DConfig);
                window._dimIsRedrawing = false;
            }
        });

        document.addEventListener('pointerup', () => {
            draggingDim = null;
            document.body.style.cursor = '';
        });
    }

    function isChildOfObject(obj, parentGroup) {
        if (!obj || !parentGroup) return false;
        let curr = obj;
        while (curr) {
            if (curr === parentGroup) return true;
            curr = curr.parent;
        }
        return false;
    }

    function light1Label() {
        return current3DConfig.lightCount === 2 ? 'Light 1 – Upper' : 'Lighting Assembly';
    }

    function select3DTransformTarget(targetGroup, nameLabel) {
        if (!targetGroup) return;
        activeTransformTarget = targetGroup;
        if (transformControls3D && is3DGizmoVisible) {
            transformControls3D.attach(targetGroup);
        }
        syncLightSlidersFrom3D();
        const hudLbl = document.getElementById('hud-selected-target');
        if (hudLbl) hudLbl.textContent = nameLabel || '3D Object';

        const selectTargetObj = document.getElementById('select-3d-target-obj');
        if (selectTargetObj) {
            if (targetGroup === activeWorkGroup3D) selectTargetObj.value = 'workpiece';
            else if (targetGroup === activeLightGroup3D) selectTargetObj.value = 'light';
            else if (targetGroup === activeLightGroup2_3D) selectTargetObj.value = 'light2';
            else if (targetGroup === activeCamAssemblyGroup3D) selectTargetObj.value = 'camera';
        }
    }

    let is3DGizmoVisible = true;

    function toggle3DGizmoVisibility(show) {
        if (show === undefined) is3DGizmoVisible = !is3DGizmoVisible;
        else is3DGizmoVisible = !!show;

        const btnGizmo = document.getElementById('btn-toggle-gizmo');
        const chkGizmo = document.getElementById('chk-3d-show-gizmo');

        if (chkGizmo) chkGizmo.checked = is3DGizmoVisible;

        const target = activeTransformTarget || activeWorkGroup3D || activeLightGroup3D;

        if (is3DGizmoVisible) {
            if (transformControls3D && target) {
                transformControls3D.attach(target);
            }
            if (btnGizmo) {
                btnGizmo.innerHTML = '<i data-lucide="eye-off"></i>';
                btnGizmo.style.background = '#0284c7';
                btnGizmo.style.color = '#ffffff';
                btnGizmo.title = 'Hide RGB Navigation Gizmo';
            }
        } else {
            if (transformControls3D) {
                transformControls3D.detach();
            }
            if (btnGizmo) {
                btnGizmo.innerHTML = '<i data-lucide="eye"></i>';
                btnGizmo.style.background = '#334155';
                btnGizmo.style.color = '#cbd5e1';
                btnGizmo.title = 'Show RGB Navigation Gizmo';
            }
        }
        if (window.lucide) if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function initLightTransformControls() {
        const sY = document.getElementById('slider-light-y');
        const sX = document.getElementById('slider-light-x');
        const sZ = document.getElementById('slider-light-z');
        const sRot = document.getElementById('slider-light-rot');
        const sScale = document.getElementById('slider-light-scale');

        [sY, sX, sZ, sRot, sScale].forEach(s => {
            if (s) s.addEventListener('input', applyLightTransformFromSliders);
        });

        const selectTargetObj = document.getElementById('select-3d-target-obj');
        if (selectTargetObj) {
            selectTargetObj.addEventListener('change', (e) => {
                const val = e.target.value;
                if (val === 'workpiece' && activeWorkGroup3D) {
                    select3DTransformTarget(activeWorkGroup3D, 'Workpiece / Product Specimen');
                } else if (val === 'light' && activeLightGroup3D) {
                    select3DTransformTarget(activeLightGroup3D, light1Label());
                } else if (val === 'light2' && activeLightGroup2_3D) {
                    select3DTransformTarget(activeLightGroup2_3D, 'Light 2 – Lower');
                } else if (val === 'camera' && activeCamAssemblyGroup3D) {
                    select3DTransformTarget(activeCamAssemblyGroup3D, 'Camera & Lens Assembly');
                }
            });
        }

        const btnTrans = document.getElementById('btn-transform-translate');
        const btnRot = document.getElementById('btn-transform-rotate');
        const btnScale = document.getElementById('btn-transform-scale');
        const btnReset = document.getElementById('btn-transform-reset');
        const btnToggleGizmo = document.getElementById('btn-toggle-gizmo');
        const chkGizmo = document.getElementById('chk-3d-show-gizmo');

        if (btnToggleGizmo) {
            btnToggleGizmo.addEventListener('click', () => toggle3DGizmoVisibility());
        }
        if (chkGizmo) {
            chkGizmo.addEventListener('change', (e) => toggle3DGizmoVisibility(e.target.checked));
        }

        if (btnTrans) {
            btnTrans.addEventListener('click', () => {
                if (btnTrans) btnTrans.classList.add('active');
                if (btnRot) btnRot.classList.remove('active');
                if (btnScale) btnScale.classList.remove('active');
                toggle3DGizmoVisibility(true);
                if (transformControls3D) transformControls3D.setMode('translate');
            });
        }

        if (btnRot) {
            btnRot.addEventListener('click', () => {
                if (btnRot) btnRot.classList.add('active');
                if (btnTrans) btnTrans.classList.remove('active');
                if (btnScale) btnScale.classList.remove('active');
                toggle3DGizmoVisibility(true);
                if (transformControls3D) transformControls3D.setMode('rotate');
            });
        }

        if (btnScale) {
            btnScale.addEventListener('click', () => {
                if (btnScale) btnScale.classList.add('active');
                if (btnTrans) btnTrans.classList.remove('active');
                if (btnRot) btnRot.classList.remove('active');
                toggle3DGizmoVisibility(true);
                if (transformControls3D) transformControls3D.setMode('scale');
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', resetLightSliders);
        }
    }

    function applyLightTransformFromSliders() {
        const target = activeTransformTarget || activeWorkGroup3D || activeLightGroup3D;
        if (!target) return;
        const dy = parseFloat(document.getElementById('slider-light-y')?.value || 0);
        const dx = parseFloat(document.getElementById('slider-light-x')?.value || 0);
        const dz = parseFloat(document.getElementById('slider-light-z')?.value || 0);
        const rot = parseFloat(document.getElementById('slider-light-rot')?.value || 0);
        const scalePct = parseFloat(document.getElementById('slider-light-scale')?.value || 100);
        const scaleVal = scalePct / 100;

        let baseY = baseLightPosY;
        if (target === activeWorkGroup3D) baseY = baseWorkGroupPosY;
        else if (target === activeCamAssemblyGroup3D) baseY = baseCamAssemblyPosYVal;
        else if (target === activeLightGroup2_3D) baseY = baseLight2PosY;

        target.position.set(dx, baseY + dy, dz);
        target.rotation.y = (rot * Math.PI) / 180;
        target.scale.set(scaleVal, scaleVal, scaleVal);

        if (target === activeWorkGroup3D) {
            const curWorkY = target.position.y;
            if (activeCamAssemblyGroup3D && typeof baseCamAssemblyPosYVal !== 'undefined') {
                activeCamAssemblyGroup3D.position.y = baseCamAssemblyPosYVal + curWorkY;
            }
            if (activeLightGroup3D && typeof baseLightPosY !== 'undefined') {
                activeLightGroup3D.position.y = baseLightPosY + curWorkY;
            }
            if (activeLightGroup2_3D) {
                activeLightGroup2_3D.position.y = baseLight2PosY + curWorkY;
            }
        }

        const lblY = document.getElementById('lbl-light-y');
        const lblX = document.getElementById('lbl-light-x');
        const lblZ = document.getElementById('lbl-light-z');
        const lblRot = document.getElementById('lbl-light-rot');
        const lblScale = document.getElementById('lbl-light-scale');

        if (lblY) lblY.textContent = dy + ' mm';
        if (lblX) lblX.textContent = dx + ' mm';
        if (lblZ) lblZ.textContent = dz + ' mm';
        if (lblRot) lblRot.textContent = rot + '°';
        if (lblScale) lblScale.textContent = Math.round(scalePct) + '%';

        if (showWdLwdAnnotation) {
            drawDimensionAnnotations(current3DConfig);
        }
    }

    function syncLightSlidersFrom3D() {
        const target = activeTransformTarget || activeLightGroup3D;
        if (!target) return;
        let baseY = baseLightPosY;
        if (target === activeWorkGroup3D) baseY = baseWorkGroupPosY;
        else if (target === activeCamAssemblyGroup3D) baseY = baseCamAssemblyPosYVal;
        else if (target === activeLightGroup2_3D) baseY = baseLight2PosY;

        const dy = Math.round(target.position.y - baseY);
        const dx = Math.round(target.position.x);
        const dz = Math.round(target.position.z);
        const rot = Math.round((target.rotation.y * 180) / Math.PI);
        const scalePct = Math.round(target.scale.x * 100);

        const sY = document.getElementById('slider-light-y');
        const sX = document.getElementById('slider-light-x');
        const sZ = document.getElementById('slider-light-z');
        const sRot = document.getElementById('slider-light-rot');
        const sScale = document.getElementById('slider-light-scale');

        if (sY) sY.value = dy;
        if (sX) sX.value = dx;
        if (sZ) sZ.value = dz;
        if (sRot) sRot.value = rot;
        if (sScale) sScale.value = scalePct;

        const lblY = document.getElementById('lbl-light-y');
        const lblX = document.getElementById('lbl-light-x');
        const lblZ = document.getElementById('lbl-light-z');
        const lblRot = document.getElementById('lbl-light-rot');
        const lblScale = document.getElementById('lbl-light-scale');

        if (lblY) lblY.textContent = dy + ' mm';
        if (lblX) lblX.textContent = dx + ' mm';
        if (lblZ) lblZ.textContent = dz + ' mm';
        if (lblRot) lblRot.textContent = rot + '°';
        if (lblScale) lblScale.textContent = scalePct + '%';
    }

    function resetLightSliders() {
        const sY = document.getElementById('slider-light-y');
        const sX = document.getElementById('slider-light-x');
        const sZ = document.getElementById('slider-light-z');
        const sRot = document.getElementById('slider-light-rot');
        const sScale = document.getElementById('slider-light-scale');

        if (sY) sY.value = 0;
        if (sX) sX.value = 0;
        if (sZ) sZ.value = 0;
        if (sRot) sRot.value = 0;
        if (sScale) sScale.value = 100;

        if (activeTransformTarget && activeTransformTarget === activeLightGroup2_3D) {
            activeLightGroup2_3D.position.set(0, baseLight2PosY, 0);
            activeLightGroup2_3D.rotation.set(0, 0, 0);
            activeLightGroup2_3D.scale.set(1, 1, 1);
        } else if (activeLightGroup3D) {
            activeLightGroup3D.position.set(0, baseLightPosY, 0);
            activeLightGroup3D.rotation.set(0, 0, 0);
            activeLightGroup3D.scale.set(1, 1, 1);
        }

        const lblY = document.getElementById('lbl-light-y');
        const lblX = document.getElementById('lbl-light-x');
        const lblZ = document.getElementById('lbl-light-z');
        const lblRot = document.getElementById('lbl-light-rot');
        const lblScale = document.getElementById('lbl-light-scale');

        if (lblY) lblY.textContent = '0 mm';
        if (lblX) lblX.textContent = '0 mm';
        if (lblZ) lblZ.textContent = '0 mm';
        if (lblRot) lblRot.textContent = '0°';
        if (lblScale) lblScale.textContent = '100%';
    }

    function windowToModalConfig(inputConfig) {
        current3DConfig = { ...current3DConfig, ...inputConfig };

        const isTele = !!(inputConfig.isTelecentric || (inputConfig.lensName && /telecentric|tec-|tele/i.test(inputConfig.lensName)));
        current3DConfig.isTelecentric = isTele;

        // Reset annotation position overrides so new config calculates fresh values
        dimAnnotWDTopY = 0;
        dimAnnotLWDTopY = 0;
        dimAnnotWDBottomY = 0;
        dimAnnotLWDBottomY = 0;
        dimWDXOffset = 0;
        dimLWDXOffset = 0;

        const selectLensType = document.getElementById('select-3d-lens-type');
        if (selectLensType) {
            selectLensType.value = isTele ? 'telecentric' : 'fa';
        }

        // Update DOM text elements
        const elCam = document.getElementById('spec-3d-cam');
        const elSensor = document.getElementById('spec-3d-sensor');
        const elLens = document.getElementById('spec-3d-lens');
        const elExt = document.getElementById('spec-3d-ext');
        const elWd = document.getElementById('spec-3d-wd');
        const elFov = document.getElementById('spec-3d-fov');
        const elAcc = document.getElementById('spec-3d-acc');

        const hudWd = document.getElementById('hud-wd-val');
        const hudFov = document.getElementById('hud-fov-val');
        const hudExt = document.getElementById('hud-ext-val');

        if (elCam) elCam.textContent = current3DConfig.cameraName || 'Camera';
        if (elSensor) elSensor.textContent = current3DConfig.sensorSize || 'Sensor';
        if (elLens) elLens.textContent = current3DConfig.lensName || (isTele ? 'Industrial Telecentric Coaxial Lens' : 'FA Lens');
        if (elExt) elExt.textContent = (current3DConfig.extensionLength || 0).toFixed(1) + ' mm';
        if (elWd) elWd.textContent = (current3DConfig.workingDistance || 150).toFixed(1) + ' mm';
        if (elFov) elFov.textContent = `${(current3DConfig.fovWidth || 80).toFixed(1)} × ${(current3DConfig.fovHeight || 60).toFixed(1)} mm`;
        if (elAcc) elAcc.textContent = (current3DConfig.pixelSize || 0.025).toFixed(4) + ' mm/px';

        if (hudWd) hudWd.textContent = (current3DConfig.workingDistance || 150).toFixed(0) + ' mm';
        if (hudFov) hudFov.textContent = `${(current3DConfig.fovWidth || 80).toFixed(0)} × ${(current3DConfig.fovHeight || 60).toFixed(0)} mm`;
        if (hudExt) hudExt.textContent = (current3DConfig.extensionLength || 0).toFixed(1) + ' mm';

        build3DVisionSystem(current3DConfig);
    }

    function open3DConceptModal(config) {
        if (typeof THREE === 'undefined') {
            alert('Three.js library is loading, please wait a moment or refresh the page (F5)!');
            return;
        }
        const m3d = document.getElementById('modal-3d-concept');
        if (!m3d) return;

        m3d.style.display = 'flex';
        m3d.classList.add('active');

        if (!renderer3D) {
            init3DConceptViewer();
        }

        if (!animFrame3DId) {
            animate3D();
        }

        // Save the config passed at open time — Reset button will restore to this snapshot
        initialOpen3DConfig = JSON.parse(JSON.stringify(config || {}));

        windowToModalConfig(config || {});

        const forceResize = () => {
            on3DWindowResize();
            if (renderer3D && scene3D && camera3D) {
                renderer3D.render(scene3D, camera3D);
            }
        };

        forceResize();
        requestAnimationFrame(forceResize);
        setTimeout(forceResize, 50);
        setTimeout(forceResize, 150);
        setTimeout(forceResize, 350);
    }

    function close3DConceptModal() {
        const m3d = document.getElementById('modal-3d-concept') || modal3D;
        if (m3d) {
            m3d.style.display = 'none';
            m3d.classList.remove('active');
        }
        if (animFrame3DId) {
            cancelAnimationFrame(animFrame3DId);
            animFrame3DId = null;
        }
        if (transformControls3D) {
            transformControls3D.detach();
        }
    }

    // Helper color resolver
    function getLightColorHex(colorName) {
        switch (colorName) {
            case 'red': return 0xff2233;
            case 'blue': return 0x00d8ff;
            case 'green': return 0x00ff66;
            case 'yellow': return 0xffd700;
            default: return 0xffffff;
        }
    }

    function build3DVisionSystem(cfg) {
        if (!components3DGroup) return;

        // Safely detach transform gizmo
        if (transformControls3D) {
            transformControls3D.detach();
        }

        // Remove previous 3D dimension lines group
        if (dimensionGroup3D && scene3D) {
            scene3D.remove(dimensionGroup3D);
            dimensionGroup3D = null;
        }

        // Clear previous meshes
        while (components3DGroup.children.length > 0) {
            const obj = components3DGroup.children[0];
            components3DGroup.remove(obj);
        }

        activeLightGroup3D = null;
        activeLightGroup2_3D = null;
        activeWorkGroup3D = null;
        activeCamAssemblyGroup3D = null;

        const wd = Math.max(30, cfg.workingDistance || 150);
        const fovW = Math.max(10, cfg.fovWidth || 80);
        const fovH = Math.max(10, cfg.fovHeight || 60);
        const extLen = Math.max(0, cfg.extensionLength || 0);
        const lightColorHex = getLightColorHex(cfg.lightColor || 'white');

        // Scale factors for visualization
        const visExtLen = extLen > 0 ? Math.max(8, extLen * 1.5) : 0;
        const select3DLensType = document.getElementById('select-3d-lens-type');
        const isTelecentricLens = cfg.isTelecentric || (cfg.lensName && /telecentric|tec-|tele/i.test(cfg.lensName)) || (select3DLensType && select3DLensType.value === 'telecentric');
        const currentLensLen = isTelecentricLens ? 95 : 50;
        const camLen = 55;
        const camSize = 44;

        // Base Positions (Y-axis pointing UP, Workpiece surface at Y=0)
        // Ensure bottom edge of lens is ALWAYS positioned at EXACTLY Y = wd
        const baseCamAssemblyPosY = wd + currentLensLen / 2 + visExtLen / 2;
        const lensPosY = wd + currentLensLen / 2;
        const extPosY = wd + currentLensLen + visExtLen / 2;
        const camPosY = wd + currentLensLen + visExtLen + camLen / 2;

        if (controls3D) {
            controls3D.target.set(0, wd / 2, 0);
        }

        // ==================== 1. UNIFIED CAMERA + LENS ASSEMBLY ====================
        const camLensAssemblyGroup = new THREE.Group();
        camLensAssemblyGroup.position.set(0, baseCamAssemblyPosY, 0);

        // 1A. CAMERA BODY
        const camGroup = new THREE.Group();
        camGroup.position.set(0, visExtLen / 2 + camLen / 2, 0);

        const camGeo = new THREE.BoxGeometry(camSize, camLen, camSize);
        const camMat = new THREE.MeshStandardMaterial({
            color: 0x1e2638,
            metalness: 0.8,
            roughness: 0.3
        });
        const camMesh = new THREE.Mesh(camGeo, camMat);
        camMesh.castShadow = true;
        camGroup.add(camMesh);

        // Front C-mount flange ring
        const flangeGeo = new THREE.CylinderGeometry(15, 17, 6, 32);
        const flangeMat = new THREE.MeshStandardMaterial({ color: 0xc0c8d0, metalness: 0.9, roughness: 0.2 });
        const flangeMesh = new THREE.Mesh(flangeGeo, flangeMat);
        flangeMesh.position.y = -camLen / 2 - 3;
        camGroup.add(flangeMesh);

        // Rear RJ45/USB3 connector ports
        const portGeo = new THREE.CylinderGeometry(6, 6, 8, 16);
        const portMat = new THREE.MeshStandardMaterial({ color: 0x0a0d14, metalness: 0.5, roughness: 0.5 });
        const portMesh = new THREE.Mesh(portGeo, portMat);
        portMesh.rotation.x = Math.PI / 2;
        portMesh.position.set(0, camLen / 4, camSize / 2 + 3);
        camGroup.add(portMesh);

        // Status LED
        const ledGeo = new THREE.SphereGeometry(2, 16, 16);
        const ledMat = new THREE.MeshBasicMaterial({ color: 0x00f2ff });
        const ledMesh = new THREE.Mesh(ledGeo, ledMat);
        ledMesh.position.set(-camSize / 3, camLen / 3, camSize / 2 + 1);
        camGroup.add(ledMesh);

        camLensAssemblyGroup.add(camGroup);

        // 1B. EXTENSION RING
        if (extLen > 0) {
            const extGroup = new THREE.Group();
            extGroup.position.set(0, 0, 0);

            const ringGeo = new THREE.CylinderGeometry(16, 16, visExtLen, 32);
            const ringMat = new THREE.MeshStandardMaterial({
                color: 0xa0aab5,
                metalness: 0.95,
                roughness: 0.2
            });
            const ringMesh = new THREE.Mesh(ringGeo, ringMat);
            extGroup.add(ringMesh);

            const grooveGeo = new THREE.TorusGeometry(16.2, 0.8, 16, 32);
            const grooveMat = new THREE.MeshStandardMaterial({ color: 0x333b48, metalness: 0.8 });
            const grooveMesh = new THREE.Mesh(grooveGeo, grooveMat);
            grooveMesh.rotation.x = Math.PI / 2;
            extGroup.add(grooveMesh);

            camLensAssemblyGroup.add(extGroup);
        }

        // 1C. LENS ASSEMBLY
        const lensGroup = new THREE.Group();

        if (isTelecentricLens) {
            // Detailed Industrial Telecentric Lens with Coaxial Illumination Side Port (Matching User Reference Photo)
            const teleLen = 95;
            lensGroup.position.set(0, -visExtLen / 2 - teleLen / 2, 0);

            // 1. C-Mount Top Connection Collar
            const topCollarGeo = new THREE.CylinderGeometry(15, 15, 14, 32);
            const collarMat = new THREE.MeshStandardMaterial({ color: 0x1e2433, metalness: 0.85, roughness: 0.25 });
            const topCollar = new THREE.Mesh(topCollarGeo, collarMat);
            topCollar.position.y = teleLen / 2 - 7;
            lensGroup.add(topCollar);

            // Laser Engraved Silver Ring Collar
            const markRingGeo = new THREE.CylinderGeometry(15.5, 15.5, 6, 32);
            const markRingMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });
            const markRing = new THREE.Mesh(markRingGeo, markRingMat);
            markRing.position.y = teleLen / 2 - 14;
            lensGroup.add(markRing);

            // 2. Long Slender Main Barrel Body Tube
            const mainTubeGeo = new THREE.CylinderGeometry(14, 14, 48, 32);
            const tubeMat = new THREE.MeshStandardMaterial({ color: 0x121620, metalness: 0.85, roughness: 0.3 });
            const mainTube = new THREE.Mesh(mainTubeGeo, tubeMat);
            mainTube.position.y = 5;
            lensGroup.add(mainTube);

            // 3. Perpendicular Coaxial Light Side Input Port (Side Tube matching User Photo)
            const coaxPortGeo = new THREE.CylinderGeometry(6.5, 6.5, 18, 24);
            const coaxPortMat = new THREE.MeshStandardMaterial({ color: 0x181e2b, metalness: 0.85, roughness: 0.3 });
            const coaxPort = new THREE.Mesh(coaxPortGeo, coaxPortMat);
            coaxPort.rotation.z = Math.PI / 2;
            coaxPort.position.set(14, 2, 0);
            lensGroup.add(coaxPort);

            // Side Port Lock Thumbscrew
            const screwGeo = new THREE.CylinderGeometry(2, 2, 6, 16);
            const screwMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.1 });
            const screwMesh = new THREE.Mesh(screwGeo, screwMat);
            screwMesh.position.set(16, 8, 0);
            lensGroup.add(screwMesh);

            // 4. Wide Flared Front Objective Hood
            const hoodGeo = new THREE.CylinderGeometry(14, 23, 30, 32);
            const hoodMesh = new THREE.Mesh(hoodGeo, tubeMat);
            hoodMesh.position.y = -teleLen / 2 + 16;
            lensGroup.add(hoodMesh);

            // 5. Multi-Coated Optical Glass Front Element
            const glassGeo = new THREE.CylinderGeometry(20.5, 20.5, 2.5, 32);
            const glassMat = new THREE.MeshPhysicalMaterial({
                color: 0x00f2ff,
                emissive: 0x004466,
                emissiveIntensity: 0.25,
                transparent: true,
                opacity: 0.75,
                roughness: 0.05,
                metalness: 0.1,
                transmission: 0.9
            });
            const glassMesh = new THREE.Mesh(glassGeo, glassMat);
            glassMesh.position.y = -teleLen / 2;
            lensGroup.add(glassMesh);

        } else {
            // Standard Fixed Focal Length Lens
            const lensLen = 50;
            lensGroup.position.set(0, -visExtLen / 2 - lensLen / 2, 0);

            const lUpperGeo = new THREE.CylinderGeometry(16, 18, 18, 32);
            const lMat1 = new THREE.MeshStandardMaterial({ color: 0x111622, metalness: 0.7, roughness: 0.3 });
            const lUpperMesh = new THREE.Mesh(lUpperGeo, lMat1);
            lUpperMesh.position.y = 14;
            lensGroup.add(lUpperMesh);

            const lMidGeo = new THREE.CylinderGeometry(19, 19, 16, 32);
            const lMat2 = new THREE.MeshStandardMaterial({ color: 0x242d40, metalness: 0.6, roughness: 0.5 });
            const lMidMesh = new THREE.Mesh(lMidGeo, lMat2);
            lMidMesh.position.y = -2;
            lensGroup.add(lMidMesh);

            const lLowerGeo = new THREE.CylinderGeometry(18, 20, 16, 32);
            const lLowerMesh = new THREE.Mesh(lLowerGeo, lMat1);
            lLowerMesh.position.y = -18;
            lensGroup.add(lLowerMesh);

            const glassGeo = new THREE.CylinderGeometry(17, 17, 2, 32);
            const glassMat = new THREE.MeshPhysicalMaterial({
                color: 0x88ccff,
                transparent: true,
                opacity: 0.65,
                roughness: 0.1,
                metalness: 0.1,
                transmission: 0.9
            });
            const glassMesh = new THREE.Mesh(glassGeo, glassMat);
            glassMesh.position.y = -lensLen / 2;
            lensGroup.add(glassMesh);
        }

        camLensAssemblyGroup.add(lensGroup);

        components3DGroup.add(camLensAssemblyGroup);
        activeCamAssemblyGroup3D = camLensAssemblyGroup;
        baseCamAssemblyPosYVal = baseCamAssemblyPosY;

        // ==================== 4. LIGHTING UNIT ====================
        // Factory: builds one light unit of the given type/color (used for Light 1 and Light 2)
        const buildLightUnit = (lightType, lightColorHex) => {
        const lightGroup = new THREE.Group();

        if (lightType === 'ring') {
            // Detailed Angle Ring Light Model RLAD Series (RLAD-090050A30, RLAD-120050A30, etc.)
            lightGroup.position.set(0, 63, 0);

            const ringOuterR = 38;
            const ringInnerR = 18;
            const ringH = 26;

            // 1. Outer Cylindrical Main Housing Body (Dark Matte Metal)
            const housingGeo = new THREE.CylinderGeometry(ringOuterR, ringOuterR, ringH, 48);
            const housingMat = new THREE.MeshStandardMaterial({
                color: 0x1e222e,
                metalness: 0.85,
                roughness: 0.25
            });
            const housingMesh = new THREE.Mesh(housingGeo, housingMat);
            lightGroup.add(housingMesh);

            // Center View Pass-Through Bore Hole
            const innerBoreGeo = new THREE.CylinderGeometry(ringInnerR - 2, ringInnerR - 2, ringH + 2, 48);
            const innerBoreMat = new THREE.MeshStandardMaterial({ color: 0x10131a, roughness: 0.8 });
            const innerBoreMesh = new THREE.Mesh(innerBoreGeo, innerBoreMat);
            lightGroup.add(innerBoreMesh);

            // 2. Angled Conical Inner Recess Face (Angle 30 degrees)
            const coneRecessGeo = new THREE.CylinderGeometry(ringInnerR, ringOuterR - 4, ringH - 4, 48, 1, true);
            const coneRecessMat = new THREE.MeshStandardMaterial({ color: 0x151822, metalness: 0.9, roughness: 0.2, side: THREE.DoubleSide });
            const coneRecessMesh = new THREE.Mesh(coneRecessGeo, coneRecessMat);
            coneRecessMesh.position.y = -1;
            lightGroup.add(coneRecessMesh);

            // 3. Glowing LED Angled Diffuser Ring Face
            const diffRingGeo = new THREE.CylinderGeometry(ringInnerR + 2, ringOuterR - 6, 2, 48, 1, true);
            const diffRingMat = new THREE.MeshStandardMaterial({
                color: lightColorHex,
                emissive: lightColorHex,
                emissiveIntensity: 0.85,
                roughness: 0.2,
                side: THREE.DoubleSide
            });
            const diffRingMesh = new THREE.Mesh(diffRingGeo, diffRingMat);
            diffRingMesh.position.y = -ringH / 2 + 3;
            lightGroup.add(diffRingMesh);

            // Inner & Outer Bezel Rims
            const outerRimGeo = new THREE.TorusGeometry(ringOuterR - 2, 1.2, 16, 48);
            const rimMat = new THREE.MeshStandardMaterial({ color: 0x0f121a, metalness: 0.9, roughness: 0.2 });
            const outerRimMesh = new THREE.Mesh(outerRimGeo, rimMat);
            outerRimMesh.rotation.x = Math.PI / 2;
            outerRimMesh.position.y = -ringH / 2 + 1;
            lightGroup.add(outerRimMesh);

            const innerRimGeo = new THREE.TorusGeometry(ringInnerR + 1, 1.2, 16, 48);
            const innerRimMesh = new THREE.Mesh(innerRimGeo, rimMat);
            innerRimMesh.rotation.x = Math.PI / 2;
            innerRimMesh.position.y = -ringH / 2 + 1;
            lightGroup.add(innerRimMesh);

            // 4. Side Screw Mounting Holes
            const holeGeo = new THREE.CylinderGeometry(1.6, 1.6, 4, 16);
            const holeMat = new THREE.MeshStandardMaterial({ color: 0x080a0f, roughness: 0.8 });
            for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
                const hMesh = new THREE.Mesh(holeGeo, holeMat);
                hMesh.position.set((ringOuterR + 1) * Math.cos(a), ringH / 4, (ringOuterR + 1) * Math.sin(a));
                hMesh.rotation.x = Math.PI / 2;
                hMesh.rotation.z = a;
                lightGroup.add(hMesh);
            }

            // 5. Power Cable, Strain Relief Boot & Connector Plug
            const cableGroup = new THREE.Group();
            cableGroup.position.set(-ringOuterR, -ringH / 4, 0);

            // Boot sleeve
            const bootGeo = new THREE.CylinderGeometry(3.5, 4.5, 10, 16);
            const bootMat = new THREE.MeshStandardMaterial({ color: 0x11131a, roughness: 0.6 });
            const bootMesh = new THREE.Mesh(bootGeo, bootMat);
            bootMesh.rotation.z = Math.PI / 2;
            bootMesh.position.x = -5;
            cableGroup.add(bootMesh);

            // Cable curve path
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-10, 0, 0),
                new THREE.Vector3(-22, -4, 0),
                new THREE.Vector3(-30, -12, 10),
                new THREE.Vector3(-38, -18, 18)
            ]);
            const tubeGeo = new THREE.TubeGeometry(curve, 16, 2.5, 12, false);
            const cableMat = new THREE.MeshStandardMaterial({ color: 0x11131a, roughness: 0.5 });
            const tubeMesh = new THREE.Mesh(tubeGeo, cableMat);
            cableGroup.add(tubeMesh);

            // Connector Plug
            const plugGeo = new THREE.BoxGeometry(10, 8, 14);
            const plugMat = new THREE.MeshStandardMaterial({ color: 0x1c202b, roughness: 0.3, metalness: 0.5 });
            const plugMesh = new THREE.Mesh(plugGeo, plugMat);
            plugMesh.position.set(-40, -20, 22);
            plugMesh.rotation.y = Math.PI / 4;
            cableGroup.add(plugMesh);

            lightGroup.add(cableGroup);

            // Downward Point Light
            const pointLight = new THREE.PointLight(lightColorHex, 1.6, wd * 2.2);
            pointLight.position.set(0, -ringH / 2 - 5, 0);
            lightGroup.add(pointLight);

        } else if (lightType === 'ring-flat') {
            // Detailed Ring Flat Light Model (Low-Profile Wide Diffuse Ring)
            lightGroup.position.set(0, 63, 0);

            const ringOuterR = 46;
            const ringInnerR = 16;
            const ringH = 15;

            // 1. Low-Profile Cylindrical Outer Main Housing Body
            const housingGeo = new THREE.CylinderGeometry(ringOuterR, ringOuterR, ringH, 48);
            const housingMat = new THREE.MeshStandardMaterial({
                color: 0x1c202a,
                metalness: 0.85,
                roughness: 0.25
            });
            const housingMesh = new THREE.Mesh(housingGeo, housingMat);
            lightGroup.add(housingMesh);

            // Center View Pass-Through Bore Hole
            const innerBoreGeo = new THREE.CylinderGeometry(ringInnerR - 2, ringInnerR - 2, ringH + 2, 48);
            const innerBoreMat = new THREE.MeshStandardMaterial({ color: 0x0e2e1a, roughness: 0.7 }); // Inner PCB green rim detail
            const innerBoreMesh = new THREE.Mesh(innerBoreGeo, innerBoreMat);
            lightGroup.add(innerBoreMesh);

            // 2. Flat Wide LED Diffuser Ring Face
            const diffRingGeo = new THREE.RingGeometry(ringInnerR + 2, ringOuterR - 2, 48);
            const diffRingMat = new THREE.MeshStandardMaterial({
                color: lightColorHex,
                emissive: lightColorHex,
                emissiveIntensity: 0.85,
                roughness: 0.2,
                side: THREE.DoubleSide
            });
            const diffRingMesh = new THREE.Mesh(diffRingGeo, diffRingMat);
            diffRingMesh.rotation.x = Math.PI / 2;
            diffRingMesh.position.y = -ringH / 2 - 0.5;
            lightGroup.add(diffRingMesh);

            // Inner & Outer Bezel Rims
            const outerRimGeo = new THREE.TorusGeometry(ringOuterR - 1, 1, 16, 48);
            const rimMat = new THREE.MeshStandardMaterial({ color: 0x0f121a, metalness: 0.9, roughness: 0.2 });
            const outerRimMesh = new THREE.Mesh(outerRimGeo, rimMat);
            outerRimMesh.rotation.x = Math.PI / 2;
            outerRimMesh.position.y = -ringH / 2 - 0.5;
            lightGroup.add(outerRimMesh);

            const innerRimGeo = new THREE.TorusGeometry(ringInnerR + 1, 1, 16, 48);
            const innerRimMesh = new THREE.Mesh(innerRimGeo, rimMat);
            innerRimMesh.rotation.x = Math.PI / 2;
            innerRimMesh.position.y = -ringH / 2 - 0.5;
            lightGroup.add(innerRimMesh);

            // 3. Front Face Screw Rivets (6 Screw Heads along flat diffuser rim)
            const screwGeo = new THREE.CylinderGeometry(1.5, 1.5, 2, 12);
            const screwMat = new THREE.MeshStandardMaterial({ color: 0x808c9c, metalness: 0.9, roughness: 0.2 });
            for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
                const sRadius = (ringOuterR + ringInnerR) / 2;
                const sMesh = new THREE.Mesh(screwGeo, screwMat);
                sMesh.position.set(sRadius * Math.cos(a), -ringH / 2 - 1, sRadius * Math.sin(a));
                lightGroup.add(sMesh);
            }

            // 4. Power Cable, Strain Relief Boot & Connector Plug
            const cableGroup = new THREE.Group();
            cableGroup.position.set(-ringOuterR, 0, 0);

            // Boot sleeve
            const bootGeo = new THREE.CylinderGeometry(3.5, 4.5, 10, 16);
            const bootMat = new THREE.MeshStandardMaterial({ color: 0x11131a, roughness: 0.6 });
            const bootMesh = new THREE.Mesh(bootGeo, bootMat);
            bootMesh.rotation.z = Math.PI / 2;
            bootMesh.position.x = -5;
            cableGroup.add(bootMesh);

            // Cable curve path
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-10, 0, 0),
                new THREE.Vector3(-22, -4, 0),
                new THREE.Vector3(-30, -12, 10),
                new THREE.Vector3(-38, -18, 18)
            ]);
            const tubeGeo = new THREE.TubeGeometry(curve, 16, 2.5, 12, false);
            const cableMat = new THREE.MeshStandardMaterial({ color: 0x11131a, roughness: 0.5 });
            const tubeMesh = new THREE.Mesh(tubeGeo, cableMat);
            cableGroup.add(tubeMesh);

            // Connector Plug
            const plugGeo = new THREE.BoxGeometry(10, 8, 14);
            const plugMat = new THREE.MeshStandardMaterial({ color: 0x1c202b, roughness: 0.3, metalness: 0.5 });
            const plugMesh = new THREE.Mesh(plugGeo, plugMat);
            plugMesh.position.set(-40, -20, 22);
            plugMesh.rotation.y = Math.PI / 4;
            cableGroup.add(plugMesh);

            lightGroup.add(cableGroup);

            // Wide Downward Point Light
            const pointLight = new THREE.PointLight(lightColorHex, 1.8, wd * 2.5);
            pointLight.position.set(0, -ringH / 2 - 5, 0);
            lightGroup.add(pointLight);

        } else if (lightType === 'coaxial') {
            // Detailed Coaxial Light Model CO-060060 based on industrial design specs
            lightGroup.position.set(0, 74, 0);

            const coaxW = 55;
            const coaxH = 48;
            const coaxD = 55;

            // 1. Main Matte Dark Metallic Body Box
            const boxGeo = new THREE.BoxGeometry(coaxW, coaxH, coaxD);
            const boxMat = new THREE.MeshStandardMaterial({
                color: 0x222733,
                metalness: 0.85,
                roughness: 0.25
            });
            const boxMesh = new THREE.Mesh(boxGeo, boxMat);
            lightGroup.add(boxMesh);

            // Inner Pass-Through Hole for Lens View
            const boreGeo = new THREE.CylinderGeometry(14, 14, coaxH + 2, 32);
            const boreMat = new THREE.MeshStandardMaterial({ color: 0x11151c, roughness: 0.8 });
            const boreMesh = new THREE.Mesh(boreGeo, boreMat);
            lightGroup.add(boreMesh);

            // 2. Top Cyan Glass Aperture Window
            const topFrameGeo = new THREE.BoxGeometry(coaxW - 6, 2, coaxD - 6);
            const topFrameMat = new THREE.MeshStandardMaterial({ color: 0x181d28, metalness: 0.9, roughness: 0.2 });
            const topFrameMesh = new THREE.Mesh(topFrameGeo, topFrameMat);
            topFrameMesh.position.y = coaxH / 2 + 1;
            lightGroup.add(topFrameMesh);

            const cyanGlassGeo = new THREE.BoxGeometry(coaxW - 14, 2.5, coaxD - 14);
            const cyanGlassMat = new THREE.MeshStandardMaterial({
                color: 0x00f2ff,
                emissive: 0x00c4d4,
                emissiveIntensity: 0.7,
                roughness: 0.1,
                metalness: 0.1
            });
            const cyanGlassMesh = new THREE.Mesh(cyanGlassGeo, cyanGlassMat);
            cyanGlassMesh.position.y = coaxH / 2 + 1.5;
            lightGroup.add(cyanGlassMesh);

            // Top Corner Screw Rivets
            const screwGeo = new THREE.CylinderGeometry(1.5, 1.5, 3, 12);
            const screwMat = new THREE.MeshStandardMaterial({ color: 0x808c9c, metalness: 0.9, roughness: 0.2 });

            [[-coaxW / 2 + 6, -coaxD / 2 + 6], [coaxW / 2 - 6, -coaxD / 2 + 6],
            [-coaxW / 2 + 6, coaxD / 2 - 6], [coaxW / 2 - 6, coaxD / 2 - 6]].forEach(pos => {
                const screwMesh = new THREE.Mesh(screwGeo, screwMat);
                screwMesh.position.set(pos[0], coaxH / 2 + 2, pos[1]);
                lightGroup.add(screwMesh);
            });

            // 3. Side Panel with Horizontal Heat-Sink Fins Slits
            const finGroup = new THREE.Group();
            finGroup.position.set(0, 0, coaxD / 2 + 1);

            for (let i = -2; i <= 2; i++) {
                const finGeo = new THREE.BoxGeometry(coaxW - 12, 3, 2);
                const finMat = new THREE.MeshStandardMaterial({ color: 0x141822, metalness: 0.8, roughness: 0.4 });
                const finMesh = new THREE.Mesh(finGeo, finMat);
                finMesh.position.y = i * 7;
                finGroup.add(finMesh);
            }
            lightGroup.add(finGroup);

            // 4. Power Cable & Industrial Connector Plug
            const cableGroup = new THREE.Group();
            cableGroup.position.set(coaxW / 2 + 2, coaxH / 4, 0);

            // Cable curve path
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(12, 5, 0),
                new THREE.Vector3(25, 2, -10),
                new THREE.Vector3(32, -4, -18)
            ]);
            const tubeGeo = new THREE.TubeGeometry(curve, 20, 2.5, 12, false);
            const cableMat = new THREE.MeshStandardMaterial({ color: 0x12141a, roughness: 0.6 });
            const tubeMesh = new THREE.Mesh(tubeGeo, cableMat);
            cableGroup.add(tubeMesh);

            // Black 2-Pin Connector Plug at tip
            const plugGeo = new THREE.BoxGeometry(10, 8, 14);
            const plugMat = new THREE.MeshStandardMaterial({ color: 0x1a1d26, roughness: 0.3, metalness: 0.5 });
            const plugMesh = new THREE.Mesh(plugGeo, plugMat);
            plugMesh.position.set(33, -5, -22);
            plugMesh.rotation.y = -Math.PI / 4;
            cableGroup.add(plugMesh);

            lightGroup.add(cableGroup);

            // 5. Internal 45-Degree Beam Splitter Glass Mirror
            const mirrorGeo = new THREE.PlaneGeometry(30, 30);
            const mirrorMat = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.4,
                roughness: 0.1,
                metalness: 0.9,
                side: THREE.DoubleSide
            });
            const mirrorMesh = new THREE.Mesh(mirrorGeo, mirrorMat);
            mirrorMesh.rotation.x = Math.PI / 4;
            lightGroup.add(mirrorMesh);

            // Downward Coaxial Point Light
            const coaxialLight = new THREE.PointLight(lightColorHex, 1.4, wd * 2);
            coaxialLight.position.set(0, -coaxH / 2 - 5, 0);
            lightGroup.add(coaxialLight);

        } else if (lightType === 'dome') {
            // Detailed Industrial Dome Diffuse Light DM Series (DM-090, DM-120, DM-160)
            lightGroup.position.set(0, 80, 0);

            const domeR = Math.max(38, fovW * 0.65);
            const domeH = domeR * 0.85;

            // 1. Outer Dark Matte Anodized Metallic Hemispherical Dome Hood (Curving UPWARDS)
            const domeGeo = new THREE.SphereGeometry(domeR, 48, 32, 0, Math.PI * 2, 0.22, Math.PI / 2 - 0.22);
            const domeMat = new THREE.MeshStandardMaterial({
                color: 0x1b1f2b,
                metalness: 0.85,
                roughness: 0.25,
                side: THREE.DoubleSide
            });
            const domeMesh = new THREE.Mesh(domeGeo, domeMat);
            domeMesh.rotation.x = 0; // Dome curves UPWARDS with top camera opening
            lightGroup.add(domeMesh);

            // Inner Diffuse White Reflective Dome Cavity Coating
            const innerDomeGeo = new THREE.SphereGeometry(domeR - 2, 48, 32, 0, Math.PI * 2, 0.24, Math.PI / 2 - 0.24);
            const innerDomeMat = new THREE.MeshStandardMaterial({
                color: 0xf5f7fa,
                roughness: 0.95,
                metalness: 0.05,
                side: THREE.DoubleSide
            });
            const innerDomeMesh = new THREE.Mesh(innerDomeGeo, innerDomeMat);
            innerDomeMesh.rotation.x = 0;
            lightGroup.add(innerDomeMesh);

            // 2. Top Circular Camera Lens View Hole Ring (Top Aperture Opening under Camera)
            const topRingGeo = new THREE.CylinderGeometry(domeR * 0.28, domeR * 0.32, 6, 32);
            const topRingMat = new THREE.MeshStandardMaterial({
                color: 0xeef2f7,
                metalness: 0.2,
                roughness: 0.3
            });
            const topRingMesh = new THREE.Mesh(topRingGeo, topRingMat);
            topRingMesh.position.y = domeR * 0.92;
            lightGroup.add(topRingMesh);

            // 3. Heavy Bottom Base Flange Plate at Rim Base
            const baseRingGeo = new THREE.CylinderGeometry(domeR + 5, domeR + 5, 12, 48);
            const baseRingMat = new THREE.MeshStandardMaterial({ color: 0x141822, metalness: 0.9, roughness: 0.2 });
            const baseRingMesh = new THREE.Mesh(baseRingGeo, baseRingMat);
            baseRingMesh.position.y = 4;
            lightGroup.add(baseRingMesh);

            const baseLipGeo = new THREE.CylinderGeometry(domeR + 9, domeR + 9, 4, 48);
            const baseLipMesh = new THREE.Mesh(baseLipGeo, baseRingMat);
            baseLipMesh.position.y = -1;
            lightGroup.add(baseLipMesh);

            // Base Perimeter Mounting Screw Rivets (6 Screws)
            const screwGeo = new THREE.CylinderGeometry(1.6, 1.6, 3, 12);
            const screwMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.1 });
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const screwMesh = new THREE.Mesh(screwGeo, screwMat);
                screwMesh.position.set((domeR + 6) * Math.cos(angle), 1, (domeR + 6) * Math.sin(angle));
                lightGroup.add(screwMesh);
            }

            // 4. Side Metallic Cable Gland & Strain Relief Boot
            const glandGeo = new THREE.CylinderGeometry(5, 5, 12, 16);
            const glandMat = new THREE.MeshStandardMaterial({ color: 0xa0aab5, metalness: 0.95, roughness: 0.2 });
            const glandMesh = new THREE.Mesh(glandGeo, glandMat);
            glandMesh.rotation.z = Math.PI / 2;
            glandMesh.position.set(domeR + 8, 4, 0);
            lightGroup.add(glandMesh);

            // Catmull-Rom Cable Path
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(domeR + 12, 4, 0),
                new THREE.Vector3(domeR + 24, 6, 8),
                new THREE.Vector3(domeR + 32, 2, 20)
            ]);
            const tubeGeo = new THREE.TubeGeometry(curve, 16, 2.5, 12, false);
            const cableMat = new THREE.MeshStandardMaterial({ color: 0x11131a, roughness: 0.6 });
            const tubeMesh = new THREE.Mesh(tubeGeo, cableMat);
            lightGroup.add(tubeMesh);

            // Black 2-Pin Connector Plug
            const plugGeo = new THREE.BoxGeometry(9, 7, 14);
            const plugMat = new THREE.MeshStandardMaterial({ color: 0x1c202b, roughness: 0.3, metalness: 0.5 });
            const plugMesh = new THREE.Mesh(plugGeo, plugMat);
            plugMesh.position.set(domeR + 33, 1, 26);
            plugMesh.rotation.y = Math.PI / 4;
            lightGroup.add(plugMesh);

            // 5. Internal Glowing LED Ring Array at Bottom Perimeter
            const ledRingGeo = new THREE.RingGeometry(domeR - 12, domeR - 3, 32);
            const ledRingMat = new THREE.MeshBasicMaterial({ color: lightColorHex, side: THREE.DoubleSide });
            const ledRingMesh = new THREE.Mesh(ledRingGeo, ledRingMat);
            ledRingMesh.rotation.x = Math.PI / 2;
            ledRingMesh.position.y = 8;
            lightGroup.add(ledRingMesh);

            // Downward Shadowless Diffuse Point Light
            const domeLightSource = new THREE.PointLight(lightColorHex, 1.8, wd * 2.2);
            domeLightSource.position.set(0, domeH * 0.4, 0);
            lightGroup.add(domeLightSource);

        } else if (lightType === 'backlight') {
            // Detailed Industrial Edge-lit Backlight Plate FL Series (FL-100100, FL-150150, FL-200200)
            // Positioned UNDERNEATH/BEHIND the target workpiece for silhouette imaging
            lightGroup.position.set(0, -32, 0);

            const backW = Math.max(160, fovW * 1.6);
            const backD = Math.max(130, fovH * 1.6);
            const backH = 16;

            // 1. Dark Anodized Aluminum Outer Housing Frame
            const frameGeo = new THREE.BoxGeometry(backW, backH, backD);
            const frameMat = new THREE.MeshStandardMaterial({
                color: 0x181c26,
                metalness: 0.85,
                roughness: 0.25
            });
            const frameMesh = new THREE.Mesh(frameGeo, frameMat);
            lightGroup.add(frameMesh);

            // Silver Anodized Outer Bevel Trim Lip
            const lipGeo = new THREE.BoxGeometry(backW + 4, 3, backD + 4);
            const lipMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
            const lipMesh = new THREE.Mesh(lipGeo, lipMat);
            lipMesh.position.y = -backH / 2 + 1.5;
            lightGroup.add(lipMesh);

            // 2. Uniform High-Diffusion Translucent Glowing Acrylic Top Plate Surface
            const diffPlateGeo = new THREE.BoxGeometry(backW - 12, 2.5, backD - 12);
            const diffPlateMat = new THREE.MeshStandardMaterial({
                color: lightColorHex,
                emissive: lightColorHex,
                emissiveIntensity: 0.95,
                roughness: 0.1,
                metalness: 0.05
            });
            const diffPlateMesh = new THREE.Mesh(diffPlateGeo, diffPlateMat);
            diffPlateMesh.position.y = backH / 2 + 1;
            lightGroup.add(diffPlateMesh);

            // Inner Recessed Dark Rim Border around Glowing Diffuser
            const rimBorderGeo = new THREE.BoxGeometry(backW - 6, 2, backD - 6);
            const rimBorderMat = new THREE.MeshStandardMaterial({ color: 0x0e1117, roughness: 0.6 });
            const rimBorderMesh = new THREE.Mesh(rimBorderGeo, rimBorderMat);
            rimBorderMesh.position.y = backH / 2 + 0.5;
            lightGroup.add(rimBorderMesh);

            // 3. Side Metallic Cable Gland & Strain Relief Boot
            const glandGeo = new THREE.CylinderGeometry(4.5, 4.5, 10, 16);
            const glandMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
            const glandMesh = new THREE.Mesh(glandGeo, glandMat);
            glandMesh.rotation.z = Math.PI / 2;
            glandMesh.position.set(backW / 2 + 5, 0, 0);
            lightGroup.add(glandMesh);

            // Flexible Black Power Cable
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(backW / 2 + 10, 0, 0),
                new THREE.Vector3(backW / 2 + 20, 2, 8),
                new THREE.Vector3(backW / 2 + 28, -2, 18)
            ]);
            const tubeGeo = new THREE.TubeGeometry(curve, 16, 2.5, 12, false);
            const cableMat = new THREE.MeshStandardMaterial({ color: 0x11131a, roughness: 0.6 });
            const tubeMesh = new THREE.Mesh(tubeGeo, cableMat);
            lightGroup.add(tubeMesh);

            // Connector Plug at tip
            const plugGeo = new THREE.BoxGeometry(9, 7, 14);
            const plugMat = new THREE.MeshStandardMaterial({ color: 0x1c202b, roughness: 0.3, metalness: 0.5 });
            const plugMesh = new THREE.Mesh(plugGeo, plugMat);
            plugMesh.position.set(backW / 2 + 29, -3, 24);
            plugMesh.rotation.y = Math.PI / 4;
            lightGroup.add(plugMesh);

            // 4. Upward Projecting Backlight Illumination Light Source
            const backLightSource = new THREE.PointLight(lightColorHex, 2.0, wd * 2.5);
            backLightSource.position.set(0, 8, 0);
            lightGroup.add(backLightSource);

        } else if (lightType === 'bar') {
            // Sleek Industrial Dual Bar Light Fixtures BA Series (Matching User Diagram)
            lightGroup.position.set(0, 61, 0);

            function createSingleBarLightMesh(length, height, depth, colorHex) {
                const barGroup = new THREE.Group();

                // 1. Sleek Dark Metallic Anodized Main Body Frame Box
                const bodyGeo = new THREE.BoxGeometry(length, height, depth);
                const bodyMat = new THREE.MeshStandardMaterial({
                    color: 0x1e2433,
                    metalness: 0.85,
                    roughness: 0.2
                });
                const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
                barGroup.add(bodyMesh);

                // Metallic Silver Bevel Frame Trim
                const trimGeo = new THREE.BoxGeometry(length + 2, height + 2, depth - 4);
                const trimMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
                const trimMesh = new THREE.Mesh(trimGeo, trimMat);
                barGroup.add(trimMesh);

                // 2. Front High-Emissive Diffuser Panel (Glowing LED Surface)
                const diffFrameGeo = new THREE.BoxGeometry(length - 6, height - 4, 3);
                const diffFrameMat = new THREE.MeshStandardMaterial({ color: 0x0d1117, roughness: 0.5 });
                const diffFrameMesh = new THREE.Mesh(diffFrameGeo, diffFrameMat);
                diffFrameMesh.position.y = -height / 2 - 1.5;
                barGroup.add(diffFrameMesh);

                const diffPanelGeo = new THREE.BoxGeometry(length - 12, height - 8, 3.5);
                const diffPanelMat = new THREE.MeshStandardMaterial({
                    color: colorHex,
                    emissive: colorHex,
                    emissiveIntensity: 0.95,
                    roughness: 0.1,
                    metalness: 0.05
                });
                const diffPanelMesh = new THREE.Mesh(diffPanelGeo, diffPanelMat);
                diffPanelMesh.position.y = -height / 2 - 2;
                barGroup.add(diffPanelMesh);

                // 3. Four Corner Hex Screw Rivets
                const screwGeo = new THREE.CylinderGeometry(1.6, 1.6, 3, 12);
                const screwMat = new THREE.MeshStandardMaterial({ color: 0xc4cdd5, metalness: 0.95, roughness: 0.1 });
                [[-length / 2 + 8, -depth / 2 + 6], [length / 2 - 8, -depth / 2 + 6],
                [-length / 2 + 8, depth / 2 - 6], [length / 2 - 8, depth / 2 - 6]].forEach(pos => {
                    const screwMesh = new THREE.Mesh(screwGeo, screwMat);
                    screwMesh.position.set(pos[0], height / 2 + 1.5, pos[1]);
                    barGroup.add(screwMesh);
                });

                // 4. Rear Power Connector Jack Socket (Flush-Mounted)
                const jackGeo = new THREE.CylinderGeometry(4, 4, 6, 16);
                const jackMat = new THREE.MeshStandardMaterial({ color: 0x11131a, metalness: 0.8, roughness: 0.4 });
                const jackMesh = new THREE.Mesh(jackGeo, jackMat);
                jackMesh.position.set(length / 2 + 2, 0, 0);
                jackMesh.rotation.z = Math.PI / 2;
                barGroup.add(jackMesh);

                return barGroup;
            }

            const barLen = Math.max(70, fovW * 0.85);
            const barH = 22;
            const barD = 35;

            // Left Bar Light Fixture (Lying horizontally along Z-axis, angled 45° inwards & downwards directly aiming at workpiece, identical to square-bar)
            const leftBar = createSingleBarLightMesh(barLen, barH, barD, lightColorHex);
            leftBar.position.set(-fovW * 0.75 - 25, 0, 0);
            leftBar.rotation.order = 'YXZ';
            leftBar.rotation.set(-Math.PI / 4, Math.PI / 2, 0);
            lightGroup.add(leftBar);

            // Right Bar Light Fixture (Lying horizontally along Z-axis, angled 45° inwards & downwards directly aiming at workpiece, identical to square-bar)
            const rightBar = createSingleBarLightMesh(barLen, barH, barD, lightColorHex);
            rightBar.position.set(fovW * 0.75 + 25, 0, 0);
            rightBar.rotation.order = 'YXZ';
            rightBar.rotation.set(Math.PI / 4, Math.PI / 2, 0);
            lightGroup.add(rightBar);

            // Spotlights pointing directly down-inward at center target workpiece
            const spot1 = new THREE.SpotLight(lightColorHex, 1.8, wd * 2.2, Math.PI / 4, 0.5);
            spot1.position.set(-fovW * 0.75 - 25, 0, 0);
            spot1.target.position.set(0, -wd * 0.45, 0);
            lightGroup.add(spot1);
            lightGroup.add(spot1.target);

            const spot2 = new THREE.SpotLight(lightColorHex, 1.8, wd * 2.2, Math.PI / 4, 0.5);
            spot2.position.set(fovW * 0.75 + 25, 0, 0);
            spot2.target.position.set(0, -wd * 0.45, 0);
            lightGroup.add(spot2);
            lightGroup.add(spot2.target);

        } else if (lightType === 'square-bar') {
            // Detailed 4-Side Square Bar Light BA4 Series (BA4-020160160, BA4-040120120, BA4-040140140)
            // Matching User CAD Model: Top square frame plate with 4 suspended bar lights & 4-sided light shroud cone
            lightGroup.position.set(0, 61, 0);

            const barLen = Math.max(75, Math.max(fovW, fovH) * 0.85);
            const barH = 22;
            const barD = 32;
            const squareDist = barLen * 0.55 + 14;

            function createSingleBarLightMesh(length, height, depth, colorHex) {
                const barGroup = new THREE.Group();

                // 1. Sleek Dark Anodized Aluminum Main Body Frame Box
                const bodyGeo = new THREE.BoxGeometry(length, height, depth);
                const bodyMat = new THREE.MeshStandardMaterial({
                    color: 0x222838,
                    metalness: 0.85,
                    roughness: 0.2
                });
                const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
                barGroup.add(bodyMesh);

                // 2. Rear Outer Heat-Sink Cooling Fins Slits
                const finMat = new THREE.MeshStandardMaterial({ color: 0x141824, metalness: 0.9, roughness: 0.3 });
                for (let i = -3; i <= 3; i++) {
                    const finGeo = new THREE.BoxGeometry(length - 8, 2, 2);
                    const finMesh = new THREE.Mesh(finGeo, finMat);
                    finMesh.position.set(0, height / 2 + 1, i * 4);
                    barGroup.add(finMesh);
                }

                // 3. Front Inner Recessed Diffuser Panel (Glowing LED Surface)
                const diffFrameGeo = new THREE.BoxGeometry(length - 6, height - 4, 3);
                const diffFrameMat = new THREE.MeshStandardMaterial({ color: 0x0d1117, roughness: 0.5 });
                const diffFrameMesh = new THREE.Mesh(diffFrameGeo, diffFrameMat);
                diffFrameMesh.position.y = -height / 2 - 1.5;
                barGroup.add(diffFrameMesh);

                const diffPanelGeo = new THREE.BoxGeometry(length - 12, height - 8, 3.5);
                const diffPanelMat = new THREE.MeshStandardMaterial({
                    color: colorHex,
                    emissive: colorHex,
                    emissiveIntensity: 0.95,
                    roughness: 0.1,
                    metalness: 0.05
                });
                const diffPanelMesh = new THREE.Mesh(diffPanelGeo, diffPanelMat);
                diffPanelMesh.position.y = -height / 2 - 2;
                barGroup.add(diffPanelMesh);

                // 4. End Mounting Hinge Bracket Plates
                const bracketGeo = new THREE.BoxGeometry(12, 16, 18);
                const bracketMat = new THREE.MeshStandardMaterial({ color: 0x11141f, metalness: 0.8, roughness: 0.4 });

                const bMesh1 = new THREE.Mesh(bracketGeo, bracketMat);
                bMesh1.position.set(-length / 2 + 6, height / 2 + 5, 0);
                barGroup.add(bMesh1);

                const bMesh2 = new THREE.Mesh(bracketGeo, bracketMat);
                bMesh2.position.set(length / 2 - 6, height / 2 + 5, 0);
                barGroup.add(bMesh2);

                return barGroup;
            }

            // 1. Top Central Square Base Mounting Plate Frame
            const frameGroup = new THREE.Group();
            const plateMat = new THREE.MeshStandardMaterial({ color: 0x181c28, metalness: 0.9, roughness: 0.3 });

            const plateOuterW = squareDist * 2 + 36;
            const plateInnerW = squareDist * 1.15;

            // 4 Perimeter Frame Plates forming square cutout plate
            const topPlateGeo = new THREE.BoxGeometry(plateOuterW, 6, (plateOuterW - plateInnerW) / 2);
            const topPlate = new THREE.Mesh(topPlateGeo, plateMat);
            topPlate.position.set(0, 10, -(plateInnerW + (plateOuterW - plateInnerW) / 2) / 2);
            frameGroup.add(topPlate);

            const botPlate = topPlate.clone();
            botPlate.position.set(0, 10, (plateInnerW + (plateOuterW - plateInnerW) / 2) / 2);
            frameGroup.add(botPlate);

            const sidePlateGeo = new THREE.BoxGeometry((plateOuterW - plateInnerW) / 2, 6, plateInnerW);
            const leftPlate = new THREE.Mesh(sidePlateGeo, plateMat);
            leftPlate.position.set(-(plateInnerW + (plateOuterW - plateInnerW) / 2) / 2, 10, 0);
            frameGroup.add(leftPlate);

            const rightPlate = leftPlate.clone();
            rightPlate.position.set((plateInnerW + (plateOuterW - plateInnerW) / 2) / 2, 10, 0);
            frameGroup.add(rightPlate);

            // 4 Corner Hinge Mount Brackets
            const cornerPlateGeo = new THREE.BoxGeometry(26, 8, 26);
            [[-squareDist - 8, -squareDist - 8], [squareDist + 8, -squareDist - 8],
            [-squareDist - 8, squareDist + 8], [squareDist + 8, squareDist + 8]].forEach(cPos => {
                const sMesh = new THREE.Mesh(cornerPlateGeo, plateMat);
                sMesh.position.set(cPos[0], 6, cPos[1]);
                frameGroup.add(sMesh);
            });

            lightGroup.add(frameGroup);

            // 2. Four Perimeter Bar Light Fixtures Suspended Underneath & Angled 45° Inwards Aiming at Workpiece Target
            // North Bar (-Z)
            const topBar = createSingleBarLightMesh(barLen, barH, barD, lightColorHex);
            topBar.position.set(0, -6, -squareDist);
            topBar.rotation.x = -Math.PI / 4;
            lightGroup.add(topBar);

            // South Bar (+Z)
            const bottomBar = createSingleBarLightMesh(barLen, barH, barD, lightColorHex);
            bottomBar.position.set(0, -6, squareDist);
            bottomBar.rotation.x = Math.PI / 4;
            lightGroup.add(bottomBar);

            // West Bar (-X)
            const leftBar = createSingleBarLightMesh(barLen, barH, barD, lightColorHex);
            leftBar.position.set(-squareDist, -6, 0);
            leftBar.rotation.order = 'YXZ';
            leftBar.rotation.set(-Math.PI / 4, Math.PI / 2, 0);
            lightGroup.add(leftBar);

            // East Bar (+X)
            const rightBar = createSingleBarLightMesh(barLen, barH, barD, lightColorHex);
            rightBar.position.set(squareDist, -6, 0);
            rightBar.rotation.order = 'YXZ';
            rightBar.rotation.set(Math.PI / 4, Math.PI / 2, 0);
            lightGroup.add(rightBar);

            // 3. Translucent 4-Sided Light Pyramid Shroud Cone (Projecting down onto Workpiece Target)
            const pyramidGeo = new THREE.BufferGeometry();
            const topY = -12;
            const botY = -wd * 0.45;
            const topW = squareDist * 0.75;
            const topD = squareDist * 0.75;
            const botW = fovW * 0.9;
            const botD = fovH * 0.9;

            const vertices = new Float32Array([
                // North face
                -topW, topY, -topD, topW, topY, -topD, botW, botY, -botD,
                -topW, topY, -topD, botW, botY, -botD, -botW, botY, -botD,
                // South face
                topW, topY, topD, -topW, topY, topD, -botW, botY, botD,
                topW, topY, topD, -botW, botY, botD, botW, botY, botD,
                // East face
                topW, topY, -topD, topW, topY, topD, botW, botY, botD,
                topW, topY, -topD, botW, botY, botD, botW, botY, -botD,
                // West face
                -topW, topY, topD, -topW, topY, -topD, -botW, botY, -botD,
                -topW, topY, topD, -botW, botY, -botD, -botW, botY, botD
            ]);

            pyramidGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            pyramidGeo.computeVertexNormals();

            const pyramidMat = new THREE.MeshBasicMaterial({
                color: lightColorHex,
                transparent: true,
                opacity: 0.22,
                side: THREE.DoubleSide
            });
            const pyramidMesh = new THREE.Mesh(pyramidGeo, pyramidMat);
            lightGroup.add(pyramidMesh);

            // 4. Power Cable & Industrial Connector Plug Array
            const cableGroup = new THREE.Group();
            cableGroup.position.set(squareDist + 8, 8, squareDist + 8);

            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(8, 8, 8),
                new THREE.Vector3(16, 12, 16),
                new THREE.Vector3(24, 15, 24)
            ]);
            const tubeGeo = new THREE.TubeGeometry(curve, 16, 2.5, 12, false);
            const cableMat = new THREE.MeshStandardMaterial({ color: 0x11131a, roughness: 0.6 });
            const tubeMesh = new THREE.Mesh(tubeGeo, cableMat);
            cableGroup.add(tubeMesh);

            const plugGeo = new THREE.BoxGeometry(10, 8, 14);
            const plugMat = new THREE.MeshStandardMaterial({ color: 0x1c202b, roughness: 0.3, metalness: 0.5 });
            const plugMesh = new THREE.Mesh(plugGeo, plugMat);
            plugMesh.position.set(25, 16, 25);
            plugMesh.rotation.y = Math.PI / 4;
            cableGroup.add(plugMesh);

            lightGroup.add(cableGroup);

            // Omnidirectional 4-Side Spotlights Aiming at Target Workpiece
            const squareLight = new THREE.PointLight(lightColorHex, 2.2, wd * 2.5);
            squareLight.position.set(0, -10, 0);
            lightGroup.add(squareLight);
        }

        return lightGroup;
        };   // end buildLightUnit

        const isDualLight = cfg.lightCount === 2;
        const light1Type = cfg.lightType || 'ring';
        const lightGroup = buildLightUnit(light1Type, lightColorHex);
        let lightGroup2 = null;
        if (isDualLight) {
            const light2Type = cfg.light2Type || 'bar';
            lightGroup2 = buildLightUnit(light2Type, getLightColorHex(cfg.light2Color || 'white'));
            // Stack Light 2 BELOW Light 1 by the chosen gap (backlight keeps its own position under the stage)
            if (light1Type !== 'backlight' && light2Type !== 'backlight') {
                const gap = Math.max(10, cfg.lightGap || 45);
                lightGroup2.position.y = Math.max(12, lightGroup.position.y - gap);
            }
        }

        components3DGroup.add(lightGroup);
        activeLightGroup3D = lightGroup;
        baseLightPosY = lightGroup.position.y;
        if (lightGroup2) {
            components3DGroup.add(lightGroup2);
            activeLightGroup2_3D = lightGroup2;
            baseLight2PosY = lightGroup2.position.y;
        }
        if (transformControls3D) {
            transformControls3D.attach(lightGroup);
        }
        resetLightSliders();
        syncDualLightUI();

        // ==================== 5. FOV OPTICAL CONE ====================
        if (cfg.showFov !== false) {
            const fovConeGroup = new THREE.Group();
            const topLensY = wd;
            const botY = 0;

            // 4 Corner Lines forming Pyramid
            const lineMat = new THREE.LineBasicMaterial({ color: lightColorHex, linewidth: 2, transparent: true, opacity: 0.8 });
            const corners = [
                [-fovW / 2, botY, -fovH / 2],
                [fovW / 2, botY, -fovH / 2],
                [fovW / 2, botY, fovH / 2],
                [-fovW / 2, botY, fovH / 2]
            ];

            corners.forEach(c => {
                const points = [];
                points.push(new THREE.Vector3(0, topLensY, 0));
                points.push(new THREE.Vector3(c[0], c[1], c[2]));
                const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
                fovConeGroup.add(new THREE.Line(lineGeo, lineMat));
            });

            // Translucent Pyramid Volume
            const pyShape = new THREE.BufferGeometry();
            const vertices = new Float32Array([
                0, topLensY, 0, -fovW / 2, botY, -fovH / 2, fovW / 2, botY, -fovH / 2,
                0, topLensY, 0, fovW / 2, botY, -fovH / 2, fovW / 2, botY, fovH / 2,
                0, topLensY, 0, fovW / 2, botY, fovH / 2, -fovW / 2, botY, fovH / 2,
                0, topLensY, 0, -fovW / 2, botY, fovH / 2, -fovW / 2, botY, -fovH / 2
            ]);
            pyShape.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            pyShape.computeVertexNormals();

            const pyMat = new THREE.MeshBasicMaterial({
                color: lightColorHex,
                transparent: true,
                opacity: 0.12,
                side: THREE.DoubleSide
            });
            const pyMesh = new THREE.Mesh(pyShape, pyMat);
            fovConeGroup.add(pyMesh);

            components3DGroup.add(fovConeGroup);
            activeFovGroup3D = fovConeGroup;
            activeFovGroup3D.userData.lastWorkpieceY = 0;  // workpiece starts at Y=0
        }

        // ==================== 6. TARGET WORKPIECE ====================
        const workGroup = new THREE.Group();
        workGroup.position.set(0, 0, 0);

        // Ground stage base plane - Bright Silver Anodized Aluminum Plate
        const stageGeo = new THREE.BoxGeometry(Math.max(200, fovW * 2), 6, Math.max(160, fovH * 2));
        const stageMat = new THREE.MeshStandardMaterial({ color: 0xd4dfeb, roughness: 0.3, metalness: 0.8 });
        const stageMesh = new THREE.Mesh(stageGeo, stageMat);
        stageMesh.position.y = -4;
        stageMesh.receiveShadow = true;
        workGroup.add(stageMesh);

        // FOV Boundary box outline on workpiece surface
        const fovBoxGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-fovW / 2, 0.5, -fovH / 2),
            new THREE.Vector3(fovW / 2, 0.5, -fovH / 2),
            new THREE.Vector3(fovW / 2, 0.5, fovH / 2),
            new THREE.Vector3(-fovW / 2, 0.5, fovH / 2),
            new THREE.Vector3(-fovW / 2, 0.5, -fovH / 2)
        ]);
        const fovBoxMat = new THREE.LineBasicMaterial({ color: 0x00f2ff, linewidth: 2 });
        const fovBoxLine = new THREE.Line(fovBoxGeo, fovBoxMat);
        workGroup.add(fovBoxLine);

        const wpType = cfg.workpiece || 'pcb';

        if (wpType === 'pcb') {
            // Green PCB Board
            const pcbGeo = new THREE.BoxGeometry(fovW * 0.9, 3, fovH * 0.9);
            const pcbMat = new THREE.MeshStandardMaterial({ color: 0x0a6033, roughness: 0.4 });
            const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
            pcbMesh.position.y = 1.5;
            workGroup.add(pcbMesh);

            // IC Microchips
            const chipGeo = new THREE.BoxGeometry(fovW * 0.25, 4, fovH * 0.25);
            const chipMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.2 });
            const chipMesh = new THREE.Mesh(chipGeo, chipMat);
            chipMesh.position.set(0, 4, 0);
            workGroup.add(chipMesh);

        } else if (wpType === 'cnc') {
            // Aluminium CNC Metal Block
            const cncGeo = new THREE.BoxGeometry(fovW * 0.8, 15, fovH * 0.8);
            const cncMat = new THREE.MeshStandardMaterial({ color: 0xc4cdd5, metalness: 0.9, roughness: 0.2 });
            const cncMesh = new THREE.Mesh(cncGeo, cncMat);
            cncMesh.position.y = 7.5;
            workGroup.add(cncMesh);

            // Drilled Hole
            const holeGeo = new THREE.CylinderGeometry(fovW * 0.15, fovW * 0.15, 16, 32);
            const holeMat = new THREE.MeshStandardMaterial({ color: 0x101520, roughness: 0.8 });
            const holeMesh = new THREE.Mesh(holeGeo, holeMat);
            holeMesh.position.set(0, 8, 0);
            workGroup.add(holeMesh);

        } else if (wpType === 'bottle') {
            // Cylindrical Bottle Container
            const bGeo = new THREE.CylinderGeometry(fovH * 0.35, fovH * 0.35, fovW * 0.8, 32);
            const bMat = new THREE.MeshPhysicalMaterial({ color: 0x0088cc, transparent: true, opacity: 0.7, roughness: 0.1 });
            const bMesh = new THREE.Mesh(bGeo, bMat);
            bMesh.position.y = (fovW * 0.8) / 2;
            workGroup.add(bMesh);

        } else if (wpType === 'grid') {
            // Calibration Grid Target
            const gridGeo = new THREE.PlaneGeometry(fovW * 0.9, fovH * 0.9);
            const gridMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
            const gridMesh = new THREE.Mesh(gridGeo, gridMat);
            gridMesh.rotation.x = -Math.PI / 2;
            gridMesh.position.y = 1;
            workGroup.add(gridMesh);
        }

        components3DGroup.add(workGroup);
        activeWorkGroup3D = workGroup;
        baseWorkGroupPosY = workGroup.position.y;

        select3DTransformTarget(activeWorkGroup3D, 'Workpiece / Product Specimen');

        // ── Auto-fill dimension annotations from calculated config ──────────────────
        // WD: always from the calculated working distance (lens bottom → product)
        dimAnnotationWD = cfg.workingDistance || 150;

        // LWD: from the real light bottom Y position.
        // baseLightPosY = lightGroup.position.y (world). Light half-heights per type:
        const halfHOf = (t) => ({ 'ring': 13, 'ring-flat': 8, 'coaxial': 12, 'dome': 30, 'backlight': 5, 'bar': 10, 'square-bar': 10 }[t] || 13);
        let lightBottomY = baseLightPosY - halfHOf(cfg.lightType || 'ring');
        // Dual-light: LWD is measured from the lowest (front-most) light
        if (activeLightGroup2_3D) {
            lightBottomY = Math.min(lightBottomY, baseLight2PosY - halfHOf(cfg.light2Type || 'bar'));
        }
        const initProdY = activeWorkGroup3D ? activeWorkGroup3D.position.y : 0;
        dimAnnotationLWD = Math.max(initProdY + 0.5, lightBottomY);

        // Reset line X offsets so they reinitialise from the new config's base offset
        dimWDXOffset = 0;
        dimLWDXOffset = 0;
        drawDimensionAnnotations(cfg);
    }

    // Export 3D Snapshot as High-Resolution Square PNG Image (1:1 Aspect Ratio)
    function export3DConceptImage() {
        if (!renderer3D || !scene3D || !camera3D) return;

        // Temporarily detach TransformControls gizmo so drag arrows are 100% hidden in output image
        const attachedObj = transformControls3D ? transformControls3D.object : null;
        if (transformControls3D && attachedObj) {
            transformControls3D.detach();
        }

        // Save current camera aspect and renderer viewport size
        const origAspect = camera3D.aspect;
        const container = document.querySelector('.viewport-3d-wrapper');
        const origW = container ? container.clientWidth : 800;
        const origH = container ? container.clientHeight : 600;

        // Force 1:1 Square Aspect Ratio Render (1200 × 1200 px)
        const exportWidth = 1200;
        const exportHeight = 1200;

        camera3D.aspect = 1.0;
        camera3D.updateProjectionMatrix();
        renderer3D.setSize(exportWidth, exportHeight, false);
        renderer3D.render(scene3D, camera3D);

        const sourceCanvas = renderer3D.domElement;

        // Composite Square Canvas (1200 × 1200 px)
        const compCanvas = document.createElement('canvas');
        compCanvas.width = exportWidth;
        compCanvas.height = exportHeight;
        const ctx = compCanvas.getContext('2d');

        // Studio Slate Neutral Gradient Background
        const grad = ctx.createLinearGradient(0, 0, 0, exportHeight);
        grad.addColorStop(0, '#f8fafc');
        grad.addColorStop(1, '#cbd5e1');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, exportWidth, exportHeight);

        // Draw Square WebGL 3D Snapshot
        ctx.drawImage(sourceCanvas, 0, 0, exportWidth, exportHeight);

        // Header Title Banner (Dark Cyber Header)
        ctx.fillStyle = 'rgba(9, 13, 22, 0.90)';
        ctx.fillRect(0, 0, exportWidth, 90);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 90);
        ctx.lineTo(exportWidth, 90);
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 24px "Orbitron", sans-serif';
        ctx.fillText('VISION SYSTEM 3D CONCEPT SIMULATION', 30, 42);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '14px "Inter", sans-serif';
        const dateStr = new Date().toLocaleString('vi-VN');
        ctx.fillText(`Exported Date: ${dateStr} | High Resolution Square Render (1:1)`, 30, 70);

        // Bottom Specification Box (Dark Obsidian Overlay Card)
        ctx.fillStyle = 'rgba(9, 13, 22, 0.90)';
        ctx.fillRect(30, exportHeight - 140, exportWidth - 60, 110);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(30, exportHeight - 140, exportWidth - 60, 110);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px "Inter", sans-serif';
        ctx.fillText(`Camera: ${current3DConfig.cameraName || 'MV-CH250'} (${current3DConfig.sensorSize || '2/3"'})`, 50, exportHeight - 105);
        ctx.fillText(`Lens: ${current3DConfig.lensName || 'FA 12mm'} | Extension Ring: ${current3DConfig.extensionLength || 0} mm`, 50, exportHeight - 72);

        const wdValExport = (typeof dimLabelWD !== 'undefined' && dimLabelWD) ? dimLabelWD : (current3DConfig.workingDistance || 150);
        const lwdValExport = (typeof dimLabelLWD !== 'undefined' && dimLabelLWD) ? dimLabelLWD : (dimAnnotationLWD || 30);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 15px "Orbitron", sans-serif';
        ctx.fillText(`WD: ${wdValExport.toFixed(1)} mm | LWD: ${lwdValExport.toFixed(1)} mm | FOV: ${(current3DConfig.fovWidth || 80).toFixed(1)} × ${(current3DConfig.fovHeight || 60).toFixed(1)} mm`, 500, exportHeight - 105);
        ctx.fillText(`Accuracy: ${(current3DConfig.pixelSize || 0.025).toFixed(4)} mm/px`, 500, exportHeight - 72);

        // ── Draw WD & LWD Dimension Annotations on Export Canvas ──────────────────────
        function projectExport(wx, wy, wz) {
            const v = new THREE.Vector3(wx, wy, wz);
            v.project(camera3D);
            return {
                x: (v.x * 0.5 + 0.5) * exportWidth,
                y: (-v.y * 0.5 + 0.5) * exportHeight,
                behind: v.z > 1
            };
        }

        const fovW = Math.max(10, current3DConfig.fovWidth || 80);
        const baseXOffset = fovW / 2 + 55;
        const exportWDX = (typeof dimWDXOffset !== 'undefined' && dimWDXOffset !== 0) ? dimWDXOffset : baseXOffset;
        const exportLWDX = (typeof dimLWDXOffset !== 'undefined' && dimLWDXOffset !== 0) ? dimLWDXOffset : (baseXOffset + 28);
        const exportWDTopY = (typeof dimAnnotWDTopY !== 'undefined' && dimAnnotWDTopY !== 0) ? dimAnnotWDTopY : wdValExport;
        const exportWDBottomY = (typeof dimAnnotWDBottomY !== 'undefined') ? dimAnnotWDBottomY : 0;
        const exportLWDTopY = (typeof dimAnnotLWDTopY !== 'undefined' && dimAnnotLWDTopY !== 0) ? dimAnnotLWDTopY : lwdValExport;
        const exportLWDBottomY = (typeof dimAnnotLWDBottomY !== 'undefined') ? dimAnnotLWDBottomY : 0;

        function drawDimAnnotExport(xOff, yTop, yBottom, colorHex, labelText) {
            const pTop = projectExport(xOff, yTop, 0);
            const pBottom = projectExport(xOff, yBottom, 0);
            const pMid = projectExport(xOff, (yTop + yBottom) / 2, 0);
            if (pTop.behind || pBottom.behind) return;

            const hexStr = '#' + colorHex.toString(16).padStart(6, '0');
            const dimStr = '#' + Math.floor(colorHex * 0.4).toString(16).padStart(6, '0');

            // Vertical shaft
            ctx.strokeStyle = hexStr;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(pTop.x, pTop.y);
            ctx.lineTo(pBottom.x, pBottom.y);
            ctx.stroke();

            // Tick marks
            const tickLen = 12;
            ctx.beginPath();
            ctx.moveTo(pTop.x - tickLen, pTop.y);
            ctx.lineTo(pTop.x + tickLen, pTop.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pBottom.x - tickLen, pBottom.y);
            ctx.lineTo(pBottom.x + tickLen, pBottom.y);
            ctx.stroke();

            // Horizontal guide lines to model center
            ctx.strokeStyle = dimStr;
            ctx.lineWidth = 1.5;
            const pModelTop = projectExport(0, yTop, 0);
            const pModelBottom = projectExport(0, yBottom, 0);
            if (!pModelTop.behind) {
                ctx.beginPath();
                ctx.moveTo(pModelTop.x, pModelTop.y);
                ctx.lineTo(pTop.x - 14, pTop.y);
                ctx.stroke();
            }
            if (!pModelBottom.behind) {
                ctx.beginPath();
                ctx.moveTo(pModelBottom.x, pModelBottom.y);
                ctx.lineTo(pBottom.x - 14, pBottom.y);
                ctx.stroke();
            }

            // Label badge
            const badgeText = labelText;
            ctx.font = 'bold 15px "Orbitron", monospace';
            const tw = ctx.measureText(badgeText).width;
            const bx = pMid.x + 14;
            const by = pMid.y - 15;
            const bw = tw + 22;
            const bh = 30;
            const br = 6;

            // Badge background & border
            ctx.fillStyle = 'rgba(10, 14, 24, 0.94)';
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
                ctx.roundRect(bx, by, bw, bh, br);
            } else {
                ctx.rect(bx, by, bw, bh);
            }
            ctx.fill();

            ctx.strokeStyle = hexStr;
            ctx.lineWidth = 2;
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
                ctx.roundRect(bx, by, bw, bh, br);
            } else {
                ctx.rect(bx, by, bw, bh);
            }
            ctx.stroke();

            // Badge text
            ctx.fillStyle = hexStr;
            ctx.fillText(badgeText, bx + 11, by + 20);

            // Circle indicator on top tick
            ctx.beginPath();
            ctx.arc(pTop.x, pTop.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = hexStr + '55';
            ctx.fill();
            ctx.strokeStyle = hexStr;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // WD annotation – orange (#f97316)
        drawDimAnnotExport(
            exportWDX, exportWDTopY, exportWDBottomY,
            0xf97316, `WD = ${wdValExport.toFixed(0)} mm`
        );
        // LWD annotation – cyan (#22d3ee)
        drawDimAnnotExport(
            exportLWDX, exportLWDTopY, exportLWDBottomY,
            0x22d3ee, `LWD = ${lwdValExport.toFixed(0)} mm`
        );

        // Restore original camera aspect ratio and renderer size
        camera3D.aspect = origAspect;
        camera3D.updateProjectionMatrix();
        renderer3D.setSize(origW, origH, false);
        renderer3D.render(scene3D, camera3D);

        // Re-attach TransformControls gizmo after rendering snapshot
        if (transformControls3D && attachedObj) {
            transformControls3D.attach(attachedObj);
        }

        // Trigger PNG Download
        const dataUrl = compCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        const filename = `Vision_Concept_3D_Square_${(current3DConfig.cameraName || 'Setup').replace(/\s+/g, '_')}_${Date.now()}.png`;
        link.download = filename;
        link.href = dataUrl;
        link.click();

        // Show Downloaded Image Result Preview Modal with full WD & LWD labels
        showDownloadedImageModal(dataUrl, filename, {
            wd: wdValExport,
            lwd: lwdValExport,
            fovW: current3DConfig.fovWidth || 80,
            fovH: current3DConfig.fovHeight || 60,
            acc: current3DConfig.pixelSize || 0.025
        });
    }

    // ── Helper to Display Downloaded Image Result Preview Modal ───────────────────
    function showDownloadedImageModal(dataUrl, filename, specs) {
        const modal = document.getElementById('modal-downloaded-image');
        const img = document.getElementById('downloaded-image-preview');
        const wdEl = document.getElementById('downloaded-img-wd');
        const lwdEl = document.getElementById('downloaded-img-lwd');
        const fovEl = document.getElementById('downloaded-img-fov');
        const accEl = document.getElementById('downloaded-img-acc');
        const reDownloadBtn = document.getElementById('downloaded-img-re-download');
        const openTabBtn = document.getElementById('downloaded-img-open-tab');

        if (img) img.src = dataUrl;
        if (wdEl) wdEl.textContent = `${specs.wd.toFixed(0)} mm`;
        if (lwdEl) lwdEl.textContent = `${specs.lwd.toFixed(0)} mm`;
        if (fovEl) fovEl.textContent = `${specs.fovW.toFixed(1)} × ${specs.fovH.toFixed(1)} mm`;
        if (accEl) accEl.textContent = `${specs.acc.toFixed(4)} mm/px`;

        if (reDownloadBtn) {
            reDownloadBtn.href = dataUrl;
            reDownloadBtn.download = filename;
        }

        if (openTabBtn) {
            openTabBtn.onclick = () => {
                const win = window.open();
                if (win) {
                    win.document.write(`
                        <html>
                            <head><title>Downloaded Image Result - ${filename}</title></head>
                            <body style="margin:0; background:#0f172a; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                                <img src="${dataUrl}" style="max-width:98vw; max-height:98vh; object-fit:contain; border-radius:8px; box-shadow: 0 0 30px rgba(0,0,0,0.8);" />
                            </body>
                        </html>
                    `);
                }
            };
        }

        if (modal) {
            modal.style.display = 'flex';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    // Modal Close Event Listeners for Downloaded Image Preview Modal
    const closeDownloadedImgBtn = document.getElementById('close-downloaded-image-btn');
    const closeDownloadedImgBtnFooter = document.getElementById('close-downloaded-image-btn-footer');
    const modalDownloadedImg = document.getElementById('modal-downloaded-image');

    if (closeDownloadedImgBtn) closeDownloadedImgBtn.addEventListener('click', () => {
        if (modalDownloadedImg) modalDownloadedImg.style.display = 'none';
    });
    if (closeDownloadedImgBtnFooter) closeDownloadedImgBtnFooter.addEventListener('click', () => {
        if (modalDownloadedImg) modalDownloadedImg.style.display = 'none';
    });
    if (modalDownloadedImg) {
        modalDownloadedImg.addEventListener('click', (e) => {
            if (e.target === modalDownloadedImg) modalDownloadedImg.style.display = 'none';
        });
    }

    // Attach Modal Controls & Button Event Listeners
    if (close3DBtn) close3DBtn.addEventListener('click', close3DConceptModal);
    if (modal3D) {
        modal3D.addEventListener('click', (e) => {
            if (e.target === modal3D) close3DConceptModal();
        });
    }

    if (export3DBtnTop) export3DBtnTop.addEventListener('click', export3DConceptImage);
    if (export3DBtnBottom) export3DBtnBottom.addEventListener('click', export3DConceptImage);

    // View Presets
    const presetBtns = document.querySelectorAll('.preset-btn[data-view]');
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.getAttribute('data-view');
            const wd = current3DConfig.workingDistance || 150;

            if (view === 'isometric') {
                camera3D.position.set(240, 220, 300);
            } else if (view === 'front') {
                camera3D.position.set(0, wd / 2, 380);
            } else if (view === 'side') {
                camera3D.position.set(380, wd / 2, 0);
            } else if (view === 'top') {
                camera3D.position.set(0, wd * 2.5, 0.1);
            }
            if (controls3D) controls3D.target.set(0, wd / 2, 0);
        });
    });

    if (reset3DCamBtn) {
        reset3DCamBtn.addEventListener('click', () => {
            resetToInitialState();
        });
    }

    // ── Full reset — restore the scene to the state it had when the modal was first opened ──────
    function resetToInitialState() {
        // 1. Restore config to the snapshot saved at open time (falls back to current if not saved)
        const cfg = initialOpen3DConfig ? JSON.parse(JSON.stringify(initialOpen3DConfig)) : JSON.parse(JSON.stringify(current3DConfig));
        if (initialOpen3DConfig) {
            // Dual-light settings fall back to defaults (single light) unless the opener supplied them
            if (cfg.lightCount === undefined) cfg.lightCount = 1;
            if (cfg.light2Type === undefined) cfg.light2Type = 'bar';
            if (cfg.light2Color === undefined) cfg.light2Color = 'white';
            if (cfg.lightGap === undefined) cfg.lightGap = 45;
        }

        // 2. Reset all dimension annotation overrides so they auto-recalculate from cfg
        dimAnnotWDTopY = 0;
        dimAnnotLWDTopY = 0;
        dimAnnotWDBottomY = 0;
        dimAnnotLWDBottomY = 0;
        dimWDXOffset = 0;
        dimLWDXOffset = 0;
        window._resetDimTop = true;

        // 3. Rebuild the full 3D scene from the initial config
        windowToModalConfig(cfg);

        // 4. Clear the _resetDimTop flag after the rebuild
        window._resetDimTop = false;

        // 5. Restore camera to the initial isometric position
        const wd = cfg.workingDistance || 150;
        if (camera3D) camera3D.position.set(240, 220, 300);
        if (controls3D) controls3D.target.set(0, wd / 2, 0);

        // 6. Restore dropdowns to initial values
        const initLightType = cfg.lightType || 'ring';
        const initLightColor = cfg.lightColor || 'white';
        const initWorkpiece = cfg.workpiece || 'pcb';
        const initIsTele = !!(cfg.isTelecentric || (cfg.lensName && /telecentric|tec-|tele/i.test(cfg.lensName)));

        if (select3DLightType) select3DLightType.value = initLightType;
        if (select3DLightColor) select3DLightColor.value = initLightColor;
        if (select3DWorkpiece) select3DWorkpiece.value = initWorkpiece;

        const selectLensType = document.getElementById('select-3d-lens-type');
        if (selectLensType) selectLensType.value = initIsTele ? 'telecentric' : 'fa';

        // 7. Restore checkboxes
        showWdLwdAnnotation = true;
        if (chk3DShowFov) chk3DShowFov.checked = true;
        if (chk3DShowDims) { chk3DShowDims.checked = true; }

        // 8. Restore scene brightness to default
        update3DBrightness(65);
        const slider3DBrightnessEl = document.getElementById('slider-3d-brightness');
        if (slider3DBrightnessEl) slider3DBrightnessEl.value = 65;

        // 9. Highlight the isometric preset button as active
        const presetBtnsAll = document.querySelectorAll('.preset-btn[data-view]');
        presetBtnsAll.forEach(b => b.classList.remove('active'));
        const isoBtn = document.querySelector('.preset-btn[data-view="isometric"]');
        if (isoBtn) isoBtn.classList.add('active');
    }

    // ===== DUAL LIGHT (UPPER / LOWER) UI =====
    const select3DLightCount = document.getElementById('select-3d-light-count');
    const select3DLight2Type = document.getElementById('select-3d-light2-type');
    const select3DLight2Color = document.getElementById('select-3d-light2-color');
    const slider3DLightGap = document.getElementById('slider-3d-light-gap');
    const btn3DSwapLights = document.getElementById('btn-3d-swap-lights');

    function syncDualLightUI() {
        const dual = current3DConfig.lightCount === 2;
        const panel = document.getElementById('dual-light-options');
        if (panel) panel.style.display = dual ? 'block' : 'none';
        if (select3DLightCount) select3DLightCount.value = dual ? '2' : '1';
        if (select3DLight2Type) select3DLight2Type.value = current3DConfig.light2Type || 'bar';
        if (select3DLight2Color) select3DLight2Color.value = current3DConfig.light2Color || 'white';
        if (slider3DLightGap) slider3DLightGap.value = current3DConfig.lightGap || 45;
        const lblGap = document.getElementById('lbl-3d-light-gap');
        if (lblGap) lblGap.textContent = (current3DConfig.lightGap || 45) + ' mm';
        const lbl1 = document.getElementById('lbl-light1-type');
        if (lbl1) lbl1.textContent = dual ? 'Light 1 Type (Upper)' : 'Light Source Type';
        const opt2 = document.querySelector('#select-3d-target-obj option[value="light2"]');
        if (opt2) { opt2.hidden = !dual; opt2.disabled = !dual; }
        const opt1 = document.querySelector('#select-3d-target-obj option[value="light"]');
        if (opt1) opt1.textContent = dual ? 'Light 1 – Upper' : 'Lighting Assembly';
        const hudInfo = document.getElementById('modal-3d-subtitle');
        if (hudInfo) hudInfo.textContent = dual
            ? 'Interactive 3D Rig: Camera + Lens + Extension Ring + 2 Lights (Upper / Lower) + FOV Cone'
            : 'Interactive 3D Rig: Camera + Lens + Extension Ring + Light + FOV Cone';
    }

    if (select3DLightCount) {
        select3DLightCount.addEventListener('change', () => {
            current3DConfig.lightCount = parseInt(select3DLightCount.value, 10) === 2 ? 2 : 1;
            build3DVisionSystem(current3DConfig);
        });
    }
    if (select3DLight2Type) {
        select3DLight2Type.addEventListener('change', () => {
            current3DConfig.light2Type = select3DLight2Type.value;
            build3DVisionSystem(current3DConfig);
        });
    }
    if (select3DLight2Color) {
        select3DLight2Color.addEventListener('change', () => {
            current3DConfig.light2Color = select3DLight2Color.value;
            build3DVisionSystem(current3DConfig);
        });
    }
    if (slider3DLightGap) {
        slider3DLightGap.addEventListener('input', () => {
            current3DConfig.lightGap = parseInt(slider3DLightGap.value, 10) || 45;
            const lblGap = document.getElementById('lbl-3d-light-gap');
            if (lblGap) lblGap.textContent = current3DConfig.lightGap + ' mm';
            // Live update: move only the lower light, keep the upper one where it is
            if (activeLightGroup2_3D && activeLightGroup3D) {
                const curWorkY = activeWorkGroup3D ? activeWorkGroup3D.position.y : 0;
                const newY = Math.max(12, activeLightGroup3D.position.y - curWorkY - current3DConfig.lightGap);
                baseLight2PosY = newY;
                activeLightGroup2_3D.position.y = newY + curWorkY;
                if (activeTransformTarget === activeLightGroup2_3D) syncLightSlidersFrom3D();
                if (showWdLwdAnnotation) drawDimensionAnnotations(current3DConfig);
            }
        });
    }
    if (btn3DSwapLights) {
        btn3DSwapLights.addEventListener('click', () => {
            // Swap upper <-> lower light (type + color)
            const t = current3DConfig.lightType, c = current3DConfig.lightColor;
            current3DConfig.lightType = current3DConfig.light2Type || 'bar';
            current3DConfig.lightColor = current3DConfig.light2Color || 'white';
            current3DConfig.light2Type = t;
            current3DConfig.light2Color = c;
            if (select3DLightType) select3DLightType.value = current3DConfig.lightType;
            if (select3DLightColor) select3DLightColor.value = current3DConfig.lightColor;
            build3DVisionSystem(current3DConfig);
        });
    }

    // Customization Selectors
    if (select3DLightType) {
        select3DLightType.addEventListener('change', () => {
            current3DConfig.lightType = select3DLightType.value;
            build3DVisionSystem(current3DConfig);
        });
    }

    if (select3DLightColor) {
        select3DLightColor.addEventListener('change', () => {
            current3DConfig.lightColor = select3DLightColor.value;
            build3DVisionSystem(current3DConfig);
        });
    }

    if (select3DWorkpiece) {
        select3DWorkpiece.addEventListener('change', () => {
            current3DConfig.workpiece = select3DWorkpiece.value;
            build3DVisionSystem(current3DConfig);
        });
    }

    const select3DLensType = document.getElementById('select-3d-lens-type');
    if (select3DLensType) {
        select3DLensType.addEventListener('change', () => {
            const val = select3DLensType.value;
            current3DConfig.isTelecentric = (val === 'telecentric');
            if (val === 'telecentric') {
                current3DConfig.lensName = current3DConfig.lensName && /telecentric|tec-/i.test(current3DConfig.lensName)
                    ? current3DConfig.lensName
                    : 'Industrial Telecentric Coaxial Lens (TEC-V Series)';
            } else {
                current3DConfig.lensName = current3DConfig.lensName && !/telecentric|tec-/i.test(current3DConfig.lensName)
                    ? current3DConfig.lensName
                    : 'Standard FA Lens (Fixed Focal)';
            }
            const elLens = document.getElementById('spec-3d-lens');
            if (elLens) elLens.textContent = current3DConfig.lensName;
            build3DVisionSystem(current3DConfig);
        });
    }

    // WD & LWD Dimension Annotation Controls
    const chkShowWdLwd = document.getElementById('chk-3d-show-wd-lwd');
    if (chkShowWdLwd) {
        chkShowWdLwd.addEventListener('change', () => {
            showWdLwdAnnotation = chkShowWdLwd.checked;
            const body = document.getElementById('dim-annotation-body');
            if (body) body.style.display = showWdLwdAnnotation ? 'block' : 'none';
            drawDimensionAnnotations(current3DConfig);
        });
    }

    const btnApplyDim = document.getElementById('btn-apply-dim-annotation');
    if (btnApplyDim) {
        btnApplyDim.addEventListener('click', () => {
            const inpWd = document.getElementById('inp-dim-wd');
            const inpLwd = document.getElementById('inp-dim-lwd');
            // Only update the LABEL text — dimension line endpoints do NOT move
            if (inpWd) dimLabelWD = Math.max(0, parseFloat(inpWd.value) || dimLabelWD);
            // LWD allows negative values for backlight mode (light below workpiece)
            if (inpLwd) {
                const parsed = parseFloat(inpLwd.value);
                if (!isNaN(parsed)) dimLabelLWD = parsed;
            }
            updateDimLabelPositions();   // refresh label badges only, no 3D rebuild
        });
    }

    const select3DBgTheme = document.getElementById('select-3d-bg-theme');
    if (select3DBgTheme) {
        select3DBgTheme.addEventListener('change', () => {
            const theme = select3DBgTheme.value;
            if (theme === 'clean-white') {
                update3DBrightness(100);
            } else if (theme === 'dark-cyber') {
                update3DBrightness(25);
            } else {
                update3DBrightness(65);
            }
            const slider = document.getElementById('slider-3d-brightness');
            if (slider) slider.value = (theme === 'clean-white' ? 100 : (theme === 'dark-cyber' ? 25 : 65));
        });
    }

    const slider3DBrightness = document.getElementById('slider-3d-brightness');
    if (slider3DBrightness) {
        slider3DBrightness.addEventListener('input', (e) => {
            update3DBrightness(e.target.value);
        });
    }

    function update3DBrightness(percent) {
        const val = parseFloat(percent) / 100;
        let r, g, b;
        if (val < 0.5) {
            const t = val * 2;
            r = Math.round(26 + (80 - 26) * t);
            g = Math.round(34 + (96 - 34) * t);
            b = Math.round(48 + (116 - 48) * t);
        } else {
            const t = (val - 0.5) * 2;
            r = Math.round(80 + (255 - 80) * t);
            g = Math.round(96 + (255 - 96) * t);
            b = Math.round(116 + (255 - 116) * t);
        }

        const hexColor = (r << 16) | (g << 8) | b;
        if (scene3D) scene3D.background = new THREE.Color(hexColor);
        if (renderer3D) renderer3D.setClearColor(hexColor, 1);

        if (scene3D) {
            scene3D.traverse((child) => {
                if (child.isAmbientLight) {
                    child.intensity = 0.8 + val * 0.8;
                }
            });
        }

        const lbl = document.getElementById('lbl-3d-brightness-val');
        if (lbl) lbl.textContent = Math.round(percent) + '%';
    }

    if (chk3DShowFov) {
        chk3DShowFov.addEventListener('change', () => {
            current3DConfig.showFov = chk3DShowFov.checked;
            // Use lightweight cone rebuild instead of full scene rebuild
            const curY = activeWorkGroup3D ? activeWorkGroup3D.position.y : 0;
            if (chk3DShowFov.checked) {
                rebuildFovCone(current3DConfig, curY);
            } else {
                if (activeFovGroup3D && components3DGroup) {
                    components3DGroup.remove(activeFovGroup3D);
                    activeFovGroup3D = null;
                }
            }
        });
    }

    if (chk3DShowDims) {
        chk3DShowDims.addEventListener('change', () => {
            current3DConfig.showDims = chk3DShowDims.checked;
            build3DVisionSystem(current3DConfig);
        });
    }

    // FA Lens Calculator Button trigger
    const showFa3DBtn = document.getElementById('show-fa-3d-btn');
    if (showFa3DBtn) {
        showFa3DBtn.addEventListener('click', () => {
            const camType = document.getElementById('calc-camera-type')?.value || 'Industrial Camera';
            const sensorSize = document.getElementById('calc-sensor-size')?.value || '2/3"';
            const lensType = document.getElementById('calc-lens-type')?.value || 'FA Lens';
            const flStr = document.getElementById('calc-focal-length')?.value || '12mm';
            const fovW = parseFloat(document.getElementById('calc-fov-width')?.value) || 80;
            const fovH = parseFloat(document.getElementById('calc-fov-height')?.value) || (fovW * 0.75);
            const wd = parseFloat(document.getElementById('calc-working-distance')?.value) || 150;
            const pxSize = parseFloat(document.getElementById('calc-pixel-size')?.value) || 0.025;
            const extLen = document.getElementById('use-adapter-ring')?.checked ? (parseFloat(document.getElementById('calc-ring-length')?.value) || 5) : 0;

            open3DConceptModal({
                cameraName: camType,
                sensorSize: sensorSize,
                lensName: lensType,
                focalLength: flStr,
                extensionLength: extLen,
                workingDistance: wd,
                fovWidth: fovW,
                fovHeight: fovH,
                pixelSize: pxSize
            });
        });
    }

    // Telecentric Lens Calculator Button trigger
    const showTele3DBtn = document.getElementById('show-tele-3d-btn');
    if (showTele3DBtn) {
        showTele3DBtn.addEventListener('click', () => {
            const camType = document.getElementById('tele-calc-camera-type')?.value || 'Telecentric Camera';
            const sensorSize = document.getElementById('tele-calc-sensor-size')?.value || '2/3"';
            const lensType = document.getElementById('tele-calc-lens-type')?.value || 'Telecentric Lens';
            const mag = document.getElementById('tele-calc-magnification')?.value || '1.0x';
            const fovW = parseFloat(document.getElementById('tele-calc-fov-width')?.value) || 60;
            const fovH = parseFloat(document.getElementById('tele-calc-fov-height')?.value) || (fovW * 0.75);
            const wdStr = document.getElementById('tele-calc-wd-range')?.value || '110mm';
            const wd = parseFloat(wdStr.replace(/[^\d.]/g, '')) || 110;
            const pxSize = parseFloat(document.getElementById('tele-calc-pixel-size')?.value) || 0.015;

            open3DConceptModal({
                cameraName: camType,
                sensorSize: sensorSize,
                lensName: lensType,
                focalLength: 'β=' + mag,
                extensionLength: 0,
                workingDistance: wd,
                fovWidth: fovW,
                fovHeight: fovH,
                pixelSize: pxSize,
                isTelecentric: true
            });
        });
    }

    // EXT Calculate Button trigger
    const showExt3DBtn = document.getElementById('show-ext-3d-btn');
    if (showExt3DBtn) {
        showExt3DBtn.addEventListener('click', () => {
            const brand = document.getElementById('ext-brand-select')?.value || 'Computar';
            const lensModel = document.getElementById('ext-lens-select')?.value || 'FA Lens';
            const wdStr = document.getElementById('ext-wd-select')?.value || '100';
            const wd = parseFloat(wdStr) || 100;
            const extResultStr = document.getElementById('ext-result-display')?.textContent || '5';
            const extLen = parseFloat(extResultStr) || 5;

            open3DConceptModal({
                cameraName: brand.toUpperCase() + ' System Camera',
                sensorSize: '2/3" Standard',
                lensName: lensModel,
                focalLength: '12mm',
                extensionLength: extLen,
                workingDistance: wd,
                fovWidth: 80,
                fovHeight: 60,
                pixelSize: 0.025
            });
        });
    }

    // Call init
    initExtCalculator();

});


