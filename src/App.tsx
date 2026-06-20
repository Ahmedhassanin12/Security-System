import { Box, Container, Typography, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BundleBuilder } from './features/bundle-builder';
import { ReviewPanel } from './features/review-panel';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    background: {
      default: '#f3f4f6',
      paper: '#ffffff',
    },
    primary: {
      main: '#4E2FD2',
      light: '#818cf8',
      dark: '#312e81',
    },
    success: {
      main: '#10b981',
    },
    text: {
      primary: '#1F1F1F',
      secondary: '#6F7882',
    },
    divider: '#e0e7ff',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 700,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: { xs: 2, md: 6 } }}>
        <Container maxWidth="xl" sx={{
          paddingX: {
            xs: 0.5,
            sm: 1.5,
            md: 2,
            lg: 3
          }
        }}>
          <Typography variant="h3" sx={{ fontSize: { xs: 30, md: 40, lg: 48 }, fontWeight: 800, mb: 4, textAlign: { xs: 'center', lg: 'left' }, letterSpacing: '-0.02em', pl: { lg: 1 } }}>
            Let's get started!
          </Typography>

          <Box sx={{
            display: 'grid', gridTemplateColumns: { xs: '1fr', md: '8fr 4fr', lg: "1fr" }, gap: {
              xs: 1,
              md: 2,
              lg: 4
            }, alignItems: 'start'
          }}>
            <Box>
              <BundleBuilder />
            </Box>
            <Box>
              <ReviewPanel />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider >
  );
}

export default App;
