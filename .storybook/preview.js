import { withThemesProvider } from "themeprovider-storybook";
import { defaultTheme, darkTheme } from '../src/js/devtools/themes';

export const decorators = [
    withThemesProvider([defaultTheme, darkTheme]),
];
