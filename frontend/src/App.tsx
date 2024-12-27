import React from 'react';
import { Button, Typography, Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Вітаємо в Material-UI!
      </Typography>
      <Button variant="contained" color="primary">
        Натисніть мене знову!
      </Button>
    </Container>
  );
};

export default App;
