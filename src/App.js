import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        setUser(result.user)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        setUser(result.user)
      }).catch(error => {
        console.log(error)
      })
  }
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  }

  return (
    <div className="App">
      {user.email ? <button onClick={handleSignOut}>Sign Out</button>
        :
        <div>
          <button onClick={handleGoogleSignIn}>Google SignIn</button>
          <button onClick={handleGithubSignIn}>Github SignIn</button>
        </div>
      }
      <h2>Name:{user.displayName}</h2>
      <h4>Email:{user.email}</h4>
      <img src={user.photoURL} alt="" />
    </div >
  );
}

export default App;
