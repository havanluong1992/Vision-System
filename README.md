# Vision System App (Vision System Architect)

A professional, high-fidelity web application designed for Machine Vision engineers to quickly find components and calculate setup parameters.

## 🚀 Features

### 1. Unified Search & Discovery
- **Comprehensive Libraries**: Rapidly search through categorized lists of **Industrial Cameras**, **FA Lenses**, and **Telecentric Lenses**.
- **Cross-Category Filtering**: A global search system that filters through all product databases simultaneously.
- **Detailed Specifications**: View Resolution, Sensor Size, Focal Length, and Working Distance at a glance.

### 2. Advanced Vision Calculators
- **FA Lens Calculator**: 
  - **Bidirectional Calculation**: Calculate FOV from Working Distance or vice versa.
  - **Standard Mode**: Uses high-accuracy approximation formulas for general vision tasks.
  - **Adapter Ring Mode**: Strictly follows the **HIK Extension Tube Chart** empirical data for Macro applications.
  - **Input Snapping**: Automatically links Ring Length and Working Distance based on HIK's real-world test results.
- **Telecentric Lens Calculator**: Specialized tool for high-precision telecentric setups.
- **Real-time Accuracy**: Automatically calculates **Pixel Size (mm/px)** and **Vision Accuracy** for every setup.

### 3. Premium User Experience
- **Searchable Selects (Autocomplete)**: High-performance autocomplete inputs replace standard dropdowns, allowing for rapid component selection by typing partial model names (e.g., "050" or "25").
- **Glassmorphism UI**: A stunning, modern dark-mode interface with frosted glass effects and smooth transitions.
- **Fully Responsive**: Optimized for desktop and mobile devices, including specific enhancements for **iPhone 16 Pro Max**.

## 🛠 Tech Stack
- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Custom Glassmorphism Design System)
- **Logic**: Vanilla JavaScript (ES6+)
- **Icons**: Lucide Icons
- **Deployment**: Zero-dependency; runs directly in any modern web browser.

## 📂 Project Structure
- `index.html`: Main application entry point and layout.
- `app.js`: Application logic, product databases, and calculation engine.
- `style.css`: Comprehensive design system, animations, and responsive layouts.

## 📖 How to Use
1. Clone or download the repository.
2. Open `index.html` in any modern web browser (Chrome, Safari, Edge, or Firefox).
3. Log in as **Admin** (ID: `Admin`, Pass: `dkvina1234`) to access the **Calculation Vision** tab.
4. Use the navigation sidebar to switch between product lists and calculators.

---
*Designed for precision. Built for engineers.*
