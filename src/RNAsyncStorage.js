import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const storage = new Storage({
  size: 10,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});
 
global.storage = storage;