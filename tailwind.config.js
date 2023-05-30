module.exports = {
  mode: 'jit',
  important: '#justgo-app',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.stories.{js,jsx,ts,tsx}'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.stories.{js,jsx,ts,tsx}'],

  theme: {
    fontFamily: {
      Inter: ['Inter', 'arial', 'sans-serif'],
      inter: ['Inter', 'arial', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        check: "url('./icons/check.svg')",
        minus: "url('./icons/minus.svg')",
        eventsHomeLayoutBg: "url('./JG_V2_8/assets/images/events-home-layout-bg.svg')",
        eventsHomeLayoutBgOverlay: "url('./JG_V2_8/assets/images/events-home-layout-bg-overlay.svg')",
        helpsAndResourcesBG: "url('./JG_V2_8/assets/images/helpsAndResourcesBG.jpg')",
        landscape: "url('/images/landscape/2.jpg')",
        videoIntroDemo: "url('./JG_V2_8/assets/images/videoIntroDemo.svg",
      },
      width: {
        970: '61rem',
        '300px': '300px',
      },
      fontSize: {
        inputSizeXs: [
          '12px',
          {
            lineHeight: '14px',
          },
        ],
        inputSizeSm: [
          '12px',
          {
            lineHeight: '14px',
          },
        ],
        inputSizeMd: [
          '13px',
          {
            lineHeight: '16px',
          },
        ],
        inputSizeLg: [
          '13px',
          {
            lineHeight: '16px',
          },
        ],
        inputSizeXl: [
          '14px',
          {
            lineHeight: '16px',
          },
        ],
        globalTextSizeXs: [
          '12px',
          {
            lineHeight: '16px',
          },
        ],
        globalTextSizeSm: [
          '13px',
          {
            lineHeight: '16px',
          },
        ],
        globalTextSizeMd: [
          '14px',
          {
            lineHeight: '16px',
          },
        ],
        globalTextSizeLg: [
          '16px',
          {
            lineHeight: '20px',
          },
        ],
        globalTextSizeXl: [
          '20px',
          {
            lineHeight: '24px',
          },
        ],
        globalTextSizeXxl: [
          '20px',
          {
            lineHeight: '30px',
          },
        ],
      },
      colors: {
        jg: {
          grey: {
            900: '#212121',
            800: '#424242',
            700: '#616161',
            600: '#757575',
            500: '#9E9E9E',
            400: '#BDBDBD',
            300: '#E0E0E0',
            200: '#EEEEEE',
            100: '#F5F5F5',
            50: '#FAFAFA',
          },
          green: {
            900: '#1b5e1f',
            800: '#2e7d31',
            700: '#388e3b',
            600: '#43a046',
            500: '#4CAF4F',
            400: '#66bb69',
            300: '#81c784',
            200: '#a5d6a7',
            100: '#c8e6c9',
            50: '#e8f5e9',
          },
          metal: {
            900: '#263238',
            800: '#37474f',
            700: '#455a64',
            600: '#546e7a',
            500: '#607d8b',
            400: '#78909c',
            300: '#90a4ae',
            200: '#b0bec5',
            100: '#cfd8dc',
            50: '#eceff1',
          },
          violet: {
            900: '#4a148c',
            800: '#6a1b9a',
            700: '#7b1fa2',
            600: '#8e24aa',
            500: '#9c27b0',
            400: '#ab47bc',
            300: '#ba68c8',
            200: '#ce93d8',
            100: '#e1bee7',
            50: '#f3e5f5',
          },
          blue: {
            900: '#1045a1',
            800: '#1764c0',
            700: '#1a75d2',
            600: '#1f87e5',
            500: '#2194f3',
            400: '#42a4f5',
            300: '#63b4f6',
            200: '#90c9f9',
            100: '#bbdefb',
            50: '#e3f2fd',
          },
          yellow: {
            900: '#f57f17',
            800: '#f9a825',
            700: '#fbc02d',
            600: '#fdd835',
            500: '#fae635',
            400: '#fceb55',
            300: '#fef075',
            200: '#fff59d',
            100: '#fff9c4',
            50: '#fffde7',
          },
          red: {
            900: '#b71b1c',
            800: '#c62728',
            700: '#d32e2f',
            600: '#e53835',
            500: '#f44236',
            400: '#ef5350',
            300: '#e57373',
            200: '#ef9a9a',
            100: '#ffcdd2',
            50: '#ffebee',
          },
        },
        disabled: {
          default: '#ECEFF1',
          t: {
            0: '#B0BEC5',
          },
        },
        primary: {
          default: 'var(--jg-primary-default)',
          hover: 'var(--jg-primary-hover)',
          pressed: 'var(--jg-primary-pressed)',
          focused: 'var(--jg-primary-focused)',
          t: {
            0: 'var(--jg-secondary-t-0)',
          },
        },
        secondary: {
          default: 'var(--jg-secondary-default)',
          hover: 'var(--jg-secondary-hover)',
          pressed: 'var(--jg-secondary-pressed)',
          focused: 'var(--jg-secondary-focused)',
          t: {
            0: 'var(--jg-secondary-t-0)',
          },
        },

        success: {
          default: '#2E7D31',
          hover: '#43A046',
          pressed: '#1B5E1F',
          focused: '#43A046',
          t: {
            0: '#ffffff',
          },
        },
        info: {
          default: '#2194F3',
          hover: '#42A4F5',
          pressed: '#1A75D2',
          focused: '#42A4F5',
          t: {
            0: '#ffffff',
          },
        },
        warning: {
          default: '#FBC02D',
          hover: '#FDD835',
          pressed: '#F9A825',
          focused: '#FDD835',
          t: {
            0: '#000000',
          },
        },
        error: {
          default: '#F44236',
          hover: '#EF5350',
          pressed: '#D32E2F',
          focused: '#EF5350',
          t: {
            0: '#ffffff',
          },
        },
        complementary: {
          default: '#7B1FA2',
          hover: '#9C27B0',
          pressed: '#6A1B9A',
          focused: '#8E24AA',
          t: {
            0: '#ffffff',
          },
        },
        // Configure your color palette here
        // green: {
        //   1: '#008345',
        // },
        // metal: {
        //   secondary: {
        //     300: '#90A4AE',
        //     900: '#263238',
        //   },
        // },
      },
      screens: {
        xs: '360px',
        jg600p: '600px',
        jglg: '900px',
        jgxl: '1200px',
        jg1500p: '1500px',
        jgxl2: '1600px',
        jg1800p: '1800px',
        jgxl3: '2160px',
      },
      zIndex: {
        '-10': '-10',
      },
      boxShadow: {
        upper: '0 -10px 14px -10px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        animation: {
          'fade-in-down': 'fade-in-down 0.5s ease-out',
          // 'fade-out-down': 'fade-out-down 0.5s ease-out',
          // 'fade-in-up': 'fade-in-up 0.5s ease-out',
          // 'fade-out-up': 'fade-out-up 0.5s ease-out'
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('tailwind-scrollbar-hide')],
  future: {
    purgeLayersByDefault: true,
  },
}
