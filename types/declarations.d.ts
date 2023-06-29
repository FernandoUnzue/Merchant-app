declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.webp';

declare module 'react-native-dotenv' {
  export const API_URL: string;
  export const BASIC_AUTH_USERNAME: string;
  export const BASIC_AUTH_PASSWORD: string;
  export const ENV: string;
  export const STG_URL: string;
  export const ONESIGNAL_GLOBAL: string;
}
