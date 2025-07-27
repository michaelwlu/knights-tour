# Knight's Tour ♞

A modern, interactive web application for solving the classic Knight's Tour chess puzzle. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 About

The Knight's Tour is a mathematical problem where a knight on a chess board must visit every square exactly once. This application provides an elegant, user-friendly interface for exploring this fascinating puzzle with various board sizes and difficulty levels.

## ✨ Features

### 🎮 Game Modes

- **Easy Mode**: Valid moves are highlighted, undo moves allowed
- **Medium Mode**: Valid moves hidden, undo moves allowed
- **Hard Mode**: Valid moves hidden, no undo functionality

### 🎛️ Customization

- **Board Dimensions**: Choose from preset sizes (5×5 to 10×10) or create custom dimensions (up to 12x12)
- **Responsive Design**: Adapts to different screen sizes with optimal layout
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

### [1.2.0] - 2025-07-27

#### Added

- **Smart Hint System**: Intelligent algorithm that finds moves leading to completion
- **Visual Hint Styling**:
  - Hint squares pulse with amber glow effect
  - Other valid moves show with reduced opacity when hints are active
  - New `HINT_VALID_MOVE` variant for subtle styling
- **Hint Usage Tracking**: Completion messages now include number of hints used
- **Enhanced UX**: Clear visual hierarchy between hint squares and other valid moves

#### Changed

- **Hint Behavior**: When hints are active, valid moves that aren't hints show with subtle styling
- **Completion Messages**: Share text now includes hint usage (e.g., "using 2 hints")

#### Technical

- Added `hintsUsed` calculation to board context
- Implemented new `BoardSquareVariant.HINT_VALID_MOVE` styling
- Enhanced hint system with visual feedback

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

#### Technical

- Next.js 14 project setup
- TypeScript configuration
- Basic component structure
- Core game logic implementation
