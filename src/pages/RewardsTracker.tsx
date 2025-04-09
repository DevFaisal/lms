import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import { userService } from "../services/users";
import RewardProgress from "../components/visualizations/RewardProgress";
import { RewardAdjustment } from "../types/transaction";
import { rewardService } from "../services/reward";
import RewardTimeline from "../components/features/rewards/RewardTimeline";
import useUserStore from "../store/userStore";

const RewardsTracker: React.FC = () => {
  // const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [rewardHistory, setRewardHistory] = useState<RewardAdjustment[]>([]);

  // Mock user ID for demonstration if not provided in URL
  // const userIdToUse = userId ? parseInt(userId) : 20;
  const userIdToUse = useUserStore((state) => state.userId);

  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        setLoading(true);

        // Fetch user data
        // @ts-ignore
        const user = await userService.getUser(userIdToUse);
        setUserData(user);

        // Fetch reward history
        // @ts-ignore
        const { rewards } = await rewardService.getRewardHistory(userIdToUse);
        console.log("Reward history:", rewards);
        setRewardHistory(rewards || []);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching reward data:", err);
        setError("Failed to load reward data. Please try again later.");
        setLoading(false);
      }
    };

    fetchRewardData();
  }, [userIdToUse]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // For reward progress
  const currentApr = userData?.apr || 25.0;
  const nextApr = Math.max(currentApr - 2.0, 10.0); // Minimum APR is 10%
  const goodRepayments = 1; // Mock value, would come from API
  const requiredRepayments = 3;
  const progressPercentage = (goodRepayments / requiredRepayments) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          APR Rewards Tracker
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Track your progress towards a lower APR
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* @ts-ignore */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Current APR
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h2" color="secondary" sx={{ fontWeight: 700 }}>
                  {currentApr}%
                </Typography>
              </Box>
              <Typography variant="body1">
                You started with 25% APR. Make regular repayments to reduce your rate.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <RewardProgress
                  currentApr={currentApr}
                  nextApr={nextApr}
                  progressPercentage={progressPercentage}
                  goodRepayments={goodRepayments}
                  requiredRepayments={requiredRepayments}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* @ts-ignore */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                APR Adjustment History
              </Typography>
              <Typography variant="body1" paragraph>
                Your APR adjustments based on repayment behavior:
              </Typography>
              <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                <RewardTimeline history={rewardHistory} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* @ts-ignore */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                How APR Rewards Work
              </Typography>
              <Typography variant="body1" paragraph>
                All users start with a fixed 25% APR, which decreases over time based on positive repayment behavior.
              </Typography>
              <Grid container spacing={3}>
                {/* @ts-ignore */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Make Regular Repayments
                    </Typography>
                    <Typography variant="body2">
                      Each time you make a repayment of at least 10% of your balance, it counts as a "good repayment".
                    </Typography>
                  </Box>
                </Grid>
                {/* @ts-ignore */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Earn APR Reductions
                    </Typography>
                    <Typography variant="body2">
                      Every 3 good repayments, your APR is reduced by 2%. This continues until you reach the minimum APR
                      of 10%.
                    </Typography>
                  </Box>
                </Grid>
                {/* @ts-ignore */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Maintain Your Rate
                    </Typography>
                    <Typography variant="body2">
                      Continue making regular repayments to maintain your lower rate. Missing payments may affect your
                      APR.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RewardsTracker;

// function RewardTimeline({ history }: { history: RewardAdjustment[] }) {
//   return (
//     <div>
//       {history.length === 0 ? (
//         <Typography variant="body2" color="text.secondary">
//           No APR adjustments yet. Make regular repayments to reduce your APR.
//         </Typography>
//       ) : (
//         history.map((adjustment) => (
//           <Box key={adjustment.id} sx={{ mb: 2 }}>
//             <Typography variant="subtitle2">
//               {adjustment.old_apr}% → {adjustment.new_apr}%
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {new Date(adjustment.adjusted_on).toLocaleDateString("en-GB", {
//                 day: "numeric",
//                 month: "short",
//                 year: "numeric",
//               })}
//             </Typography>
//             <Typography variant="caption">{adjustment.reason}</Typography>
//           </Box>
//         ))
//       )}
//     </div>
//   );
// }
