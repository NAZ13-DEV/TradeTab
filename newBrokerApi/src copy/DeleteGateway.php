<?php

class DeleteGateway
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

        $this->pdovar = new PDO('mysql:host=' . $_ENV["DB_HOST"] . ';dbname=' . $_ENV["DB_NAME"], $_ENV["DB_USER"], $_ENV["DB_PASS"], []);
        $this->createDbTables = new CreateDbTables($this->pdovar);
        $this->mailsender = new EmailSender();
        $this->response = new JsonResponse();
        $this->gateway = new TaskGatewayFunction($this->pdovar);
        $this->encrypt = new Encrypt();
        $this->conn = new Database();
        $this->createDbTables = new CreateDbTables($this->pdovar);
    }



    public function deletDeposit($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, depositTable, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('
 reinitiate another deposit, The previous record has been deleted.');
        } else {
            $errors[] = 'could not delete transaction';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function deletPlanDeposit($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, usersPlan, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('
 reinitiate another plan deposit, The previous record has been deleted.');
        } else {
            $errors[] = 'could not delete transaction';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function unsubscribe($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, copytrade, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('true');
        } else {
            $errors[] = 'could not delete transaction';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function deletShare($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, Shares, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('
 reinitiate another Purchase, The previous record has been deleted.');
        } else {
            $errors[] = 'could not delete transaction';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function deleteDeposit($id)
    {
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(depositTable, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['amount'];
            $fetchUserWithIdcondition = ['id' => $fetchDeposit['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $newbalance =   $balance -   $oldamount;
                $columnToBeUpdate  = ['balance'];
                $dataToUpdateUser = [$newbalance ];
                $updateReference = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $fetchDeposit['userid']);
                if ($updated) {
                    $columnOfDeleteForUser = 'id';
                    $deletDeposit = $this->conn->deleteData($this->pdovar, depositTable, $columnOfDeleteForUser, $id);
                    if ($deletDeposit) {
                        return $this->response->respondCreated('this deposit has been deleted successfully');
                    } else {
                        $errors[] = 'could not delete transaction';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
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
    public function deleteShares($id)
    {
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(Shares, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['amount'];
            $fetchUserWithIdcondition = ['id' => $fetchDeposit['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $newbalance =   $balance -   $oldamount;
                $columnToBeUpdate  = ['balance'];
                $dataToUpdateUser = [$newbalance ];
                $updateReference = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $fetchDeposit['userid']);
                if ($updated) {
                    $columnOfDeleteForUser = 'id';
                    $deletDeposit = $this->conn->deleteData($this->pdovar, Shares, $columnOfDeleteForUser, $id);
                    if ($deletDeposit) {
                        return $this->response->respondCreated('this deposit has been deleted successfully');
                    } else {
                        $errors[] = 'could not delete transaction';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
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
    public function deletecryptowithdrawal($id)
    {
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(cryptwithdrawalTable, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['amount'];
            $fetchUserWithIdcondition = ['id' => $fetchDeposit['userId']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $newbalance =   $balance -   $oldamount;
                $columnToBeUpdate  = ['balance'];
                $dataToUpdateUser = [$newbalance ];
                $updateReference = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $fetchDeposit['userId']);
                if ($updated) {
                    $columnOfDeleteForUser = 'id';
                    $deletDeposit = $this->conn->deleteData($this->pdovar, cryptwithdrawalTable, $columnOfDeleteForUser, $id);
                    if ($deletDeposit) {
                        return $this->response->respondCreated('this crypto withdrawal has been deleted successfully');
                    } else {
                        $errors[] = 'could not delete transaction';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
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
            $errors[] = 'could not fetch any withdrawal';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }



    }
    public function deleteBankwithdrawal($id)
    {
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(bnkwithdrawalTable, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['amount'];
            $fetchUserWithIdcondition = ['id' => $fetchDeposit['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $newbalance =   $balance -   $oldamount;
                $columnToBeUpdate  = ['balance'];
                $dataToUpdateUser = [$newbalance ];
                $updateReference = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $fetchDeposit['userid']);
                if ($updated) {
                    $columnOfDeleteForUser = 'id';
                    $deletDeposit = $this->conn->deleteData($this->pdovar, bnkwithdrawalTable, $columnOfDeleteForUser, $id);
                    if ($deletDeposit) {
                        return $this->response->respondCreated('this deposit has been deleted successfully');
                    } else {
                        $errors[] = 'could not delete transaction';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
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
            $errors[] = 'could not fetch any withdrawal';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }



    }
    public function deleteProfitTable($id)
    {
        $fetchUserWithIdcond = ['id' => $id];
        $fetchDeposit = $this->gateway->fetchData(ProfitTable, $fetchUserWithIdcond);
        if ($fetchDeposit) {
            (float) $oldamount = $fetchDeposit['amount'];
            $fetchUserWithIdcondition = ['id' => $fetchDeposit['userid']];
            $fetchUserDetails = $this->gateway->fetchData(RegTable, $fetchUserWithIdcondition);
            if ($fetchUserDetails) {
                $balance = (float) $fetchUserDetails['balance'];
                $total_pro = (float) $fetchUserDetails['total_pro'];
                $newbalance =   $balance -   $oldamount;
                $newprofitBalance =   $total_pro -   $oldamount;
                $columnToBeUpdate  = ['balance','total_pro'];
                $dataToUpdateUser = [$newbalance,$newprofitBalance];
                $updateReference = 'id';
                $updated = $this->conn->updateData($this->pdovar, RegTable, $columnToBeUpdate, $dataToUpdateUser, $updateReference, $fetchDeposit['userid']);
                if ($updated) {
                    $columnOfDeleteForUser = 'id';
                    $deletDeposit = $this->conn->deleteData($this->pdovar, ProfitTable, $columnOfDeleteForUser, $id);
                    if ($deletDeposit) {
                        return $this->response->respondCreated('this deposit has been deleted successfully');
                    } else {
                        $errors[] = 'could not delete transaction';
                        if (!empty($errors)) {
                            $this->response->respondUnprocessableEntity($errors);
                            return;
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
            $errors[] = 'could not fetch any withdrawal';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
            }
        }



    }


    public function deletUser($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, RegTable, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('this user has been deleted successfully');
        } else {
            $errors[] = 'could not delete transaction';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function deletupload($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, uploadproof, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('this upload proof has been deleted successfully');
        } else {
            $errors[] = 'could not delete upload';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function deletkyc($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, kyc, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('this upload proof has been deleted successfully');
        } else {
            $errors[] = 'could not delete upload';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function deletePlan($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, usersPlan, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('this plan has been deleted successfully');
        } else {
            $errors[] = 'could not delete plan';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function deletewallet($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, wallet, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('this wallet has been deleted successfully');
        } else {
            $errors[] = 'could not delete wallet';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function deleteKyc($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, kyc, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('this document has been deleted sucessfully');
        } else {
            $errors[] = 'could not delete document';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }

    public function deleteTrade($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, trade, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('this trade has been deleted sucessfully');
        } else {
            $errors[] = 'could not delete trade';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }
    public function deletetraders($id)
    {
        $columnOfDeleteForUser = 'id';
        $deletDeposit = $this->conn->deleteData($this->pdovar, thecopytraders, $columnOfDeleteForUser, $id);
        if ($deletDeposit) {
            return $this->response->respondCreated('this trader has been deleted sucessfully');
        } else {
            $errors[] = 'could not delete trader';
            if (!empty($errors)) {
                $this->response->respondUnprocessableEntity($errors);
                return;
            }
        }
    }



}
