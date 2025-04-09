import React from 'react';
import { Box, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import PaymentIcon from '@mui/icons-material/Payment';
import LockIcon from '@mui/icons-material/Lock';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface QuickActionsProps {
  onMakePayment: () => void;
  onManageCards: () => void;
  onViewStatement: () => void;
  onCheckRewards: () => void;
}

const ActionButton = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 500,
}));

const ActionIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
}));

const QuickActions: React.FC<QuickActionsProps> = ({
  onMakePayment,
  onManageCards,
  onViewStatement,
  onCheckRewards,
}) => {
  return (
    <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <ActionButton 
            variant="contained" 
            color="primary"
            onClick={onMakePayment}
          >
            <ActionIcon>
              <PaymentIcon />
            </ActionIcon>
            Make Payment
          </ActionButton>
          
          <ActionButton 
            variant="outlined" 
            color="primary"
            onClick={onManageCards}
          >
            <ActionIcon>
              <LockIcon />
            </ActionIcon>
            Manage Cards
          </ActionButton>
          
          <ActionButton 
            variant="outlined" 
            color="primary"
            onClick={onViewStatement}
          >
            <ActionIcon>
              <ReceiptIcon />
            </ActionIcon>
            View Statement
          </ActionButton>
          
          <ActionButton 
            variant="outlined" 
            color="secondary"
            onClick={onCheckRewards}
          >
            <ActionIcon>
              <EmojiEventsIcon />
            </ActionIcon>
            Check Rewards
          </ActionButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
