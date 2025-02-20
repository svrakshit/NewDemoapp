import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import App from './App';

// Disable all warnings in both dev and production
if (console) {
  console.warn = () => {}; // Override console.warn to prevent any warnings from showing up
}

// Ignore specific warnings via LogBox
LogBox.ignoreLogs([
  'Warning: TextElement: Support for defaultProps will be removed',
  'Warning: Text strings must be rendered within a <Text> component',
]);

registerRootComponent(App);
