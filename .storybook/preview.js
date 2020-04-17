import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { defaultTheme, darkTheme } from '../src/js/devtools/themes';

addDecorator(withThemesProvider([defaultTheme, darkTheme]));
