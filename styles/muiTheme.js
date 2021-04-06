import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#005195',
    },
    secondary: {
      main: '#4daa50',
    },
    common: {
      grayBlue: '#203f52',
      arcOrange: '#FFBA60',
    },
  },
});

export { theme };
