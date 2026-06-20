
import { Box, Container, Typography, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BundleBuilder } from './features/bundle-builder';
import { ReviewPanel } from './features/review-panel';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    background: {
      default: '#f3f4f6'
    },
    primary: {
      main: '#4E2FD2',
      light: '#818cf8',
      dark: '#312e81',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', py: { xs: 2, md: 3 } }}>
        <Container maxWidth={false} sx={{
          paddingX: {
            xs: 0.5,
            sm: 1.5,
            md: 3
          }
        }}>
          <Typography variant="h3" sx={{
            fontSize: {
              xs: "30px",
              lg: "40px"
            }, fontWeight: 800, mb: 4, textAlign: { xs: 'center', lg: 'left' }, letterSpacing: '-0.02em', pl: { lg: 1 }
          }}>
            Let's get started!
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '8fr 4fr', lg: "1fr" }, gap: 4, alignItems: 'start' }}>
            <Box>
              <BundleBuilder />
            </Box>
            <Box>
              <ReviewPanel />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
