export const theme = {
  colors: {
    dark: '#000000',
    gray: '#72828a',
    midDark: '#070a0e',
    mid2Dark: '#1c2127',
    rgbaShadow: 'rgba(128, 255, 219, 0.36)',
    sky: '#80ffdb',
    secondColor: '#3c9279',
    thirdColor: '#070a0e',
    fourthColor: '#72828a',
  },
  fonts: {
    body: "Roboto",
    heading: "Roboto",
    monospace: "Roboto",
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 28, 32, 48, 64, 96],
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 24, 32, 48, 64],
  letterSpacings: {
    small: "-0.05em",
  },
  sizes: {
    avatar: 48,
  },
  shadows: {
    card: "0 0 4px rgba(0, 0, 0, .125)",
  },
  text: {
    default: {
      color: "text",
      fontFamily: "body",
      fontWeight: "500",
      fontSize: [18],
      lineHeight: "20px",
    },
    primary: {
      variant: "text.default",
      color: "primaryText",
    },
    title: {
      fontFamily: "body",
      fontSize: [28],
      lineHeight: "42px",
    },
    logo: {
      fontFamily: "body",
      fontSize: [20],
      lineHeight: "28px",
      letterSpacing: "small",
    },
    wallet: {
      fontFamily: "body",
      color: "accent",
      fontSize: [12],
      lineHeight: "16px",
    },
    account: {
      fontFamily: "body",
      color: "primary",
      fontSize: [12],
      lineHeight: "16px",
    },
    regular: {
      fontFamily: "body",
      fontSize: [18],
      lineHeight: "22px",
      color: "text",
    },
    regularGray: {
      fontFamily: "body",
      fontSize: [18],
      lineHeight: "22px",
      color: "darkgray",
    },
    bold: {
      fontFamily: "Bold",
      fontSize: 18,
      lineHeight: "20px",
      color: "text",
    },
    form: {
      fontStyle: "body",
      fontSize: [14],
      lineHeight: "16px",
      color: "text",
    },
    subtitle: {
      fontStyle: "body",
      fontSize: [20, 18],
      lineHeight: ["24px", "20px"],
      letterSpacing: "-0.01rem",
      color: "text",
    },
    tableHeader: {
      color: "accent",
      fontFamily: "body",
      fontSize: [14],
      lineHeight: "20px",
    },
    summaryTitle: {
      color: "accent",
      fontFamily: "body",
      fontSize: [14],
      lineHeight: "20px",
    },
    largeNumber: {
      fontFamily: "body",
      fontSize: 24,
      lineHeight: "20px",
      color: "text",
    },
    reallyBigNumber: {
      fontFamily: "body",
      fontSize: 32,
      lineHeight: "20px",
      color: "text",
    },
  },
  variants: {
    avatar: {
      width: "avatar",
      height: "avatar",
      borderRadius: "circle",
    },
    nav: {
      fontSize: 1,
      fontWeight: "bold",
      display: "inline-block",
      p: 2,
      color: "inherit",
      textDecoration: "none",
      ":hover,:focus,.active": {
        color: "primary",
      },
    },
  },
  select: {
    borderColor: "gray",
    borderWidth: "1.5px",
  },
  input: {
    borderColor: "gray",
    borderWidth: "1.5px",
  },
  buttons: {
    major: {
        color: 'sky',
        bg: 'thirdColor',
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
    },
    countdown: {
      width: ["180px", "320px"],
      height: ["180px", "320px"],
      color: "accent",
    },
    a: {
      ":visited": {
        color: "primaryText",
      },
      color: "primaryText",
      cursor: "pointer",
    },
    h1: {
      fontSize: 24,
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
      bg: "box",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
    warning: {
      backgroundColor: "#070a0e",
      borderRadius: 4,
      color: "primaryText",
      px: 3,
      py: 2,
    },
  },
};
