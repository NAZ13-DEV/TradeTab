<?php

class DepositGateway
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
        $this->createDbTables = new CreateDbTables($pdoConnection);
        $this->mailsender = new EmailSender();
        $this->response = new JsonResponse();
        $this->gateway = new TaskGatewayFunction($pdoConnection);
        $this->encrypt = new Encrypt();
        $this->conn = new Database();
        $this->createDbTables = new CreateDbTables($pdoConnection);
    }

    public function sharePage($depositPagedata)
    {
        try {
            $depositColumnArray = ['amtValue', 'amount', 'transMethod', 'userid', 'Wallet', 'transId', 'userBalance', 'transStatus',  'noOfShares' ];
            $result = $this->createDbTables->createTable(Shares, $depositColumnArray);
            if ($result === true || $result === null) {
                $fetchUserWithIdcond = ['id' => $depositPagedata['sessionGetUserID']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $depositPagedata['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $depositPagedata['userBalance'] = $fetchUserWithId['userBalance'];
                $depositPagedata['transStatus'] = 'Pending';
                // $depositPagedata['dateOfTrans'] = date('d-m-Y h:i:s a', time());
                $depositPagedata['noOfShares'] = null;
                $depositBindingArray = $this->gateway->generateRandomStrings($depositPagedata);

                $inserted = $this->conn->insertData($this->pdovar, Shares, $depositColumnArray, $depositBindingArray, $depositPagedata);
                if ($inserted) {
                    $h = 'Deposit Initiated';
                    $c = 'Your deposit of '.$fetchUserWithId['currency'].''.$depositPagedata['cryptoAmt'].' has been received and is currently awaiting approval. you will be notified once the approval process is complete.';
                    $message = $this->gateway->createNotificationMessage($depositPagedata['sessionGetUserID'], $h, $c);
                    if ($message) {
                        // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                        // if ($sent === true) {
                        $fetchDepositWithIdcond = ['userid' => $depositPagedata['sessionGetUserID']];
                        $fetchDepositWithId = $this->gateway->fetchData(Shares, $fetchDepositWithIdcond);
                        $this->response->respondCreated(['message' => 'true', 'userId' => $fetchDepositWithId['id']]);
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
                $errors[] = 'The table ' . Shares . ' was not found in the database.';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } catch (\Throwable $e) {
            $errors[] = '' . $e->getMessage();
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function uploadproof($depositPagedata,  $file)
    {
        try {
            $depositColumnArray = ['userid','plan', 'picture','transId'];
            $result = $this->createDbTables->createTable(uploadproof, $depositColumnArray);
            if ($result === true || $result === null) {
                $img =  json_encode($this->gateway->processImageWithgivenNameFiles($file['documents']));
                $depositPagedata['plan'] =  $depositPagedata['plan'] ?? null;
                $depositPagedata['pics'] = $img;
                $depositPagedata['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                // $depositPagedata['dateOfTrans'] = date('d-m-Y h:i:s a', time());
                $depositBindingArray = $this->gateway->generateRandomStrings($depositPagedata);
                // var_dump($depositPagedata,$depositColumnArray);
                $inserted = $this->conn->insertData($this->pdovar, uploadproof, $depositColumnArray, $depositBindingArray, $depositPagedata);
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
                    } else {
                        $errors[] = 'could not insert message';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
                        }
                    }
            } else {
                $errors[] = 'The table ' . uploadproof . ' was not found in the database.';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } catch (\Throwable $e) {
            $errors[] = '' . $e->getMessage();
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function depositPage($depositPagedata)
    {
        try {
            $depositColumnArray = ['amtValue', 'amount', 'transMethod', 'userid', 'Wallet','createdAt', 'transId', 'balance', 'transStatus'];
            $result = $this->createDbTables->createTable(depositTable, $depositColumnArray);
            unset($depositPagedata['selectedPlan']);
            if ($result === true || $result === null) {
                $fetchUserWithIdcond = ['id' => $depositPagedata['sessionGetUserID']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $depositPagedata['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $depositPagedata['balance'] = $fetchUserWithId['balance'];
                $depositPagedata['transStatus'] = 'Pending';
                // $depositPagedata['dateOfTrans'] = date('d-m-Y h:i:s a', time());
                // $depositPagedata['dateOfTrans'] = date('d-m-Y h:i:s a', time());
                $depositBindingArray = $this->gateway->generateRandomStrings($depositPagedata);
                // var_dump($depositPagedata,$depositColumnArray);
                
                $inserted = $this->conn->insertData($this->pdovar, depositTable, $depositColumnArray, $depositBindingArray, $depositPagedata);
                if ($inserted) {
                    $h = 'Deposit initiated';
                    $c = 'Your deposit of '.$fetchUserWithId['currency'].''.$depositPagedata['cryptoAmt'].' has been received and is currently awaiting approval. you will be notified once the approval process is complete.';
                    $message = $this->gateway->createNotificationMessage($depositPagedata['sessionGetUserID'], $h, $c,$depositPagedata['createdAt']);
                    if ($message) {
                        // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                        // if ($sent === true) {
                        $fetchDepositWithIdcond = ['userid' => $depositPagedata['sessionGetUserID']];
                        $fetchDepositWithId = $this->gateway->fetchData(depositTable, $fetchDepositWithIdcond);
                        $this->response->respondCreated(['message' => 'true', 'userId' => $fetchDepositWithId['id']]);
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
                $errors[] = 'The table ' . depositTable . ' was not found in the database.';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } catch (\Throwable $e) {
            $errors[] = '' . $e->getMessage();
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function plandepositPage($plandepositPagedata)
    { 
        try {
            $depositColumnArray = ['cryptovalue', 'cryptoAmt', 'netWork', 'sessionGetUserID', 'companyWallet', 'selectedPlan', 'createdAt', 'transId', 'balance', 'transStatus'];
            $result = $this->createDbTables->createTable(usersPlan, $depositColumnArray);
            if ($result === true || $result === null) {
                $fetchUserWithIdcond = ['id' => $plandepositPagedata['sessionGetUserID']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $plandepositPagedata['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $plandepositPagedata['balance'] = $fetchUserWithId['balance'];
                $plandepositPagedata['transStatus'] = 'Pending';
                // $plandepositPagedata['dateOfTrans'] = date('d-m-Y h:i:s a', time());
                // var_dump($plandepositPagedata,$depositColumnArray);
                $depositBindingArray = $this->gateway->generateRandomStrings($plandepositPagedata);
                $inserted = $this->conn->insertData($this->pdovar, usersPlan, $depositColumnArray, $depositBindingArray, $plandepositPagedata);
                if ($inserted) {
                    $h = 'Subscription Deposit initiated';
                    $c = 'Your deposit of '.$fetchUserWithId['currency'].''.$plandepositPagedata['cryptoAmt'].' for the plan subscription '.$plandepositPagedata['selectedPlan'].' has been received and is currently awaiting approval. you will be notified once the approval process is complete.';
                    $message = $this->gateway->createNotificationMessage($plandepositPagedata['sessionGetUserID'], $h, $c, $plandepositPagedata['createdAt']);
                    if ($message) {
                        // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                        // if ($sent === true) {
                        $fetchDepositWithIdcond = ['sessionGetUserID' => $plandepositPagedata['sessionGetUserID']];
                        $fetchDepositWithId = $this->gateway->fetchData(usersPlan, $fetchDepositWithIdcond);
                        $this->response->respondCreated(['message' => 'true', 'userId' => $fetchDepositWithId['id']]);
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
                $errors[] = 'The table ' . depositTable . ' was not found in the database.';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            }
        } catch (\Throwable $e) {
            $errors[] = '' . $e->getMessage();
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }


    public function fetchUserPlanDepositAll($id)
    {
        if (!$id) {
            $this->response->respondNotFound($id);
            return;
        }

        $conditionsForFetch = ['userid' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchAllDataWithCOndition(usersPlan, $conditionsForFetch);

        if ($fetchDepositDetailsWithId) {
            return $this->response->respondCreated($fetchDepositDetailsWithId);
        } else {
            $errors[] = 'could not fetch any deposit, this user has made no deposit yet';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchcopiedtrade($id)
    {
        if (!$id) {
            $this->response->respondNotFound($id);
            return;
        }
    
        $conditionsForFetch = ['userId' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchAllDataWithCOndition(copytrade, $conditionsForFetch);
    
        if ($fetchDepositDetailsWithId) { 
            $uniqueData = array_unique($fetchDepositDetailsWithId, SORT_REGULAR);
    
            return $this->response->respondCreated($uniqueData);
        } else {
            $errors[] = 'could not fetch any copied trade';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    
    public function fetchUseShareAll($id)
    {
        if (!$id) {
            $this->response->respondNotFound($id);
            return;
        }

        $conditionsForFetch = ['userid' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchAllDataWithCOndition(Shares, $conditionsForFetch);

        if ($fetchDepositDetailsWithId) {
            return $this->response->respondCreated($fetchDepositDetailsWithId);
        } else {
            $errors[] = 'could not fetch any Shares, this user has made no Shares yet';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchUserTradeAll($id)
    {
        if (!$id) {
            $this->response->respondNotFound($id);
            return;
        }

        $conditionsForFetch = ['userid' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchAllDataWithCOndition(trade, $conditionsForFetch);

        if ($fetchDepositDetailsWithId) {
            return $this->response->respondCreated($fetchDepositDetailsWithId);
        } else {
            $errors[] = 'could not fetch any trade, this user has made no trade yet';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchUserDepositAll($id)
    {
        if (!$id) {
            $this->response->respondNotFound($id);
            return;
        }

        $conditionsForFetch = ['userid' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchAllDataWithCOndition(depositTable, $conditionsForFetch);

        if ($fetchDepositDetailsWithId) {
            return $this->response->respondCreated($fetchDepositDetailsWithId);
        } else {
            $errors[] = 'could not fetch any deposit, this user has made no deposit yet';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function fetchShareWithId($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(Shares, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch deposit status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchonesharesDetails($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(Shares, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch Share status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchUserProfitAll($id)
    {
        $conditionsForFetchingDeposit = ['userid' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchAllDataWithCOndition(ProfitTable, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            return $this->response->respondCreated($fetchDepositDetailsWithId);
        } else {
            $errors[] = 'could not fetch deposit status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function fetchonePlandepositrDetails($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(usersPlan, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch deposit status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function fetchOneDeposit($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(depositTable, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch deposit status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function checkSharesPage($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(Shares, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch deposit status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchUserActivity($id)
    {   $act = [];
        $conditionsForFetchingDeposit = ['userid' => $id];
        $activity = $this->gateway->fetchAllDataWithCOndition(messagenoti, $conditionsForFetchingDeposit);
        foreach ($activity as $value) {
            $act[] = $value;
        }
        $conditionsForFetchingUSer = ['id' => $id];
        $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
        return $this->response->respondCreated(['activity'=>$act, 'userDetails'=>$fetchUserDetails]);

    }
    public function fetchOneUserActivity($id)
    {   
        $conditionsForFetchingDeposit = ['id' => $id];
        $activity = $this->gateway->fetchData(messagenoti, $conditionsForFetchingDeposit);
        $conditionsForFetchingUSer = ['id' => $activity['userid']];
        $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
        return $this->response->respondCreated(['activity'=>$activity, 'userDetails'=>$fetchUserDetails]);

    }
    public function FetchproofUploadedLimit($id)
    { 
        $getId = explode(',', $id);
        $act = [];
        $conditionsForFetchingDeposit = ['userid' => $getId[0]];
        $activity = $this->gateway->fetchMultipleDataWithLimit(uploadproof, $conditionsForFetchingDeposit,  $getId[1]);
        // var_dump($activity);
        foreach ($activity as $value) {
            $act[] = $value;
        }
        $conditionsForFetchingUSer = ['id' => $id];
        $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
        return $this->response->respondCreated(['activity'=>$act, 'userDetails'=>$fetchUserDetails]);

    }
    public function fetchUserActivityLimit($id)
    {  
        $getId = explode(',', $id);
        $act = [];
        $conditionsForFetchingDeposit = ['userid' => $getId[0]];
        $activity = $this->gateway->fetchMultipleDataWithLimit(messagenoti, $conditionsForFetchingDeposit,  $getId[1]);
        foreach ($activity as $value) {
            $act[] = $value;
        }
        $conditionsForFetchingUSer = ['id' => $id];
        $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
        return $this->response->respondCreated(['activity'=>$act, 'userDetails'=>$fetchUserDetails]);

    }
    public function fetchPlanWithId($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(usersPlan, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['sessionGetUserID']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch plan';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchKycWithId($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(kyc, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch kyc ';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchKycWithuserId($id)
    {
        $conditionsForFetchingDeposit = ['userid' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(kyc, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch kyc ';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchCryptoWithdrawalWithId($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(cryptwithdrawalTable, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userId']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch deposit status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchBankWithdrawalWithId($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(bnkwithdrawalTable, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch deposit status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function fetchprofitLossWithId($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(ProfitTable, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch deposit status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function checkKyc($id)
    {
        $conditionsForFetchingDeposit = ['userid' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(kyc, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            return $this->response->respondCreated('true');
        } else {
            return $this->response->respondCreated('false');
        }
    }



    
    public function fetchAllHistory($id)
    {
        if (!$id) {
            $this->response->respondNotFound($id);
            return;
        }
    
        $conditionsForFetch = ['userid' => $id];
        $conditionsForFetchplan = ['sessionGetUserID' => $id];
        $conditionsForFetchcryp = ['userId' => $id];
        $data = [];
    
        // Fetch deposits
        $data['deposits'] = $this->gateway->fetchAllDataWithCOndition(depositTable, $conditionsForFetch);
    
        // Fetch profits
        $data['profits'] = $this->gateway->fetchAllDataWithCOndition(ProfitTable, $conditionsForFetch);
    
        // Fetch user's plan
        $data['userPlans'] = $this->gateway->fetchAllDataWithCOndition(usersPlan, $conditionsForFetchplan);
    
        // Fetch cryptocurrency withdrawals
        $data['cryptoWithdrawals'] = $this->gateway->fetchAllDataWithCOndition(cryptwithdrawalTable, $conditionsForFetchcryp);
    
        // Fetch bank withdrawals
        $data['bankWithdrawals'] = $this->gateway->fetchAllDataWithCOndition(bnkwithdrawalTable, $conditionsForFetch);
    
        if (!empty(array_filter($data))) {
            return $this->response->respondCreated($data);
        } else {
            $errors[] = 'No data found for the provided user ID.';
            $this->response->respondUnprocessableEntity($errors);
            return;
        }
    }
    

    public function checkPlanDepositPage($id)
    {
        $conditionsForFetchingDeposit = ['id' => $id];
        $fetchDepositDetailsWithId = $this->gateway->fetchData(usersPlan, $conditionsForFetchingDeposit);
        if ($fetchDepositDetailsWithId) {
            $conditionsForFetchingUSer = ['id' => $fetchDepositDetailsWithId['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $conditionsForFetchingUSer);
            return $this->response->respondCreated(['depositDetails' => $fetchDepositDetailsWithId, 'userDetails' => $fetchUserDetails]);
        } else {
            $errors[] = 'could not fetch deposit status';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

}
