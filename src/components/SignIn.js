// SignIn.js

import React from 'react';
import firebase from 'firebase/compat/app'; // Importing firebase from 'firebase/app'
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBIHJ5mH5-Fa5wnHS65rvNpCyyX1X6fjzY",
    authDomain: "inventory-4e072.firebaseapp.com",
    projectId: "inventory-4e072",
    storageBucket: "inventory-4e072.appspot.com",
    messagingSenderId: "1093111390440",
    appId: "1:1093111390440:web:a754c7856f459eb2ea295d",
    measurementId: "G-JP5RLFYKSQ"
};

if (!firebase.apps.length) { // Ensuring firebase is not initialized multiple times
  firebase.initializeApp(firebaseConfig);
}

const SignIn = () => {
  const handleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div>
      <h2>Sign In with Google</h2>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
