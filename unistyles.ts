import { StyleSheet } from 'react-native-unistyles';
import type { UnistylesConfig } from 'react-native-unistyles/lib/typescript/src/specs/StyleSheet';

const BASE_FONT_SIZE = 16;

type ColorKeys =
  | 'primary'
  | 'secondary'
  | 'background'
  | 'foreground'
  | 'button'
  | 'success'
  | 'warning'
  | 'error';

type ThemeColors = {
  [key in ColorKeys]: {
    light: string;
    base: string;
    dark: string;
  };
};

// Log some example font sizes
console.log('Font scale base', BASE_FONT_SIZE);

export const fontFamily = {
  BodyRegular: 'Nunito_400Regular',
  BodyBold: 'Nunito_700Bold',
  BodySemiBold: 'Nunito_600SemiBold',
  HeadingBold: 'Roboto_700Bold',
  HeadingBlack: 'Roboto_900Black',
};

const shared = {
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  fontFamily,
  borderRadius: (v: number) => v * 4,
  gap: (v: number) => v * 4,
  fontSize: (v: number) => BASE_FONT_SIZE * v,
};

const colors = {
  purple: {
    '50': '#f3f2ff',
    '100': '#e9e8ff',
    '200': '#d5d4ff',
    '300': '#b7b1ff',
    '400': '#9285ff',
    '500': '#8068ff',
    '600': '#5c30f7',
    '700': '#4e1ee3',
    '800': '#4118bf',
    '900': '#36169c',
    '950': '#1f0b6a',
  },
  green: {
    '50': '#e0ffeb',
    '100': '#c7ffdf',
    '200': '#a3ffc9',
    '300': '#6bffab',
    '400': '#15f476',
    '500': '#08bf57',
    '600': '#019842',
    '700': '#047135',
    '800': '#07542a',
    '900': '#074122',
    '950': '#00140a',
  },
  red: {
    '50': '#fff0f0',
    '100': '#ffe0e0',
    '200': '#ffc8c7',
    '300': '#ffa09e',
    '400': '#ff6e6b',
    '500': '#f84c49',
    '600': '#e6302d',
    '700': '#d01916',
    '800': '#ac1815',
    '900': '#931d1b',
    '950': '#540a08',
  },
  blue: {
    '50': '#edf8ff',
    '100': '#d7eeff',
    '200': '#b9e2ff',
    '300': '#88d2ff',
    '400': '#50b8ff',
    '500': '#2896ff',
    '600': '#0e76ff',
    '700': '#0a60eb',
    '800': '#0f4dbe',
    '900': '#134495',
    '950': '#112b5a',
  },
  orange: {
    '50': '#fff7eb',
    '100': '#ffe7c6',
    '200': '#ffcd88',
    '300': '#ffac49',
    '400': '#ff9020',
    '500': '#f96907',
    '600': '#dd4602',
    '700': '#b72c06',
    '800': '#94210c',
    '900': '#7a1d0d',
    '950': '#460b02',
  },
  yellow: {
    '50': '#fff8eb',
    '100': '#ffecc7',
    '200': '#ffd06b',
    '300': '#ffc247',
    '400': '#ffab1a',
    '500': '#f48d06',
    '600': '#d96a02',
    '700': '#b24b06',
    '800': '#8e390b',
    '900': '#73300c',
    '950': '#401902',
  },
  neutral: {
    '50': '#ffffff',
    '100': '#f6f7f9',
    '200': '#dfe1e7',
    '300': '#bbc1ce',
    '400': '#929cb0',
    '500': '#68758d',
    '600': '#545e73',
    '700': '#454c5f',
    '800': '#3a4150',
    '900': '#353a45',
    '950': '#23262f',
  },
} as const;

const lightTheme = {
  colors: {
    background: {
      light: colors.neutral['50'],
      base: colors.neutral['100'],
      dark: colors.neutral['200'],
    },
    button: {
      light: colors.neutral['600'],
      base: colors.neutral['700'],
      dark: colors.neutral['900'],
    },
    foreground: {
      light: colors.neutral['500'],
      base: colors.neutral['800'],
      dark: colors.neutral['900'],
    },
    primary: {
      light: colors.purple['400'],
      base: colors.purple['500'],
      dark: colors.purple['600'],
    },
    secondary: {
      light: colors.blue['400'],
      base: colors.blue['500'],
      dark: colors.blue['600'],
    },
    success: {
      light: colors.green['400'],
      base: colors.green['500'],
      dark: colors.green['600'],
    },
    warning: {
      light: colors.yellow['400'],
      base: colors.yellow['500'],
      dark: colors.yellow['600'],
    },
    error: {
      light: colors.red['400'],
      base: colors.red['500'],
      dark: colors.red['600'],
    },
  } satisfies ThemeColors,
  ...shared,
};

const darkTheme = {
  colors: {
    primary: {
      base: '#800080',
    },
  },
  ...shared,
};

const appThemes = {
  light: lightTheme,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

const config: UnistylesConfig = {
  themes: appThemes,
  settings: {
    initialTheme: 'light',
  },
  breakpoints,
};

StyleSheet.configure(config);
