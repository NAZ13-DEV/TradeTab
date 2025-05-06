<?php

class WithdrawalGateway
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

    public function swap(array $swap)
    {
        foreach ($swap as $key => $value) {
            $swap[$key] = trim($value);
        }
            $swapcolumn = ["fromvalue", "tovalue", "amount", "userId", "transId", "transStatus", "drfgfgh"];
            $result = $this->createDbTables->createTable(swap, $swapcolumn);
            if ($result === true || $result === null) {
                $swap['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $swap['transStatus'] = 'Pending';
                // $swap['dateOfTrans'] = date('d-m-Y h:i:s a', time());
                $swapBindingArray = $this->gateway->generateRandomStrings($swap);
           $idToBeFetched =  $swap['id'];
           $conditionsForuserFetch = ['id' => $idToBeFetched];
           $userFetchDetailsWithId = $this->gateway->fetchData(RegTable, $conditionsForuserFetch);
           $sfrom =  trim($swap['sfrom']);
           $amt =  trim($swap['amt']);
           $sto =  trim($swap['sto']);
$ecoList = ['Bitcoin', 'Etheruem', 'USDT', 'BitcoinCash', 'Doge', 'RIPPLE'];
$isEco = in_array($sfrom, $ecoList) && in_array($sto, $ecoList);

if ($isEco) {
    $sfrom = trim($swap['sfrom']);
    $amt = (float)trim($swap['amt']);
    $sto = trim($swap['sto']);
    
    $fromValue = (float)$userFetchDetailsWithId[$sfrom];
    $toValue = (float)$userFetchDetailsWithId[$sto];
    $fromValue -= $amt;
    $toValue += $amt;
    // var_dump($fromValue, $toValue);
    $columnToBeUpdate  = [$sfrom,$sto];
    $dataToUpdateUser = [$fromValue, $toValue];
    $updateReference = 'id';
    $transIdd = $idToBeFetched;
    $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $transIdd);
    if ($updated) {
             $inserted = $this->conn->insertData($this->pdovar, swap, $swapcolumn, $swapBindingArray, $swap);
        if ($inserted) {
        // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
        // if ($sent === true) {
        $this->response->respondCreated('true');
        // } else {
        //     $errors[] = 'could not send mail to user';
        //     if (!empty($errors)) {
        //         $this->response->respondUnprocessableEntity($errors);
        //         return;
        //     }
        // }
        // }
        } else {
        $errors[] = 'could not insert message';
        if (!empty($errors)) {
        $this->response->respondUnprocessableEntity($errors);
        return;
        }
        }
        }
} else {
   echo 'false';
}

$fromValue = $userFetchDetailsWithId[$sfrom];
$toValue = (float)$userFetchDetailsWithId[$sto];
 

  
            } else {
                $errors[] = "The table " . cryptwithdrawalTable . " was not found in the database.";
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
    public function copyTrade(array $swap)
    {
        foreach ($swap as $key => $value) {
            $swap[$key] = trim($value);
        }
            $swapcolumn = ["traderName", "winRate", "abbr", "userId", "transId", "transStatus"];
            $result = $this->createDbTables->createTable(copytrade, $swapcolumn);
            if ($result === true || $result === null) {
                $swap['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $swap['transStatus'] = 'approved';
                // $swap['dateOfTrans'] = date('d-m-Y h:i:s a', time());
                $swapBindingArray = $this->gateway->generateRandomStrings($swap);
             $inserted = $this->conn->insertData($this->pdovar, copytrade, $swapcolumn, $swapBindingArray, $swap);
        if ($inserted) {
        // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
        // if ($sent === true) {
        $this->response->respondCreated('true');
        // } else {
        //     $errors[] = 'could not send mail to user';
        //     if (!empty($errors)) {
        //         $this->response->respondUnprocessableEntity($errors);
        //         return;
        //     }
        // }
        // }
        } else {
        $errors[] = 'could not insert message';
        if (!empty($errors)) {
        $this->response->respondUnprocessableEntity($errors);
        return;
        }
 

    }
            } else {
                $errors[] = "The table " . cryptwithdrawalTable . " was not found in the database.";
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
    public function CryptoWithdrawal(array $CryptoWithdrawaldata)
    {
        // try {
            $CryptoWithdrawalcolumn = ["userId", "payment_mode", "amount", "wallet", "transId", "transStatus"];
            $result = $this->createDbTables->createTable(cryptwithdrawalTable, $CryptoWithdrawalcolumn);
            if ($result === true || $result === null) {
                $CryptoWithdrawaldata['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $CryptoWithdrawaldata['transStatus'] = 'Pending';
                // $CryptoWithdrawaldata['dateOfTrans'] = date('d-m-Y h:i:s a', time());
                $depositBindingArray = $this->gateway->generateRandomStrings($CryptoWithdrawaldata);


                // var_dump( $CryptoWithdrawaldata, $CryptoWithdrawalcolumn);
                $inserted = $this->conn->insertData($this->pdovar, cryptwithdrawalTable, $CryptoWithdrawalcolumn, $depositBindingArray, $CryptoWithdrawaldata);
                if ($inserted) {
                    $h = 'Crypto Withdrawal Confirmation';
                    $c = 'You just withdrew '.$CryptoWithdrawaldata['amount'].' from your account, using '.$CryptoWithdrawaldata['payment_mode'].' to this wallet '.$CryptoWithdrawaldata['wallet'].' your transaction is awaiting approval.';
                    $message = $this->gateway->createNotificationMessage($CryptoWithdrawaldata['userId'], $h, $c);
                    if ($message) {
                        // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                        // if ($sent === true) {
                            $this->response->respondCreated('true');
                            // } else {
                                //     $errors[] = 'could not send mail to user';
                                //     if (!empty($errors)) {
                                    //         $this->response->respondUnprocessableEntity($errors);
                                    //         return;
                                    //     }
                                    // }
                                    // }
                                } else {
                                                     $errors[] = 'could not insert message';
                                                     if (!empty($errors)) {
                                                         $this->response->respondUnprocessableEntity($errors);
                                                         return;
                                                     }
                                                 }
                } else {
                    $errors[] = 'could not insert value into this table';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = "The table " . cryptwithdrawalTable . " was not found in the database.";
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
    public function fetchoneWithdrawal($id)
    {

        if (!$id) {
            $this->response->respondNotFound($id);
            return;
        }
        preg_match('/([a-zA-Z]+)(\d+)/', $id, $matches);
 
$withdrawalType = $matches[1];  
$theID = $matches[2];
        $theId = substr($id, -2);
        $conditionsForCryptoWithdrawalFetch = ['id' => $theId];
        $conditionsForBankWithdrawalFetch = ['id' => $id];

        if ($withdrawalType == "crypto") {
            $fetchCryptoWithdrawalDetailsWithId = $this->gateway->fetchData(cryptwithdrawalTable, $conditionsForCryptoWithdrawalFetch);
            if ($fetchCryptoWithdrawalDetailsWithId) {
                $conditionsForuserFetch = ['id' => $fetchCryptoWithdrawalDetailsWithId['userid']];
                $userFetchDetailsWithId = $this->gateway->fetchData(RegTable, $conditionsForuserFetch);
                if ($userFetchDetailsWithId) {
                    return $this->response->respondCreated(['crypto' => $fetchCryptoWithdrawalDetailsWithId, 'userDetails' => (array)$userFetchDetailsWithId]);
                } else {
                    $errors[] = 'could not fetch any user details, this user does not exist';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'could not fetch any withdrawal, this user has made no withdrawal yet';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }

        }

        if ($withdrawalType == "bank") {
            $fetchCryptoWithdrawalDetailsWithId = $this->gateway->fetchData(bnkwithdrawalTable, $conditionsForCryptoWithdrawalFetch);
            if ($fetchCryptoWithdrawalDetailsWithId) {
                $conditionsForuserFetch = ['id' => $fetchCryptoWithdrawalDetailsWithId['userid']];
                $userFetchDetailsWithId = $this->gateway->fetchData(RegTable, $conditionsForuserFetch);
                if ($userFetchDetailsWithId) {
                    return $this->response->respondCreated(['bank' => $fetchCryptoWithdrawalDetailsWithId, 'userDetails' => (array)$userFetchDetailsWithId]);
                } else {
                    $errors[] = 'could not fetch any user details, this user does not exist';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'could not fetch any withdrawal, this user has made no withdrawal yet';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }

        }

    }
    public function fetchUserWithdrawalAll(string $id)
    {
        if (!$id) {
            $this->response->respondNotFound($id);
            return;
        }
        $conditionsForCryptoWithdrawalFetch = ['userid' => $id];
        $conditionsForBankWithdrawalFetch = ['userid' => $id];
        $conditionsForuserFetch = ['id' => $id];
        $fetchCryptoWithdrawalDetailsWithId = $this->gateway->fetchAllDataWithCOndition(cryptwithdrawalTable, $conditionsForCryptoWithdrawalFetch);
            $fetchBankWithdrawalDetailsWithId = $this->gateway->fetchAllDataWithCOndition(bnkwithdrawalTable, $conditionsForBankWithdrawalFetch);
                $userFetchDetailsWithId = $this->gateway->fetchAllDataWithCOndition(RegTable, $conditionsForuserFetch);
                if ($userFetchDetailsWithId) {
                    return $this->response->respondCreated(['crypto' => $fetchCryptoWithdrawalDetailsWithId, 'bank' => $fetchBankWithdrawalDetailsWithId,'userDetails' => (array)$userFetchDetailsWithId]);
                } else {
                    $errors[] = 'could not fetch any user details, this user does not exist';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
    }
    public function bankWithdrawal(array $bankWithdrawaldata)
    {
        // var_dump($bankWithdrawaldata);
            $withdrawalColumnArray = ["userid", "payment_mode","amount","bankName","accNum", "accName", "country",  "swiftcode","narration", "transId", "transStatus", "dateOfTrans"];
            $result = $this->createDbTables->createTable(
                bnkwithdrawalTable,
                $withdrawalColumnArray
            );
            if ($result === true || $result === null) {
                $bankWithdrawaldata['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $bankWithdrawaldata['transStatus'] = 'Pending';
                $bankWithdrawaldata['dateOfTrans'] = date('Y-m-d H:i:s');
                $depositBindingArray = $this->gateway->generateRandomStrings($bankWithdrawaldata);
            // var_dump($bankWithdrawaldata,  $withdrawalColumnArray);

                $inserted = $this->conn->insertData(
                    $this->pdovar,
                    bnkwithdrawalTable,
                    $withdrawalColumnArray,
                    $depositBindingArray,
                    $bankWithdrawaldata
                );
                $conditionsForuserFetch = ['id' => $bankWithdrawaldata['userId']];
                $userFetchDetailsWithId = $this->gateway->fetchAllDataWithCOndition(RegTable, $conditionsForuserFetch);
                if ($userFetchDetailsWithId) {
                    if ($inserted) {
                            // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                            // if ($sent === true) {
                            $this->response->respondCreated('true');
                            // } else {
                            //     $errors[] = 'could not send mail to user';
                            //     if (!empty($errors)) {
                            //         $this->response->respondUnprocessableEntity($errors);
                            //         return;
                            //     }
                            // }
                            // }
                
                    } else {
                        $errors[] = 'could not insert value into this table';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
                } else {
                    $errors[] = 'could not fetch user ';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }


            } else {
                $errors[] = "The table " . bnkwithdrawalTable
                    . " was not found in the database.";
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }

            }

    
    }



}
