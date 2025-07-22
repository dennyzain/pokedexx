# 🎮 Pokémon Database

A modern, comprehensive Pokémon database built with Next.js, featuring advanced search, filtering, favorites, and comparison functionality. Built with a clean modular architecture following container/component patterns.

![Pokémon Database](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔍 **Advanced Search & Filtering**
- Real-time search by Pokémon name
- Filter by type(s) and generation
- Advanced sorting options (name, height, weight, ID)
- Responsive grid layout with pagination

### ❤️ **Favorites System**
- Add/remove Pokémon from favorites
- Persistent favorites using Zustand state management
- Dedicated favorites page

### ⚖️ **Pokémon Comparison**
- Compare up to 4 Pokémon side-by-side
- Visual stat comparisons with progress bars
- Basic information comparison table
- Crown indicators for highest stats

### 📱 **Pokémon Details**
- Detailed Pokémon information pages
- High-quality official artwork
- Base stats with visual progress indicators
- Abilities and move sets
- Generation and type information

### 🎨 **Modern UI/UX**
- Beautiful gradient hero sections
- Smooth animations and transitions
- Dark/light theme support
- Fully responsive design
- Loading states and error handling

## 🛠️ Technology Stack

- **Framework**: Next.js 14.2.16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17 + shadcn/ui components
- **State Management**: Zustand
- **Data Fetching**: Apollo Client + GraphQL
- **API**: PokéAPI GraphQL endpoint
- **Icons**: Lucide React 0.454.0
- **UI Components**: Radix UI primitives
- **Development**: ESLint, PostCSS, Autoprefixer

## 📁 Project Architecture

This project follows a **modular architecture** with clear separation of concerns:

```
modules/
├── home/                    # Home page module
│   ├── component/
│   │   ├── HomeComponent.tsx       # Pure presentation layer
│   │   └── index.ts               # Export wrapper
│   └── container/
│       └── HomeContainer.tsx      # Business logic & state
├── search/                  # Search functionality
│   ├── component/
│   │   ├── SearchComponent.tsx    # Search UI
│   │   └── index.ts
│   └── container/
│       └── SearchContainer.tsx    # Search logic & API
├── favorites/               # Favorites management
│   ├── component/
│   │   ├── FavoritesComponent.tsx # Favorites UI
│   │   └── index.ts
│   └── container/
│       └── FavoritesContainer.tsx # Favorites logic
├── comparison/              # Pokémon comparison
│   ├── component/
│   │   ├── ComparisonComponent.tsx # Comparison UI
│   │   └── index.ts
│   └── container/
│       └── ComparisonContainer.tsx # Comparison logic
├── pokemon-detail/          # Individual Pokémon pages
│   ├── component/
│   │   ├── PokemonDetailComponent.tsx # Detail UI
│   │   └── index.ts
│   └── container/
│       └── PokemonDetailContainer.tsx # Detail logic & API
└── shared/                  # Reusable components
    ├── component/
    │   ├── PokemonCard.tsx           # Export wrapper
    │   ├── PokemonCardComponent.tsx  # Card UI
    │   ├── PokemonFilters.tsx        # Export wrapper
    │   └── PokemonFiltersComponent.tsx # Filter UI
    └── container/
        ├── PokemonCardContainer.tsx     # Card logic
        └── PokemonFiltersContainer.tsx  # Filter logic
```

### Architecture Benefits

- **🔄 Separation of Concerns**: Logic and presentation are completely separated
- **♻️ Reusability**: Components can be easily reused across different contexts
- **🧪 Testability**: Pure presentation components are easier to test
- **🔧 Maintainability**: Clear structure makes code easier to understand and modify
- **📈 Scalability**: Easy to add new features following the same pattern

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd pokedex
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using yarn
   yarn install
   
   # Using pnpm (recommended)
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📖 Usage

### Navigation
- **Home**: Browse and search all Pokémon
- **Search**: Dedicated search page with advanced filtering
- **Favorites**: View your favorite Pokémon
- **Comparison**: Compare selected Pokémon side-by-side

### Key Features
- **Search**: Use the search bar to find Pokémon by name
- **Filter**: Click "Advanced Filters" to filter by type and generation
- **Favorites**: Click the heart icon on any Pokémon card
- **Compare**: Click the plus icon to add Pokémon to comparison (max 4)
- **Details**: Click any Pokémon card to view detailed information

## 🏗️ Development Guidelines

### Container/Component Pattern

**Containers** handle:
- State management
- API calls and data fetching
- Business logic and data transformation
- Passing clean props to components

**Components** handle:
- UI rendering
- User interactions (via props)
- Pure presentation logic
- No direct state or API management

### Adding New Features

1. Create a new module folder under `modules/`
2. Add `component/` and `container/` subfolders
3. Implement your container with business logic
4. Implement your component with UI
5. Create an `index.ts` export wrapper
6. Import and use in your page

Example:
```tsx
// modules/new-feature/container/NewFeatureContainer.tsx
export function NewFeatureContainer() {
  // Business logic here
  return <NewFeatureComponent {...props} />
}

// modules/new-feature/component/NewFeatureComponent.tsx
export function NewFeatureComponent(props) {
  // UI rendering here
}

// modules/new-feature/component/index.ts
export { NewFeatureContainer as NewFeature } from "../container/NewFeatureContainer"
```

## 🎨 Styling

This project uses:
- **Tailwind CSS 3.4.17** for utility-first styling
- **shadcn/ui** components built on Radix UI primitives
- **Tailwind Merge** for conditional class merging
- **Tailwind Animate** for smooth animations
- **CSS Grid** and **Flexbox** for responsive layouts
- **CSS Custom Properties** for theme variables
- **next-themes** for dark/light mode support

## 📊 Performance Features

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Client-side Caching**: Apollo Client intelligent caching
- **Debounced Search**: Optimized search with useDebounce hook
- **Loading States**: Skeleton loaders for better UX


