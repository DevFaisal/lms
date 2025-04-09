import { Box, Typography } from "@mui/material";
import { RewardAdjustment } from "../../../types/transaction";

function RewardTimeline({ history }: { history: RewardAdjustment[] }) {
  return (
    <div>
      {history.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No APR adjustments yet. Make regular repayments to reduce your APR.
        </Typography>
      ) : (
        history.map((adjustment) => (
          <Box key={adjustment.id} sx={{ mb: 2 }}>
            <Typography variant="subtitle2">
              {adjustment.old_apr}% → {adjustment.new_apr}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(adjustment.adjusted_on).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>
            <Typography variant="caption">{adjustment.reason}</Typography>
          </Box>
        ))
      )}
    </div>
  );
}

export default RewardTimeline;
