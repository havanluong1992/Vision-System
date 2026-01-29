document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Global processing canvas for lighting simulation (shared with converter)
    let processingCanvas = document.createElement('canvas');

    // Lens FA Data from Hikrobotics
    const lensData = [
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
        { model: 'MVL-KF0818M-12MP', focalLength: '8 mm', imageSize: 'Φ16 mm (1")' }
    ];

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
            lensTbody.appendChild(row);
        });
        if (lensShowingCount) lensShowingCount.textContent = data.length;
        if (lensTotalCount) lensTotalCount.textContent = lensData.length;
    }

    renderLensTable(lensData);


    // Telecentric Lens Data from Computar (TEC-V and TEC-M Series)
    const teleLensData = [
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
    const cameraData = [
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
        { model: 'IS8505P (Polarized)', resolution: '2448 × 2048', sensorSize: '1/1.1"', dimensions: '11.30 × 11.30' },

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
        lucide.createIcons();
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

    // Login State
    let isLoggedIn = false;
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const loginModal = document.getElementById('login-modal');
    const loginTrigger = document.getElementById('user-login-trigger');
    const loginForm = document.getElementById('login-form');
    const closeLoginBtn = document.getElementById('close-login-btn');
    const loginError = document.getElementById('login-error');
    const navCalc = document.getElementById('nav-calc');
    const displayUserName = document.getElementById('display-user-name');
    const displayUserRole = document.getElementById('display-user-role');
    const logoutBtn = document.getElementById('logout-btn');

    // Tab Navigation (Sidebar)
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.dataset.tab;

            // Login check disabled - all tabs are now accessible
            // if ((tabId === 'analytics' || tabId === 'vision-lab') && !isLoggedIn) {
            //     showLoginModal();
            //     return;
            // }

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `tab-${tabId}`) {
                    panel.classList.add('active');
                }
            });

            // Update search placeholder based on tab
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                if (tabId === 'lenses') {
                    searchInput.placeholder = 'Search lenses...';
                } else if (tabId === 'cameras') {
                    searchInput.placeholder = 'Search cameras...';
                } else if (tabId === 'vision-lab') {
                    searchInput.placeholder = 'Search tools...';
                } else {
                    searchInput.placeholder = 'Search...';
                }
            }

            lucide.createIcons();
        });
    });

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
            alert('Lưu ý: Tổ hợp Lens và Ring này không nằm trong bảng test thực tế của HIK.');
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
    function initSearchableSelect(inputId, resultsId, data, onSelect) {
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
            const filtered = data.filter(item =>
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

    // Initialize Searchable Selects for FA Calculator
    initSearchableSelect('calc-lens-type', 'calc-lens-results', lensData, (lens) => {
        calcFocalLength.value = lens.focalLength || '';
        calcImageSize.value = lens.imageSize || '';
        syncRingToWD();
    });

    initSearchableSelect('calc-camera-type', 'calc-camera-results', cameraData, (cam) => {
        const dimensions = cam.dimensions || sensorDimensionsMap[cam.sensorSize] || 'N/A';
        calcSensorSize.value = dimensions;
        calcCameraType.dataset.currentRes = cam.resolution || '';
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
                alert('Vui lòng chọn Lens và Camera trước!');
                return;
            }

            if (!workingDistance || (useAdapterRing.checked && workingDistance <= focalLength)) {
                alert('Vui lòng nhập Working Distance hợp lệ (lớn hơn Focal Length khi dùng Adapter Ring)!');
                return;
            }

            let fovWidth, fovHeight;

            if (useAdapterRing && useAdapterRing.checked) {
                // STRICT HIK CHART: Magnification is defined by M = L / f
                const ringLength = parseFloat(calcRingLength.value) || 0;
                if (ringLength <= 0) {
                    alert('Vui lòng chọn Ring Length từ bảng tra cứu!');
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

            lucide.createIcons();
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
                alert('Vui lòng chọn Lens và Camera trước!');
                return;
            }

            if (!fovWidth) {
                alert('Vui lòng nhập FOV Width!');
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

            lucide.createIcons();
        });
    }


    // ===== TELECENTRIC CALCULATOR =====
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

        // Try to extract magnification from model name
        let mag = '';
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
        teleCalcMagnification.value = mag;
    });

    initSearchableSelect('tele-calc-camera-type', 'tele-calc-camera-results', cameraData, (cam) => {
        const dimensions = cam.dimensions || sensorDimensionsMap[cam.sensorSize] || 'N/A';
        teleCalcSensorSize.value = dimensions;
        teleCalcCameraType.dataset.currentRes = cam.resolution || '';
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
                alert('Vui lòng chọn Tele Lens và Camera trước!');
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

            lucide.createIcons();
        });
    }

    // Helper to extract Megapixel resolution from model name (e.g., -6MPE, -10MP, -25MP)
    function getMPFromModel(model) {
        const match = model.match(/-(\d+)MP/);
        if (match) return parseInt(match[1]);
        const matchE = model.match(/-(\d+)MPE/);
        if (matchE) return parseInt(matchE[1]);

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
                alert('Vui lòng nhập FOV Width và Vision Accuracy dự kiến cho hệ Telecentric!');
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
                            let lensMag = 1.0;
                            if (lens.model.startsWith('TEC-M')) {
                                lensMag = parseFloat(lens.model.substring(5, 7)) / 10;
                            } else if (lens.model.startsWith('TEC-V')) {
                                if (lens.model.includes('05')) lensMag = 0.5;
                                else if (lens.model.includes('10')) lensMag = 1.0;
                                else if (lens.model.includes('03')) lensMag = 0.34;
                            }

                            const diff = Math.abs(lensMag - recMag);

                            // Resolution check
                            const camMP = (resW * resH) / 1000000;
                            const lensMP = getMPFromModel(lens.model);
                            const resMatch = lensMP >= camMP;

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

                            recommendations.push({
                                camera: cam,
                                lens: bestLens,
                                actualWd: parseFloat(bestLens.workingDistance.replace(/[^\d.]/g, '')),
                                actualAcc: actualAcc,
                                actualFov: actualFov,
                                score: Math.abs(actualAcc - desiredAcc) + Math.abs(actualFov - desiredFov) / 5 + resPenalty
                            });
                        }
                    }
                }
            });

            recommendations.sort((a, b) => a.score - b.score);
            const top2 = recommendations.slice(0, 2);

            if (top2.length > 0) {
                renderTeleRecommendations(top2);
            } else {
                teleRecGrid.innerHTML = '<div class="recommendation-card placeholder"><p>Không tìm thấy phần cứng Tele phù hợp.</p></div>';
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
                        <span class="rec-stat-value" style="color: var(--purple);">${(100 - rec.score).toFixed(1)}%</span>
                    </div>
                </div>
            `;
            teleRecGrid.appendChild(card);
        });
        lucide.createIcons();
    }

    // Login Functions
    function showLoginModal() {
        loginModal.classList.add('active');
        document.getElementById('login-id').focus();
    }

    function hideLoginModal() {
        loginModal.classList.remove('active');
        loginError.style.display = 'none';
        loginForm.reset();
    }

    if (loginTrigger) {
        loginTrigger.addEventListener('click', () => {
            if (!isLoggedIn) showLoginModal();
        });
    }

    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', hideLoginModal);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('login-id').value;
            const pass = document.getElementById('login-pass').value;

            if (id === 'Admin' && pass === 'dkvina1234') {
                handleLoginSuccess();
            } else {
                loginError.textContent = 'Invalid ID or Password';
                loginError.style.display = 'block';
            }
        });
    }

    function handleLoginSuccess() {
        isLoggedIn = true;
        hideLoginModal();

        // Update UI
        displayUserName.textContent = 'Admin';
        displayUserRole.textContent = 'System Architect';
        navCalc.classList.remove('nav-disabled');
        if (logoutBtn) logoutBtn.style.display = 'flex';

        // Success feedback
        const btn = document.querySelector('.login-submit-btn');
        btn.innerHTML = '<i data-lucide="check"></i> Success';
        lucide.createIcons();

        alert('Đăng nhập thành công! Tab Calculation Vision đã được mở.');
    }

    function handleLogout() {
        isLoggedIn = false;

        // Update UI
        displayUserName.textContent = 'Login';
        displayUserRole.textContent = 'Click to sign in';
        navCalc.classList.add('nav-disabled');
        if (logoutBtn) logoutBtn.style.display = 'none';

        // Go back to Camera List tab if we are in calculation
        const activeTab = document.querySelector('.nav-item.active').dataset.tab;
        if (activeTab === 'analytics') {
            const cameraTab = document.querySelector('.nav-item[data-tab="cameras"]');
            if (cameraTab) cameraTab.click();
        }

        lucide.createIcons();
        alert('Bạn đã đăng xuất thành công.');
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
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
                lucide.createIcons();
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.");
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
        lightCameraBtn.innerHTML = '<i data-lucide="camera"></i><span>Take Photo</span>';
        lucide.createIcons();
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
        lucide.createIcons();
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
                alert('Vui lòng nhập FOV Width, Working Distance và Vision Accuracy dự kiến!');
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

                            // Resolution check (Megapixel)
                            const camMP = (resW * resH) / 1000000;
                            const lensMP = getMPFromModel(lens.model);
                            const resMatch = lensMP >= camMP;

                            if (diff < minFlDiff && lensD >= camD * 0.9) {
                                // Prioritize correct resolution match
                                minFlDiff = diff;
                                bestLens = { ...lens, mp: lensMP, resMatch: resMatch };
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
                recGrid.innerHTML = '<div class="recommendation-card placeholder"><p>Không tìm thấy phần cứng phù hợp. Thử giảm độ chính xác hoặc thay đổi FOV/WD.</p></div>';
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
            `;
            recGrid.appendChild(card);
        });
        lucide.createIcons();
    }
});
