# Security System Bundle Builder

A responsive multi-step security system bundle builder with a live review panel, built with React, Vite, TypeScript, MUI, and Zustand.

## Features
- Interactive 4-step accordion builder.
- Independent variant quantity management.
- Live-updating review panel with subtotals, discounts, and totals.
- Data-driven product catalog.
- Persistent cart state using `localStorage`.
- Mobile-first responsive design.

## Folder Structure

```
src/
├── assets/           # Static images and icons
├── components/       # Reusable UI components
│   ├── AccordionStep/
│   ├── ProductCard/
│   ├── QuantityStepper/
│   └── VariantSelector/
├── data/             # JSON data files (products catalog)
├── features/         # Feature-specific complex components
│   ├── bundle-builder/
│   └── review-panel/
├── store/            # Zustand global state store
├── types/            # TypeScript interfaces
├── utils/            # Helper functions and asset mappings
├── App.tsx           # Main application layout and theme
└── main.tsx          # React DOM entry point
```

## How to Run

1. **Install Dependencies**
   Navigate to the project root (`take-home`) and run:
   ```bash
   npm install
   ```

2. **Start Development Server**
   Start the Vite dev server:
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Configuration

- **Format on Save**: A `.vscode/settings.json` is provided which enables `editor.formatOnSave` for this workspace automatically, ensuring your code stays clean when using Prettier in VS Code.
