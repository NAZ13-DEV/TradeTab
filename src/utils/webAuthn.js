import { toast } from 'react-hot-toast';

const base64Encode = (arrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

export const handleWebAuthnRegistration = async (email, username) => {
  try {
    const credentialOptions = {
      publicKey: {
        challenge: new Uint8Array(32),
        rp: { name: 'Your App Name' },
        user: {
          id: new Uint8Array(16),
          name: email,
          displayName: username,
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
        authenticatorSelection: { userVerification: 'preferred' },
        timeout: 60000,
      },
    };

    const credential = await navigator.credentials.create(credentialOptions);

    const credentialData = {
      credentialId: base64Encode(credential.rawId),
      attestationObject: base64Encode(credential.response.attestationObject),
      clientDataJSON: base64Encode(credential.response.clientDataJSON),
    };

    console.log(credentialData);
    return credentialData;
  } catch (error) {
    console.error('WebAuthn registration failed:', error);
    toast.error('WebAuthn registration failed');
    return null;
  }
};
