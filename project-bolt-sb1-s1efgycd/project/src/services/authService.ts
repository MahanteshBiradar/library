import { User, LoginFormData, RegisterFormData } from '../types';
import { users } from '../data/users';

// Simulate a database of users
let registeredUsers = [...users];

// Get user from local storage
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

// Set user in local storage
export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

// Login user
export const loginUser = (data: LoginFormData): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = registeredUsers.find(u => u.username === data.username);
      
      // In a real app, we would validate the password using a secure method
      if (user && data.password === 'password') { // Demo password for all users
        setCurrentUser(user);
        resolve(user);
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000); // Simulate network delay
  });
};

// Register user
export const registerUser = (data: RegisterFormData): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if username or email already exists
      const userExists = registeredUsers.some(
        u => u.username === data.username || u.email === data.email
      );
      
      if (userExists) {
        reject(new Error('Username or email already exists'));
        return;
      }
      
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        reject(new Error('Passwords do not match'));
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: (registeredUsers.length + 1).toString(),
        name: data.name,
        email: data.email,
        username: data.username,
        isAdmin: false // By default, new users are not admins
      };
      
      // Add to local users array
      registeredUsers = [...registeredUsers, newUser];
      setCurrentUser(newUser);
      resolve(newUser);
    }, 1000); // Simulate network delay
  });
};

// Logout user
export const logoutUser = (): void => {
  setCurrentUser(null);
};