'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Settings = () => {
  // WebAuthn Registration Logic
  const handleWebAuthnRegistration = async () => {
    if (!window.isSecureContext) {
      toast.error('WebAuthn requires HTTPS or localhost.');
      return;
    }

    if (!('credentials' in navigator) || !('create' in navigator.credentials)) {
      toast.error('WebAuthn is not supported in this browser.');
      return;
    }

    try {
      const credentialOptions = {
        publicKey: {
          challenge: Uint8Array.from('random-server-challenge', (c) =>
            c.charCodeAt(0)
          ), // Replace with backend-generated challenge
          rp: { name: 'Example App' },
          user: {
            id: Uint8Array.from('unique-user-id', (c) => c.charCodeAt(0)), // Replace with backend-generated user ID
            name: user?.email || 'example@example.com',
            displayName: user?.name || 'User',
          },
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
          authenticatorSelection: { userVerification: 'preferred' },
          timeout: 60000,
        },
      };

      const credential = await navigator.credentials.create(credentialOptions);

      console.log('WebAuthn registration successful:', credential);
      toast.success('WebAuthn registration successful!');
    } catch (error) {
      console.error('WebAuthn registration failed:', error);
      toast.error('WebAuthn registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <button
        onClick={handleWebAuthnRegistration}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Register with WebAuthn
      </button>
    </div>
  );
};

export default Settings;
