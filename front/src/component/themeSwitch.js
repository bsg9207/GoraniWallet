// Created by Seunggwan, Back on 2022.11.26
// Copyright (C) 2022-2022 Seunggwan, Back - All Rights Reserved
import { useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Switch } from "antd";

const ThemeSwitch = () => {
  // state
  // isDarkMode : default - `true`
  const [isDarkMode, setIsDarkMode] = useState(true);

  // switch theme
  const { switcher, status, themes } = useThemeSwitcher();

  // avoid theme change flicker
  if (status === "loading") {
    return null;
  }

  // define function - toggle theme
  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  return <Switch checked={isDarkMode} onChange={toggleTheme} />;
};

export default ThemeSwitch;
