import { React, useState } from 'react'
import sterkLogo from '/src/assets/logoBlack.png'
import { authSignInWithGoogle, 
    authSignInWithEmail,
    authCreateAccountWithEmail } from '/src/functions/authFunctions'

function SignIn() {
    const [errorMsg, setErrorMsg] = useState('')

    const handleSignInWithEmail = async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value
        const password = document.getElementById('pw').value
        try {
            const userCredential = await authSignInWithEmail(email, password)
            // Handle successful sign-in (e.g., updateUserState or navigate)
        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    const handleSignInWithGoogle = async (event) => {
        event.preventDefault();
        try {
            const result = await authSignInWithGoogle()
            // Handle successful sign-in
        } catch (error) {
            setErrorMsg(error.message)
        }
    }

    const handleCreateAccount = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      const email = document.getElementById('email').value
      const password = document.getElementById('pw').value
  
      try {
          const userCredential = await authCreateAccountWithEmail(email, password)
          console.log("Account created:", userCredential.user);
          // Add any post-account-creation logic here, like redirecting to a profile setup page
      } catch (error) {
          setErrorMsg(error.message)
          console.error("Error creating account:", error)
      }
  }

    return (
        // Your existing JSX
        <div className="signIn">
        <div className='signIn--logo-wrapper'>
          <img className='signIn--logo-img' src={sterkLogo} alt="Sterk logo" />
          <span className='signIn--logo-txt'>Sterk</span>
        </div>
        <div className='signIn--card'>
          <h2 className="signIn--h2">SIGN IN</h2>
          <form>
            <button className="btn btn-provider margin-bottom-2" onClick={handleSignInWithGoogle}>
                <img className="btn-img" src="/assets/googleLogo.png" alt="Sign in with Google"/>
                Sign in with Google
            </button>

            <div className="signIn--input-wrapper">
              <span className="signIn--input-icon material-symbols-outlined">
                email
              </span>
              <input 
              className="signIn--input" 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email"
              required
              />
            </div>

            <div className="signIn--input-wrapper">
              <span className="signIn--input-icon material-symbols-outlined">
                key
              </span>
              <input 
              className="signIn--input" 
              type="password" 
              name="pw" 
              id="pw" 
              placeholder="Password"
              required
              />
            </div>
            <p className='signIn--p small'>Forgot password?</p>
            <div>
              <p className='signIn--error-msg red'>{errorMsg}</p>
            </div>
            <button className="btn btn-primary margin-bottom-1" onClick={handleSignInWithEmail}>Sign in</button>
            <button className="btn btn-secondary margin-bottom-2" onClick={handleCreateAccount}>Create account</button>
          </form>
        </div>
      </div>
    )
}

export default SignIn;