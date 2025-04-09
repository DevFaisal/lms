import React from 'react';
import { Card, CardContent, Typography, Box, Switch, styled } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Card as CardType } from '../../../types/card';

interface CardDisplayProps {
  card: CardType;
  onToggleLock?: (cardId: number, newStatus: 'active' | 'locked') => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  position: 'relative',
  overflow: 'hidden',
}));

const CardNumber = styled(Typography)(({ theme }) => ({
  letterSpacing: '2px',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  fontFamily: 'Roboto Mono, monospace',
}));

const CardDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
}));

const CardTypeChip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  fontSize: '0.75rem',
  fontWeight: 500,
}));

const LockSwitch = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
}));

const CardDisplay: React.FC<CardDisplayProps> = ({ card, onToggleLock }) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleLock) {
      onToggleLock(card.id, event.target.checked ? 'active' : 'locked');
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CreditCardIcon fontSize="large" />
          <CardTypeChip>
            {card.type.toUpperCase()}
          </CardTypeChip>
        </Box>

        <CardNumber variant="h6">
          {card.masked_pan}
        </CardNumber>

        <CardDetails>
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              ISSUED
            </Typography>
            <Typography variant="body2">
              {new Date(card.issued_at).toLocaleDateString()}
            </Typography>
          </Box>
          {card.expires_at && (
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                EXPIRES
              </Typography>
              <Typography variant="body2">
                {new Date(card.expires_at).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </CardDetails>

        <LockSwitch>
          {card.status === 'locked' ? <LockIcon fontSize="small" /> : <LockOpenIcon fontSize="small" />}
          <Typography variant="body2" sx={{ mx: 1 }}>
            {card.status === 'locked' ? 'Locked' : 'Active'}
          </Typography>
          {onToggleLock && (
            <Switch
              checked={card.status === 'active'}
              onChange={handleToggle}
              color="default"
              size="small"
            />
          )}
        </LockSwitch>
      </CardContent>
    </StyledCard>
  );
};

export default CardDisplay;
