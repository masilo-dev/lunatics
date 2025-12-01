# Admin CMS Documentation

## Overview
This project now includes a complete Content Management System (CMS) for managing the antiques collection catalog. The admin interface allows authorized users to add, edit, and delete items from the collection.

## Features

### 1. Admin Authentication
- Secure login system with protected routes
- Session persistence using localStorage
- Default credentials: 
  - Username: `admin`
  - Password: `admin123`

### 2. Admin Dashboard
- Overview statistics (total items, featured items, categories)
- Quick access to collection management
- Preview link to public collection

### 3. Collection Management
- **View All Items**: Browse all catalog items with search functionality
- **Add New Items**: Create new collection items with full details
- **Edit Items**: Update existing item information
- **Delete Items**: Remove items from the catalog with confirmation

### 4. Item Properties
Each collection item includes:
- Title
- Category (Furniture, Porcelain, Silver, Prints, Sculpture, Decorative Arts)
- Period (Georgian, Regency, Victorian, Edwardian)
- Price
- Description
- Multiple images (up to 4 for 360° views)
- Featured status

## Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. You'll be redirected to the admin dashboard at `/admin/dashboard`

## Admin Routes

- `/admin/login` - Login page
- `/admin/dashboard` - Admin dashboard (protected)
- `/admin/collection` - Collection management (protected)
- `/admin/collection/new` - Add new item form (protected)
- `/admin/collection/edit/:id` - Edit item form (protected)

## Data Storage

The CMS uses browser localStorage for data persistence. This means:
- Data persists across browser sessions
- Data is stored locally on the client side
- Each browser/device maintains its own data
- For production use, this should be replaced with a backend API and database

## Technical Implementation

### Context Providers
- **AuthContext**: Manages authentication state and login/logout functionality
- **CollectionContext**: Manages collection items CRUD operations

### Components
- **AdminLogin**: Login form component
- **AdminDashboard**: Dashboard overview with statistics
- **CollectionManagement**: List and manage all items
- **ItemForm**: Form for adding/editing items
- **ProtectedRoute**: Route wrapper to protect admin pages

## Future Enhancements

For a production environment, consider:
1. Backend API with proper authentication (JWT tokens)
2. Database storage (MongoDB, PostgreSQL, etc.)
3. Image upload functionality
4. Role-based access control
5. Audit logs for changes
6. Backup and restore functionality

## Development

To run the development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

## Security Notes

⚠️ **Important**: The current implementation uses hardcoded credentials and localStorage, which is suitable for development and demonstration purposes only. For production use:
- Implement proper server-side authentication
- Use secure password hashing (bcrypt, argon2)
- Implement HTTPS
- Add CSRF protection
- Use environment variables for sensitive data
- Implement rate limiting on login attempts
