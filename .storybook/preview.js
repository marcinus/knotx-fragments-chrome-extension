import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "themeprovider-storybook";
import { defaultTheme, darkTheme } from '../src/js/devtools/themes';

addDecorator(withThemesProvider([defaultTheme, darkTheme]));
