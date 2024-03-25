import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface FixedContainerProps {
    children: ReactNode;
  }
  export default function FixedContainer({ children }: FixedContainerProps) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        {children}
        {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
      </Container>
    </React.Fragment>
  );
}
