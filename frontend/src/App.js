import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import routes from './routes/routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#EEEEEE',
    },
    secondary: {
      main: '#111111',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <Router>
          <div className="App">{routes}</div>
        </Router>
      </StylesProvider>
    </MuiThemeProvider>
  );
}

export default App;
