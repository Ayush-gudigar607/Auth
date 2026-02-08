import React, { useState } from 'react';
import { ClerkProvider, useAuth, SignInButton, UserButton } from '@clerk/clerk-react';
import './App.css';

// Replace with your Clerk publishable key
const PUBLISHABLE_KEY = (process.env.REACT_APP_CLERK_PUBLISHABLE_KEY as string) || 'pk_test_Z2VudGxlLWxhZHlidWctNzUuY2xlcmsuYWNjb3VudHMuZGV2JA';

function AppContent() {
  const { isSignedIn } = useAuth();
  const [message, setMessage] = useState('');

  const callProtectedRoute = async () => {
    try {
      const response = await fetch('http://localhost:3000/protected');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Clerk Authentication Demo</h1>
        
        {!isSignedIn ? (
          <SignInButton />
        ) : (
          <>
            <UserButton />
            <br />
            <button onClick={callProtectedRoute} style={{ marginTop: '20px', padding: '10px 20px' }}>
              Call Protected Route
            </button>
          </>
        )}
        
        {message && (
          <p style={{ marginTop: '20px', color: 'lightgreen' }}>
            {message}
          </p>
        )}
      </header>
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
}

export default App;


