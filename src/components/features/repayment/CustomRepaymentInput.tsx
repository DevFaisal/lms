import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Slider,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Suggested payment amounts component
const SuggestedAmounts = ({
  balance,
  onSelectAmount,
}: {
  balance: number;
  onSelectAmount: (amount: string) => void;
}) => {
  const amounts = [
    { label: "Minimum", value: balance * 0.025 },
    { label: "50%", value: balance * 0.5 },
    { label: "Full Balance", value: balance },
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Suggested Amounts
      </Typography>
      <Stack direction="row" spacing={1}>
        {amounts.map((item) => (
          <Chip
            key={item.label}
            label={`${item.label} ${formatCurrency(item.value)}`}
            onClick={() => onSelectAmount(item.value.toFixed(2))}
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: 1.5,
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

// Enhanced card component
const EnhancedCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.12)",
  },
}));

// Format currency helper function (would normally be imported)
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Styled slider component
const StyledSlider = styled(Slider)(({ theme }) => ({
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: theme.palette.primary.main,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));

// Custom marks for slider
const marks = [
  { value: 0, label: "0%" },
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "100%" },
];

export default function CustomRepaymentInput({ value = "", onChange = () => {}, currentBalance = 2500 }) {
  const [sliderValue, setSliderValue] = useState(0);

  // Update slider when value changes externally
  useEffect(() => {
    if (value !== "") {
      const percentage = (parseFloat(value) / currentBalance) * 100;
      setSliderValue(isNaN(percentage) ? 0 : Math.min(percentage, 100));
    } else {
      setSliderValue(0);
    }
  }, [value, currentBalance]);
  //@ts-ignore
  const handleSliderChange = (event: Event, newValue: number) => {
    setSliderValue(newValue);

    // Calculate amount based on percentage of current balance
    const amount = (newValue / 100) * currentBalance;

    // @ts-ignore

    onChange(amount.toFixed(2));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Only allow valid number inputs
    if (newValue === "" || /^\d+(\.\d{0,2})?$/.test(newValue)) {
      //@ts-ignore
      onChange(newValue);

      // Update slider if value is valid
      if (newValue !== "" && parseFloat(newValue) <= currentBalance) {
        const percentage = (parseFloat(newValue) / currentBalance) * 100;
        setSliderValue(percentage);
      }
    }
  };

  // Calculate percentage of balance
  const percentageOfBalance = value ? ((parseFloat(value) / currentBalance) * 100).toFixed(1) : "0.0";

  return (
    <EnhancedCard>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Custom Payment Amount
        </Typography>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Enter payment amount"
            variant="outlined"
            value={value}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}
          >
            <span>{percentageOfBalance}% of your current balance</span>
            <span>{formatCurrency(currentBalance)}</span>
          </Typography>
        </Box>

        <Box sx={{ px: 1, mb: 3 }}>
          <StyledSlider
            value={sliderValue}
            //@ts-ignore
            onChange={handleSliderChange}
            aria-labelledby="custom-payment-slider"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value.toFixed(0)}%`}
            step={1}
            min={0}
            max={100}
            marks={marks}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <SuggestedAmounts balance={currentBalance} onSelectAmount={onChange} />

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              borderRadius: 2,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Make Payment
          </Button>
        </Box>
      </CardContent>
    </EnhancedCard>
  );
}
