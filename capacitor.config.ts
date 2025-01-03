import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.adelantto.app',
  appName: 'AdelanttoCash',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
