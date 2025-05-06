<?php
class Encrypt{
  public function encryptData($data, $key) {
    $method = 'AES-256-CBC';
    $ivLength = openssl_cipher_iv_length($method);
    $iv = openssl_random_pseudo_bytes($ivLength);
    $encrypted = openssl_encrypt($data, $method, $key, OPENSSL_RAW_DATA, $iv);
    $encrypted = base64_encode($iv . $encrypted); // Concatenate IV and encrypted data
    return $encrypted;
}

public function decryptData($data, $key) {
  $method = 'AES-256-CBC';
  $ivLength = openssl_cipher_iv_length($method);
  $data = base64_decode($data);
  $iv = substr($data, 0, $ivLength);
  $encrypted = substr($data, $ivLength);
  $decrypted = openssl_decrypt($encrypted, $method, $key, OPENSSL_RAW_DATA, $iv);
  return $decrypted;
}
public function generateKey() {
  $bytes = openssl_random_pseudo_bytes(16); // 16 bytes = 128 bits
  return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($bytes), 4));
}
}