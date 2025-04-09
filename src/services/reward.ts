import api from "./api";

export const rewardService = {
  checkUserRewards: async (userId: number): Promise<any> => {
    return api.post(`/rewards/users/${userId}/check-rewards`);
  },

  getRewardHistory: async (userId: number): Promise<any> => {
    return api.get(`/rewards/users/${userId}/rewards`);
  },
};
