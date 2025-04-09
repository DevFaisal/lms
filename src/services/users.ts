import api from "./api";
import { User, UserCreateRequest, UserUpdateRequest } from ".././types/user";

export const userService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    return api.get("/users/");
  },

  // Get user by ID
  getUser: async (userId: number): Promise<User> => {
    return api.get(`/users/${userId}`);
  },

  // Create a new user
  createUser: async (userData: UserCreateRequest): Promise<User> => {
    return api.post("/users/", userData);
  },

  // Update user
  updateUser: async (userId: number, userData: UserUpdateRequest): Promise<User> => {
    return api.put(`/users/${userId}`, userData);
  },

  // Delete user
  deleteUser: async (userId: number): Promise<void> => {
    return api.delete(`/users/${userId}`);
  },

  // Check and apply rewards
  checkRewards: async (userId: number): Promise<any> => {
    return api.post(`/users/${userId}/check-rewards`);
  },

  // Get reward history
  getRewardHistory: async (userId: number): Promise<any[]> => {
    return api.get(`/users/${userId}/rewards`);
  },

  // Get user cards
  getUserCards: async (userId: number): Promise<any[]> => {
    return api.get(`/users/${userId}/cards`);
  },
};
