import api from "./api";
import { Card } from ".././types/card";

export const cardService = {
  // Get all cards
  getCards: async (): Promise<Card[]> => {
    return api.get("/cards/");
  },

  // Get card by ID
  getCard: async (cardId: number): Promise<Card> => {
    return api.get(`/cards/${cardId}`);
  },

  getUserCards: async (userId: number): Promise<Card[]> => {
    return api.get(`/cards/users/${userId}`);
  },

  // Create a new card
  createCard: async (data: {
    user_id: number;
    loan_account_id: number;
    type: string;
    status: string;
  }): Promise<Card> => {
    return api.post("/cards/", data);
  },

  // Lock card
  lockCard: async (cardId: number): Promise<any> => {
    return api.put(`/cards/${cardId}/lock`);
  },

  // Unlock card
  unlockCard: async (cardId: number): Promise<any> => {
    return api.put(`/cards/${cardId}/unlock`);
  },
};
