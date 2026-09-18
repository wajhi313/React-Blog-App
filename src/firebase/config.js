import { initializeApp } from "firebase/app";

import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFWLXZH1cPKTPPQCX5sMucodUIzbrBnF8",
  authDomain: "blog-app-f7e46.firebaseapp.com",
  projectId: "blog-app-f7e46",
  storageBucket: "blog-app-f7e46.firebasestorage.app",
  messagingSenderId: "411399484934",
  appId: "1:411399484934:web:2269ed55588c0546ee3587"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();