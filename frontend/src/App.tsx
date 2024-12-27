import { Button, Container, Typography } from "@mui/material";
import React from "react";

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Вітаємо в Material-UI!
      </Typography>
      <Button variant='contained' color='primary'>
        Натисніть мене знову!
      </Button>
    </Container>
  );
};

export default App;
