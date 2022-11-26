// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

// page
import MainPage from './page/main.js';
import NotFound from './page/notFound.js';

// module
import rootReducer from './reducer/rootReducer.js';

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

// define store for reducer
const store = createStore(rootReducer, composeWithDevTools());

function GoraniWallet() {
  return (
    <Provider store={store}>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme="dark">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="/*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeSwitcherProvider>
    </Provider>
  );
}

export default GoraniWallet;
