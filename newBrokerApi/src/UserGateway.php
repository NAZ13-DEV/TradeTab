<?php
// session_start();
class UserGateway
{
    private $pdovar;
    private $response;
    private $encrypt;
    private $mailsender;
    private $conn;
    private $createDbTables;
    private $gateway;

    public function __construct($pdoConnection)
    {
        $this->pdovar = $pdoConnection;
        $this->createDbTables = new CreateDbTables($this->pdovar);
        $this->mailsender = new EmailSender();
        $this->response = new JsonResponse();
        $this->gateway = new TaskGatewayFunction($this->pdovar);
        $this->encrypt = new Encrypt();
        $this->conn = new Database();
        $this->createDbTables = new CreateDbTables($this->pdovar);
    }

    public function __destruct()
    {
        $this->pdovar = null;
    }

    public function registerUser(array $data)
    {
        // unset($data['cpw']);
        // unset($data['confirmation']);
        $columns = [
            'firstName' => 'VARCHAR(200) NULL DEFAULT NULL',
            'last_Name' => 'VARCHAR(200) NULL DEFAULT NULL',
            'Username' => 'VARCHAR(200) NULL DEFAULT NULL',
            'email' => 'VARCHAR(200) NULL DEFAULT NULL',
            'Phone' => 'VARCHAR(20) NULL DEFAULT NULL',
            'country' => 'VARCHAR(70) NULL DEFAULT NULL',
            'Password' => 'VARCHAR(200) NULL DEFAULT NULL',
            'refer' => 'VARCHAR(200) NULL DEFAULT NULL',
            'encryptedPassword' => 'VARCHAR(200) NULL DEFAULT NULL',
            'Plan' => 'VARCHAR(200) NULL DEFAULT NULL',
            'currency' => 'VARCHAR(200) NULL DEFAULT NULL',
            'dateOc' => 'VARCHAR(200) NULL DEFAULT NULL',
            'userid' => 'VARCHAR(200) NULL DEFAULT NULL',
            'ip' => 'VARCHAR(200) NULL DEFAULT NULL',
            'img' => 'VARCHAR(200) NULL DEFAULT NULL',
            'balance' => 'VARCHAR(200) NULL DEFAULT NULL',
            'emailVerication' => 'VARCHAR(200) NULL DEFAULT NULL',
            'UserLogin' => 'VARCHAR(200) NULL DEFAULT NULL',
            'total_depo' => 'VARCHAR(200) NULL DEFAULT NULL',
            'total_pro' => 'VARCHAR(200) NULL DEFAULT NULL',
            'status' => 'VARCHAR(200) NULL DEFAULT NULL',
            'demo_balance' => 'VARCHAR(200) NULL DEFAULT NULL',
            'sup' => 'VARCHAR(200) NULL DEFAULT NULL',
            'alert' => 'VARCHAR(200) NULL DEFAULT NULL',
            'numb' => 'VARCHAR(200) NULL DEFAULT NULL',
            'kyc' => 'VARCHAR(200) NULL DEFAULT NULL',
            'IMFClearanceCode' => 'VARCHAR(200) NULL DEFAULT NULL',
            'Address' => 'VARCHAR(200) NULL DEFAULT NULL',
            'City' => 'VARCHAR(200) NULL DEFAULT NULL',
            'State' => 'VARCHAR(70) NULL DEFAULT NULL',
            'verifi' => 'VARCHAR(200) NULL DEFAULT NULL',
            'dis' => 'VARCHAR(200) NULL DEFAULT NULL',
            'email_log' => 'VARCHAR(200) NULL DEFAULT NULL',
            'name_of_code' => 'VARCHAR(200) NULL DEFAULT NULL',
            'withd' => 'VARCHAR(200) NULL DEFAULT NULL',
            'signal_message' => 'TEXT NULL DEFAULT NULL',

        ];

        $data['encryptedPassword'] = password_hash(trim($data['password']), PASSWORD_DEFAULT);
        $data['plan'] = NULL;
        $data['currency'] = '$';
        // $data['dateOc'] = Null;
        $data['userId'] = $this->gateway->genRandomAlphanumericstrings(10);
        $data['ip'] = $this->gateway->getIPAddress();
        $data['img'] = NULL;
        $data['balance'] = '0.00';
        $data['emailVerication'] = NULL;
        $data['UserLogin'] = NULL;
        $data['total_depo'] = '0.00';
        $data['total_pro'] = '0.00';
        $data['status'] = 'Pending';
        $data['demo_balance'] = '0.00';
        $data['sup'] = NULL;
        $data['alert'] = NULL;
        $data['numb'] = NULL;
        $data['country'] = NULL;
        $data['kyc'] = NULL;
        $data['IMFClearanceCode'] = NULL;
        $data['Address'] = NULL;
        $data['City'] = NULL;
        $data['State'] = NULL;
        $data['verifi'] = NULL;
        $data['dis'] = NULL;
        $data['email_log'] = NULL;
        $data['name_of_code'] = NULL;
        $data['withd'] = NULL;
        $data['signal_message'] = NULL;
        var_dump($data,$columns);

        $conditions = [
            'email' => $data['email']
        ];
        // try {
        $referrer = $data['referral'];
        unset($data['confirmPassword']);

        $result = $this->createDbTables->createTableWithTypes(RegTable, $columns);
        if ($result === true || $result === null) {
            if ($this->gateway->checkEmailExistence($this->pdovar, RegTable, $conditions)) {
                $errors[] = 'This email already exists. try another.';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            } else {
                $bindingArray = $this->gateway->generateRandomStrings($data);
                $emailverificationColumnArray = ['email', 'encodedEmail', 'encodedId'];
                $connecter = $this->pdovar;
                $udata = array_map('strval', $data);
                $udata = array_map(function ($value) {
                    return trim($value);
                }, $udata);
                $id = $this->gateway->createForUserWithTypes($connecter, RegTable, $columns, $bindingArray, $udata);
                if ($id) {
                    if (!empty($id)) {
                        $fetchUser = $this->gateway->getUserIdFromUserTable(RegTable, $id);
                        $key = $_ENV['SECRET_KEY'];
                        // var_dump( $fetchUser);
                        $userEmail = $fetchUser['email'];
                        $userFullname = $fetchUser['firstName'] . ' ' . $fetchUser['last_Name'];
                        $userId = (string) $fetchUser['id'];
                        $emailverificationBindingArray = $this->gateway->generateRandomStrings($emailverificationColumnArray);
                        $encodedId = $this->encrypt->encryptData($userId, $key);
                        $EncrypteduserEmail = password_hash($userEmail, PASSWORD_DEFAULT);
                        $emailverificationdata = [$userEmail, $EncrypteduserEmail, $encodedId];
                        $result = $this->createDbTables->createTable(EmailValidation, $emailverificationColumnArray);
                        if ($result) {
                            $inserted = $this->conn->insertData($connecter, EmailValidation, $emailverificationColumnArray, $emailverificationBindingArray, $emailverificationdata);
                            if ($inserted) {
                                // if ($referrer === 'null' || $referrer === "") {
                                $h = 'Successful Registration';
                                $c = 'Congratulations! your registration was successful.';
                                $message = $this->gateway->createNotificationMessage($id, $h, $c,$data['dateOc']);
                                if ($message) {
                                    // $h = 'Successful Referral';
                                    // $c = 'You just made a successful referral and it is currently awaiting approval. You will be notified once it has been processed.';

                                    // $messager = $this->gateway->createNotificationMessage($id, $h, $c);
                                    // if ($messager) {
                                    $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                                    if ($sent === true) {
                                        $response = ['status' => 'true', 'email' => $userEmail];
                                        $this->response->respondCreated($response);
                                    } else {
                                        $errors[] = 'could not send mail to user';
                                        if (!empty($errors)) {
                                            $this->response->respondUnprocessableEntity($errors);
                                            return;
                                        }
                                    }
                                } else {
                                    $errors[] = 'could not insert message';
                                    if (!empty($errors)) {
                                        $this->response->respondUnprocessableEntity($errors);
                                        return;
                                    }
                                }
                                // }

                            } else {
                                $errors[] = 'could not insert data';
                                if (!empty($errors)) {
                                    $this->response->respondUnprocessableEntity($errors);
                                    return;
                                }
                            }
                        } else {
                            $errors[] = 'could not create this table';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                                return;
                            }
                        }
                    } else {
                        $errors[] = 'could not get id';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                    // } catch (\Throwable $e) {
                    //     echo "Error: " . $e->getMessage();
                    // }
                } else {
                    $errors[] = 'could not register user';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            }
        } else {
            $errors[] = 'The table ' . RegTable . ' was not found in the database.';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
        // } catch (\Throwable $e) {

        //     $errors[] = "" . $e->getMessage();
        //     if (!empty($errors)) {
        //         $this->response->respondUnprocessableEntity($errors);
        //         return;
        //     }
        // }
    }


    public function uploadKyc($id, array $file)
    {
        $passport = json_encode($this->gateway->processImageWithgivenNameFiles($file['passport']));

        $userId = $id['userId'];
        $date = date('Y-m-d H:i:s');
        ;
        // try {
        $walletColumnArray = ['userid', 'DocumentType', 'FrontView', 'BackView', 'Status', 'submitDate', 'approveDate','createdAt'];
        $result = $this->createDbTables->createTable(kyc, $walletColumnArray);
        if ($result === true || $result === null) {
            $data = [$userId, 'Passport', $passport, null, 'pending', $date, null];

            $walletBindingArray = $this->gateway->generateRandomStrings($data);
            $inserted = $this->conn->insertData($this->pdovar, kyc, $walletColumnArray, $walletBindingArray, $data);
            if ($inserted) {
                $h = 'KYC Upload Success';
                $c = 'Congratulations! your kyc documents have been successfully uploaded.';
                $message = $this->gateway->createNotificationMessage($userId, $h, $c,$walletColumnArray['createdAt'] ?? null);
                if ($message) {
                    // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                    // if ($sent === true) {
                    $this->response->respondCreated('Your Document has been uploaded successfully');
                    // } else {
                    //     $errors[] = 'could not send mail to user';
                    //     if (!empty($errors)) {
                    //         $this->response->respondUnprocessableEntity($errors);
                    //         return;
                    //     }
                    // }
                } else {
                    $errors[] = 'could not insert message';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'could not create this table';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $errors[] = 'The table ' . wallet . ' was not found in the database.';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
        // } catch (\Throwable $e) {
        //     $errors[] = '' . $e->getMessage();
        //     if (!empty($errors)) {
        //         $this->response->respondUnprocessableEntity($errors);
        //         return;
        //     }
        // }
    }

    public function uploadriverKyc($id, array $file)
    {
        $drivingLicenseBack = json_encode($this->gateway->processImageWithgivenNameFiles($file['backFile'] ?? null));
        $drivingLicenseFront = json_encode($this->gateway->processImageWithgivenNameFiles($file['frontFile'] ?? null));
        $userId = $id['userid'];
        $date = $id['createdAt'];
        // try {
        $walletColumnArray = ['userid', 'DocumentType', 'FrontView', 'BackView', 'Status', 'submitDate', 'approveDate'];
        $result = $this->createDbTables->createTable(kyc, $walletColumnArray);
        var_dump($id);
        if ($result === true || $result === null) {
            $data = [$userId, $id['kycType'], $drivingLicenseFront, $drivingLicenseBack, 'pending', $date, null];
            $walletBindingArray = $this->gateway->generateRandomStrings($data);
            $inserted = $this->conn->insertData($this->pdovar, kyc, $walletColumnArray, $walletBindingArray, $data);
            if ($inserted) {
                $updateColoumn = ['kyc', 'verifi'];
                $updateData = ['pending', 'pending'];
                $whereColumn = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $id['userid']);
                if ($updated) {
                    $h = 'KYC Upload Success';
                    $c = 'Congratulations! your kyc documents have been successfully uploaded.';
                    $message = $this->gateway->createNotificationMessage($userId, $h, $c,$date);
                    if ($message) {
                        // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                        // if ($sent === true) {
                        $this->response->respondCreated('Your Document has been uploaded successfully');
                        // } else {
                        //     $errors[] = 'could not send mail to user';
                        //     if (!empty($errors)) {
                        //         $this->response->respondUnprocessableEntity($errors);
                        //         return;
                        //     }
                        // }
                    } else {
                        $errors[] = 'could not insert message';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                } else {
                    $errors[] = 'could not update user table';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }


            } else {
                $errors[] = 'could not create this table';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $errors[] = 'The table ' . wallet . ' was not found in the database.';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
        // } catch (\Throwable $e) {
        //     $errors[] = '' . $e->getMessage();
        //     if (!empty($errors)) {
        //         $this->response->respondUnprocessableEntity($errors);
        //         return;
        //     }
        // }
    }

    public function updateProfilePics(array $id, array $file)
{
    $img = $this->gateway->processImageWithgivenNameFiles($file['documents']);
    $userId = $id['id'];
   
    $createdAt = $_POST['createdAt'] ?? null;
    if (!$createdAt) {
        $this->response->respondUnprocessableEntity(['createdAt is missing']);
        return;
    }

    $whereColumnisEqualTo = [$img];
    $columnsToUpdate = ['img'];
    $columnOfUpdateForUser = 'id';

    $updateUserStatus = $this->conn->updateData(
        $this->pdovar,
        RegTable,
        $columnsToUpdate,
        $whereColumnisEqualTo,
        $columnOfUpdateForUser,
        $userId
    );

    if ($updateUserStatus) {
        $h = 'Profile Picture Update Confirmation';
        $c = 'You just updated your profile picture.';
        $message = $this->gateway->createNotificationMessage($userId, $h, $c, $createdAt);

        if ($message) {
            return $this->response->respondCreated('your profile picture has been updated successfully');
        } else {
            $errors[] = 'could not insert message';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
}


  public function updateUserPasswordByUSer(array $passwordDetails, $id)
{
    $userId = $id;
    $conditions = ['id' => $id];

    $currentUserPassword = $passwordDetails['currentPassword'];
    $newUserPassword = $passwordDetails['newPassword'];
    $createdAt = $passwordDetails['createdAt'] ;

    // var_dump($createdAt);


    $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditions);
    $userEncryptedPassword = $fetchUserDetailsWithEmail['encryptedPassword'];
    $verifyPassword = password_verify($currentUserPassword, $userEncryptedPassword);

    if (!$verifyPassword) {
        $errors[] = 'incorrect password';
        if (!empty($errors)) {
            $this->response->respondUnprocessableEntity($errors);
            return;
        }
    }

    if ($verifyPassword) {
        $newlyEncryptedpassword = password_hash($newUserPassword, PASSWORD_DEFAULT);
        $whereColumnisEqualTo = [$newUserPassword, $newlyEncryptedpassword];
        $columnsToUpdate = ['Password', 'encryptedPassword'];
        $columnOfUpdateForUser = 'id';

        $updateUserStatus = $this->conn->updateData($this->pdovar, RegTable, $columnsToUpdate, $whereColumnisEqualTo, $columnOfUpdateForUser, $userId);
        if ($updateUserStatus) {
            $h = 'Password Update Confirmation';
            $c = 'You just updated your password. Your account security is now enhanced.';
            $s = $createdAt; // use value sent from frontend

            $message = $this->gateway->createNotificationMessage($fetchUserDetailsWithEmail['id'], $h, $c, $s);
            if ($message) {
                return $this->response->respondCreated('Your password has been updated successfully');
            } else {
                $errors[] = 'Could not insert message';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        }
    }
}


    public function updateuserDetails(array $file)
    {
        $userId = $file['userid'];
        unset($file['userid']);
        $whereColumnisEqualTo = [$file['fn'], $file['emm'], $file['ph'], $file['cn'], $file['cur']];
        // var_dump($whereColumnisEqualTo);
        $columnsToUpdate = ['fullName', 'email', 'phoneNumber', 'country', 'currency'];
        $columnOfUpdateForUser = 'id';
        $updateUserStatus = $this->conn->updateData($this->pdovar, RegTable, $columnsToUpdate, $whereColumnisEqualTo, $columnOfUpdateForUser, $userId);
        if ($updateUserStatus) {
            return $this->response->respondCreated('your details has been updated successfully');
        } else {
            $errors[] = 'could not insert message';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function resendMail(array $resendMaildata)
    {
        $conditions = ['email' => $resendMaildata['mail']];
        $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditions);
        $userFullname = $fetchUserDetailsWithEmail['first_name'] . ' ' . $fetchUserDetailsWithEmail['last_name'];
        $userID = $fetchUserDetailsWithEmail['id'];
        $userEmail = $fetchUserDetailsWithEmail['email'];
        $checkEmailConditions = ['email' => $userEmail];
        $emailVerificationData = $this->gateway->fetchData(EmailValidation, $checkEmailConditions);
        $emailVerificationID = $emailVerificationData['id'];
        $emailVerificationEmail = $emailVerificationData['email'];
        $encodedEmail = password_hash($emailVerificationEmail, PASSWORD_DEFAULT);
        if ($this->gateway->checkEmailExistence($this->pdovar, EmailValidation, $checkEmailConditions)) {
            $whereColumn = 'id';
            $deleted = $this->conn->deleteData($this->pdovar, EmailValidation, $whereColumn, $emailVerificationID);
            if ($deleted) {
                $emailverificationColumnArray = ['email', 'encodedEmail', 'encodeId'];
                $key = $_ENV['SECRET_KEY'];
                $connecter = $this->pdovar;
                $emailverificationBindingArray = $this->gateway->generateRandomStrings($emailverificationColumnArray);
                $encodedId = $this->encrypt->encryptData($userID, $key);
                $emailverificationdata = [$userEmail, $encodedEmail, $encodedId];
                $insertNewDetails = $this->conn->insertData($connecter, EmailValidation, $emailverificationColumnArray, $emailverificationBindingArray, $emailverificationdata);

                if ($insertNewDetails) {
                    $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userID, $encodedEmail, $encodedId);
                    if ($sent === true) {
                        $response = ['status' => 'true'];
                        return $this->response->respondCreated($response);
                    } else {
                        $errors[] = 'could not send mail to user';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                }
            } else {
                $errors[] = 'could not delete this data from the ' . EmailValidation . ' table';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $emailverificationColumnArray = ['email', 'encodedEmail', 'encodeId'];
            $key = $_ENV['SECRET_KEY'];
            $connecter = $this->pdovar;
            $emailverificationBindingArray = $this->gateway->generateRandomStrings($emailverificationColumnArray);
            $encodedId = $this->encrypt->encryptData($userID, $key);
            $emailverificationdata = [$userEmail, $encodedEmail, $encodedId];
            $insertNewDetails = $this->conn->insertData($connecter, EmailValidation, $emailverificationColumnArray, $emailverificationBindingArray, $emailverificationdata);

            if ($insertNewDetails) {
                $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userID, $encodedEmail, $encodedId);
                if ($sent === true) {
                    $response = ['status' => 'true'];
                    return $this->response->respondCreated($response);
                } else {
                    $errors[] = 'could not send mail to user';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            }
        }
    }

    public function disableTwoFaReset(array $resendMaildata)
    {
        $id = $resendMaildata['userid'];
        $code = $resendMaildata['code'];
        $conditions = ['id' => $id];
        $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditions);
        $userFullname = $fetchUserDetailsWithEmail['first_name'] . ' ' . $fetchUserDetailsWithEmail['last_name'];
        $userID = $fetchUserDetailsWithEmail['id'];
        $userEmail = $fetchUserDetailsWithEmail['email'];
        $check2faConditions = ['userid' => $userID];
        $twoFaVerificationData = $this->gateway->fetchData(verificationcode, $check2faConditions);
        $twofaVerificationUserID = $twoFaVerificationData['userid'] ?? null;
        $twofaVerificationID = $twoFaVerificationData['id'] ?? null;
        $fetchedCode = $twoFaVerificationData['code'] ?? null;

        if ($code === $fetchedCode) {
            $whereColumnisEqualTo = ['false', null, null];
            $columnsToUpdate = ['twoFactorUthentication', 'twoFaAUthCode', 'twoFaAUthCodeCreationDate'];
            $columnOfUpdateForUser = 'id';
            $updateUserStatus = $this->conn->updateData($this->pdovar, RegTable, $columnsToUpdate, $whereColumnisEqualTo, $columnOfUpdateForUser, $userID);
            if ($updateUserStatus) {
                $whereColumn = 'id';
                $deleted = $this->conn->deleteData($this->pdovar, verificationcode, $whereColumn, $twofaVerificationID);
                if ($deleted) {
                    $h = 'Two-Factor Authentication Disabled';
                    $c = 'Your two-factor authentication (2FA) has been successfully disabled. You can now log in without using 2FA.';
                    $message = $this->gateway->createNotificationMessage($userID, $h, $c);
                    if ($message) {
                        $sent = $this->mailsender->ConfirmCodeChangeEmail($userEmail, $userFullname);
                        if ($sent === true) {
                            return $this->response->respondCreated('your 2 Factor Authentication Deactivation has been approved');
                        } else {
                            $errors[] = 'could not send mail to user';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                                return;
                            }
                        }
                    } else {
                        $errors[] = 'could not insert message';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                } else {
                    $errors[] = 'could not delete verification row';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'could not update user table';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $errors[] = 'codes do not match';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function ProcessTwoFaReset(array $resendMaildata)
    {
        $id = $resendMaildata['userid'];
        $code = $resendMaildata['code'];
        $conditions = ['id' => $id];
        $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditions);
        $userFullname = $fetchUserDetailsWithEmail['first_name'] . ' ' . $fetchUserDetailsWithEmail['last_name'];
        $userID = $fetchUserDetailsWithEmail['id'];
        $userEmail = $fetchUserDetailsWithEmail['email'];
        $check2faConditions = ['userid' => $userID];
        $twoFaVerificationData = $this->gateway->fetchData(verificationcode, $check2faConditions);
        $twofaVerificationUserID = $twoFaVerificationData['userid'] ?? null;
        $twofaVerificationID = $twoFaVerificationData['id'] ?? null;
        $fetchedCode = $twoFaVerificationData['code'] ?? null;
        if ($code === $fetchedCode) {
            $whereColumnisEqualTo = ['activated'];
            $columnsToUpdate = ['twoFactorUthentication'];
            $columnOfUpdateForUser = 'id';
            $updateUserStatus = $this->conn->updateData($this->pdovar, RegTable, $columnsToUpdate, $whereColumnisEqualTo, $columnOfUpdateForUser, $userID);
            if ($updateUserStatus) {
                $whereColumn = 'id';
                $deleted = $this->conn->deleteData($this->pdovar, verificationcode, $whereColumn, $twofaVerificationID);
                if ($deleted) {
                    return $this->response->respondCreated('your 2 Factor Authentication Activation has been activated');
                } else {
                    $errors[] = 'could not delete verification row';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'could not update user table';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $errors[] = 'codes do not match';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function changeTwoFaReset($twofaVerificationID)
    {
        $id = $twofaVerificationID['userid'];
        $code = $twofaVerificationID['oldpin'];
        $newcode = $twofaVerificationID['newpin'];
        $conditions = ['id' => $id];
        $fetchUserDetailsWithId = $this->gateway->fetchData(RegTable, $conditions);
        $userFullname = $fetchUserDetailsWithId['first_name'] . ' ' . $fetchUserDetailsWithId['last_name'];
        $userID = $fetchUserDetailsWithId['id'];
        $userEmail = $fetchUserDetailsWithId['email'];
        $fetchedCode = $fetchUserDetailsWithId['twoFaAUthCode'];
        $columns = ['twoFaAUthCode', 'twoFaAUthCodeCreationDate'];
        // var_dump($code , $fetchedCode. $id);
        if ($code === $fetchedCode) {
            $date = date('Y-m-d H:i:s');
            $check2fadata = [$newcode, $date];
            $columnOfUpdateForUser = 'id';
            $updateUserDetail = $this->conn->updateData($this->pdovar, RegTable, $columns, $check2fadata, $columnOfUpdateForUser, $id);
            if ($updateUserDetail) {
                $h = 'Two-Factor Authentication Reset';
                $c = 'Your two-factor authentication code have been reset.';
                $message = $this->gateway->createNotificationMessage($userID, $h, $c);
                if ($message) {
                    $sent = $this->mailsender->ConfirmCodeChangeEmail($userEmail, $userFullname);
                    if ($sent === true) {
                        return $this->response->respondCreated('Your 2fa pin has been changed successfully');
                    } else {
                        $errors[] = 'could not send mail to user';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                } else {
                    $errors[] = 'could not insert message';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'could not proccess update request';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $errors[] = 'your 2fa pin is incorrect try again';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function createPinForTwoFaReset(array $createPinForTwoFaReset)
    {
        $id = $createPinForTwoFaReset['userid'];
        $code = $createPinForTwoFaReset['code'];
        $conditions = ['id' => $id];
        $fetchUserDetailsWithId = $this->gateway->fetchData(RegTable, $conditions);
        $userFullname = $fetchUserDetailsWithId['first_name'] . ' ' . $fetchUserDetailsWithId['last_name'];
        $userID = $fetchUserDetailsWithId['id'];
        $userEmail = $fetchUserDetailsWithId['email'];
        $columns = ['twoFaAUthCode', 'twoFaAUthCodeCreationDate'];
        $result = $this->createDbTables->createTable(RegTable, $columns);
        if ($result) {
            $date = date('Y-m-d H:i:s');
            $check2fadata = [$code, $date];
            $columnOfUpdateForUser = 'id';
            $updateUserDetail = $this->conn->updateData($this->pdovar, RegTable, $columns, $check2fadata, $columnOfUpdateForUser, $id);
            if ($updateUserDetail) {
                $h = 'PIN Created for Two-Factor Authentication';
                $c = 'You have successfully created a new two-factor authentication PIN. Please keep your PIN secure.';
                $message = $this->gateway->createNotificationMessage($fetchUserDetailsWithId['id'], $h, $c);
                if ($message) {
                    $sent = $this->mailsender->ConfirmCodeCreationEmail($userEmail, $userFullname);
                    if ($sent === true) {
                        return $this->response->respondCreated('Your 2fa pin has been created');
                    } else {
                        $errors[] = 'could not send mail to user';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                } else {
                    $errors[] = 'could not insert message';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'could not proccess update request';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        }
    }

    public function requestTwoFaReset(array $requestTwoFaReset)
    {
        $id = $requestTwoFaReset['userid'];
        $conditions = ['id' => $id];
        $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditions);
        $userFullname = $fetchUserDetailsWithEmail['first_name'] . ' ' . $fetchUserDetailsWithEmail['last_name'];
        $userID = $fetchUserDetailsWithEmail['id'];
        $userEmail = $fetchUserDetailsWithEmail['email'];
        $check2faConditions = ['userid' => $userID];
        $columns = ['code', 'userid', 'date'];
        $result = $this->createDbTables->createTable(verificationcode, $columns);
        if ($result) {
            $emailVerificationData = $this->gateway->fetchData(verificationcode, $check2faConditions);
            $twofaVerificationUserID = $emailVerificationData['userid'] ?? null;
            $twofaVerificationID = $emailVerificationData['userid'] ?? null;
            $generatedCodes = rand(1000, 9999);

            $checkfetchdata = ['userid' => $twofaVerificationID];
            if ($this->gateway->checkEmailExistence($this->pdovar, verificationcode, $checkfetchdata)) {
                $whereColumn = 'userid';
                $deleted = $this->conn->deleteData($this->pdovar, verificationcode, $whereColumn, $twofaVerificationID);
                if ($deleted) {
                    $check2faBindingArray = $this->gateway->generateRandomStrings($columns);
                    $date = date('Y-m-d H:i:s');
                    $check2fadata = [$generatedCodes, $id, $date];
                    $insertNewDetails = $this->conn->insertData($this->pdovar, verificationcode, $columns, $check2faBindingArray, $check2fadata);
                    if ($insertNewDetails) {
                        $sent = $this->mailsender->sendCodeEmail($userEmail, $userFullname, $generatedCodes);
                        if ($sent === true) {
                            return $this->response->respondCreated('a code has been sent to your email for your 2 Factor Authentication');
                        } else {
                            $errors[] = 'could not send mail to user';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                                return;
                            }
                        }
                    }
                } else {
                    $errors[] = 'could not delete this data from the ' . verificationcode . ' table';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $check2faBindingArray = $this->gateway->generateRandomStrings($columns);
                $date = date('Y-m-d H:i:s');
                $check2fadata = [$generatedCodes, $id, $date];
                $insertNewDetails = $this->conn->insertData($this->pdovar, verificationcode, $columns, $check2faBindingArray, $check2fadata);
                if ($insertNewDetails) {
                    $sent = $this->mailsender->sendCodeEmail($userEmail, $userFullname, $generatedCodes);
                    if ($sent === true) {
                        return $this->response->respondCreated('a code has been sent to your email for your 2fa authentication');
                    } else {
                        $errors[] = 'could not send mail to user';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                }
            }
        }
    }

    public function verUser($verUserdata)
    {
        $encodedEmail = $verUserdata['encryptedEmail'];
        $email = $verUserdata['email'];
        $conditionsForEmailval = ['email' => $email, 'encodedEmail' => $encodedEmail];
        $conditionsForUser = ['email' => $email];
        $fetchEmailvalDetailsWithEmail = $this->gateway->fetchData(EmailValidation, $conditionsForEmailval);
        $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditionsForUser);
        if ($fetchEmailvalDetailsWithEmail) {
            $dataID = $fetchEmailvalDetailsWithEmail['id'];
            $columnOfDeleteForUser = 'id';
            $whereColumnisEqualTo = ['True'];
            $columnsToUpdate = ['emailVerication'];
            $columnOfUpdateForUser = 'id';
            $userId = $fetchUserDetailsWithEmail['id'];
            $UserFullname = $fetchUserDetailsWithEmail['firstName'] . ' ' . $fetchUserDetailsWithEmail['last_Name'];
            $updateUserStatus = $this->conn->updateData($this->pdovar, RegTable, $columnsToUpdate, $whereColumnisEqualTo, $columnOfUpdateForUser, $userId);
            if ($updateUserStatus) {
                $sendEmail = $this->mailsender->verifiedEMail($email, $UserFullname);
                if ($sendEmail) {
                    $deleted = $this->conn->deleteData($this->pdovar, EmailValidation, $columnOfDeleteForUser, $dataID);
                    if ($deleted) {
                        $h = 'Email Verification Successful';
                        $c = 'You have successfully verified your email address. thank you for confirming your email address.';

                        $message = $this->gateway->createNotificationMessage($userId, $h, $c);
                        if ($message) {
                            $this->response->respondCreated('Email verified successfully');
                        } else {
                            $errors[] = 'could not insert message';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                                return;
                            }
                        }
                    } else {
                        $errors[] = 'could not delete this data from the ' . EmailValidation . ' table';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                } else {
                    $errors[] = 'could not send mail to user';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'error in updating user user column';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $errors[] = 'invalid link request for another link';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function fetchEmailStatus($fetchEmailStatusdata)
    {
        $conditionsForFetch = ['email' => $fetchEmailStatusdata];
        $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditionsForFetch);
        if ($fetchUserDetailsWithEmail) {
            $response = ['status' => 'true', 'message' => $fetchUserDetailsWithEmail['emailVerication']];
            return $this->response->respondCreated($response);
        } else {
            $errors[] = 'this email is not registered try registering';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function fetchReferral($fetchReferral)
    {
        $conditionsForFetch = ['referrerId' => $fetchReferral];
        $fetchReferralDetails = $this->gateway->fetchAllDataWithCOndition(referralTable, $conditionsForFetch);
        if ($fetchReferralDetails) {
            foreach ($fetchReferralDetails as $key => $value) {
                $conditionsForReferrerUserFetch = ['id' => $value['referrerId']];
                $fetchReferredUserDetailsWithId = $this->gateway->fetchData(RegTable, $conditionsForReferrerUserFetch);
                if ($fetchReferredUserDetailsWithId) {
                    $conditionsForReferredUserFetch = ['id' => $value['referredId']];
                    $fetchReferrerUserDetailsWithId = $this->gateway->fetchAllDataWithCOndition(RegTable, $conditionsForReferredUserFetch);
                    if ($fetchReferrerUserDetailsWithId) {
                        foreach ($fetchReferrerUserDetailsWithId as $value) {
                            return $this->response->respondCreated(['referralDetails' => $fetchReferralDetails, 'referrerDetails' => $fetchReferrerUserDetailsWithId]);
                        }
                    } else {
                        return $this->response->respondCreated('false');
                    }
                } else {
                    return $this->response->respondCreated('false');
                }
            }
        } else {
            return $this->response->respondCreated('false');
        }
    }

    public function checkUserStatus($fetchUserDetails)
    {
        $conditionsForFetch = ['id' => $fetchUserDetails];
        $fetchUserDetailsWithId = $this->gateway->fetchData(RegTable, $conditionsForFetch);
        if ($fetchUserDetailsWithId) {
            return $this->response->respondCreated($fetchUserDetailsWithId['UserStatus']);
        } else {
            $errors[] = 'could not fetch user status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function fetchUserDetails($fetchUserDetails)
    {
        $conditionsForFetch = ['id' => $fetchUserDetails];
        $fetchUserDetailsWithId = $this->gateway->fetchData(RegTable, $conditionsForFetch);
        if ($fetchUserDetailsWithId) {
            return $this->response->respondCreated(array_merge($fetchUserDetailsWithId, ['sitelink' => sitelink]));
        } else {
            $errors[] = 'Errror ::: could not fetch user';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function fetchUserTrade($fetchUserDetails)
    {
        $conditionsForFetch = ['userid' => $fetchUserDetails];
        $fetchUserDetailsWithId = $this->gateway->fetchAllDataWithCOndition(trade, $conditionsForFetch);
        if ($fetchUserDetailsWithId) {
            return $this->response->respondCreated($fetchUserDetailsWithId);
        } else {
            $errors[] = 'This user has no trade';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchAllNotification($fetchUserDetails)
    {
        $conditionsForFetch = ['userid' => $fetchUserDetails];
        $fetchUserDetailsWithId = $this->gateway->fetchAllDataWithCOndition(messagenoti, $conditionsForFetch);
        if ($fetchUserDetailsWithId) {
            return $this->response->respondCreated($fetchUserDetailsWithId);
        } else {
            $errors[] = 'This user has no trade';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function fetchUserDetailsWithTransInfo($fetchUserDetails)
    {
        $depositArray = [];
        $profitArray = [];
        $cryptoWithdrawalArray = [];
        $bankWithdrawalArray = [];
        $conditionsForFetch = ['id' => $fetchUserDetails];
        $conditionsotherForFetch = ['userid' => $fetchUserDetails, 'transStatus' => 'Approved'];
        $fetchUserDetailsWithId = $this->gateway->fetchData(RegTable, $conditionsForFetch);
        if ($fetchUserDetailsWithId) {
            $fetchdepositDetailsWithId = $this->gateway->fetchAllDataWithCOnditionAscd(depositTable, $conditionsotherForFetch);

            foreach ($fetchdepositDetailsWithId as $key => $value) {
                $amount = $value['amount'];
                $date = strtotime($value['dateOfTrans']);
                $date = date('d M', $date);
                $depositArray[] = ['date' => $date, 'amount' => $amount, 'userCurrency' => $fetchUserDetailsWithId['currency']];
            }
            $fetchprofitDetailsWithId = $this->gateway->fetchAllDataWithCOnditionAscd(ProfitTable, $conditionsotherForFetch);

            foreach ($fetchprofitDetailsWithId as $key => $value) {
                $amount = $value['amount'];
                $date = strtotime($value['dateOfTrans']);
                // $date = date('d M', $date);
                $profitArray[] = ['date' => $date, 'amount' => $amount, 'userCurrency' => $fetchUserDetailsWithId['currency']];
            }

            $fetchcryptoWithdrawalDetailsWithId = $this->gateway->fetchAllDataWithCOnditionAscd(cryptwithdrawalTable, $conditionsotherForFetch);

            foreach ($fetchcryptoWithdrawalDetailsWithId as $key => $value) {
                $amount = $value['amount'];
                $date = strtotime($value['dateOfTrans']);
                $date = date('d M', $date);
                $cryptoWithdrawalArray[] = ['date' => $date, 'amount' => $amount, 'userCurrency' => $fetchUserDetailsWithId['currency']];
            }
        }
        $fetchbankWithdrawalDetailsWithId = $this->gateway->fetchAllDataWithCOnditionAscd(bnkwithdrawalTable, $conditionsotherForFetch);

        if ($fetchbankWithdrawalDetailsWithId) {
            foreach ($fetchbankWithdrawalDetailsWithId as $key => $value) {
                $amount = $value['amount'];
                $date = strtotime($value['dateOfTrans']);
                $date = date('d M', $date);
                $bankWithdrawalArray[] = ['date' => $date, 'amount' => $amount, 'userCurrency' => $fetchUserDetailsWithId['currency']];
            }
        }
        $withdrawal = array_merge($bankWithdrawalArray, $cryptoWithdrawalArray);
        //  if($withdrawal){
        return $this->response->respondCreated(['userDetails' => $fetchUserDetailsWithId, 'deposit' => $depositArray, 'withdrawal' => $withdrawal, 'profit' => $profitArray]);
        //  }
    }

    public function verifyResetPassword($verifyResetPassword)
    {
        // var_dump($verifyResetPassword);
        $conditionsForFetch = ['resetToken' => $verifyResetPassword['tokenReadFromUrl'], 'userEmail' => $verifyResetPassword['emailReadFromUrl'], 'userIdentifier' => $verifyResetPassword['numberReadFromUrl']];
        $fetchResetDetailsWithId = $this->gateway->fetchData(forgotPass, $conditionsForFetch);
        if ($fetchResetDetailsWithId) {
            $dataID = $fetchResetDetailsWithId['id'];
            $columnOfDeleteForUser = 'id';
            $deleted = $this->conn->deleteData($this->pdovar, forgotPass, $columnOfDeleteForUser, $dataID);
            if ($deleted) {
                return $this->response->respondCreated('Reset Password Link Verified');
            }
        } else {
            $errors[] = 'Invalid Password Reset Link, Try Again';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

   
    public function saveTrade($data)
    {
        // var_dump($data);
        $columns = [
            'amount' => 'VARCHAR(200) NULL DEFAULT NULL',
            'Symbol' => 'VARCHAR(200) NULL DEFAULT NULL',
            'Intervah' => 'VARCHAR(20) NULL DEFAULT NULL',
            'Leverage' => 'VARCHAR(70) NULL DEFAULT NULL',
            'stploss' => 'VARCHAR(200) NULL DEFAULT NULL',
            'takeprofit' => 'VARCHAR(200) NULL DEFAULT NULL',
            'EntryPrice' => 'VARCHAR(200) NULL DEFAULT NULL',
            'tradeType' => 'VARCHAR(200) NULL DEFAULT NULL',
            'trading_pairs' => 'VARCHAR(200) NULL DEFAULT NULL',
            'userid' => 'VARCHAR(200) NULL DEFAULT NULL',
            'dateo' => 'VARCHAR(200) NULL DEFAULT NULL',
            'trans_id' => 'VARCHAR(200) NULL DEFAULT NULL',
            'status' => 'VARCHAR(200) NULL DEFAULT NULL',
            'amt_earned' => 'VARCHAR(200) NULL DEFAULT NULL'
        ];
        $data['dateo'] = date('d-m-Y h:i:s a', time());
        $data['trans_id'] = $this->gateway->genRandomAlphanumericstrings(10);
        $data['status'] = 'Pending';
        $data['amt_earned'] = null;
        $userid = $data['userId'];
        $trading = $data['trading_pairs'];
        $amt = $data['amount'];
        $sell_pair = $data['symbol'];
        $duration = $data['Intervah'];
        $leverage = $data['leverage'];
        $takeprofit = $data['takeProfit'];
        $EntryPrice = $data['entryPrice'];
        $stploss = $data['stopLoss'];
        $type = $data['tradeType'];
        $tradeId = $data['trade'] ?? null;
        unset($data['trade']);
        $fetchUser = $this->gateway->getUserIdFromUserTable(RegTable, $userid);
        // var_dump($data, $columns);
        $balance = $fetchUser['balance'] - $amt;
        $total_depo = $fetchUser['total_depo'] - $amt;
        $updateColumn = ['balance', 'total_depo'];
        $columnData = [$balance, $total_depo];
        $updateUserBalance = $this->conn->updateData($this->pdovar, RegTable, $updateColumn, $columnData, 'id', $userid);
        if ($updateUserBalance) {
            $result = $this->createDbTables->createTableWithTypes(trade, $columns);
            if ($result === true || $result === null) {
                if ($tradeId === NULL || $tradeId === 'NULL') {
                    $result = $this->createDbTables->createTableWithTypes(trade, $columns);
                    if ($result === true || $result === null) {
                        $bindingArray = $this->gateway->generateRandomStrings($data);
                        $udata = array_map('strval', $data);
                        $udata = array_map(function ($value) {
                            return trim($value);
                        }, $udata);
                        $id = $this->gateway->createForUserWithTypes($this->pdovar, trade, $columns, $bindingArray, $udata);
                        if ($id) {
                            if (!empty($id)) {
                                $data['currency'] = $fetchUser['currency'];
                                $h = 'Your trade has been successfully placed.';
                                $fetchTrade = $this->gateway->getUserIdFromUserTable(trade, $id);
                                $c = 'here are the details your trading pair is ' . $trading . ' 
                                            Amount: $' . $amt . '
                                            Symbol: ' . $sell_pair . '
                                            Interval: ' . $duration . '
                                            Leverage: ' . $leverage . '
                                            Take Profit: ' . $takeprofit . '
                                            Entry Price: ' . $EntryPrice . '
                                            Stop Loss: ' . $stploss . '
                                            Buy/Sell: ' . $type . '
                                            Trade ID: #' . $fetchTrade['trans_id'] . '
                                            Date: ' . $fetchTrade['dateo'] . '
                                            Status: ' . $fetchTrade['status'] . '';
                                $messager = $this->gateway->createNotificationMessage($id, $h, $c);
                                if ($messager) {
                                    $sent = $this->mailsender->confirmTrade($fetchUser['email'], $fetchUser['firstName'] . ' ' . $fetchUser['last_Name'], $data);
                                    if ($sent === true) {
                                        $this->response->respondCreated('your trade has been placed');
                                    } else {
                                        $errors[] = 'could not send mail to user';
                                        if (!empty($errors)) {
                                            $this->response->respondUnprocessableEntity($errors);
                                            return;
                                        }
                                    }
                                }
                            } else {
                                $errors[] = 'could not get id';
                                if (!empty($errors)) {
                                    $this->response->respondUnprocessableEntity($errors);
                                    return;
                                }
                            }
                            // } catch (\Throwable $e) {
                            //     echo "Error: " . $e->getMessage();
                            // }
                        } else {
                            $errors[] = 'could not register user';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                                return;
                            }
                        }
                    } else {
                        $errors[] = 'The table ' . trade . ' was not found in the database.';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                }
                if (is_int($tradeId)) {
                    $fetchTrade = $this->gateway->getUserIdFromUserTable(trade, $tradeId);

                    $balance = $fetchUser['balance'] - $amt + $fetchTrade['amount'] ;
                    $total_depo = $fetchUser['total_depo'] - $amt + $fetchTrade['amount'] ;
                    $updateColumn = ['balance', 'total_depo'];
                    $columnData = [$balance, $total_depo];
                    $updateUserBalance = $this->conn->updateData($this->pdovar, RegTable, $updateColumn, $columnData, 'id', $userid);
                    if ($updateUserBalance) {
                        $updateColumn = ['amount', 'Symbol', 'Intervah', 'Leverage', 'stploss', 'takeprofit', 'EntryPrice', 'tradeType', 'trading_pairs'];
                        $columnData = [$amt, $sell_pair, $duration, $leverage, $stploss, $takeprofit, $EntryPrice, $type, $trading];
                        $updateTrade = $this->conn->updateData($this->pdovar, trade, $updateColumn, $columnData, 'id', $tradeId);
                        if ($updateTrade) {
                            $data['currency'] = $fetchUser['currency'];
                            $fetchTrade = $this->gateway->getUserIdFromUserTable(trade, $tradeId);

                            $h = 'Your trade has been updated';
                            $c = 'here are the details your trading pair is ' . $trading . ' 
                                    Amount: $' . $amt . '
                                    Symbol: ' . $sell_pair . '
                                    Interval: ' . $duration . '
                                    Leverage: ' . $leverage . '
                                    Take Profit: ' . $takeprofit . '
                                    Entry Price: ' . $EntryPrice . '
                                    Stop Loss: ' . $stploss . '
                                    Buy/Sell: ' . $type . '
                                    Trade ID: #' . $fetchTrade['trans_id'] . '
                                    Date: ' . $fetchTrade['dateo'] . '
                                    Status: ' . $fetchTrade['status'] . '';
                            $messager = $this->gateway->createNotificationMessage($tradeId, $h, $c);
                            if ($messager) {
                                $sent = $this->mailsender->editedTrade($fetchUser['email'], $fetchUser['firstName'] . ' ' . $fetchUser['last_Name'], $data);
                                if ($sent === true) {
                                    $this->response->respondCreated('your trade has been updated');
                                } else {
                                    $errors[] = 'could not send mail to user';
                                    if (!empty($errors)) {
                                        $this->response->respondUnprocessableEntity($errors);
                                        return;
                                    }
                                }
                            } else {
                                $errors[] = 'could not insert message';
                                if (!empty($errors)) {
                                    $this->response->respondUnprocessableEntity($errors);
                                    return;
                                }
                            }
                        }
                    }
                }
            } else {
                $errors[] = 'The table ' . trade . ' was not found in the database.';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        }
    }

    public function changePassword($verifyResetPassword)
    {
        // var_dump($verifyResetPassword);

        $checkEmailConditions = ['email' => trim($verifyResetPassword['email'])];
        $conditionsForFetch = ['email' => trim($verifyResetPassword['email'])];
        if ($this->gateway->checkEmailExistence($this->pdovar, RegTable, $checkEmailConditions)) {
            $fetchResetDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditionsForFetch);
            if ($fetchResetDetailsWithEmail) {
                $password = trim($verifyResetPassword['password']);
                $sha = password_hash($password, PASSWORD_DEFAULT);
                $whereColumnisEqualTo = [$password, $sha];
                $columnsToUpdate = ['password', 'encryptedPassword'];
                $columnOfUpdateForUser = 'email';
                $updateUserStatus = $this->conn->updateData($this->pdovar, RegTable, $columnsToUpdate, $whereColumnisEqualTo, $columnOfUpdateForUser, $verifyResetPassword['email']);
                if ($updateUserStatus) {
                    $h = 'Password Change Confirmation';
                    $c = 'You just changed your password. your account security is now enhanced.';
                    $message = $this->gateway->createNotificationMessage($fetchResetDetailsWithEmail['id'], $h, $c);
                    if ($message) {
                        return $this->response->respondCreated('true');
                    } else {
                        $errors[] = 'could not insert message';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                } else {
                    $errors[] = 'could not update password';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'could not fetch any data';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $errors[] = 'this email is invalid';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function ProcessReset($ProcessResetdata)
    {
        $columns = [
            'userEmail',
            'resetToken',
            'createdAt',
            'userIdentifier',
        ];
        $result = $this->createDbTables->createTable(forgotPass, $columns);
        if ($result) {
            $checkEmailConditions = ['userEmail' => $ProcessResetdata['email']];
            if ($this->gateway->checkEmailExistence($this->pdovar, forgotPass, $checkEmailConditions)) {
                $conditionsForFetch = ['userEmail' => $ProcessResetdata['email']];
                $fetchForgottenDetailsWithEmail = $this->gateway->fetchData(forgotPass, $conditionsForFetch);
                if ($fetchForgottenDetailsWithEmail) {
                    $dataID = $fetchForgottenDetailsWithEmail['id'];
                    $columnOfDeleteForUser = 'id';
                    $deleted = $this->conn->deleteData($this->pdovar, forgotPass, $columnOfDeleteForUser, $dataID);
                    if ($deleted) {
                        $checkEmailConditions = ['email' => $ProcessResetdata['email']];
                        $conditionsForFetch = ['email' => $ProcessResetdata['email']];
                        $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditionsForFetch);
                        if ($fetchUserDetailsWithEmail) {
                            $ProcessResetdata['resetToken'] = $this->gateway->generateRandomString(32);
                            $ProcessResetdata['currentTime'] = Date('Y-m-d h:i:s a', time());
                            $ProcessResetdata['userId'] = $fetchUserDetailsWithEmail['id'];
                            $emailverificationBindingArray = $this->gateway->generateRandomStrings($columns);
                            $insertNewDetails = $this->conn->insertData($this->pdovar, forgotPass, $columns, $emailverificationBindingArray, $ProcessResetdata);
                            if ($insertNewDetails) {
                                $fullname = $fetchUserDetailsWithEmail['firstName'] . ' ' . $fetchUserDetailsWithEmail['last_Name'];
                                $sendEmail = $this->mailsender->resetPasswordEMail($ProcessResetdata['email'], $fullname, $ProcessResetdata['resetToken'], $ProcessResetdata['userId']);
                                if ($sendEmail) {
                                    $this->response->respondCreated('true');
                                } else {
                                    $errors[] = 'could not send mail to user';
                                    if (!empty($errors)) {
                                        $this->response->respondUnprocessableEntity($errors);
                                        return;
                                    }
                                }
                            } else {
                                $errors[] = 'error inserting data into ' . forgotPass . '';
                                if (!empty($errors)) {
                                    $this->response->respondUnprocessableEntity($errors);
                                    return;
                                }
                            }
                        } else {
                            $errors[] = 'could not fetch user detail';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                                return;
                            }
                        }
                    } else {
                        $errors[] = 'could not delete this data from the ' . EmailValidation . ' table';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                } else {
                    $errors[] = 'could not fetch user detail';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $checkEmailConditions = ['email' => $ProcessResetdata['email']];
                if ($this->gateway->checkEmailExistence($this->pdovar, RegTable, $checkEmailConditions)) {
                    $conditionsForFetch = ['email' => $ProcessResetdata['email']];
                    $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditionsForFetch);
                    if ($fetchUserDetailsWithEmail) {
                        $ProcessResetdata['resetToken'] = $this->gateway->generateRandomString(32);
                        $ProcessResetdata['currentTime'] = Date('Y-m-d h:i:s a', time());
                        $ProcessResetdata['userId'] = $fetchUserDetailsWithEmail['id'];
                        $emailverificationBindingArray = $this->gateway->generateRandomStrings($columns);
                        $insertNewDetails = $this->conn->insertData($this->pdovar, forgotPass, $columns, $emailverificationBindingArray, $ProcessResetdata);
                        if ($insertNewDetails) {
                            $fullname = $fetchUserDetailsWithEmail['firstName'] . ' ' . $fetchUserDetailsWithEmail['last_Name'];
                            $sendEmail = $this->mailsender->resetPasswordEMail($ProcessResetdata['email'], $fullname, $ProcessResetdata['resetToken'], $ProcessResetdata['userId']);
                            if ($sendEmail) {
                                $this->response->respondCreated('true');
                            } else {
                                $errors[] = 'could not send mail to user';
                                if (!empty($errors)) {
                                    $this->response->respondUnprocessableEntity($errors);
                                    return;
                                }
                            }
                        } else {
                            $errors[] = 'error inserting data into ' . forgotPass . '';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                                return;
                            }
                        }
                    } else {
                        $errors[] = 'could not fetch user detail';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                } else {
                    $errors[] = 'cannot process request email not found';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            }
        } else {
            $errors[] = 'could not create table' . forgotPass . ' table';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function checkSession($ProcessLogdata)
    {
        $conditionsForFetch = ['id' => $ProcessLogdata['sessionGetUserID']];
        $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditionsForFetch);
        if ($fetchUserDetailsWithEmail) {
            if (isset($_SESSION['UID'])) {
                return $this->response->respondCreated(['sessionStatus' => 'valid session', 'userDetails' => $fetchUserDetailsWithEmail, 'sitelink' => sitelink]);
            } else {
                $errors[] = 'invalid session login to continue';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $errors[] = 'invalid user session id';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function logoutUser()
    {
        if (isset($_SESSION['UID'])) {
            if (session_destroy()) {
                return $this->response->respondCreated('true');
            }
        }
    }

    public function fetchSiteDetails()
    {
        $f = [
            'sitelink' => sitelink,
            'siteaddress' => siteaddress,
            'sitenumber' => sitenumber,
            'sitename' => sitename,
            'sitemail' => sitemail,
        ];
        return $this->response->respondCreated($f);
    }

    public function test()
    {
        $fetchCat = $this->gateway->fetchAllData(register_bitcoin);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch user';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function fetchWallet()
    {
        $fetchCat = $this->gateway->fetchoneData(wallet);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch wallet';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function secondTest()
    {
        $fetchCat = $this->gateway->fetchAllData(transaction_bitcoin);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch details';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function ProcessLog($ProcessLogdata)
    {
        // var_dump($ProcessLogdata);
        if (empty($ProcessLogdata)) {
            $errors[] = 'empty fields detected';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
            exit;
        }
        $conditionsForFetch = ['email' => trim($ProcessLogdata['email'])];
        $fetchUserDetailsWithEmail = $this->gateway->fetchData(RegTable, $conditionsForFetch);
        if ($fetchUserDetailsWithEmail) {
            $hashedPassword = $fetchUserDetailsWithEmail['encryptedPassword'];

            $verifyPassword = password_verify(trim($ProcessLogdata['password']), $hashedPassword);
            if ($verifyPassword) {
                $whereColumnisEqualTo = ['True'];
                $columnsToUpdate = ['UserLogin'];
                $columnOfUpdateForUser = 'id';
                $userId = $fetchUserDetailsWithEmail['id'];
                $updateUserStatus = $this->conn->updateData($this->pdovar, RegTable, $columnsToUpdate, $whereColumnisEqualTo, $columnOfUpdateForUser, $userId);
                if ($updateUserStatus) {
                    $_SESSION['UID'] = $fetchUserDetailsWithEmail['id'];
                    return $this->response->respondCreated($fetchUserDetailsWithEmail);
                }
            } else {
                $errors[] = 'email or password is incorrect';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } else {
            $errors[] = 'this email is not registered';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
}
