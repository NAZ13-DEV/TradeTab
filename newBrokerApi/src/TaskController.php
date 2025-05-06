<?php
session_start();
// session_destroy();

class TaskController
{
    private $Usergateway;
    private $Deletegateway;
    private $DepositGateway;
    private $WithdrawalGateway;
    private $AdminGateway;
    private $AuthGateway;
    private $Database;
    private $pdo;

    public function __construct()
    {
        $this->Database = new Database();
        // $this->pdo =  new PDO('mysql:host=' . $_ENV["DB_HOST"] . ';dbname=' . $_ENV["DB_NAME"], $_ENV["DB_USER"], $_ENV["DB_PASS"], []);
        $this->pdo =  $this->Database->check_Database($_ENV["DB_NAME"]);
        $this->Usergateway = new UserGateway($this->pdo);
        $this->Deletegateway = new DeleteGateway($this->pdo);
        $this->DepositGateway = new DepositGateway($this->pdo);
        $this->WithdrawalGateway = new WithdrawalGateway($this->pdo);
        $this->AdminGateway = new AdminGateway($this->pdo);
        // $this->AuthGateway = new AuthGateway($this->pdo);
        // var_dump($this->pdo);
    }

    public function processRequest(string $method, $type, ?string $id): void
    {
       
        if ($id === null) {
            switch ($method) {
                case 'GET':
                    switch ($type) {
                 
                        case 'webauthnChallenge':
                            $this->AuthGateway->creatAuth();
                            break;
                        case 'fetchWallet':
                            $this->Usergateway->fetchWallet();
                            break;
                            case 'edituser':
                                $data = (array) json_decode(file_get_contents("php://input"), true);
                                $this->AdminGateway->edituser($data);
                                break;
                        
                            case 'editShare':
                                $data = (array) json_decode(file_get_contents("php://input"), true);
                                $this->AdminGateway->editShare($data);
                                break;
                            case 'editPlan':
                                $data = (array) json_decode(file_get_contents("php://input"), true);
                                $this->AdminGateway->editPlan($data);
                                break;
                            case 'editcryptoWithdrawal':
                                $data = (array) json_decode(file_get_contents("php://input"), true);
                                $this->AdminGateway->editcryptoWithdrawal($data);
                                break;
                            case 'editBankWithdrawal':
                                $data = (array) json_decode(file_get_contents("php://input"), true);
                                $this->AdminGateway->editBankWithdrawal($data);
                                break;
                            case 'editprofitLoss':
                                $data = (array) json_decode(file_get_contents("php://input"), true);
                                $this->AdminGateway->editprofitLoss($data);
                                break;
                                case 'FetchAllUser':
                                    $this->AdminGateway->AdminFetchUser();
                                    break;
                                case 'wallet':
                                    $this->AdminGateway->wallet();
                                    break;
                                case 'FetchAllDeposit':
                                    $this->AdminGateway->FetchAllDeposit();
                                    break;
                                case 'FetchAllShare':
                                    $this->AdminGateway->FetchAllShare();
                                    break;
                                case 'FetchAllPlan':
                                    $this->AdminGateway->FetchAllPlan();
                                    break;
                                case 'FetchAllKyc':
                                    $this->AdminGateway->FetchAllKyc();
                                    break;
                                case 'FetchAllCryptoWithdrawal':
                                    $this->AdminGateway->FetchAllCryptoWithdrawal();
                                    break;
                                case 'FetchAllBankWithdrawal':
                                    $this->AdminGateway->FetchAllBankWithdrawal();
                                    break;
                                case 'FetchAllprofitLoss':
                                    $this->AdminGateway->FetchAllprofitLoss();
                                    break;
                                case 'fetchAdminDetails':
                                    $this->AdminGateway->fetchAdminDetails();
                                    break;
                                    case 'ViewuploadProof':
                                        $this->AdminGateway->ViewuploadProof();
                                        break;
                                        case 'FetchAllTrade':
                                            $this->AdminGateway->FetchAllTrade();
                                            break;
                                            case 'Viewuploadkyc':
                                                $this->AdminGateway->Viewuploadkyc();
                                                break;
                    }
                    break;
                case 'PATCH':
                    switch ($type) {
                        case 'editAdminDetails':
                            $data = (array) json_decode(file_get_contents("php://input"), true);
                            $this->AdminGateway->editAdminDetails($data);
                            break;
                            case 'changeSignalMessage':
                                $data = (array) json_decode(file_get_contents("php://input"), true);
                                $this->AdminGateway->changeSignalMessage($data);
                                break;
                           
                                
                    }
                    break;
                case 'PUT':
                    switch ($type) {
                        case 'edituser':
                            $data = (array) json_decode(file_get_contents("php://input"), true);
                            $this->AdminGateway->edituser($data);
                            break;
                            case 'editDeposit':
                                $data = (array) json_decode(file_get_contents("php://input"), true);
                                $this->AdminGateway->editDeposit($data);
                                break;
                                case 'editShare':
                                    $data = (array) json_decode(file_get_contents("php://input"), true);
                                    $this->AdminGateway->editShare($data);
                                    break;
                                case 'editPlan':
                                    $data = (array) json_decode(file_get_contents("php://input"), true);
                                    $this->AdminGateway->editPlan($data);
                                    break;
                                case 'editcryptoWithdrawal':
                                    $data = (array) json_decode(file_get_contents("php://input"), true);
                                    $this->AdminGateway->editcryptoWithdrawal($data);
                                    break;
                                case 'editBankWithdrawal':
                                    $data = (array) json_decode(file_get_contents("php://input"), true);
                                    $this->AdminGateway->editBankWithdrawal($data);
                                    break;
                                case 'editprofitLoss':
                                    $data = (array) json_decode(file_get_contents("php://input"), true);
                                    $this->AdminGateway->editprofitLoss($data);
                                    break;
                    }
                    break;
                case 'POST':
                    switch ($type) {
                        case 'checkAdminSession':
                            $data = (array) json_decode(file_get_contents("php://input"), true);
                            $this->AdminGateway->checkAdminSession($data);
                            break;
                            case 'checkSession':
                                $checkSessiondata = (array) json_decode(file_get_contents('php://input'), true);
                                $this->Usergateway->checkSession($checkSessiondata);
                                break;
                        case 'logoutUser':
                            $this->Usergateway->logoutUser();
                            break;
                        case 'adminRegisterUser':
                            $regUserdata = json_decode(file_get_contents('php://input'), true);
                            $this->AdminGateway->adminRegisterUser($regUserdata);
                            break;
                        case 'Adminlogin':
                            $adminData = json_decode(file_get_contents('php://input'), true);
                            $this->AdminGateway->AdminLogin($adminData);
                            break;

                        case 'registerUser':
                            $adminData = json_decode(file_get_contents('php://input'), true);
                            $this->Usergateway->registerUser($adminData);
                            break;
                        case 'verUser':
                            $verUserdata = (array) json_decode(file_get_contents('php://input'), true);
                            $this->Usergateway->verUser($verUserdata);
                            break;
                        case 'ProcessLog':
                            $ProcessLogdata = (array) json_decode(file_get_contents('php://input'), true);
                            $this->Usergateway->ProcessLog($ProcessLogdata);
                            break;
                        case 'ProcessReset':
                            $ProcessResetdata = (array) json_decode(file_get_contents('php://input'), true);
                            $this->Usergateway->ProcessReset($ProcessResetdata);
                            break;
                        case 'verifyResetPassword':
                            $verifyResetPassworddata = (array) json_decode(file_get_contents('php://input'), true);
                            $this->Usergateway->verifyResetPassword($verifyResetPassworddata);
                            break;
                        case 'changePassword':
                            $changePassworddata = (array) json_decode(file_get_contents('php://input'), true);
                            $this->Usergateway->changePassword($changePassworddata);
                            break;
                        case 'saveTrade':
                            $saveTradeData = (array) json_decode(file_get_contents('php://input'), true);
                            $this->Usergateway->saveTrade($saveTradeData);
                            break;
                        case 'depositPage':
                            $depositPagedata = (array) json_decode(file_get_contents('php://input'), true);
                            $this->DepositGateway->depositPage($depositPagedata);
                            break;
                        case 'uploadproof':
                            $depositPagedata = $_POST;
                            $file = $_FILES;
                            $this->DepositGateway->uploadproof($depositPagedata, $file);
                            break;
                        case 'bankWithdrawal':
                            $bankWithdrawaldata = (array) json_decode(file_get_contents('php://input'), true);
                            $this->WithdrawalGateway->bankWithdrawal($bankWithdrawaldata);
                            break;
                        case 'CryptoWithdrawal':
                            $CryptoWithdrawaldata = (array) json_decode(file_get_contents('php://input'), true);
                            $this->WithdrawalGateway->CryptoWithdrawal($CryptoWithdrawaldata);
                            break;
                            case 'plandepositPage':
                                $plandepositPage =  (array) json_decode(file_get_contents('php://input'), true);
                                ;
                                $this->DepositGateway->plandepositPage($plandepositPage);
                                break;
                                case 'updateProfilePics':
                                    $updateProfilePics = $_FILES;
                                    $id =  $_POST;
                                    $this->Usergateway->updateProfilePics($id, $updateProfilePics);
                                    break;
                                    case'AdminMakeDeposit':
                                        $adminData =   (array) json_decode(file_get_contents('php://input'), true);
                                        $this->AdminGateway->AdminMakeDeposit($adminData);
                                        break;
                                    case 'AdminMakeProfittrade':
                                        $adminData =  $_POST;
                                        $this->AdminGateway->AdminMakeProfittrade($adminData);
                                        break;
                                    case 'AdminMakeProfit':
                                        $adminData =  $_POST;
                                        $this->AdminGateway->AdminMakeProfit($adminData);
                                        break;
                                    case 'AdminMakeLosstrade':
                                        $adminData =  $_POST;
                                        $this->AdminGateway->AdminMakeLosstrade($adminData);
                                        break;
                                    case 'AdminMakeLoss':
                                        $adminData =  $_POST;
                                        $this->AdminGateway->AdminMakeLoss($adminData);
                                        break;
                                    case 'AdminMakeShares':
                                        $adminData =  $_POST;
                                        $this->AdminGateway->AdminMakeShares($adminData);
                                        break;
                                    case 'AdminMakeRoiShares':
                                        $adminData =  $_POST;
                                        $this->AdminGateway->AdminMakeRoiShares($adminData);
                                        break;
                                        case 'submitWallet':
                                            $adminData =  $_POST;
                                            $this->AdminGateway->submitWallet($adminData);
                                            break;
                                            case 'uploadriverKyc':
                                                $id = $_POST;
                                                $Data =  $_FILES;
                                                $this->Usergateway->uploadriverKyc($id, $Data);
                                                break;
                                   
                    }
            }
        } else {
            switch ($method) {
                case 'GET':
                    switch ($type) {
                        case 'FetchAllUProofKyc':
                            $this->AdminGateway->FetchAllUProofKyc($id);
                            break;
                        case 'fetchUserDetails':
                            $this->Usergateway->fetchUserDetails($id);
                            break;
                        case 'fetchUserTrade':
                            $this->Usergateway->fetchUserTrade($id);
                            break;
                            case 'fetchAllHistory':
                                $this->DepositGateway->fetchAllHistory($id);
                                break;
                            case 'fetchAllNotification':
                                $this->Usergateway->fetchAllNotification($id);
                                break;
                                case 'fetchSiteDetails':
                                    $this->Usergateway->fetchSiteDetails();
                                    break;
                                case 'fetchUserDetailsWithTransInfo':
                                    $this->Usergateway->fetchUserDetailsWithTransInfo($id);
                                    break;
                            case 'checkUserStatus':
                                $this->Usergateway->checkUserStatus($id);
                                break;
                            case 'fetchUserActivity':
                                $this->DepositGateway->fetchUserActivity($id);
                                break;
                            case 'fetchOneUserActivity':
                                $this->DepositGateway->fetchOneUserActivity($id);
                                break;
                            case 'fetchUserActivityLimit':
                                $this->DepositGateway->fetchUserActivityLimit($id);
                                break;
                            case 'checkDepositPage':
                                $this->DepositGateway->fetchOneDeposit($id);
                                break;
                            case 'checkSharesPage':
                                $this->DepositGateway->checkSharesPage($id);
                                break;
                            case 'checkPlanDepositPage':
                                $this->DepositGateway->checkPlanDepositPage($id);
                                break;
                            case 'fetchUseShareAll':
                                $this->DepositGateway->fetchUseShareAll($id);
                                break;
                            case 'fetchUserDepositAll':
                                $this->DepositGateway->fetchUserDepositAll($id);
                                break;
                            case 'fetchUserPlanDepositAll':
                                $this->DepositGateway->fetchUserPlanDepositAll($id);
                                break;
    
                            case 'fetchUserWithdrawalAll':
                                $this->WithdrawalGateway->fetchUserWithdrawalAll($id);
                                break;
                            case 'fetchonesharesDetails':
                                $this->DepositGateway->fetchonesharesDetails($id);
                                break;
                            case 'fetchonedepositrDetails':
                                $this->DepositGateway->fetchOneDeposit($id);
                                break;
                            case 'fetchonePlandepositrDetails':
                                $this->DepositGateway->fetchonePlandepositrDetails($id);
                                break;
                            case 'fetchoneWithdrawal':
                                $this->WithdrawalGateway->fetchoneWithdrawal((string)$id);
                                break;
                            case 'fetchUserProfitLoss':
                                $this->AdminGateway->fetchUserProfitLoss((string)$id);
                                break;
                            case 'fetchoneprofitloss':
                                $this->AdminGateway->fetchoneprofitloss((string)$id);
                                break;
                            case 'fetchReferral':
                                $this->Usergateway->fetchReferral((string)$id);
                                break;
                            case 'FetchAllUserLimit':
                                $this->AdminGateway->AdminFetchAllUserLimit($id);
                                break;
                            case 'FetchPlanLimit':
                                $this->AdminGateway->FetchPlanLimit($id);
                                break;
                            case 'FetchDepositLimit':
                                $this->AdminGateway->AdminFetchDepositLimit($id);
                                break;
                            case 'FetchSharesLimit':
                                $this->AdminGateway->AdminFetchSharesLimit($id);
                                break;
                            case 'FetchAllCryptoWithdrawalLimit':
                                $this->AdminGateway->FetchAllCryptoWithdrawalLimit($id);
                                break;
                            case 'FetchAllKycLimit':
                                $this->AdminGateway->FetchAllKycLimit($id);
                                break;
                            case 'FetchAllprofitLossLimit':
                                $this->AdminGateway->FetchAllProfitTableLimit($id);
                                break;
                            case 'FetchAllBankWithdrawalLimit':
                                $this->AdminGateway->FetchAllBankWithdrawalLimit($id);
                                break;
                            case 'FetchAllwalletLimit':
                                $this->AdminGateway->FetchAllwalletLimit($id);
                                break;
                                case 'FetchAllUProofLimit':
                                    $this->AdminGateway->FetchAllUProofLimit($id);
                                    break;
                            case 'FetchAllUsers':
                                $this->AdminGateway->AdminFetchSingleUser($id);
                                break;
                            case 'fetchDepositWithId':
                                $this->DepositGateway->fetchOneDeposit($id);
                                break;
                            case 'fetchShareWithId':
                                $this->DepositGateway->fetchShareWithId($id);
                                break;
                            case 'fetchPlanWithId':
                                $this->DepositGateway->fetchPlanWithId($id);
                                break;
                            case 'fetchKycWithId':
                                $this->DepositGateway->fetchCryptoWithdrawalWithId($id);
                                break;
                            case 'fetchKycWithuserId':
                                $this->DepositGateway->fetchKycWithuserId($id);
                                break;
                            case 'fetchCryptoWithdrawalWithId':
                                $this->DepositGateway->fetchCryptoWithdrawalWithId($id);
                                break;
                            case 'fetchBankWithdrawalWithId':
                                $this->DepositGateway->fetchBankWithdrawalWithId($id);
                                break;
                            case 'fetchprofitLossWithId':
                                $this->DepositGateway->fetchprofitLossWithId($id);
                                break;
                            case 'checkKyc':
                                $this->DepositGateway->checkKyc($id);
                                break;
                                case 'FetchAllTradeLimit':
                                    $this->AdminGateway->FetchAllTradeLimit($id);
                                    break;
                            
                    }
                    break;
                case 'PUT':
                    switch ($type) {
                        case 'edituserByUser':
                            $data = (array) json_decode(file_get_contents("php://input"), true);
                            $this->AdminGateway->edituserByUser($data, $id);
                            break;
                        case 'editpassByUser':
                            $PasswordByUSer = (array) json_decode(file_get_contents("php://input"), true);
                                // var_dump( $PasswordByUSer );
                                $this->Usergateway->updateUserPasswordByUSer($PasswordByUSer,$id);
                                break;
                             
                             
                               
                    }
                    break;
                case 'PATCH':
                    switch ($type) {
                        case 'disableUserLogin':
                            $this->AdminGateway->disableUserLogin($id);
                            break;
                        case 'updateActivitystatus':
                            $this->AdminGateway->updateActivitystatus($id);
                            break;
                        case 'enableUserLogin':
                            $this->AdminGateway->enableUserLogin($id);
                            break;
                        case 'disableEmailAlert':
                            $this->AdminGateway->disableEmailAlert($id);
                            break;
                        case 'enabledEmailAlert':
                            $this->AdminGateway->enabledEmailAlert($id);
                            break;
                        case 'disapproveDeposit':
                            $this->AdminGateway->disapproveDeposit($id);
                            break;
                        case 'disapproveShare':
                            $this->AdminGateway->disapproveShare($id);
                            break;
                        case 'approveDeposit':
                            $this->AdminGateway->approveDeposit($id);
                            break;
                        case 'approveShares':
                            $this->AdminGateway->approveShares($id);
                            break;
                        case 'disableAlertMessage':
                            $this->AdminGateway->disableAlertMessage($id);
                            break;
                        // case 'disableCron':
                        //     $this->AdminGateway->disableCron($id);
                        //     break;
                        case 'disapproveKyc':
                            $this->AdminGateway->disapproveKyc($id);
                            break;
                        case 'approvePlan':
                            $this->AdminGateway->approvePlan($id);
                            break;
                        case 'disapprovePlan':
                            $this->AdminGateway->disapprovePlan($id);
                            break;
                        case 'approveKyc':
                            $this->AdminGateway->approveKyc($id);
                            break;
                        case 'enableAlertMessage':
                            $this->AdminGateway->enableAlertMessage($id);
                        // case 'enableCron':
                        //     $this->AdminGateway->enableCron($id);
                        //     break;
                        case 'disapprovecryptowithdrawal':
                            $this->AdminGateway->disapprovecryptowithdrawal($id);
                            break;
                        case 'approvecryptowithdrawal':
                            $this->AdminGateway->approvecryptowithdrawal($id);
                            break;
                        case 'disapproveBankwithdrawal':
                            $this->AdminGateway->disapproveBankwithdrawal($id);
                            break;
                        case 'approveBankwithdrawal':
                            $this->AdminGateway->approveBankwithdrawal($id);
                            break;
                            case 'outComeProfit':
                                $this->AdminGateway->outComeProfit($id);
                                break;
                            case 'outComeLoss':
                                $this->AdminGateway->outComeLoss($id);
                                break;

                    }
                    break;

                case 'DELETE':
                    switch ($type) {
                        case 'deletShare':
                            $this->Deletegateway->deletShare($id);
                            break;
                        case 'deletDeposit':
                            $this->Deletegateway->deletDeposit($id);
                            break;
                        case 'deletPlanDeposit':
                            $this->Deletegateway->deletPlanDeposit($id);
                            break;
                        case 'deletUser':
                            $this->Deletegateway->deletUser($id);
                            break;
                        case 'deletewallet':
                            $this->Deletegateway->deletewallet($id);
                            break;
                        case 'deleteKyc':
                            $this->Deletegateway->deleteKyc($id);
                            break;
                        case 'deleteDeposit':
                            $this->Deletegateway->deleteDeposit($id);
                            break;
                            
                        case 'deleteShares':
                            $this->Deletegateway->deleteShares($id);
                            break;
                        case 'deletecryptowithdrawal':
                            $this->Deletegateway->deletecryptowithdrawal($id);
                            break;
                        case 'deleteBankwithdrawal':
                            $this->Deletegateway->deleteBankwithdrawal($id);
                            break;
                        case 'deleteprofitLoss':
                            $this->Deletegateway->deleteProfitTable($id);
                            break;
                        case 'deletePlan':
                            $this->Deletegateway->deletePlan($id);
                            break;
                            case 'deletupload':
                                $this->Deletegateway->deletupload($id);
                                break;
                            case 'deletkyc':
                                $this->Deletegateway->deletkyc($id);
                                break;
                    }
            }
        }
    }
}
