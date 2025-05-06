<?php

class AdminGateway
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
        $this->mailsender = new EmailSender();
        $this->response = new JsonResponse();
        $this->gateway = new TaskGatewayFunction($pdoConnection);
        $this->conn = new Database();
        $this->createDbTables = new CreateDbTables($pdoConnection);
    }

    public function adminRegisterUser(array $data)
    {
        // var_dump($data);
        $columns = [
            "email" => "VARCHAR(200)  NULL DEFAULT NULL",
            "password" => "VARCHAR(20)  NULL DEFAULT NULL",
            "encryptedPasswod" => "VARCHAR(90)  NULL DEFAULT NULL",
        ];

        $data["encryptedPassword"] = password_hash(trim($data['password']), PASSWORD_DEFAULT);
        $conditions = ['email' => $data["email"]];
        $result = $this->createDbTables->createTableWithTypes(admintable, $columns);
        if ($result === true || $result === null) {
            if ($this->gateway->checkEmailExistence($this->pdovar, admintable, $conditions)) {
                $errors[] = "This email already exists. try another.";
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                    return;
                }
            } else {
                $bindingArray = $this->gateway->generateRandomStrings($data);
                $connecter = $this->pdovar;
                $udata = array_map('strval', $data);
                $udata = array_map(function ($value) {
                    return trim($value);
                }, $udata);
                $id = $this->gateway->createForUserWithTypes($connecter, admintable, $columns, $bindingArray, $udata);
                if ($id) {
                    $this->response->respondCreated('account has been created sucessfully');
                } else {
                    $errors[] = "could not register user";
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }

                }
            }
        } else {
            $errors[] = "The table " . admintable . " was not found in the database.";
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }

        }



    }


    // public function AdminLogin($data)
    // {
    //     // var_dump($data);
    //     $adminMail = $data['email'];
    //     $adminPassword = trim($data['password']);
    //     $conditions = ['email' => $adminMail];
    //     $fetchAdmin =  $this->gateway->fetchData(admintable, $conditions);
    //     if ($fetchAdmin) {
    //         $password = $fetchAdmin['encryptedPasswod'];
    //         if (password_verify($adminPassword,  $password)) {
    //             $_SESSION['AdminSession'] = $fetchAdmin['id'];
    //             $response = ["message" => "your account has been logged in successful"];
    //             $this->response->respondCreated(array_merge(['id' => $fetchAdmin['id']], $response));
    //         } else {
    //             $errors[] = 'incorrect password try again';
    //             if (!empty($errors)) {
    //                 $this->response->respondUnprocessableEntity($errors);
    //             }
    //         }
    //     } else {
    //         $errors[] = 'email address is wrong try again with a correct enail';
    //         if (!empty($errors)) {
    //             $this->response->respondUnprocessableEntity($errors);
    //         }
    //     }
    // }

    public function AdminLogin($data)
    {
        $data = $_POST;
        $adminMail = $data['email'];
        $adminPassword = $data['password'];
        $conditions = ['adminMal' => $adminMail];
        $fetchAdmin = $this->gateway->fetchData(admintable, $conditions);
        if ($fetchAdmin) {
            $password = $fetchAdmin['Password'];
            if ($adminPassword === $password) {
                $_SESSION['AdminSession'] = $fetchAdmin['id'];
                $response = ["message" => "your account has been logged in successful"];
                $this->response->respondCreated(array_merge(['id' => $fetchAdmin['id']], $response));
            } else {
                $errors[] = 'incorrect password try again';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }
        } else {
            $errors[] = 'email address is wrong try again with a correct enail';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function FetchAllKyc()
    {
        $fetchCat = $this->gateway->fetchAllData(kyc);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch deposit';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function FetchAllPlan()
    {
        $fetchCat = $this->gateway->fetchAllData(usersPlan);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch deposit';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function ViewuploadProof()
    {
        $fetchCat = $this->gateway->fetchAllData(uploadproof);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch upload proof';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function FetchAllDeposit()
    {
        $fetchCat = $this->gateway->fetchAllData(depositTable);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch deposit';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function FetchAllShare()
    {
        $fetchCat = $this->gateway->fetchAllData(Shares);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch deposit';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function Viewuploadkyc()
    {
        $fetchCat = $this->gateway->fetchAllData(kyc);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch upload kyc';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function FetchAllTrade()
    {
        $fetchCat = $this->gateway->fetchAllData(trade);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch trade';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function fetchAdminDetails()
    {
        $fetchCat = $this->gateway->fetchoneData(admintable);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch Admin details';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function fetchUserProfitLoss($id)
    {
        $conditionsForproLossFetch = ['userid' => $id];
        $conditionsForuserFetch = ['id' => $id];
        $fetchCat = $this->gateway->fetchAllDataWithCOndition(ProfitTable, $conditionsForproLossFetch);
        $fetchuser = $this->gateway->fetchData(RegTable, $conditionsForuserFetch);

        $this->response->respondCreated(['details' => $fetchCat, 'user' => $fetchuser]);

    }
    public function fetchoneprofitloss($id)
    {
        $conditionsForproLossFetch = ['id' => $id];
        $fetchCat = $this->gateway->fetchData(ProfitTable, $conditionsForproLossFetch);
        $conditionsForuserFetch = ['id' => $fetchCat['userid']];
        $fetchuser = $this->gateway->fetchData(RegTable, $conditionsForuserFetch);
        if ($fetchCat) {
            $this->response->respondCreated(['details' => $fetchCat, 'user' => $fetchuser]);
        } else {
            $errors[] = 'could not fetch profit loss';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function FetchAllprofitLoss()
    {
        $fetchCat = $this->gateway->fetchAllData(ProfitTable);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch profit loss';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function FetchAllBankWithdrawal()
    {
        $fetchCat = $this->gateway->fetchAllData(bnkwithdrawalTable);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch Bank withdrawal';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function FetchAllCryptoWithdrawal()
    {
        $fetchCat = $this->gateway->fetchAllData(cryptwithdrawalTable);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch Crypto withdrawal';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function ctraders()
    {
        $fetchCat = $this->gateway->fetchAllData(thecopytraders);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch traders';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function wallet()
    {
        $fetchCat = $this->gateway->fetchAllData(wallet);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch wallet';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function AdminFetchUser()
    {
        $fetchCat = $this->gateway->fetchAllData(RegTable);
        if ($fetchCat) {
            $this->response->respondCreated($fetchCat);
        } else {
            $errors[] = 'could not fetch user';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function AdminFetchSingleUser($id)
    {
        $conditions = ['id' => $id];
        $fetchProduct = $this->gateway->fetchData(RegTable, $conditions);
        if ($fetchProduct) {
            $this->response->respondCreated($fetchProduct);
        } else {
            $errors[] = 'could not fetch this user details ';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function AdminMakeLosstrade($data)
    {
        try {
            $tradeid = $data['tradeidForLoss'];
            unset($data['tradeidForLoss']);
            $depositColumnArray = ['amount', 'userid', 'transId', 'balance', 'transStatus',  'type'];
            $result = $this->createDbTables->createTable(ProfitTable, $depositColumnArray);
            if ($result === true || $result === null) {
                $fetchUserWithIdcond = ['id' => $data['userIdForLoss']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $fetchTradeWithId = $this->gateway->getUserIdFromUserTable(trade, $tradeid);
                $data['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $data['balance'] = (float) $fetchUserWithId['balance'] + (float) $data['AmountnForLoss'];
                $data['transStatus'] = 'Approved';
                
                $data['type'] = 'Loss';
                $depositBindingArray = $this->gateway->generateRandomStrings($data);
                $inserted = $this->conn->insertData($this->pdovar, ProfitTable, $depositColumnArray, $depositBindingArray, $data);
                if ($inserted) {
                    $newBalance = (float) $fetchUserWithId['balance'] + (float) $fetchTradeWithId['amount'] - (float) $data['AmountnForLoss'];
                    $newDeposit = (float) $fetchUserWithId['total_depo'] + (float) $fetchTradeWithId['amount'];
                    $newprofit = (float) $fetchUserWithId['total_pro'] - (float) $data['AmountnForLoss'];
                    $updateColoumn = ['balance', 'total_depo', 'total_pro'];
                    $updateData = [$newBalance, $newDeposit, $newprofit];
                    $whereColumn = 'id';
                    $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $data['userIdForLoss']);
                    if ($updated) {
                        $updateColoumnTrade = ['amt_earned'];
                        $updateDataTrade = [$data['AmountnForLoss']];
                        $updatedtrade = $this->conn->updateData($this->pdovar, trade, $updateColoumnTrade, $updateDataTrade, $whereColumn, $tradeid);
                        if ($updatedtrade) {
                            $h = 'You Just Had A Trade Loss';
                            $c = 'We regret to inform you that you recievied a loss of ' . $fetchUserWithId['currency'] . '' . $data['AmountnForLoss'];
                            $message = $this->gateway->createNotificationMessage($data['userIdForLoss'], $h, $c);
                            if ($message) {
                                // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                                // if ($sent === true) {
                                $fetchDepositWithIdcond = ['userid' => $data['userIdForLoss']];
                                $fetchDepositWithId = $this->gateway->fetchData(ProfitTable, $fetchDepositWithIdcond);
                                $this->response->respondCreated(['message' => 'true']);
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
                            $errors[] = 'error could not update trade balance';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                            }
                        }
                    } else {
                        $errors[] = 'error could not update user balance';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
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
    public function AdminMakeLoss($data)
    {
        try {
            $depositColumnArray = ['amount', 'userid', 'transId', 'balance', 'transStatus',  'type'];
            $result = $this->createDbTables->createTable(ProfitTable, $depositColumnArray);
            if ($result === true || $result === null) {
                $fetchUserWithIdcond = ['id' => $data['userIdForLoss']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $data['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $data['balance'] = (float) $fetchUserWithId['balance'] + (float) $data['AmountnForLoss'];
                $data['transStatus'] = 'Approved';
                
                $data['type'] = 'Loss';
                $depositBindingArray = $this->gateway->generateRandomStrings($data);
                $inserted = $this->conn->insertData($this->pdovar, ProfitTable, $depositColumnArray, $depositBindingArray, $data);
                if ($inserted) {
                    $newBalance = (float) $fetchUserWithId['balance'] - (float) $data['AmountnForLoss'];
                    $updateColoumn = ['balance'];
                    $updateData = [$newBalance];
                    $whereColumn = 'id';
                    $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $data['userIdForLoss']);
                    if ($updated) {
                        $h = 'You Just Had a Trade Loss';
                        $c = 'We regret to inform you that you recievied a loss of ' . $fetchUserWithId['currency'] . '' . $data['AmountnForLoss'];
                        $message = $this->gateway->createNotificationMessage($data['userIdForLoss'], $h, $c);
                        if ($message) {
                            // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                            // if ($sent === true) {
                            $fetchDepositWithIdcond = ['userid' => $data['userIdForLoss']];
                            $fetchDepositWithId = $this->gateway->fetchData(ProfitTable, $fetchDepositWithIdcond);
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
                        $errors[] = 'error could not update user balance';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
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
    public function AdminMakeShares($data)
    {
        try {
            $columns = ['SharesAmount', 'SharePer'];
            $result = $this->createDbTables->createTable(RegTable, $columns);
            if ($result === true || $result === null) {
                $fetchUserWithIdcond = ['id' => $data['userproIdll']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $userSharesAmount = (float) $fetchUserWithId['SharesAmount'] + (float) $data['Amountnll'];
                $userSharePer = (float) $fetchUserWithId['SharePer'] + (float) $data['AmountPer'];
                $updateData = [$userSharesAmount, $userSharePer];
                $whereColumn = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columns, $updateData, $whereColumn, $data['userproIdll']);
                if ($updated) {
                    // $h = 'You Just Made a Deposit';
                    // $c = 'Congratulations! Your deposit of '.$fetchUserWithId['currency'].''.$data['Amount'].' has been successfully processed and credited to your account With a Method Of '.$data['symbol'].' worth '.$data['bitcoinFraction'].'.';
                    // $message = $this->gateway->createNotificationMessage($data['userId'], $h, $c);
                    // if ($message) {
                    // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                    // if ($sent === true) {
                    // $fetchDepositWithIdcond = ['userid' => $data['userproIdll']];
                    // $fetchDepositWithId = $this->gateway->fetchData(Shares, $fetchDepositWithIdcond);
                    // var_dump($fetchDepositWithIdcond);
                    $this->response->respondCreated(['message' => 'true']);
                    // } else {
                    //     $errors[] = 'could not send mail to user';
                    //     if (!empty($errors)) {
                    //         $this->response->respondUnprocessableEntity($errors);
                    //         return;
                    //     }
                    // }
                    // } else {
                    //     $errors[] = 'could not insert message';
                    //     if (!empty($errors)) {
                    //         $this->response->respondUnprocessableEntity($errors);
                    //         return;
                    //     }
                    // }
                } else {
                    $errors[] = 'error could not update user balance';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
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
    // public function AdminMakeRoiShares($data)
    // {
    //     try {
    //         $columns = ['SharesRoiAmount', 'CronJob'];
    //         $result = $this->createDbTables->createTable(RegTable, $columns);
    //         if ($result === true || $result === null) {
    //             $fetchUserWithIdcond = ['id' => $data['userRoi']];
    //             $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
    //             $userSharesAmount = (float) $fetchUserWithId['SharesRoiAmount'] + (float) $data['AmountRoi'];
    //             $updateData = [$userSharesAmount, null];
    //             $whereColumn = 'id';
    //             $updated = $this->conn->updateData($this->pdovar, RegTable, $columns, $updateData, $whereColumn, $data['userRoi']);
    //             if ($updated) {
    //                 // $h = 'You Just Made a Deposit';
    //                 // $c = 'Congratulations! Your deposit of '.$fetchUserWithId['currency'].''.$data['Amount'].' has been successfully processed and credited to your account With a Method Of '.$data['symbol'].' worth '.$data['bitcoinFraction'].'.';
    //                 // $message = $this->gateway->createNotificationMessage($data['userId'], $h, $c);
    //                 // if ($message) {
    //                 // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
    //                 // if ($sent === true) {
    //                 // $fetchDepositWithIdcond = ['userid' => $data['userproIdll']];
    //                 // $fetchDepositWithId = $this->gateway->fetchData(Shares, $fetchDepositWithIdcond);
    //                 // var_dump($fetchDepositWithIdcond);
    //                 $this->response->respondCreated(['message' => 'true']);
    //                 // } else {
    //                 //     $errors[] = 'could not send mail to user';
    //                 //     if (!empty($errors)) {
    //                 //         $this->response->respondUnprocessableEntity($errors);
    //                 //         return;
    //                 //     }
    //                 // }
    //                 // } else {
    //                 //     $errors[] = 'could not insert message';
    //                 //     if (!empty($errors)) {
    //                 //         $this->response->respondUnprocessableEntity($errors);
    //                 //         return;
    //                 //     }
    //                 // }
    //             } else {
    //                 $errors[] = 'error could not update user balance';
    //                 if (!empty($errors)) {
    //                     $this->response->respondUnprocessableEntity($errors);
    //                 }
    //             }



    //         } else {
    //             $errors[] = 'The table ' . depositTable . ' was not found in the database.';
    //             if (!empty($errors)) {
    //                 $this->response->respondUnprocessableEntity($errors);
    //                 return;
    //             }
    //         }
    //     } catch (\Throwable $e) {
    //         $errors[] = '' . $e->getMessage();
    //         if (!empty($errors)) {
    //             $this->response->respondUnprocessableEntity($errors);
    //             return;
    //         }
    //     }
    // }
    public function submitTrader($data)
    {
        try {
            $thecopytradersColumnArray = ['traderName', 'traderNameAbb', 'winRate'];
            $result = $this->createDbTables->createTable(thecopytraders, $thecopytradersColumnArray);
            if ($result === true || $result === null) {
                $thecopytradersBindingArray = $this->gateway->generateRandomStrings($data);
                $inserted = $this->conn->insertData($this->pdovar, thecopytraders, $thecopytradersColumnArray, $thecopytradersBindingArray, $data);
                if ($inserted) {
                    // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                    // if ($sent === true) {
                    $this->response->respondCreated('trader has been added successfully');
                    // } else {
                    //     $errors[] = 'could not send mail to user';
                    //     if (!empty($errors)) {
                    //         $this->response->respondUnprocessableEntity($errors);
                    //         return;
                    //     }
                    // }
                } else {
                    $errors[] = 'could not create this table';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'The table ' . thecopytraders . ' was not found in the database.';
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
    public function submitWallet($data)
    {
        try {
            $walletColumnArray = ['bitcoin', 'ethereum', 'tether'];
            $result = $this->createDbTables->createTable(wallet, $walletColumnArray);
            if ($result === true || $result === null) {

                $walletBindingArray = $this->gateway->generateRandomStrings($data);
                $inserted = $this->conn->insertData($this->pdovar, wallet, $walletColumnArray, $walletBindingArray, $data);
                if ($inserted) {
                    // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                    // if ($sent === true) {
                    $this->response->respondCreated('Wallet has been uploaded successfully');
                    // } else {
                    //     $errors[] = 'could not send mail to user';
                    //     if (!empty($errors)) {
                    //         $this->response->respondUnprocessableEntity($errors);
                    //         return;
                    //     }
                    // }
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
        } catch (\Throwable $e) {
            $errors[] = '' . $e->getMessage();
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function AdminMakeProfit($data)
    {
        try {
            $depositColumnArray = ['amount', 'userid', 'transId', 'balance', 'transStatus',  'type'];
            $result = $this->createDbTables->createTable(ProfitTable, $depositColumnArray);
            if ($result === true || $result === null) {
                $fetchUserWithIdcond = ['id' => $data['userproId']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $data['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $data['balance'] = (float) $fetchUserWithId['balance'] + (float) $data['Amountn'];
                $data['transStatus'] = 'Approved';
                
                $data['type'] = 'Profit';
                $depositBindingArray = $this->gateway->generateRandomStrings($data);
                $inserted = $this->conn->insertData($this->pdovar, ProfitTable, $depositColumnArray, $depositBindingArray, $data);
                if ($inserted) {
                    $newBalance = (float) $fetchUserWithId['balance'] + (float) $data['Amountn'];
                    $newuserProfit = (float) $fetchUserWithId['total_pro'] + (float) $data['Amountn'];
                    $updateColoumn = ['balance', 'total_pro'];
                    $updateData = [$newBalance, $newuserProfit];
                    $whereColumn = 'id';
                    $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $data['userproId']);
                    if ($updated) {
                        $h = 'Congratulations On Your Trade Profit!';
                        $c = 'We are pleased to inform you that you gained a profit of ' . $fetchUserWithId['currency'] . '' . $data['Amountn'] . '.';
                        $message = $this->gateway->createNotificationMessage($data['userproId'], $h, $c);
                        if ($message) {
                            // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                            // if ($sent === true) {
                            $fetchDepositWithIdcond = ['userid' => $data['userproId']];
                            $fetchDepositWithId = $this->gateway->fetchData(ProfitTable, $fetchDepositWithIdcond);
                            $this->response->respondCreated(['message' => 'true']);
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
                        $errors[] = 'error could not update user balance';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
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
    public function regBuy($data)
    {
        try {

            $TradeColumnArray = ['bvolamount', 'btype', 'ordertype', 'bsymbol', 'IntervalLL', 'LeverageEE', 'bsl', 'btp', 'userid', 'transId', 'transStatus',  'outcome'];
            $result = $this->createDbTables->createTable(trade, $TradeColumnArray);
            if ($result === true || $result === null) {
                $data['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $data['transStatus'] = 'Pending';
                
                $data['outcome'] = NULL;
                $TradeBindingArray = $this->gateway->generateRandomStrings($data);
                $fetchUserWithIdcond = ['id' => $data['id']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $newBalance = (float) $fetchUserWithId['balance'] - (float) $data['bvolamount'];

                if ($newBalance <= 0) {
                    $errors[] = 'an error occurred reinitiate trade again ';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
                $updateColoumn = ['balance'];
                $updateData = [$newBalance];
                $whereColumn = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $data['id']);
                if ($updated) {
                    $inserted = $this->conn->insertData($this->pdovar, trade, $TradeColumnArray, $TradeBindingArray, $data);
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
                        $errors[] = 'could not create this table';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
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
        } catch (\Throwable $e) {
            $errors[] = '' . $e->getMessage();
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function regSell($data)
    {
        try {

            $TradeColumnArray = ['bvolamount', 'btype', 'ordertype', 'bsymbol', 'IntervalLL', 'LeverageEE', 'bsl', 'btp', 'userid', 'transId', 'transStatus',  'outcome'];
            $result = $this->createDbTables->createTable(trade, $TradeColumnArray);
            if ($result === true || $result === null) {
                $data['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $data['transStatus'] = 'Pending';
                
                $data['outcome'] = NULL;
                $TradeBindingArray = $this->gateway->generateRandomStrings($data);
                $fetchUserWithIdcond = ['id' => $data['id']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $newBalance = (float) $fetchUserWithId['balance'] - (float) $data['bvolamount'];

                if ($newBalance <= 0) {
                    $errors[] = 'an error occurred reinitiate trade again ';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
                $updateColoumn = ['balance'];
                $updateData = [$newBalance];
                $whereColumn = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $data['id']);
                if ($updated) {
                    $inserted = $this->conn->insertData($this->pdovar, trade, $TradeColumnArray, $TradeBindingArray, $data);
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
                        $errors[] = 'could not create this table';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
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
        } catch (\Throwable $e) {
            $errors[] = '' . $e->getMessage();
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function AdminMakeProfittrade($data)
    {
        // try {
        // var_dump($data);
        $tradeid = $data['tradeproId'];
        unset($data['tradeproId']);
        $depositColumnArray = ['amount', 'userid', 'transId', 'balance', 'transStatus',  'type'];
        $result = $this->createDbTables->createTable(ProfitTable, $depositColumnArray);
        if ($result === true || $result === null) {
            $fetchUserWithIdcond = ['id' => $data['userproId']];
            $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
            $fetchTradeWithId = $this->gateway->getUserIdFromUserTable(trade, $tradeid);
            // var_dump($fetchUserWithId);
            $data['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
            $data['balance'] = (float) $fetchUserWithId['balance'] + (float) $data['Amountn'];
            $data['transStatus'] = 'Approved';
            
            $data['type'] = 'Profit';
            $depositBindingArray = $this->gateway->generateRandomStrings($data);
            $inserted = $this->conn->insertData($this->pdovar, ProfitTable, $depositColumnArray, $depositBindingArray, $data);
            if ($inserted) {
                $newBalance = (float) $fetchUserWithId['balance'] + (float) $data['Amountn'] + (float) $fetchTradeWithId['amount'];
                $newDeposit = (float) $fetchUserWithId['total_depo'] + (float) $fetchTradeWithId['amount'];
                $newuserProfit = (float) $fetchUserWithId['total_pro'] + (float) $data['Amountn'];
                $updateColoumn = ['balance', 'total_depo', 'total_pro'];
                $updateData = [$newBalance, $newDeposit, $newuserProfit];
                $whereColumn = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $data['userproId']);
                if ($updated) {
                    $updateColoumnTrade = ['amt_earned'];
                    $updateDataTrade = [$data['Amountn']];
                    $updatedtrade = $this->conn->updateData($this->pdovar, trade, $updateColoumnTrade, $updateDataTrade, $whereColumn, $tradeid);
                    if ($updatedtrade) {
                        $h = 'Congratulations On Your Trade Profit!';
                        $c = 'We are pleased to inform you that you gained a profit of ' . $fetchUserWithId['currency'] . '' . $data['Amountn'] . '.';
                        $message = $this->gateway->createNotificationMessage($data['userproId'], $h, $c);
                        if ($message) {
                            // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                            // if ($sent === true) {
                            $fetchDepositWithIdcond = ['userid' => $data['userproId']];
                            $fetchDepositWithId = $this->gateway->fetchData(ProfitTable, $fetchDepositWithIdcond);
                            $this->response->respondCreated(['message' => 'true']);
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
                        $errors[] = 'error could not update trade balance';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }


                } else {
                    $errors[] = 'error could not update user balance';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
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
        // } catch (\Throwable $e) {
        //     $errors[] = '' . $e->getMessage();
        //     if (!empty($errors)) {
        //         $this->response->respondUnprocessableEntity($errors);
        //         return;
        //     }
        // }
    }
    public function AdminMakeDeposit($data)
    {
        // var_dump( $data);

        try {
            $depositColumnArray = ['amtValue', 'amount', 'transMethod', 'userid', 'Wallet', 'transId', 'balance', 'transStatus'];
            $result = $this->createDbTables->createTable(depositTable, $depositColumnArray);
            if ($result === true || $result === null) {
                $fetchUserWithIdcond = ['id' => $data['userid']];
                $fetchUserWithId = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);
                $data['transId'] = $this->gateway->genRandomAlphanumericstrings(10);
                $data['balance'] = null;
                $data['transStatus'] = 'Approved';
                // 
                // var_dump($depositColumnArray, $data);
                $depositBindingArray = $this->gateway->generateRandomStrings($data);
                $inserted = $this->conn->insertData($this->pdovar, depositTable, $depositColumnArray, $depositBindingArray, $data);
                if ($inserted) {
                    $newtotal_depo = (float) $fetchUserWithId['total_depo'] + (float) $data['amount'];
                    $newBalance = (float) $fetchUserWithId['total_depo'] + (float) $data['amount'];
                    $updateColoumn = ['balance', 'total_depo'];
                    $updateData = [$newBalance, $newtotal_depo];
                    $whereColumn = 'id';
                    $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $data['userid']);
                    if ($updated) {
                        $h = 'You Just Made A Deposit';
                        $c = 'Congratulations! your deposit of ' . $fetchUserWithId['currency'] . '' . $data['amount'] . ' has been successfully processed and credited to your account with a method of ' . $data['transMethod'] . ' worth ' . $data['amtValue'] . '.';
                        $message = $this->gateway->createNotificationMessage($data['userid'], $h, $c);
                        if ($message) {
                            // $sent = $this->mailsender->sendRegistrationEmail($userEmail, $userFullname, $userId, $EncrypteduserEmail, $encodedId);
                            // if ($sent === true) {
                            $fetchDepositWithIdcond = ['userid' => $data['userid']];
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
                        $errors[] = 'error could not update user balance';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }


                } else {
                    $errors[] = 'could not insert deposit';
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

    public function enableUserLogin($id)
    {
        $updateColoumn = ['dis'];
        $updateData = ['enabled'];
        $whereColumn = 'id';
        $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $id);
        if ($updated) {
            $this->response->respondCreated("user login enabled successfully, this user Can login again except you disable it");
        } else {
            $errors[] = 'error enabling user login';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function updateActivitystatus($id)
    {
        $updateColoumn = ['status', 'read_at'];
        $date = date('Y-m-d H:i:s');
        $updateData = ['Read', $date];
        $whereColumn = 'id';
        $fetchUserWithId = $this->gateway->fetchData(messagenoti, ['id' => $id]);
        $status = $fetchUserWithId['status'];
        if ($status !== 'Read') {
            $updated = $this->conn->updateData($this->pdovar, messagenoti, $updateColoumn, $updateData, $whereColumn, $id);
            if ($updated) {

                $this->response->respondCreated("true");
            } else {
                $errors[] = 'error updating status';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }
        } else {
            $this->response->respondCreated("true");
        }
    }
    public function outComeLoss($id)
    {
        $updateColoumn = ['status'];
        $updateData = ['Loss'];
        $whereColumn = 'id';
        $updated = $this->conn->updateData($this->pdovar, trade, $updateColoumn, $updateData, $whereColumn, $id);
        if ($updated) {
            $this->response->respondCreated("this trade outcome is a Loss");
        } else {
            $errors[] = 'error occurred try again';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function outComeProfit($id)
    {
        $updateColoumn = ['status'];
        $updateData = ['Profit'];
        $whereColumn = 'id';
        $updated = $this->conn->updateData($this->pdovar, trade, $updateColoumn, $updateData, $whereColumn, $id);
        if ($updated) {
            $this->response->respondCreated("this trade outcome is a profit");
        } else {
            $errors[] = 'error occurred try again';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function disableUserLogin($id)
    {
        $updateColoumn = ['dis'];
        $updateData = ['disabled'];
        $whereColumn = 'id';
        $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $id);
        if ($updated) {
            $this->response->respondCreated("user login disabled successfully, this user Can not login again except you enable it");
        } else {
            $errors[] = 'error disabling user login';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function enabledEmailAlert($id)
    {
        $updateColoumn = ['EmailAlert'];
        $createColumn = $this->createDbTables->createTable(RegTable, $updateColoumn);
        if ($createColumn) {
            $updateData = ['enabled'];
            $whereColumn = 'id';
            $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $id);
            if ($updated) {
                $this->response->respondCreated("Email Alert has been enabled successfully, this user Can recieve email alerts except you disable it");
            } else {
                $errors[] = 'error enabling Email Alert';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }
        }
    }
    public function approveDeposit($id)
    {
        $updateColoumn = ['transStatus', 'balance'];
        $createColumn = $this->createDbTables->createTable(depositTable, $updateColoumn);
    
        // 1. Get createdAt from frontend (e.g., via POST)
        $createdAt = $_POST['createdAt'] ?? null;
        if (!$createdAt) {
            $errors[] = 'createdAt is required';
            $this->response->respondUnprocessableEntity($errors);
            return;
        }
    
        // 2. Proceed with fetching deposit/user
        $fetchDepositWithIdcondition = ['id' => $id];
        $fetchDepositDetails = $this->gateway->fetchData(depositTable, $fetchDepositWithIdcondition);
    
        if ($fetchDepositDetails) {
            $fetchUserWithIdcondition = ['id' => $fetchDepositDetails['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
    
            if ($fetchUserDetails) {
                $newBalance = (float) $fetchUserDetails['balance'] + (float) $fetchDepositDetails['amount'];
                $userDepositAmt = (float) $fetchUserDetails['total_depo'] + (float) $fetchDepositDetails['amount'];
    
                $updateuserColoumn = ['balance', 'total_depo'];
                $updateuserData = [$newBalance, $userDepositAmt];
                $whereColumn = 'id';
    
                $updateUser = $this->conn->updateData($this->pdovar, RegTable, $updateuserColoumn, $updateuserData, $whereColumn, $fetchUserDetails['id']);
    
                if ($updateUser && $createColumn) {
                    $updateData = ['Approved', $newBalance];
                    $updated = $this->conn->updateData($this->pdovar, depositTable, $updateColoumn, $updateData, $whereColumn, $id);
    
                    if ($updated) {
                        $h = 'Deposit Approved';
                        $c = 'Your deposit request of ' . $fetchUserDetails['currency'] . '' . $fetchDepositDetails['amount'] . ' has been approved.';
    
                        // Use passed createdAt
                        $message = $this->gateway->createNotificationMessage($fetchDepositDetails['userid'], $h, $c, $createdAt);
                        if ($message) {
                            $this->response->respondCreated("Deposit has been approved");
                        } else {
                            $errors[] = 'Could not insert message';
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    } else {
                        $errors[] = 'Error updating deposit status';
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }
            }
        }
    }
    
    
    public function approveShares($id)
    {
        $updateColoumn = ['transStatus', 'balance'];
        $createColumn = $this->createDbTables->createTable(Shares, $updateColoumn);
        $fetchDepositWithIdcondition = ['id' => $id];
        $fetchDepositDetails = $this->gateway->fetchData(Shares, $fetchDepositWithIdcondition);
        if ($fetchDepositDetails) {
            $fetchUserWithIdcondition = ['id' => $fetchDepositDetails['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $newBalance = (float) $fetchUserDetails['balance'] + (float) $fetchDepositDetails['amount'];
                $userDepositAmt = (float) $fetchUserDetails['total_depo'] + (float) $fetchDepositDetails['amount'];
                $updateuserColoumn = ['balance', 'total_depo'];
                $updateuserData = [$newBalance, $userDepositAmt];
                $whereColumn = 'id';
                $updateUser = $this->conn->updateData($this->pdovar, RegTable, $updateuserColoumn, $updateuserData, $whereColumn, $fetchUserDetails['id']);
                if ($updateUser) {

                    if ($createColumn) {
                        $updateData = ['Approved', $newBalance];
                        $whereColumn = 'id';
                        $updated = $this->conn->updateData($this->pdovar, Shares, $updateColoumn, $updateData, $whereColumn, $id);
                        if ($updated) {
                            $h = 'Deposit Approved';
                            $c = 'Your deposit request of ' . $fetchUserDetails['currency'] . '' . $fetchDepositDetails['amount'] . ' has been approved.';
                            $message = $this->gateway->createNotificationMessage($fetchDepositDetails['userid'], $h, $c);
                            if ($message) {
                                $this->response->respondCreated("Deposit has been approved");
                            } else {
                                $errors[] = 'could not insert message';
                                if (!empty($errors)) {
                                    $this->response->respondUnprocessableEntity($errors);
                                    return;
                                }
                            }
                        } else {
                            $errors[] = 'error enabling Email Alert';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                            }
                        }
                    }
                }
            }
        }
    }
    public function disableEmailAlert($id)
    {
        $updateColoumn = ['EmailAlert'];
        $createColumn = $this->createDbTables->createTable(RegTable, $updateColoumn);
        if ($createColumn) {
            $updateData = ['disabled'];
            $whereColumn = 'id';
            $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $id);
            if ($updated) {
                $this->response->respondCreated("Email Alert has been disabled successfully, this user Cannot recieve email alerts except you enable it");
            } else {
                $errors[] = 'error enabling Email Alert';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }
        }
    }
    public function disapprovePlan($id)
    {
        $updateColoumn = ['transStatus'];
        $createColumn = $this->createDbTables->createTable(usersPlan, $updateColoumn);
        if ($createColumn) {
            $updateData = ['Declined'];
            $whereColumn = 'id';
            $updated = $this->conn->updateData($this->pdovar, usersPlan, $updateColoumn, $updateData, $whereColumn, $id);
            if ($updated) {
                $this->response->respondCreated("user Plan has been declined");
            } else {
                $errors[] = 'error enabling Email Alert';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }
        }
    }
    public function disapproveDeposit($id)
    {
        $updateColoumn = ['transStatus'];
        $createColumn = $this->createDbTables->createTable(depositTable, $updateColoumn);
        if ($createColumn) {
            $updateData = ['Declined'];
            $whereColumn = 'id';
            $fetchDepositWithIdcondition = ['id' => $id];
            $fetchDepositDetails = $this->gateway->fetchData(depositTable, $fetchDepositWithIdcondition);
            if ($fetchDepositDetails) {
                $fetchUserWithIdcondition = ['id' => $fetchDepositDetails['userid']];

                $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
                if ($fetchUserDetails) {
                    $updated = $this->conn->updateData($this->pdovar, depositTable, $updateColoumn, $updateData, $whereColumn, $id);

                    if ($updated) {

                        $h = 'Deposit Disapproved';
                        $c = 'Your deposit request of ' . $fetchUserDetails['currency'] . '' . $fetchDepositDetails['amount'] . ' has been disapproved. reinitiate this deposit ';
                        $message = $this->gateway->createNotificationMessage($fetchDepositDetails['userid'], $h, $c);
                        if ($message) {
                            $this->response->respondCreated("Deposit has been declined");
                        } else {
                            $errors[] = 'could not insert message';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                                return;
                            }
                        }
                    } else {
                        $errors[] = 'error enabling Email Alert';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }
                }
            }
        }
    }
    public function disapproveShare($id)
    {
        $updateColoumn = ['transStatus'];
        $createColumn = $this->createDbTables->createTable(Shares, $updateColoumn);
        if ($createColumn) {
            $updateData = ['Declined'];
            $whereColumn = 'id';
            $fetchDepositWithIdcondition = ['id' => $id];
            $fetchDepositDetails = $this->gateway->fetchData(Shares, $fetchDepositWithIdcondition);
            if ($fetchDepositDetails) {
                $fetchUserWithIdcondition = ['id' => $fetchDepositDetails['userid']];

                $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
                if ($fetchUserDetails) {
                    $updated = $this->conn->updateData($this->pdovar, Shares, $updateColoumn, $updateData, $whereColumn, $id);

                    if ($updated) {

                        $h = 'Deposit Disapproved';
                        $c = 'Your deposit request of ' . $fetchUserDetails['currency'] . '' . $fetchDepositDetails['amount'] . ' has been disapproved. reinitiate this deposit ';
                        $message = $this->gateway->createNotificationMessage($fetchDepositDetails['userid'], $h, $c);
                        if ($message) {
                            $this->response->respondCreated("Deposit has been declined");
                        } else {
                            $errors[] = 'could not insert message';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                                return;
                            }
                        }
                    } else {
                        $errors[] = 'error enabling Email Alert';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }
                }
            }
        }
    }


    public function disapprovecryptowithdrawal($id)
    {
        $fetchDepositWithIdcondition = ['id' => $id];
        $fetchcrypDetails = $this->gateway->fetchData(cryptwithdrawalTable, $fetchDepositWithIdcondition);
        if ($fetchcrypDetails) {
        $fetchUserWithIdcondition = ['id' => $fetchcrypDetails['userId']];
        $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);

        $updateColoumn = ['transStatus'];
        $createColumn = $this->createDbTables->createTable(cryptwithdrawalTable, $updateColoumn);
        if ($createColumn) {
            $updateData = ['Declined'];
            $whereColumn = 'id';
            $updated = $this->conn->updateData($this->pdovar, cryptwithdrawalTable, $updateColoumn, $updateData, $whereColumn, $id);
            if ($updated) {
                $h = 'Crypto Withdrawal Disapproved';
                $c = 'Your withdrawal request of ' . $fetchUserDetails['currency'] . '' . $fetchcrypDetails['amount'] . ' has been disapproved. reinitiate this withdrawal ';
                $message = $this->gateway->createNotificationMessage($fetchcrypDetails['userId'], $h, $c);
                if ($message) {
                    $this->response->respondCreated("this withdrawal has been declined");
                } else {
                    $errors[] = 'could not insert message';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'error declining this withdrawal';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }
        }
    }
    }
    public function disapproveBankwithdrawal($id)
    {
        $updateColoumn = ['transStatus'];
        $createColumn = $this->createDbTables->createTable(bnkwithdrawalTable, $updateColoumn);
        if ($createColumn) {
            $updateData = ['Declined'];
            $whereColumn = 'id';
            $updated = $this->conn->updateData($this->pdovar, bnkwithdrawalTable, $updateColoumn, $updateData, $whereColumn, $id);
            $fetchDepositWithIdcondition = ['id' => $id];
            $fetchcrypDetails = $this->gateway->fetchData(bnkwithdrawalTable, $fetchDepositWithIdcondition);
            $fetchUserWithIdcondition = ['id' => $fetchcrypDetails['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            // $h = 'Bank Withdrawal Disapproved';
            // $c = 'your withdrawal request of ' . $fetchUserDetails['currency'] . '' . $fetchcrypDetails['amount'] . ' has been disapproved. reinitiate this withdrawal ';
            if ($updated) {
                $h = 'Bank Withdrawal Disapproved';
                $c = 'Your bank withdrawal request of ' . $fetchUserDetails['currency'] . '' . $fetchcrypDetails['amount'] . ' has been disapproved. reinitiate this withdrawal ';
                $message = $this->gateway->createNotificationMessage($fetchcrypDetails['userid'], $h, $c);
                if ($message) {
                    $this->response->respondCreated("this withdrawal has been declined");
                } else {
                    $errors[] = 'could not insert message';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                        return;
                    }
                }
            } else {
                $errors[] = 'error declining this withdrawal';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }
        }
    }
    public function approvecryptowithdrawal($id)
    {
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(cryptwithdrawalTable, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $amount = $fetchDeposit['amount'];
            $fetchUserWithIdcondition = ['id' => $fetchDeposit['userId']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $deposit = (float) $fetchUserDetails['total_pro'];
                $newbalance = $balance - $amount;
                $newDeposit = $deposit - $amount;
                // $columnToBeUpdate  = ['balance'];
                // $dataToUpdateUser = [$newbalance ];
                // $amountWithdrawal = (float) $fetchUserDetails['amountWithdrawal'];
                // $newWithdrawal =   $amountWithdrawal + $amount;
                $columnToBeUpdate = ['balance', 'total_pro'];
                $dataToUpdateUser = [$newbalance, $newDeposit];
                $updateReference = 'id';
                $transIdd = $fetchDeposit['userId'];
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $transIdd);
                if ($updated) {
                    $updateColoumn = ['balance', 'transStatus'];
                    $createColumn = $this->createDbTables->createTable(cryptwithdrawalTable, $updateColoumn);
                    if ($createColumn) {
                        $updateData = [$newbalance, 'Approved'];
                        $whereColumn = 'id';
                        $updated = $this->conn->updateData($this->pdovar, cryptwithdrawalTable, $updateColoumn, $updateData, $whereColumn, $id);
                        if ($updated) {
                            $h = 'Crypto Withdrawal Approved';
                            $c = 'Your crypto withdrawal request of ' . $fetchUserDetails['currency'] . '' . $fetchDeposit['amount'] . ' has been approved.';
                            $message = $this->gateway->createNotificationMessage($fetchDeposit['userId'], $h, $c);
                            if ($message) {
                                $this->response->respondCreated("this withdrawal has been approved");
                            } else {
                                $errors[] = 'could not insert message';
                                if (!empty($errors)) {
                                    $this->response->respondUnprocessableEntity($errors);
                                    return;
                                }
                            }
                        } else {
                            $errors[] = 'error approving this withdrawal';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                            }
                        }
                    }
                } else {
                    $errors[] = 'could not edit this user balance ';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }

            } else {
                $errors[] = 'could not fetch any user';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }


        } else {
            $errors[] = 'could not fetch any profit/loss';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }


    }
    public function approveBankwithdrawal($id): void
    {
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(bnkwithdrawalTable, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $amount = $fetchDeposit['amount'];
            $fetchUserWithIdcondition = ['id' => $fetchDeposit['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $deposit = (float) $fetchUserDetails['total_pro'];
                $newDeposit = $deposit - $amount;
                // $amountWithdrawal = (float) $fetchUserDetails['amountWithdrawal'];
                $newbalance = $balance - $amount;
                // $newWithdrawal =   $amountWithdrawal + $amount;
                $columnToBeUpdate = ['balance', 'total_pro'];
                $dataToUpdateUser = [$newbalance, $newDeposit];
                $updateReference = 'id';
                $transIdd = $fetchDeposit['userid'];
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $transIdd);
                if ($updated) {
                    $updateColoumn = ['balance', 'transStatus'];
                    $createColumn = $this->createDbTables->createTable(bnkwithdrawalTable, $updateColoumn);
                    if ($createColumn) {
                        $updateData = [$newbalance, 'Approved'];
                        ;
                        $whereColumn = 'id';
                        $updated = $this->conn->updateData($this->pdovar, bnkwithdrawalTable, $updateColoumn, $updateData, $whereColumn, $id);
                        if ($updated) {
                            $h = 'Bank Withdrawal Approved';
                            $c = 'Your bank withdrawal request of ' . $fetchUserDetails['currency'] . '' . $fetchDeposit['amount'] . ' has been approved.';
                            $message = $this->gateway->createNotificationMessage($fetchDeposit['userid'], $h, $c);
                            if ($message) {
                                $this->response->respondCreated("this withdrawal has been approved");
                            } else {
                                $errors[] = 'could not insert message';
                                if (!empty($errors)) {
                                    $this->response->respondUnprocessableEntity($errors);
                                    return;
                                }
                            }
                        } else {
                            $errors[] = 'error approving this withdrawal';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                            }
                        }
                    }


                } else {
                    $errors[] = 'could not edit this user balance ';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }

            } else {
                $errors[] = 'could not fetch any user';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }


        } else {
            $errors[] = 'could not fetch any profit/loss';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }



    }
    // public function disableCron($id)
    // {
    //     $updateColoumn = ['CronJob'];
    //     $createColumn = $this->createDbTables->createTable(RegTable, $updateColoumn);
    //     if ($createColumn) {
    //         $updateData = ['disabled'];
    //         $whereColumn = 'id';
    //         $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $id);
    //         if ($updated) {
    //             $this->response->respondCreated("automatic profit has been disabled successfully, ");
    //         } else {
    //             $errors[] = 'error disenabling Alert Message';
    //             if (!empty($errors)) {
    //                 $this->response->respondUnprocessableEntity($errors);
    //             }
    //         }
    //     }
    // }
    public function disableAlertMessage($id)
    {
        $updateColoumn = ['alert'];
        $createColumn = $this->createDbTables->createTable(RegTable, $updateColoumn);
        if ($createColumn) {
            $updateData = ['disabled'];
            $whereColumn = 'id';
            $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $id);
            if ($updated) {
                $this->response->respondCreated("Email Alert has been disabled successfully");
            } else {
                $errors[] = 'error disenabling Alert Message';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }
        }
    }


    public function approveKyc($id)
    {
        $updateColoumn = ['Status'];
        $updateuserColoumn = ['kyc', 'verifi'];
       
        $updateData = ['Approved'];
        $updateuserData = ['true', 'true'];
        $whereColumn = 'id';
        $fetchkycWithIdcondition = ['id' => $id];
        $fetchkyDetails = $this->gateway->fetchData(kyc, $fetchkycWithIdcondition);
        if ($fetchkyDetails) {
            $fetchUserWithIdcondition = ['id' => $fetchkyDetails['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $updateUser = $this->conn->updateData($this->pdovar, RegTable, $updateuserColoumn, $updateuserData, $whereColumn, $fetchUserDetails['id']);
                if ($updateUser) {
                    $updated = $this->conn->updateData($this->pdovar, kyc, $updateColoumn, $updateData, $whereColumn, $id);
                    if ($updated) {
                        $this->response->respondCreated("this kyc document has been Approved successfully");
                    } else {
                        $errors[] = 'error Approving kyc';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }
                } else {
                    $errors[] = 'error Approving user status';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }
            }
        }
    }
    public function disapproveKyc($id)
    {

        $updateColoumn = ['Status', 'approveDate'];
        $updateuserColoumn = ['kyc', 'verifi'];
        $date =  date('Y-m-d H:i:s');
        $updateData = ['Declined', $date];
        $updateuserData = ['false', 'false'];
        $whereColumn = 'id';
        $fetchkycWithIdcondition = ['id' => $id];
        $fetchkyDetails = $this->gateway->fetchData(kyc, $fetchkycWithIdcondition);

        if ($fetchkyDetails) {
            $fetchUserWithIdcondition = ['id' => $fetchkyDetails['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {


                $updateUser = $this->conn->updateData($this->pdovar, RegTable, $updateuserColoumn, $updateuserData, $whereColumn, $fetchUserDetails['id']);
                if ($updateUser) {
                    $updated = $this->conn->updateData($this->pdovar, kyc, $updateColoumn, $updateData, $whereColumn, $id);
                    if ($updated) {

                        $this->response->respondCreated("this kyc document has been declined successfully");
                    } else {
                        $errors[] = 'error declining kyc';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }
                } else {
                    $errors[] = 'error declining user status';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }
            }
        }
    }
    // public function approvePlan($id)
    // {
    //     $updateColoumn = ['transStatus', 'approveDate'];
    //     $updateuserColoumn = ['Plan'];
    //     $date = date('d-m-Y h:i:s a', time());
    //     $updateData = ['Approved', $date];

    //     $whereColumn = 'id';
    //     $fetchkycWithIdcondition = ['id' => $id];
    //     $fetchkyDetails = $this->gateway->fetchData(usersPlan, $fetchkycWithIdcondition);
    //     if ($fetchkyDetails) {
    //         $fetchUserWithIdcondition = ['id' => $fetchkyDetails['sessionGetUserID']];
    //         $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);

    //         if ($fetchUserDetails) {
    //             $updateuserData = [$fetchkyDetails['selectedPlan']];
    //             $updateUser = $this->conn->updateData($this->pdovar, RegTable, $updateuserColoumn, $updateuserData, $whereColumn, $fetchUserDetails['id']);
    //             if ($updateUser) {
    //                 $createColumn = $this->createDbTables->createTable(usersPlan, $updateColoumn);
    //                 if ($createColumn) {
    //                     $updated = $this->conn->updateData($this->pdovar, usersPlan, $updateColoumn, $updateData, $whereColumn, $id);
    //                     if ($updated) {
    //                         $h = 'Subscription Deposit Approved';
    //                         $c = 'Your Deposit Of ' . $fetchUserDetails['currency'] . '' . $fetchkyDetails['cryptoAmt'] . ' For The Plan Subscription ' . $fetchkyDetails['selectedPlan'] . ' Has Been Approved.';
    //                         $message = $this->gateway->createNotificationMessage($fetchkyDetails['sessionGetUserID'], $h, $c);
    //                         if ($message) {
    //                             $this->response->respondCreated("this user plan has been approved successfully");
    //                         } else {
    //                             $errors[] = 'could not insert message';
    //                             if (!empty($errors)) {
    //                                 $this->response->respondUnprocessableEntity($errors);
    //                                 return;
    //                             }
    //                         }
    //                     } else {
    //                         $errors[] = 'error approving plan';
    //                         if (!empty($errors)) {
    //                             $this->response->respondUnprocessableEntity($errors);
    //                         }
    //                     }
    //                 } else {
    //                     $errors[] = 'error declining user status';
    //                     if (!empty($errors)) {
    //                         $this->response->respondUnprocessableEntity($errors);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
    public function approvePlan($id)
    {
        $updatePlanColumns = ['transStatus', 'approveDate'];
        $updateUserColumns = ['balance', 'total_depo', 'Plan'];
        $date =  date('Y-m-d H:i:s');
        $updatePlanData = ['Approved', $date];
    
        $whereColumn = 'id';
        $fetchPlanWithIdCondition = ['id' => $id];
        $fetchPlanDetails = $this->gateway->fetchData(usersPlan, $fetchPlanWithIdCondition);
    
        if ($fetchPlanDetails) {
            $fetchUserWithIdCondition = ['id' => $fetchPlanDetails['sessionGetUserID']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdCondition);
    
            if ($fetchUserDetails) {
                // Calculate new balance and total deposit
                $newBalance = (float)$fetchUserDetails['balance'] + (float)$fetchPlanDetails['cryptoAmt'];
                $newTotalDeposit = (float)$fetchUserDetails['total_depo'] + (float)$fetchPlanDetails['cryptoAmt'];
    
                // Update user's balance, total deposit, and plan
                $updateUserData = [$newBalance, $newTotalDeposit, $fetchPlanDetails['selectedPlan']];
                $updateUser = $this->conn->updateData($this->pdovar, RegTable, $updateUserColumns, $updateUserData, $whereColumn, $fetchUserDetails['id']);
    
                if ($updateUser) {
                    // Update plan status
                    $createColumn = $this->createDbTables->createTable(usersPlan, $updatePlanColumns);
                    if ($createColumn) {
                        $updated = $this->conn->updateData($this->pdovar, usersPlan, $updatePlanColumns, $updatePlanData, $whereColumn, $id);
                        if ($updated) {
                            $h = 'Subscription Deposit Approved';
                            $c = 'Your deposit of ' . $fetchUserDetails['currency'] . '' . $fetchPlanDetails['cryptoAmt'] . ' for the plan subscription ' . $fetchPlanDetails['selectedPlan'] . ' has been approved.';
                            $message = $this->gateway->createNotificationMessage($fetchPlanDetails['sessionGetUserID'], $h, $c);
                            if ($message) {
                                $this->response->respondCreated("This user plan has been approved successfully");
                            } else {
                                $errors[] = 'Could not insert message';
                                if (!empty($errors)) {
                                    $this->response->respondUnprocessableEntity($errors);
                                    return;
                                }
                            }
                        } else {
                            $errors[] = 'Error approving plan';
                            if (!empty($errors)) {
                                $this->response->respondUnprocessableEntity($errors);
                            }
                        }
                    } else {
                        $errors[] = 'Error creating column for plan status';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }
                } else {
                    $errors[] = 'Error updating user information';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }
            }
        }
    }
    public function changeSignalMessage($data)
    {
        // var_dump($data);
        $updateColoumn = ['SignalMessage'];
        $createColumn = $this->createDbTables->createTable(RegTable, $updateColoumn);
        if ($createColumn) {
            $updateData = [$data['umessage']];
            $whereColumn = 'id';
            $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $data['umessageIdd']);
            if ($updated) {
                $this->response->respondCreated("Alert Message has been updated successfully");
            } else {
                $errors[] = 'error updating Alert Message';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }
        }
    }
    public function enableAlertMessage($id)
    {
        $updateColoumn = ['alert'];
        $updateData = ['enabled'];
        $whereColumn = 'id';
        $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $id);
        if ($updated) {
            $this->response->respondCreated("Alert Message enabled successfully");
        } else {
            $errors[] = 'error enabling Alert Message';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
            
        }
    }
    // public function enableCron($id)
    // {
    //     $updateColoumn = ['CronJob'];
    //     $updateData = ['enabled'];
    //     $whereColumn = 'id';
    //     $updated = $this->conn->updateData($this->pdovar, RegTable, $updateColoumn, $updateData, $whereColumn, $id);
    //     if ($updated) {
    //         $this->response->respondCreated("automatic profit enabled successfully, ");
    //     } else {
    //         $errors[] = 'error enabling Alert Message';
    //         if (!empty($errors)) {
    //             $this->response->respondUnprocessableEntity($errors);
    //         }
    //     }
    // }



    public function editBankWithdrawal($data)
    {

        $id = $data['id'];
        unset($data['id']);
        unset($data['balance']);
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(bnkwithdrawalTable, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['amount'];
            (float) $newamount = $data['amount'];
            $fetchUserWithIdcondition = ['id' => $data['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $newbalance = $balance - $oldamount + $newamount;
                $columnToBeUpdate = ['balance'];
                $dataToUpdateUser = [$newbalance];
                $updateReference = 'id';
                $transIdd = $fetchDeposit['id'];
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $data['userid']);
                if ($updated) {
                    $updatedata = ['userid', 'payment_mode', 'amount', 'transId', 'transStatus',  'bankName', 'accNum', 'accName', 'country', 'swiftcode', 'narration'];
                    $datat = [$data['userid'], $data['payment_mode'], $data['amount'], $data['transId'], $data['transStatus'], $data['dateOfTrans'], $data['bankName'], $data['accNum'], $data['accName'], $data['country'], $data['swiftcode'], $data['narration']];

                    $whereColumn = 'id';
                    $updated = $this->conn->updateData($this->pdovar, bnkwithdrawalTable, $updatedata, $datat, $whereColumn, $transIdd);
                    if ($updated) {
                        $this->response->respondCreated("this bank withdrawal row has been updated sucessfully");
                    } else {
                        $errors[] = 'could not edit this bank withdrawal Details';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }
                } else {
                    $errors[] = 'could not edit this user balance ';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }

            } else {
                $errors[] = 'could not fetch any user';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }


        } else {
            $errors[] = 'could not fetch any bank withdrawal';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }

    }
    public function editAdminDetails($data)
    {
        $id = $data['userid'];
        $updatedata = ['adminMal', 'Password'];
        $datat = [$data['adminMail'], $data['adminpassword']];
        $whereColumn = 'id';
        $updated = $this->conn->updateData($this->pdovar, admintable, $updatedata, $datat, $whereColumn, $id);
        if ($updated) {
            $this->response->respondCreated("admin details has been updated successfully");
        } else {
            $errors[] = 'could not edit admin details Details';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
    public function editprofitLoss($data)
    {
        $id = $data['id'];
        unset($data['id']);
        unset($data['balance']);
        $fetchUserWithIdcond = ['id' => $id];

        $fetchDeposit = $this->gateway->fetchData(ProfitTable, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['amount'];
            (float) $newamount = $data['amount'];
            $fetchUserWithIdcondition = ['id' => $data['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $newbalance = $balance - $oldamount + $newamount;
                $columnToBeUpdate = ['balance'];
                $dataToUpdateUser = [$newbalance];
                $updateReference = 'id';
                $transIdd = $fetchDeposit['id'];
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $data['userid']);
                if ($updated) {
                    $updatedata = ['amount', 'userid', 'Wallet', 'transId', 'balance', 'transStatus',  'type'];
                    $datat = [$data['amount'], $data['userid'], $data['Wallet'], $data['transId'], $newbalance, $data['transStatus'], $data['dateOfTrans'], $data['type']];
                    $whereColumn = 'id';
                    $updated = $this->conn->updateData($this->pdovar, ProfitTable, $updatedata, $datat, $whereColumn, $transIdd);
                    if ($updated) {
                        $this->response->respondCreated("this Profit/loss row has been updated sucessfully");
                    } else {
                        $errors[] = 'could not edit this Profit/loss Details';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }
                } else {
                    $errors[] = 'could not edit this user balance ';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }

            } else {
                $errors[] = 'could not fetch any user';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }


        } else {
            $errors[] = 'could not fetch any profit/loss';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }

    }
    public function editcryptoWithdrawal($data)
    {
        $id = $data['id'];
        unset($data['id']);
        unset($data['balance']);
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(cryptwithdrawalTable, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['amount'];
            (float) $newamount = $data['amount'];
            $fetchUserWithIdcondition = ['id' => $data['userId']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $newbalance = $balance - $oldamount + $newamount;
                $columnToBeUpdate = ['balance'];
                $dataToUpdateUser = [$newbalance];
                $updateReference = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $data['userId']);
                if ($updated) {
                    $updatedata = ['userid', 'payment_mode', 'amount', 'wallet', 'transId', 'transStatus', 'dateOfTrans'];
                    $datat = [$fetchUserDetails['id'], $data['payment_mode'], $data['amount'], $data['wallet'], $data['transId'], $data['transStatus'], $data['dateOfTrans']];
                    $whereColumn = 'id';
                    $updated = $this->conn->updateData($this->pdovar, cryptwithdrawalTable, $updatedata, $datat, $whereColumn, $id);
                    if ($updated) {
                        $this->response->respondCreated("this crypto withdrawal row has been updated sucessfully");
                    } else {
                        $errors[] = 'could not edit this crypto withdrawal Details';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }
                } else {
                    $errors[] = 'could not edit this user balance ';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }

            } else {
                $errors[] = 'could not fetch any user';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }


        } else {
            $errors[] = 'could not fetch any crypto withdrawal';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }

    }
    public function editShare($data)
    {
        $id = $data['id'];
        unset($data['id']);
        unset($data['balance']);
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(Shares, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['amount'];
            (float) $newamount = $data['amount'];
            $fetchUserWithIdcondition = ['id' => $data['userId']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $newbalance = $balance - $oldamount + $newamount;
                $columnToBeUpdate = ['balance'];
                $dataToUpdateUser = [$newbalance];
                $updateReference = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $data['userId']);
                if ($updated) {
                    $updatedata = ['amtValue', 'amount', 'transMethod', 'userid', 'Wallet', 'transId', 'balance', 'transStatus', 'dateOfTrans'];
                    $datat = [$data['amtValue'], $data['amount'], $data['transMethod'], $data['userid'], $data['Wallet'], $data['transId'], $newbalance, $data['transStatus'], $data['dateOfTrans']];
                    $whereColumn = 'id';
                    $updated = $this->conn->updateData($this->pdovar, Shares, $updatedata, $datat, $whereColumn, $id);
                    if ($updated) {
                        $this->response->respondCreated("this Shares row has been updated sucessfully");
                    } else {
                        $errors[] = 'could not edit this deposit Details';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                        }
                    }
                } else {
                    $errors[] = 'could not edit this user balance ';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }

            } else {
                $errors[] = 'could not fetch any user';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }


        } else {
            $errors[] = 'could not fetch any deposit';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }

    }
    public function editDeposit($data)
    {
        $id = $data['id'];
        unset($data['id']);
        unset($data['balance']);

        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(depositTable, $fetchUserWithIdcond);

        if ($fetchDeposit) {
            $oldamount = (float) $fetchDeposit['amount'];
            $newamount = (float) $data['amount'];

            $fetchUserWithIdcondition = ['id' => $data['userId']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);

            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $total_depo = (float) $fetchUserDetails['total_depo'];

                // Correcting Balance Calculation
                $newbalance = $balance - $oldamount + $newamount;

                // Correcting Total Deposit Calculation
                $newtotal_depo = $total_depo - $oldamount + $newamount;

                $columnToBeUpdate = ['balance', 'total_depo'];
                $dataToUpdateUser = [$newbalance, $newtotal_depo];
                $updateReference = 'id';

                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $data['userId']);

                if ($updated) {
                    $updatedata = ['amtValue', 'amount', 'transMethod', 'userid', 'Wallet', 'transId', 'balance', 'transStatus', 'dateOfTrans'];
                    $datat = [
                        $data['amtValue'],
                        $data['amount'],
                        $data['transMethod'],
                        $data['userid'],
                        $data['Wallet'],
                        $data['transId'],
                        $newbalance,
                        $data['transStatus'],
                        $data['dateOfTrans']
                    ];
                    $whereColumn = 'id';

                    $updated = $this->conn->updateData($this->pdovar, depositTable, $updatedata, $datat, $whereColumn, $id);

                    if ($updated) {
                        $this->response->respondCreated("This deposit row has been updated successfully.");
                    } else {
                        $this->response->respondUnprocessableEntity(['Could not edit this deposit details.']);
                    }
                } else {
                    $this->response->respondUnprocessableEntity(['Could not edit this user balance.']);
                }
            } else {
                $this->response->respondUnprocessableEntity(['Could not fetch any user.']);
            }
        } else {
            $this->response->respondUnprocessableEntity(['Could not fetch any deposit.']);
        }
    }

    public function editPlan($data)
    {
        $id = $data['id'];
        unset($data['id']);
        unset($data['balance']);
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(usersPlan, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['cryptoAmt'];
            (float) $newamount = $data['cryptoAmt'];
            $fetchUserWithIdcondition = ['id' => $data['sessionGetUserID']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $newbalance = $balance - $oldamount + $newamount;
                $updatedata = ['cryptovalue', 'cryptoAmt', 'netWork', 'sessionGetUserID', 'companyWallet', 'selectedPlan', 'transId', 'balance', 'transStatus', 'dateOfTrans'];
                $datat = [$data['cryptovalue'], $data['cryptoAmt'], $data['netWork'], $data['sessionGetUserID'], $data['companyWallet'], $data['selectedPlan'], $data['transId'], $newbalance, $data['transStatus'], $data['dateOfTrans']];
                $whereColumn = 'id';
                $updated = $this->conn->updateData($this->pdovar, usersPlan, $updatedata, $datat, $whereColumn, $id);
                if ($updated) {
                    $this->response->respondCreated("this subscription row has been updated sucessfully");
                } else {
                    $errors[] = 'could not edit this plan subscription Details';
                    if (!empty($errors)) {
                        $this->response->respondUnprocessableEntity($errors);
                    }
                }

            } else {
                $errors[] = 'could not fetch any user';
                if (!empty($errors)) {
                    $this->response->respondUnprocessableEntity($errors);
                }
            }


        } else {
            $errors[] = 'could not fetch any deposit';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }

    }
    public function edituserByUser($data, $id)
    {
        $updatedata = ['firstName', 'last_Name', 'Username', 'email', 'Phone', 'country', 'Plan', 'createdAt', 'userid'];
        $datat = [$data['firstName'], $data['last_Name'], $data['Username'], $data['email'], $data['Phone'], $data['country'], $data['Plan'], $data['createdAt'], $data['userid']];
        $whereColumn = 'id';
        $updated = $this->conn->updateData($this->pdovar, RegTable, $updatedata, $datat, $whereColumn, $id);
        if ($updated) {
            $this->response->respondCreated("this user's details updated sucessfully");
        } else {
            $errors[] = 'could not edit this user Details';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }

    public function edituser($data)
    {
        $id = $data['uid'];
        unset($data['uid']);
        $updatedata = ['firstName', 'last_Name', 'Username', 'email', 'Phone', 'country', 'Password', 'refer', 'encryptedPassword', 'Plan', 'createdAt', 'userid', 'ip', 'img', 'balance', 'total_depo', 'total_pro', 'status', 'demo_balance', 'sup', 'alert', 'numb', 'kyc', 'IMFClearanceCode', 'Address', 'City', 'State', 'verifi', 'dis', 'email_log', 'name_of_code', 'withd', 'signal_message', 'emailVerication', 'UserLogin', 'currency'];


        // var_dump($data);
        $datat = [$data['firstName'], $data['last_Name'], $data['Username'], $data['email'], $data['Phone'], $data['country'], $data['Password'], $data['refer'], $data['encryptedPassword'], $data['Plan'], $data['createdAt'], $data['userid'], $data['ip'], $data['img'], $data['balance'], $data['total_depo'], $data['total_pro'], $data['status'], $data['demo_balance'], $data['sup'], $data['alert'], $data['numb'], $data['kyc'], $data['IMFClearanceCode'], $data['Address'], $data['City'], $data['State'], $data['verifi'], $data['dis'], $data['email_log'], $data['name_of_code'], $data['withd'], $data['signal_message'], $data['emailVerication'], $data['UserLogin'], $data['currency']];



        $whereColumn = 'id';
        $updated = $this->conn->updateData($this->pdovar, RegTable, $updatedata, $datat, $whereColumn, $id);
        if ($updated) {
            $this->response->respondCreated("this user row has been updated sucessfully");
        } else {
            $errors[] = 'could not edit this user Details';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }


    public function FetchPlanLimit($id)
    {
        $getId = explode(',', $id);
     
        $fetchProduct = $this->gateway->fetchPaginatedData(usersPlan, $getId[1], $getId[0]);
    
        if (!$fetchProduct) {
            return;
        }
    
        $validUserIDs = [];
        $validPlans = [];
    
        foreach ($fetchProduct as $plan) {
            $userId = $plan['sessionGetUserID'];
            if ($this->gateway->idExists(RegTable, $userId)) {
                $validUserIDs[] = $userId;
                $validPlans[] = $plan;
            }
        }
    
        $fetchUsers = [];
        foreach (array_unique($validUserIDs) as $userId) {
            $userDetails = $this->gateway->fetchData(RegTable, ['id' => $userId]);
            if ($userDetails) {
                $fetchUsers[] = $userDetails;
            }
        }
    
        $this->response->respondCreated([
            'userDetails' => [$fetchUsers], 
            'deposits' => $validPlans
        ]);
    }
    public function AdminFetchDepositLimit($id)
    {
        $getId = explode(',', $id);
    
    
        $fetchProduct = $this->gateway->fetchPaginatedData(depositTable, $getId[1], $getId[0]);
    
        if (!$fetchProduct) {
            return;
        }
    
        $validUserIDs = [];
        $validDeposits = [];
    
        foreach ($fetchProduct as $deposit) {
            $userId = $deposit['userid'];
            if ($this->gateway->idExists(RegTable, $userId)) {
                $validUserIDs[] = $userId;
                $validDeposits[] = $deposit;
            }
        }
    
        $fetchUsers = [];
        foreach (array_unique($validUserIDs) as $userId) {
            $userDetails = $this->gateway->fetchData(RegTable, ['id' => $userId]);
            if ($userDetails) {
                $fetchUsers[] = $userDetails;
            }
        }
    
        $this->response->respondCreated([
            'userDetails' => [$fetchUsers], 
            'deposits' => $validDeposits
        ]);
    }
    public function AdminFetchSharesLimit($id)
    {

        $getId = explode(',', $id);
        $isFound = $this->gateway->idExists(RegTable, $getId[0]);
        if ($isFound) {
        $fetchProduct = $this->gateway->fetchPaginatedData(Shares, $getId[1], $getId[0]);
        if ($fetchProduct) {
            foreach ($fetchProduct as $deposits) {
                $UserIDs[] = $deposits['userid'];
            }

            foreach (array_unique($UserIDs) as $userId) {
                $fetchUserWithIdcond = ['id' => $userId];
                $fetchUser = $this->gateway->fetchData(RegTable, $fetchUserWithIdcond);

                $fetchUsers[] = $fetchUser;

            }
            $this->response->respondCreated(array_merge(['userDetails' => [$fetchUsers], 'deposits' => $fetchProduct]));
        }
        }
    }

    public function FetchAllKycLimit($id)
    {
        $getId = explode(',', $id);
     
        $fetchProduct = $this->gateway->fetchPaginatedData(kyc, $getId[1], $getId[0]);
    
        if (!$fetchProduct) {
            return;
        }
    
        $validUserIDs = [];
        $validKycRecords = [];
    
        foreach ($fetchProduct as $kycRecord) {
            $userId = $kycRecord['userid'];
            if ($this->gateway->idExists(RegTable, $userId)) {
                $validUserIDs[] = $userId;
                $validKycRecords[] = $kycRecord;
            }
        }
    
        $fetchUsers = [];
        foreach (array_unique($validUserIDs) as $userId) {
            $userDetails = $this->gateway->fetchData(RegTable, ['id' => $userId]);
            if ($userDetails) {
                $fetchUsers[] = $userDetails;
            }
        }
    
        $this->response->respondCreated([
            'userDetails' => [$fetchUsers], 
            'deposits' => $validKycRecords
        ]);
    }
    public function FetchAllCryptoWithdrawalLimit($id)
    {
        $getId = explode(',', $id);
     
        $fetchProduct = $this->gateway->fetchPaginatedData(cryptwithdrawalTable, $getId[1], $getId[0]);
    
        if (!$fetchProduct) {
            return;
        }
    
        $validUserIDs = [];
        $validWithdrawals = [];
    
        foreach ($fetchProduct as $withdrawal) {
            $userId = $withdrawal['userId'];
            if ($this->gateway->idExists(RegTable, $userId)) {
                $validUserIDs[] = $userId;
                $validWithdrawals[] = $withdrawal;
            }
        }
    
        $fetchUsers = [];
        foreach (array_unique($validUserIDs) as $userId) {
            $userDetails = $this->gateway->fetchData(RegTable, ['id' => $userId]);
            if ($userDetails) {
                $fetchUsers[] = $userDetails;
            }
        }
    
        $this->response->respondCreated([
            'userDetails' => [$fetchUsers], 
            'deposits' => $validWithdrawals
        ]);
    }
    public function FetchAllTradeLimit($id)
    {
        $getId = explode(',', $id);
        $fetchProduct = $this->gateway->fetchPaginatedData(trade, $getId[1], $getId[0]);
    
        if (!$fetchProduct) {
            return; 
        }
    
        $validUserIDs = [];
        $validDeposits = [];
    
        foreach ($fetchProduct as $deposit) {
            $userId = $deposit['userid'];
            // Only process transactions for users whose IDs are valid
            if ($this->gateway->idExists(RegTable, $userId)) {
                $validUserIDs[] = $userId;
                $validDeposits[] = $deposit;
            }
        }
    
        $fetchUsers = [];
        foreach (array_unique($validUserIDs) as $userId) {
            $fetchUserWithIdCond = ['id' => $userId];
            $userDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdCond);
            if ($userDetails) {
                $fetchUsers[] = $userDetails;
            }
        }
    
        $this->response->respondCreated([
            'userDetails' => [$fetchUsers], 
            'deposits' => $validDeposits
        ]);
    }
    
    public function FetchAllProfitTableLimit($id)
    {
        $getId = explode(',', $id);
     
        $fetchProduct = $this->gateway->fetchPaginatedData(ProfitTable, $getId[1], $getId[0]);
    
        if (!$fetchProduct) {
            return;
        }
    
        $validUserIDs = [];
        $validProfits = [];
    
        foreach ($fetchProduct as $profit) {
            $userId = $profit['userid'];
            if ($this->gateway->idExists(RegTable, $userId)) {
                $validUserIDs[] = $userId;
                $validProfits[] = $profit;
            }
        }
    
        $fetchUsers = [];
        foreach (array_unique($validUserIDs) as $userId) {
            $userDetails = $this->gateway->fetchData(RegTable, ['id' => $userId]);
            if ($userDetails) {
                $fetchUsers[] = $userDetails;
            }
        }
    
        $this->response->respondCreated([
            'userDetails' => [$fetchUsers], 
            'deposits' => $validProfits
        ]);
    }
    public function FetchAlltradersssLimit($id)
    {
        $getId = explode(',', $id);
        $fetchWallet = $this->gateway->fetchPaginatedData(thecopytraders, $getId[1], $getId[0]);
        if ($fetchWallet) {
            $this->response->respondCreated($fetchWallet);
        } 
    }
    public function FetchAllwalletLimit($id)
    {
        $getId = explode(',', $id);
        $fetchWallet = $this->gateway->fetchPaginatedData(wallet, $getId[1], $getId[0]);
        if ($fetchWallet) {
            $this->response->respondCreated($fetchWallet);
        } 
    }
    public function FetchAllBankWithdrawalLimit($id)
    {
        $getId = explode(',', $id);
     
        $fetchProduct = $this->gateway->fetchPaginatedData(bnkwithdrawalTable, $getId[1], $getId[0]);
    
        if (!$fetchProduct) {
            return;
        }
    
        $validUserIDs = [];
        $validWithdrawals = [];
    
        foreach ($fetchProduct as $withdrawal) {
            $userId = $withdrawal['userid'];
            if ($this->gateway->idExists(RegTable, $userId)) {
                $validUserIDs[] = $userId;
                $validWithdrawals[] = $withdrawal;
            }
        }
    
        $fetchUsers = [];
        foreach (array_unique($validUserIDs) as $userId) {
            $userDetails = $this->gateway->fetchData(RegTable, ['id' => $userId]);
            if ($userDetails) {
                $fetchUsers[] = $userDetails;
            }
        }
    
        $this->response->respondCreated([
            'userDetails' => [$fetchUsers], 
            'deposits' => $validWithdrawals
        ]);
    }

    public function FetchAllUProofLimit($id)
    {
        $getId = explode(',', $id);
        
        $fetchProduct = $this->gateway->fetchPaginatedData(uploadproof, $getId[1], $getId[0]);
        if ($fetchProduct) {
            $this->response->respondCreated($fetchProduct);
        } 
    }
    public function AdminFetchAllUserLimit($id)
    {
        $getId = explode(',', $id);
        $fetchProduct = $this->gateway->fetchPaginatedData(RegTable, $getId[1], $getId[0]);
        if ($fetchProduct) {
            $this->response->respondCreated($fetchProduct);
        } 
    }
    public function FetchAllUProofKyc($id)
    {
        $getId = explode(',', $id);
        $fetchProduct = $this->gateway->fetchPaginatedData(kyc, $getId[1], $getId[0]);
        if ($fetchProduct) {
            $this->response->respondCreated($fetchProduct);
        } else {
            $errors[] = 'could not fetch any kyc record';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }
  
    public function checkAdminSession($data)
    {
        $userId = $data["sessionGetUserID"];
        if (isset($_SESSION["AdminSession"]) && $_SESSION["AdminSession"] === intval($userId)) {
            $this->response->respondCreated("valid");
        } else {
            $errors[] = 'invalid';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }
    }


}