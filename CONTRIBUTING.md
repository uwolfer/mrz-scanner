# Contributing to mrz-scanner

Thank you for your interest in contributing to **mrz-scanner** — a Progressive Web App (PWA) for recognizing MRZ (Machine Readable Zone) lines used on ID cards and passports.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Reporting Bugs](#reporting-bugs)

## Getting Started

1. **Fork** this repository
2. **Clone** your fork: `git clone https://github.com/YOUR-USERNAME/mrz-scanner.git`
3. **Install** dependencies: `yarn install`
4. **Run** locally: `yarn dev` or open `index.html` directly

## Development Setup

### Prerequisites

- Node.js >= 16.x
- Yarn >= 1.x (or npm)
- A modern browser with camera access (for testing MRZ scanning)

### Running Tests

```bash
yarn test
```

### Building for Production

```bash
yarn build
```

## How to Contribute

### Types of Contributions Welcome

- 🐛 **Bug fixes** — Fix scanning accuracy issues or UI bugs
- ✨ **New features** — Additional document type support, offline improvements
- 📱 **PWA enhancements** — Better offline handling, caching strategies
- 📚 **Documentation** — Improve README or code comments
- 🌐 **Accessibility** — Better keyboard navigation, ARIA labels, screen reader support
- 🧪 **Tests** — Add unit or integration tests for MRZ parsing logic
- 🌍 **Internationalization** — Support for additional document formats

## Pull Request Process

1. Create a branch: `git checkout -b fix/your-fix-name`
2. Make your changes with clear, focused commits
3. Test on multiple browsers (Chrome, Firefox, Safari)
4. Test on a real mobile device if the change affects camera/scanning
5. Submit a PR with:
   - Clear description of the change
   - Screenshots or screen recordings for UI changes
   - Steps to reproduce the bug you fixed

### PR Title Format

- `fix: correct MRZ parsing for 3-line documents`
- `feat: add support for visa document type`
- `docs: improve camera permission instructions`
- `perf: optimize service worker caching strategy`

## Code Style

- Use **ES6+ modules** and modern JavaScript
- Keep functions **small and focused**
- Add **JSDoc comments** for public APIs
- Follow existing code patterns in `src/`

## Reporting Bugs

Please include:
- Browser name and version
- Device type (desktop/mobile)
- Document type you were scanning (blurred/anonymized screenshot welcome)
- Expected vs actual behavior
- Console errors (if any)

Open an issue at: https://github.com/uwolfer/mrz-scanner/issues

---

Thank you for helping make mrz-scanner better! 🪪📷