# Knight's Tour ♞

A modern, interactive web application for solving the classic Knight's Tour chess puzzle. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 About

The Knight's Tour is a mathematical problem where a knight on a chess board must visit every square exactly once. This application provides an elegant, user-friendly interface for exploring this fascinating puzzle with various board sizes and game modes that offer different levels of assistance.

## ✨ Features

### 🎮 Game Modes

- **Novice**: Valid moves highlighted, undo allowed, 5 hints
- **Competitor**: Valid moves not highlighted, undo allowed, 4 hints
- **Expert**: Valid moves not highlighted, undo not allowed, 3 hints
- **Grandmaster**: Valid moves not highlighted, undo not allowed, no hints

### 🎛️ Customization

- **Board Dimensions**: Choose from preset sizes (5×5 to 12×12) or create custom dimensions
- **Responsive Design**: Desktop sidebar layout with mobile-optimized vertical stack
- **Dark/Light Theme**: Toggle between themes for comfortable play

### 💡 Smart Hint System

- **Intelligent Hints**: Algorithm finds moves that lead to completion
- **Visual Guidance**: Hint squares pulse with a subtle glow effect
- **Contextual Display**: When hints are active, other valid moves show with reduced opacity
- **Usage Tracking**: Completion message includes number of hints used

### 🎯 Game Features

- **Real-time Timer**: Track your solving time
- **Move History**: Visual representation of your path
- **Dead End Detection**: Clear indication when no valid moves remain
- **Undo Functionality**: Step back through your moves (when enabled)
- **Share Results**: Share your completion time and stats

### 🎨 User Experience

- **Smooth Animations**: Framer Motion for polished interactions
- **Accessible Design**: Keyboard navigation and screen reader support
- **Mobile Optimized**: Touch-friendly interface for mobile devices
- **Visual Feedback**: Clear color coding for different square states

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
# Clone from the original repository
git clone https://github.com/michaelwlu/knights-tour.git
# Or if you have forked it, replace 'michaelwlu' with your username
cd knights-tour
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom component library with shadcn/ui patterns
- **State Management**: React Context + Custom Hooks

## 🎯 How to Play

1. **Start**: Click any square to place the knight and begin
2. **Move**: Click highlighted squares to move the knight in L-shaped patterns
3. **Goal**: Visit every square exactly once
4. **Hints**: Use the hint button for guidance when stuck
5. **Undo**: Click the last square or undo button to go back (if enabled)

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📋 Changelog

### [1.5.0] - 2025-01-26

#### Added

- **Chess-Themed Game Modes**: Replaced generic difficulty names with chess titles (Novice, Competitor, Expert, Grandmaster)
- **Enhanced Settings UI**: Two-button layout with clear icons (Grid for board size, Target for game mode)
- **Direct Tab Navigation**: Clicking board size or mode buttons opens dialog to specific settings tab

#### Changed

- **Improved Clarity**: "Difficulty" renamed to "Mode" to better reflect game assistance features rather than puzzle complexity
- **Better Visual Separation**: Separate buttons for board size and game mode eliminate user confusion
- **Thematic Consistency**: Chess terminology throughout the game creates cohesive Knight's Tour experience

### [1.4.0] - 2025-08-09

#### Added

- **Expert Difficulty**: Fourth difficulty level with no hints available

#### Changed

- **Hint System**: Adjusted hint counts (Easy 5, Medium 4, Hard 3) and hide hint button on Expert
- **Difficulty Settings**: Enhanced UI with clearer descriptions and consistent iconography
- **Default Board Size**: Changed from 6×6 to 5×5 for lower difficulty threshold

#### Fixed

- **Hint Algorithm**: Eliminated suggestions that lead to dead-end positions
- **Visual Effects**: Hint glow now properly extends beyond board edges
- **Button Logic**: Share button only appears on completion; Undo button stays visible on game completion for Easy and Medium difficulties

### [1.3.0] - 2025-08-08

#### Added

- **Auto-Opening Instructions Modal**: First-time visitors automatically see the "How to Play" modal

#### Changed

- **Improved Desktop Styling**: Enhanced desktop layout with better component spacing and visual hierarchy
- **Simplified Instructions**: Streamlined "How to Play" content for better clarity
- **Enhanced Button Layouts**: Optimized layouts for both mobile and desktop experiences with contextual button sets

#### Fixed

- **Animation Conflicts**: Eliminated visual glitches during game state transitions
- **Accessibility Improvements**: Enhanced ARIA labels and semantic markup throughout the application

### [1.2.0] - 2025-07-27

#### Added

- **Complete Animation System**: Integrated Framer Motion for smooth UI transitions and feedback
- **Smart Hint System**: Intelligent algorithm that finds moves leading to completion
- **Enhanced Board Animations**: Smooth square transitions, hover effects, and visual state changes
- **Visual Hint Styling**: Hint squares pulse with amber glow effect

#### Changed

- **Comprehensive README**: Detailed documentation with feature descriptions, setup instructions, and changelog
- **Completion Messages**: Share text now includes hint usage statistics

### [1.1.0] - 2025-05-25

#### Added

- **Custom Board Dimensions**: Create boards from 5×5 to 12×12
- **Difficulty Modes**: Easy, Medium, and Hard settings
- **Undo Functionality**: Step back through moves (configurable per difficulty)
- **Valid Move Highlighting**: Visual guidance for valid knight moves
- **Game Timer**: Real-time tracking of solving time
- **Share Feature**: Share completion results with friends
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Mobile-optimized interface

#### Changed

- **UI Overhaul**: Modern, clean interface with Tailwind CSS
- **Component Architecture**: Modular component structure
- **State Management**: React Context for global state

### [1.0.0] - 2025-05-23

#### Added

- **Basic Knight's Tour Game**: Core gameplay mechanics
- **Board Rendering**: Visual chess board with knight movement
- **Move Validation**: L-shaped knight movement rules
- **Completion Detection**: Win condition checking
- **Basic Styling**: Initial visual design
