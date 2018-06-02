import { AppRegistry } from 'react-native';
import App from './src/App';
import AV from 'leancloud-storage'; 

AV.initialize('53kSrxDfpv6V1xlK049NvuyL-gzGzoHsz', 'wMkllOE8SD5gNqxEWfLJ2TPT');

AppRegistry.registerComponent('BAO', () => App);
