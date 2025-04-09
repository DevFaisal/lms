import React from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

interface CardControlsProps {
  cardId: number;
  status: 'active' | 'locked';
  onLock?: (cardId: number) => void;
  onUnlock?: (cardId: number) => void;
  onRequestReplacement?: (cardId: number) => void;
  onManageSettings?: (cardId: number) => void;
}

const CardControls: React.FC<CardControlsProps> = ({
  cardId,
  status,
  onLock,
  onUnlock,
  onRequestReplacement,
  onManageSettings,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Card Controls
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color={status === 'active' ? 'primary' : 'success'}
          startIcon={status === 'active' ? <LockIcon /> : <LockOpenIcon />}
          fullWidth
          onClick={() => status === 'active' ? onLock?.(cardId) : onUnlock?.(cardId)}
        >
          {status === 'active' ? 'Lock Card' : 'Unlock Card'}
        </Button>
      </Box>
      
      <ButtonGroup variant="outlined" fullWidth>
        <Button 
          onClick={() => onRequestReplacement?.(cardId)}
          startIcon={<DeleteIcon />}
        >
          Replace
        </Button>
        <Button 
          onClick={() => onManageSettings?.(cardId)}
          startIcon={<SettingsIcon />}
        >
          Settings
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default CardControls;
