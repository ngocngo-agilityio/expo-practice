const APP_VARIANT = process.env.APP_VARIANT || 'production';

const CONFIG = {
  development: {
    name: 'Bank Pick (Dev)',
    bundleId: 'com.bankpick.dev',
    package: 'com.bankpick.dev',
  },
  staging: {
    name: 'Bank Pick (Staging)',
    bundleId: 'com.bankpick.staging',
    package: 'com.bankpick.staging',
  },
  production: {
    name: 'Bank Pick',
    bundleId: 'com.bankpick.app',
    package: 'com.bankpick.app',
  },
};

const env = CONFIG[APP_VARIANT];

export default {
  expo: {
    name: env.name,
    slug: 'bank-pick-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/app-icon.png',
    scheme: 'bankpickapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: env.bundleIdentifier,
    },

    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/app-icon.png',
        backgroundColor: '#FFFFFF',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: env.package,
    },

    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 178,
          resizeMode: 'contain',
          backgroundColor: '#FFFFFF',
          dark: {
            backgroundColor: '#161622',
            image: './assets/images/splash-icon-dark.png',
          },
        },
      ],
      'expo-font',
      'expo-secure-store',
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    extra: {
      router: {},
      eas: {
        projectId: '4b1eb95f-a24f-4a3b-93fc-aa70918faab9',
      },
    },

    owner: 'ngocngo',
  },
};
