import React, { createContext, useContext, useEffect, useState } from 'react';
import { dbService } from '../services/dbService';
import { INITIAL_USERS } from '../services/seedData';
import type { FarmerProfile, UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  farmerProfile: FarmerProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  registerBuyer: (name: string, email: string, phone: string) => Promise<boolean>;
  registerFarmer: (data: {
    name: string;
    email: string;
    phone: string;
    farm_name: string;
    state: string;
    district: string;
    village: string;
    farm_location: string;
    farm_size_acres: number;
    years_farming: number;
    primary_crops: string[];
    bio: string;
    avatar_url?: string;
  }) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('agri_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to Ramesh Kumar (Farmer) or Priya Sharma (Buyer)
  });

  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('agri_current_user', JSON.stringify(user));
      if (user.role === 'farmer') {
        dbService.getFarmerById(user.id).then((profile) => {
          setFarmerProfile(profile);
        });
      } else {
        setFarmerProfile(null);
      }
    } else {
      localStorage.removeItem('agri_current_user');
      setFarmerProfile(null);
    }
  }, [user]);

  const login = async (email: string, role?: UserRole): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users = INITIAL_USERS;
      const matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (matched) {
        setUser(matched);
      } else {
        // Create new session user
        const newUser: UserProfile = {
          id: `usr_${Date.now()}`,
          email,
          full_name: email.split('@')[0],
          role: role || 'buyer',
          created_at: new Date().toISOString()
        };
        setUser(newUser);
      }
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const registerBuyer = async (name: string, email: string, phone: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser: UserProfile = {
        id: `usr_buyer_${Date.now()}`,
        email,
        full_name: name,
        phone,
        role: 'buyer',
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        created_at: new Date().toISOString()
      };
      setUser(newUser);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const registerFarmer = async (data: {
    name: string;
    email: string;
    phone: string;
    farm_name: string;
    state: string;
    district: string;
    village: string;
    farm_location: string;
    farm_size_acres: number;
    years_farming: number;
    primary_crops: string[];
    bio: string;
    avatar_url?: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userId = `usr_farmer_${Date.now()}`;
      const newUser: UserProfile = {
        id: userId,
        email: data.email,
        full_name: data.name,
        phone: data.phone,
        role: 'farmer',
        avatar_url: data.avatar_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
        created_at: new Date().toISOString()
      };

      const farmerProf = await dbService.registerFarmer({
        user_id: userId,
        farm_name: data.farm_name,
        state: data.state,
        district: data.district,
        village: data.village,
        farm_location: data.farm_location,
        farm_size_acres: data.farm_size_acres,
        years_farming: data.years_farming,
        primary_crops: data.primary_crops,
        bio: data.bio,
        farmer_name: data.name,
        avatar_url: newUser.avatar_url,
        email: data.email
      });

      setUser(newUser);
      setFarmerProfile(farmerProf);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setFarmerProfile(null);
    localStorage.removeItem('agri_current_user');
  };

  const switchRole = (role: UserRole) => {
    const demoUser = INITIAL_USERS.find((u) => u.role === role) || {
      id: `usr_${role}_demo`,
      email: `${role}@agriconnect.in`,
      full_name: `Demo ${role.toUpperCase()}`,
      role,
      created_at: new Date().toISOString()
    };
    setUser(demoUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        farmerProfile,
        isAuthenticated: !!user,
        isLoading,
        login,
        registerBuyer,
        registerFarmer,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
