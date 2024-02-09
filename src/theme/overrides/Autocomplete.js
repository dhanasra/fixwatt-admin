import { alpha } from '@mui/material/styles';

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
            padding: '0px', // Adjust padding as needed
            '& .MuiAutocomplete-input[class*="MuiOutlinedInput-input"]': {
              padding: '10.5px 14px 10.5px 12px', // Adjust padding as needed
            },
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light, // Adjust hover border color as needed
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${theme.palette.primary.light}`, // Adjust focused border color as needed
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
          '&.Mui-error': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.light, // Adjust error hover border color as needed
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.error.light}`, // Adjust error focused border color as needed
              boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
            },
          },
        },
        input: {
          padding: '10.5px 14px 10.5px 12px', // Adjust padding as needed
          '&[class*="MuiOutlinedInput-input"]': {
            padding: '10.5px 14px 10.5px 12px', // Adjust padding as needed
          },
          '&$inputSizeSmall': {
            padding: '7.5px 8px 7.5px 12px', // Adjust padding as needed for small size
          },
          '&$inputMultiline': {
            padding: 0, // Adjust padding as needed for multiline
          },
        },
        notchedOutline: {
          borderColor: theme.palette.grey[300], // Adjust border color as needed
        },
        endAdornment: {
          position: 'absolute',
          right: 0,
          top: 'auto',
        }
      },
    },
  };
}
