document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

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

            // Check if restricted
            if (tabId === 'analytics' && !isLoggedIn) {
                showLoginModal();
                return;
            }

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
                if (tabId === 'dashboard' || tabId === 'live') {
                    searchInput.placeholder = 'Search lenses...';
                } else if (tabId === 'cameras') {
                    searchInput.placeholder = 'Search cameras...';
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
            innerTabBtns.forEach(b => b.classList.remove('active'));
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
            calcPixelSize.value = pixelSizeVal.toFixed(4) + ' mm/px';
            calcVisionError.value = (pixelSizeVal * 3).toFixed(4) + ' mm';

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
            calcPixelSize.value = pixelSizeVal.toFixed(4) + ' mm/px';
            calcVisionError.value = (pixelSizeVal * 3).toFixed(4) + ' mm';

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

            teleCalcFovWidth.value = fovWidth.toFixed(2) + ' mm';
            teleCalcFovHeight.value = fovHeight.toFixed(2) + ' mm';

            // Calculate Pixel Size and Vision Error
            const resStr = teleCalcCameraType.dataset.currentRes || '';
            const resWidth = parseInt(resStr.split('×')[0]) || 1;
            const pixelSizeVal = fovWidth / resWidth;
            teleCalcPixelSize.value = pixelSizeVal.toFixed(4) + ' mm/px';
            teleCalcVisionError.value = (pixelSizeVal * 3).toFixed(4) + ' mm';

            lucide.createIcons();
        });
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

    // Close modal on background click
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) hideLoginModal();
    });
});
