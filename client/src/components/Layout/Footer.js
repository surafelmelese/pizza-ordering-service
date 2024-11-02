import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Phone } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>About Us</Typography>
            <Typography variant="body2">
              Welcome to our pizza ordering platform! We bring you the best pizzas from top local restaurants, ensuring you get a taste of quality and flavor in every bite.
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Box>
              <Link href="/" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
                Home
              </Link>
              <Link href="/menu" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
                Menu
              </Link>
              <Link href="/contact" color="inherit" underline="none" sx={{ display: 'block', mb: 1 }}>
                Contact Us
              </Link>
              <Link href="/terms" color="inherit" underline="none" sx={{ display: 'block' }}>
                Terms of Service
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <Email fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">info@pizzahub.com</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Phone fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">+251 987 654 321</Typography>
            </Box>
            <Typography variant="body2">123 Pizza St, Addis Ababa, Ethiopia</Typography>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Follow Us</Typography>
            <Box>
              <IconButton href="https://facebook.com" target="_blank" color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Pizza Hub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;