import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAOWHBpPhKoNhcGFKHH_Q_0AtL2gV-imgQ',
  authDomain: 'wpgone.firebaseapp.com',
  databaseURL: 'https://wpgone.firebaseio.com',
  projectId: 'wpgone',
  storageBucket: 'wpgone.appspot.com',
  messagingSenderId: '525472070731',
  appId: '1:525472070731:web:ee873bd62c0deb7eba61ce',
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
