import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface RewardProgressProps {
  currentApr: number;
  nextApr: number;
  progressPercentage: number;
  goodRepayments: number;
  requiredRepayments: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const AprDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const AprValue = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: theme.palette.secondary.main,
}));

const RewardIcon = styled(EmojiEventsIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '2rem',
  marginRight: theme.spacing(1),
}));

const RewardProgress: React.FC<RewardProgressProps> = ({
  currentApr,
  nextApr,
  progressPercentage,
  goodRepayments,
  requiredRepayments,
}) => {
  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <RewardIcon />
          <Typography variant="h5">
            APR Rewards
          </Typography>
        </Box>
        
        <AprDisplay>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Current APR
            </Typography>
            <AprValue>
              {currentApr}%
            </AprValue>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Next Reward
            </Typography>
            <AprValue>
              {nextApr}%
            </AprValue>
          </Box>
        </AprDisplay>
        
        <ProgressContainer>
          <Tooltip 
            title={`${goodRepayments} of ${requiredRepayments} good repayments made`} 
            arrow
            placement="top"
          >
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ height: 10, borderRadius: 5 }}
              color="secondary"
            />
          </Tooltip>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {goodRepayments}/{requiredRepayments} Repayments
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {progressPercentage}% Complete
            </Typography>
          </Box>
        </ProgressContainer>
        
        <Typography variant="body2">
          Make {requiredRepayments - goodRepayments} more good repayments to reduce your APR to {nextApr}%.
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          A good repayment is at least 10% of your balance.
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default RewardProgress;
