import { Typography, Box,  } from '@mui/material';
// import { tokens } from '../theme';

const Header = ({ title, subtitle }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  return (
    <Box mb='30px'>
      <Typography
        variant='h3'
        color='#a22a2d'
        fontWeight='bold'
        sx={{ m: '0 0 5px 0' }}
      >
        {title}
      </Typography>
      <Typography variant='h5' color='#a22a2d'>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
