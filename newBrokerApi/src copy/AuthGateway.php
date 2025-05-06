<?php
require '../vendor/autoload.php';

// WebAuthn classes
use WebAuthn\PublicKeyCredentialCreationOptions;
use WebAuthn\PublicKeyCredentialParameters;
use WebAuthn\AuthenticatorSelectionCriteria;
use WebAuthn\UserEntity;
use WebAuthn\AttestationConveyancePreference;

class AuthGateway
{
    private $pdovar;
    private $response;
    private $encrypt;
    private $mailsender;
    private $conn;
    private $createDbTables;
    private $gateway;

    public function __construct()
    {
        try {
            $this->pdovar = new PDO('mysql:host=' . $_ENV["DB_HOST"] . ';dbname=' . $_ENV["DB_NAME"], $_ENV["DB_USER"], $_ENV["DB_PASS"], []);
            $this->pdovar->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('Connection failed: ' . $e->getMessage());
        }
        
        $this->createDbTables = new CreateDbTables($this->pdovar);
        $this->mailsender = new EmailSender();
        $this->response = new JsonResponse();
        $this->gateway = new TaskGatewayFunction($this->pdovar);
        $this->encrypt = new Encrypt();
        $this->conn = new Database();
        $this->createDbTables = new CreateDbTables($this->pdovar);
    }

    private function generateChallenge()
    {
        return bin2hex(random_bytes(32)); 
    }

    public function creatAuth()
    {
       

        $user = [
            'id' => 'user-unique-id',
            'name' => 'user@example.com',
            'displayName' => 'User Name'
        ];

        // Generate challenge and store it in session
        $challenge = $this->generateChallenge();
        $_SESSION['challenge'] = $challenge;

        // WebAuthn credential creation options
        $options = new PublicKeyCredentialCreationOptions(
            $challenge,
            new UserEntity($user['id'], $user['name'], $user['displayName']),
            [
                new PublicKeyCredentialParameters(PublicKeyCredentialParameters::TYPE_PUBLIC_KEY, 'ES256'),
                new PublicKeyCredentialParameters(PublicKeyCredentialParameters::TYPE_PUBLIC_KEY, 'RS256')
            ],
            new AuthenticatorSelectionCriteria(AuthenticatorSelectionCriteria::USER_VERIFICATION_REQUIRED),
            AttestationConveyancePreference::NONE
        );

        // Return the WebAuthn options as JSON
        echo json_encode($options->jsonSerialize());
        exit();
    }
}
