import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { cardService } from "../services/cards";
import CardDisplay from "../components/features/cards/CardDisplay";
import CardControls from "../components/features/cards/CardControls";
import CardActivityLog from "../components/features/cards/CardActivityLog";
import { Card as CardType } from "../types/card";
import { transactionService } from "../services/transactions";
import useUserStore from "../store/userStore";
import { TransitionProps } from "@mui/material/transitions";

// Define the Transition component for Dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Define props interface for CreateNewCreditCard
interface CreateNewCreditCardProps {
  open: boolean;
  onClose: () => void;
  //@ts-ignore
  onSubmit: (creditLimit: number, apr: number) => Promise<void>;
}
//@ts-ignore
const CreateNewCreditCard: React.FC<CreateNewCreditCardProps> = ({ open, onClose, onSubmit, setCardType }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    //@ts-ignore
    await onSubmit();
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">Create New Credit Card</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/*         @ts-ignore */}
          <Grid item xs={12}>
            <TextField
              label="Card Type"
              select
              fullWidth
              value="virtual"
              onChange={(e) => setCardType(e.target.value)}
              variant="outlined"
              helperText="Select the type of card you want to create"
              SelectProps={{
                native: true,
              }}
            >
              <option value="virtual">Virtual</option>
              <option value="physical">Physical</option>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CardManagement: React.FC = () => {
  // const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  const [openCreateCardDialog, setOpenCreateCardDialog] = useState(false);

  // Mock user ID for demonstration if not provided in URL
  // const userIdToUse = userId ? parseInt(userId) : 1;
  const userIdToUse = useUserStore((state) => state.userId);
  const loanAccountId = useUserStore((state) => state.LoanAccountId);
  const [cardType, setCardType] = useState<string>("virtual");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);

        // Fetch user's cards
        /*   @ts-ignore */
        const userCard = await cardService.getUserCards(userIdToUse);
        console.log("User Cards:", userCard);
        //@ts-ignore
        if (userCard?.cards.length === 0) {
          setLoading(false);
          return;
        }

        // Set the card in state
        //@ts-ignore
        setCards(userCard.cards);

        // Fetch transactions for the loan account
        // if (userCard) {
        // const loanAccountId = userCard.loan_account_id || loanAccountId;
        //@ts-ignore
        const { transactions } = await transactionService.getLoanAccountTransactions(loanAccountId);
        console.log("Transactions:", transactions);
        // Filter transactions that are likely card transactions (purchases)
        //@ts-ignore
        const cardTransactions = transactions.filter((t) => t.type === "purchase");
        setTransactions(cardTransactions);
        // }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching cards:", err);
        setError("Failed to load cards. Please try again later.");
        setLoading(false);
      }
    };

    fetchCards();
  }, [userIdToUse, loanAccountId]);

  const handleLockCard = async (cardId: number) => {
    try {
      await cardService.lockCard(cardId);
      // Update the card status in the local state
      setCards(cards.map((card) => (card.id === cardId ? { ...card, status: "locked" } : card)));
    } catch (err) {
      console.error("Error locking card:", err);
      setError("Failed to lock card. Please try again later.");
    }
  };
  const handleUnlockCard = async (cardId: number) => {
    try {
      await cardService.unlockCard(cardId);
      // Update the card status in the local state
      setCards(cards.map((card) => (card.id === cardId ? { ...card, status: "active" } : card)));
    } catch (err) {
      console.error("Error unlocking card:", err);
      setError("Failed to unlock card. Please try again later.");
    }
  };
  const handleRequestReplacement = (cardId: number) => {
    // This would typically call an API to request a replacement card
    console.log(`Requesting replacement for card ${cardId}`);
    // For demo purposes, just show an alert
    alert(`Replacement requested for card ${cardId}`);
  };
  const handleManageSettings = (cardId: number) => {
    // This would typically navigate to a card settings page
    console.log(`Managing settings for card ${cardId}`);
    // For demo purposes, just show an alert
    alert(`Managing settings for card ${cardId}`);
  };

  const handleCreateCard = async () => {
    try {
      alert(`Creating a new ${cardType} card `);
      // Call API to create a new card

      const newCard = await cardService.createCard({
        type: cardType,
        status: "active",
        //@ts-ignore
        user_id: userIdToUse,
        //@ts-ignore
        loan_account_id: loanAccountId,
      });

      // Add the new card to the state
      setCards([...cards, newCard]);

      return newCard;
    } catch (err) {
      console.error("Error creating card:", err);
      setError("Failed to create card. Please try again later.");
      throw err;
    }
  };

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Card Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your virtual and physical cards
        </Typography>
      </Box>

      {cards.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" align="center">
              No cards found
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              You don't have any cards associated with your account yet.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={4}>
          {cards.map((card) => (
            // @ts-ignore
            <Grid item xs={12} md={6} key={card.id}>
              <Box sx={{ mb: 3 }}>
                <CardDisplay card={card} />
              </Box>
              <Box sx={{ mb: 3 }}>
                <CardControls
                  cardId={card.id}
                  status={card.status}
                  onLock={handleLockCard}
                  onUnlock={handleUnlockCard}
                  onRequestReplacement={handleRequestReplacement}
                  onManageSettings={handleManageSettings}
                />
              </Box>
            </Grid>
          ))}
          {/*       @ts-ignore */}
          <Grid item xs={12}>
            {/* @ts-ignore */}
            <CardActivityLog userId={userIdToUse} transactions={transactions} />
          </Grid>
        </Grid>
      )}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateCardDialog(true)}
        >
          Create New Credit Card
        </Button>
      </Box>
      {/* Connect the CreateNewCreditCard dialog */}
      <CreateNewCreditCard
        open={openCreateCardDialog}
        onClose={() => setOpenCreateCardDialog(false)}
        setCardType={setCardType}
        //@ts-ignore
        onSubmit={handleCreateCard}
      />
    </Container>
  );
};

export default CardManagement;
