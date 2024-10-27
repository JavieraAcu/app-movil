import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app movil',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      enabled: true
    }
  },
};

export default config;
