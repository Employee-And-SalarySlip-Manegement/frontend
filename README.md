# Professional MERN Frontend Structure

A modern, scalable React frontend built with Vite, following industry best practices and professional folder structure.

## 🏗️ Project Structure

```
frontend/
├── public/                          # Static assets
├── src/                             # Source code
│   ├── assets/                      # Static assets (images, icons)
│   │   ├── images/                  # Image files
│   │   └── icons/                   # Icon files
│   ├── components/                  # Reusable UI components
│   │   ├── common/                  # Common/shared components
│   │   ├── layout/                  # Layout components
│   │   └── ui/                      # Base UI components
│   ├── pages/                       # Page components (routes)
│   ├── hooks/                       # Custom React hooks
│   ├── services/                    # API services
│   │   └── api.js                   # Main API service
│   ├── context/                     # React Context providers
│   │   └── AuthContext.jsx          # Authentication context
│   ├── utils/                       # Utility functions
│   │   └── index.js                 # Common utilities
│   ├── constants/                   # Application constants
│   │   └── index.js                 # App constants
│   ├── lib/                         # External library configs
│   ├── styles/                      # Global styles
│   │   └── index.css                # Main CSS with variables
│   └── types/                       # Type definitions
├── .env.example                     # Environment template
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies
```

## 🚀 Tech Stack

- **Framework**: React 18+ with Vite
- **State Management**: Zustand
- **API Client**: Axios with interceptors
- **Data Fetching**: Custom React hooks
- **Routing**: React Router v6
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: CSS with Custom Properties

## 🔧 Key Features

### 🔐 Authentication System
- JWT with refresh tokens
- Secure cookie storage
- Role-based access control
- Zustand state management

### 🌐 API Integration
- Axios interceptors
- Auto error handling
- File upload with progress
- Request cancellation

### 🎨 Modern CSS Architecture
- CSS Custom Properties
- Dark mode support
- Responsive utilities
- Professional color system

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues

# Testing
npm run test             # Run tests
npm run test:coverage    # Coverage report
```

## 🌍 Environment Variables

Create `.env` from `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME="Your App Name"
VITE_APP_ENVIRONMENT=development
```

## 🎯 Best Practices

### Component Structure
```jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@/context/AuthContext';

const MyComponent = ({ title }) => {
  const { user } = useAuth();
  
  return (
    <div className="my-component">
      <h1>{title}</h1>
    </div>
  );
};

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MyComponent;
```

### CSS Variables Usage
```css
.button {
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  transition: all var(--transition-fast);
}
```

### API Service Usage
```jsx
import { useFetch, useMutation } from '@/hooks/useApi';
import { userAPI } from '@/services/api';

const UserProfile = () => {
  // Fetch data
  const { data: user, loading } = useFetch(userAPI.getProfile);
  
  // Mutations
  const { mutate: updateUser, loading: updating } = useMutation(
    userAPI.updateProfile,
    {
      showSuccessToast: true,
      onSuccess: (data) => {
        console.log('User updated:', data);
      },
    }
  );
  
  const handleUpdate = (userData) => {
    updateUser(userData);
  };
  
  return (
    <div>
      {loading ? 'Loading...' : <div>{user?.name}</div>}
    </div>
  );
};
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

## 📁 Architecture Principles

- **Separation of Concerns**: Clear separation between UI, logic, and data
- **Scalability**: Modular structure for easy scaling
- **Maintainability**: Consistent patterns and documentation
- **Performance**: Optimized builds and efficient state management

## 🤝 Contributing

1. Follow the folder structure
2. Use ESLint for code quality
3. Write clean, documented code
4. Add tests for new features

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
