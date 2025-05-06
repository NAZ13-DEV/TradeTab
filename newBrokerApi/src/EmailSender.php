<?php
require ("constants.php");

require '../phpmailer/phpmailer/src/PHPMailer.php';
require '../phpmailer/phpmailer/src/SMTP.php';
require '../phpmailer/phpmailer/src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


class EmailSender
{
  private $stmp;
  public function __construct()
  {
    $this->stmp = new PHPMailer();
    $this->stmp->SMTPDebug = SMTP::DEBUG_SERVER; 
    $this->stmp->isSMTP();
    $this->stmp->Host = MAILHOST;
    $this->stmp->SMTPAuth = true;
    $this->stmp->Username = MAILUSER;
    $this->stmp->Password = MAILPASS;
    $this->stmp->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $this->stmp->Port = 465;
    $this->stmp->SMTPDebug = false;
    $this->stmp->setFrom(sitemail, sitename);
    $this->stmp->addReplyTo(sitemail, sitemail);
    $this->stmp->addCC(sitemail);
  }
  public function sendRegistrationEmail($email, $fullname, $userid, $EncrypteduserEmail, $encodeId)
  {
    $this->stmp->addAddress($email, $fullname);
    $this->stmp->addBCC( $email);
    $this->stmp->isHTML(true);
    $this->stmp->Subject = 'Welcome to ' . sitename;
    $this->stmp->Body = '<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="background:#000000">
  
    <table class="body-wrap"
      style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 30%; background-color: #ffffff; margin: 0; border-radius:10px; margin:auto; text-align:center;">
      <tr>
        <td class="container" width="600"
          style=" display: block !important; max-width: 600px !important; clear: both !important; " valign="top">
          <div class="content" style="padding: 20px;">
            <table class="main" width="100%" cellpadding="0" cellspacing="0"
              style="border: 1px solid rgba(130, 134, 156, 0.15);" bgcolor="transparent">
              <tr>
                <td style="margin:auto; text-align:center;">
                  <img class="avatar avatar-xxl avatar-4x3" src="' . apiLink . 'img/logo.png"
                    alt="Image Description" data-hs-theme-appearance="default" style="height:120px; width:120px; ">
                </td>
              </tr>
              <tr>
                <td class="alert alert-dark border-0"
                  style="color:#ffffff; background-color: #00bdff; padding: 20px; border-radius: 0;" align="center"
                  valign="top">
                  Successful Registration
                </td>
              </tr>
              <tr>
                <td class="content-wrap" style="padding: 20px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px">
                        <p></p> <strong
                          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">Dear
                          [' . $fullname . '],</strong>
                        <p>Thank you for registering with us! We are excited to have you on board.</p>
                        <p>To complete your registration and confirm your email address, please click the button below:
                        </p>
                        <a href="' . appLink . 'utillity/verify_email?email=' . $EncrypteduserEmail . '&mail=' . $email . '"
                          style="display: inline-block; padding: 10px 20px; background-color: #00bdff; color: #fff; text-decoration: none; border-radius: 5px;">Confirm
                          Email Address</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px 10px 20px;">
  
                        <p style="text-align: center;">
                        <p>Please note that this link is valid for the next 24 hours.</p>
                        <p>If you did not register on our platform, please ignore this email.</p>
                        <p>If you have any questions or concerns, feel free to contact our support team at [' . sitemail . '].</p>
                        </p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; text-align: center;"
                        valign="top">
                        <p>Thank you for choosing [' . sitename . ']. We look forward to serving you!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td
          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
          valign="top"></td>
      </tr>
    </table>
    <!--end table-->
  
  </body>
  
  </html>';
    return $this->stmp->send();
  }

  public function sendCodeEmail($email, $fullname, $verCode)
  {
    $this->stmp->addAddress($email, $fullname);
    $this->stmp->addBCC($email);
    $this->stmp->isHTML(true);
    $this->stmp->Subject = 'Request For 2 Factor Authentication Activation';
    $this->stmp->Body = '<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="background:#000000">
  
    <table class="body-wrap"
      style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 30%; background-color: #ffffff; margin: 0; border-radius:10px; margin:auto; text-align:center;">
      <tr>
        <td class="container" width="600"
          style=" display: block !important; max-width: 600px !important; clear: both !important; " valign="top">
          <div class="content" style="padding: 20px;">
            <table class="main" width="100%" cellpadding="0" cellspacing="0"
              style="border: 1px solid rgba(130, 134, 156, 0.15);" bgcolor="transparent">
              <tr>
                <td style="margin:auto; text-align:center;">
                  <img class="avatar avatar-xxl avatar-4x3" src="' . apiLink . 'img/logo.png"
                    alt="Image Description" data-hs-theme-appearance="default" style="height:120px; width:120px; ">
                </td>
              </tr>
              <tr>
                <td class="alert alert-dark border-0"
                  style="color:#ffffff; background-color: #00bdff; padding: 20px; border-radius: 0;" align="center"
                  valign="top">
                  2 Factor Authentication Activation code
                </td>
              </tr>
              <tr>
                <td class="content-wrap" style="padding: 20px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px">
                        <p></p> <strong
                          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">Dear
                          [' . $fullname . '],</strong>
                        <p>you requested for the activation of your 2 Factor Authentication.</p>
                        <p>To complete this action, use this code this below:
                        </p>
                        <a style="display: inline-block; padding: 10px 20px; background-color: #00bdff; color: #fff; text-decoration: none; border-radius: 5px;">'.$verCode.'</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px 10px 20px;">
  
                        <p style="text-align: center;">
                        <p>Please note that this code is valid for the next 24 hours.</p>
                        <p>If you did not request for this code on account, please ignore this email.</p>
                        <p>If you have any questions or concerns, feel free to contact our support team at [' . sitemail . '].</p>
                        </p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; text-align: center;"
                        valign="top">
                        <p>Thank you for choosing [' . sitename . ']. We look forward to serving you!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td
          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
          valign="top"></td>
      </tr>
    </table>
    <!--end table-->
  
  </body>
  
  </html>';
    return $this->stmp->send();
  }

  public function ConfirmCodeCreationEmail($email, $fullname)
  {
    $this->stmp->addAddress($email, $fullname);
    $this->stmp->addBCC($email);
    $this->stmp->isHTML(true);
    $this->stmp->Subject = 'Your 2 Factor Authentication Pin Has Been Created And Activated';
    $this->stmp->Body = '<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="background:#000000">
  
    <table class="body-wrap"
      style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 30%; background-color: #ffffff; margin: 0; border-radius:10px; margin:auto; text-align:center;">
      <tr>
        <td class="container" width="600"
          style=" display: block !important; max-width: 600px !important; clear: both !important; " valign="top">
          <div class="content" style="padding: 20px;">
            <table class="main" width="100%" cellpadding="0" cellspacing="0"
              style="border: 1px solid rgba(130, 134, 156, 0.15);" bgcolor="transparent">
              <tr>
                <td style="margin:auto; text-align:center;">
                  <img class="avatar avatar-xxl avatar-4x3" src="' . apiLink . 'img/logo.png"
                    alt="Image Description" data-hs-theme-appearance="default" style="height:120px; width:120px; ">
                </td>
              </tr>
              <tr>
                <td class="alert alert-dark border-0"
                  style="color:#ffffff; background-color: #00bdff; padding: 20px; border-radius: 0;" align="center"
                  valign="top">
                  2 Factor Authentication Pin Has Been Created
                </td>
              </tr>
              <tr>
                <td class="content-wrap" style="padding: 20px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px">
                        <p></p> <strong
                          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">Dear
                          ['.$fullname.'],</strong>
                        <p>you requested for the activation of your 2 Factor Authentication has been Approved .</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px 10px 20px;">
  
                        <p style="text-align: center;">
                        <p>If you did not request for this action on this account, please ignore this email.</p>
                        <p>If you have any questions or concerns, feel free to contact our support team at [' . sitemail . '].</p>
                        </p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; text-align: center;"
                        valign="top">
                        <p>Thank you for choosing [' . sitename . ']. We look forward to serving you!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td
          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
          valign="top"></td>
      </tr>
    </table>
    <!--end table-->
  
  </body>
  
  </html>';
    return $this->stmp->send();
  }

  public function disableCodeCreationEmail($email, $fullname)
  {
    $this->stmp->addAddress($email, $fullname);
    $this->stmp->addBCC($email);
    $this->stmp->isHTML(true);
    $this->stmp->Subject = 'Your 2 Factor Authentication Has Been Disabled And has been deactivated';
    $this->stmp->Body = '<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="background:#000000">
  
    <table class="body-wrap"
      style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 30%; background-color: #ffffff; margin: 0; border-radius:10px; margin:auto; text-align:center;">
      <tr>
        <td class="container" width="600"
          style=" display: block !important; max-width: 600px !important; clear: both !important; " valign="top">
          <div class="content" style="padding: 20px;">
            <table class="main" width="100%" cellpadding="0" cellspacing="0"
              style="border: 1px solid rgba(130, 134, 156, 0.15);" bgcolor="transparent">
              <tr>
                <td style="margin:auto; text-align:center;">
                  <img class="avatar avatar-xxl avatar-4x3" src="' . apiLink . 'img/logo.png"
                    alt="Image Description" data-hs-theme-appearance="default" style="height:120px; width:120px; ">
                </td>
              </tr>
              <tr>
                <td class="alert alert-dark border-0"
                  style="color:#ffffff; background-color: #00bdff; padding: 20px; border-radius: 0;" align="center"
                  valign="top">
                  2 Factor Authentication Pin Has Been Deactivated
                </td>
              </tr>
              <tr>
                <td class="content-wrap" style="padding: 20px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px">
                        <p></p> <strong
                          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">Dear
                          ['.$fullname.'],</strong>
                        <p>you requested for the activation of your 2 Factor Authentication has been Approved .</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px 10px 20px;">
  
                        <p style="text-align: center;">
                        <p>If you did not request for this action on this account, please ignore this email.</p>
                        <p>If you have any questions or concerns, feel free to contact our support team at [' . sitemail . '].</p>
                        </p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; text-align: center;"
                        valign="top">
                        <p>Thank you for choosing [' . sitename . ']. We look forward to serving you!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td
          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
          valign="top"></td>
      </tr>
    </table>
    <!--end table-->
  
  </body>
  
  </html>';
    return $this->stmp->send();
  }

  public function ConfirmCodeChangeEmail($email, $fullname)
  {
    $this->stmp->addAddress($email, $fullname);
    $this->stmp->addBCC($email);
    $this->stmp->isHTML(true);
    $this->stmp->Subject = 'Your 2 Factor Authentication Pin Has Been updated ';
    $this->stmp->Body = '<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="background:#000000">
  
    <table class="body-wrap"
      style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 30%; background-color: #ffffff; margin: 0; border-radius:10px; margin:auto; text-align:center;">
      <tr>
        <td class="container" width="600"
          style=" display: block !important; max-width: 600px !important; clear: both !important; " valign="top">
          <div class="content" style="padding: 20px;">
            <table class="main" width="100%" cellpadding="0" cellspacing="0"
              style="border: 1px solid rgba(130, 134, 156, 0.15);" bgcolor="transparent">
              <tr>
                <td style="margin:auto; text-align:center;">
                  <img class="avatar avatar-xxl avatar-4x3" src="' . apiLink . 'img/logo.png"
                    alt="Image Description" data-hs-theme-appearance="default" style="height:120px; width:120px; ">
                </td>
              </tr>
              <tr>
                <td class="alert alert-dark border-0"
                  style="color:#ffffff; background-color: #00bdff; padding: 20px; border-radius: 0;" align="center"
                  valign="top">
                  2 Factor Authentication Pin Has Been Changed
                </td>
              </tr>
              <tr>
                <td class="content-wrap" style="padding: 20px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px">
                        <p></p> <strong
                          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">Dear
                          ['.$fullname.'],</strong>
                        <p>you requested for the change of your 2 Factor Authentication pin has been Approved .</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px 10px 20px;">
  
                        <p style="text-align: center;">
                        <p>If you did not request for this action on this account, please ignore this email.</p>
                        <p>If you have any questions or concerns, feel free to contact our support team at [' . sitemail . '].</p>
                        </p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; text-align: center;"
                        valign="top">
                        <p>Thank you for choosing [' . sitename . ']. We look forward to serving you!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td
          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
          valign="top"></td>
      </tr>
    </table>
    <!--end table-->
  
  </body>
  
  </html>';
    return $this->stmp->send();
  }
  public function resetPasswordEMail($email, $fullname, $token, $num)
  {
    $this->stmp->addAddress($email, $fullname);
    $this->stmp->addBCC($email);
    $this->stmp->isHTML(true);
    $this->stmp->Subject = 'Request to reset password';
    $this->stmp->Body = '<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="background:#000000">
  
    <table class="body-wrap"
      style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 30%; background-color: #ffffff; margin: 0; border-radius:10px; margin:auto; text-align:center;">
      <tr>
        <td class="container" width="600"
          style=" display: block !important; max-width: 600px !important; clear: both !important; " valign="top">
          <div class="content" style="padding: 20px;">
            <table class="main" width="100%" cellpadding="0" cellspacing="0"
              style="border: 1px solid rgba(130, 134, 156, 0.15);" bgcolor="transparent">
              <tr>
                <td style="margin:auto; text-align:center;">
                  <img class="avatar avatar-xxl avatar-4x3" src="' . apiLink . 'img/logo.png"
                    alt="Image Description" data-hs-theme-appearance="default" style="height:120px; width:120px; ">
                </td>
              </tr>
            
              <tr>
                <td class="content-wrap" style="padding: 20px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px">
                        <p></p> <strong
                          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">Dear
                          [' . $fullname . '],</strong>
                        <p>You recieved this email because we received a reset password request for your account.</p>
                        <p>To complete your resetting of password please click the button below:
                        </p>
                        <a href="' . apiLink . 'utillity/verifyResetPassword?T=' . $token . '&m=' . $email . '&n=' . $num . '"
                          style="display: inline-block; padding: 10px 20px; background-color: #00bdff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px 10px 20px;">
  
                        <p style="text-align: center;">
                        <p>Please note that this link is valid for the next 24 hours.</p>
                        <p>If you did not Request a password reset on our platform, please ignore this email.</p>
                        <p>If you have any questions or concerns, feel free to contact our support team at [' . sitemail . '].</p>
                        </p>
                      </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; text-align: center;"
                        valign="top">
                        <p>Thank you for choosing [' . sitename . ']. We look forward to serving you!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td
          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
          valign="top"></td>
      </tr>
    </table>
    <!--end table-->
  
  </body>
  
  </html>';
    return $this->stmp->send();
  }

  public function verifiedEMail($email, $fullname)
  {
    $this->stmp->addAddress($email, $fullname);
    $this->stmp->addBCC($email);
    $this->stmp->isHTML(true);
    $this->stmp->Subject = 'Congratulations! Your Email has been Successfully Verified';
    $this->stmp->Body = ' <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  
  </head>
  
  <body style="background:#000000">
  
    <table class="body-wrap"
      style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 30%; background-color: #ffffff; margin: 0; border-radius:10px; margin:auto; text-align:center;">
      <tr>
        <td class="container" width="600"
          style=" display: block !important; max-width: 600px !important; clear: both !important; " valign="top">
          <div class="content" style="padding: 20px;">
            <table class="main" width="100%" cellpadding="0" cellspacing="0"
              style="border: 1px solid rgba(130, 134, 156, 0.15);" bgcolor="transparent">
              <tr>
                <td style="margin:auto; text-align:center;">
                  <img class="avatar avatar-xxl avatar-4x3" src="' . apiLink . 'img/logo.png"
                    alt="Image Description" data-hs-theme-appearance="default" style="height:120px; width:120px; ">
                </td>
              </tr>
              <tr>
                <td class="alert alert-dark border-0"
                  style="color:#ffffff; background-color: #00bdff; padding: 20px; border-radius: 0;" align="center"
                  valign="top">
                  Email Verification Successful
                </td>
              </tr>
              <tr>
                <td class="content-wrap" style="padding: 20px;" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px">
                        <p></p> <strong
                          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">Dear
                          [' . $fullname . '],</strong>
                        <p>We are delighted to inform you that your email address has been successfully verified. Thank you for taking the time to confirm your email and for joining our community!</p>
                    <p>This step ensures that you will receive important updates, account notifications, and exciting offers from us. If you have any questions or concerns, please feel free to reach out to our support team at [' . sitemail . '].</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; padding: 10px 10px 20px;">
  
                        </p>
                      </td>
                    </tr>
                    <tr>
                   
                    </tr>
                    <tr>
                      <td class="content-block"
                        style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; font-size: 14px; text-align: center;"
                        valign="top">
                        <p>Thank you for choosing [' . sitename . ']. We look forward to serving you!</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td
          style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
          valign="top"></td>
      </tr>
    </table>
    <!--end table-->
  
  </body>
  
  </html>';
    return $this->stmp->send();
  }

  public function confirmTrade($email, $fullname, $tradeDetails)
{
    $this->stmp->addAddress($email, $fullname);
    $this->stmp->addBCC($email);
    $this->stmp->isHTML(true);
    $this->stmp->Subject = 'Trade Confirmation';
    $this->stmp->Body = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trade Confirmation</title>
    </head>
    <body style="background-color:#f94d1c; color:#2f3133; font-family: Arial, sans-serif;">
        <div style="margin:auto; max-width:700px; background:#fff; border-radius:10px; padding:20px;">
            <table width="100%">
                <tr>
                    <td align="center">
                        <img src="' . apiLink . 'img/logo.png" alt="Logo">
                    </td>
                </tr>
                <tr>
                    <td>
                        <h1 style="color:#f94d1c; text-align:left;">Trade Confirmation</h1>
                        <p>Dear ' . $fullname . ',</p>
                        <p>Your trade has been successfully placed. Below are the details of your trade:</p>
                        <table style="width:100%; margin:20px 0; border-collapse:collapse;">
                            <tr><td>AMOUNT:</td><td>' . $tradeDetails['currency']. $tradeDetails['amount'] . '</td></tr>
                            <tr><td>SYMBOL:</td><td>' . $tradeDetails['symbol'] . '</td></tr>
                            <tr><td>TIME INTERVAL:</td><td>' . (int)$tradeDetails['interval']/60 . 'Mins</td></tr>
                            <tr><td>ENTRY PRICE:</td><td>' . $tradeDetails['entryPrice'] . '</td></tr>
                            <tr><td>TRADE LEVERAGE:</td><td>' . $tradeDetails['leverage'] . '</td></tr>
                            <tr><td>TP[TAKE PROFIT]:</td><td>' . $tradeDetails['takeProfit'] . '</td></tr>
                            <tr><td>SL [STOP LOSS] :</td><td>' . $tradeDetails['stopLoss'] . '</td></tr>
                            <tr><td>TRADE TYPE:</td><td>' . $tradeDetails['tradeType'] . '</td></tr>
                            <tr><td>TRADE ID:</td><td>#' . $tradeDetails['trans_id'] . '</td></tr>
                            <tr><td>TRADE DATE:</td><td>' . $tradeDetails['dateOc'] . '</td></tr>
                            <tr><td>TRADE STATUS:</td><td>' . $tradeDetails['status'] . '</td></tr>
                        </table>
                        <p>If you have any questions or concerns, please feel free to contact us.</p>
                        <p>Regards,<br>' . sitename . '</p>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding-top:20px; color:#999;">
                        <p>&copy; ' . date('Y') . ' <a href="' . apiLink . '" style="color:#999; text-decoration:none;">' . sitename . '</a>. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>';
    return $this->stmp->send();
}
public function editedTrade($email, $fullname, $tradeDetails)
{
    $this->stmp->addAddress($email, $fullname);
    $this->stmp->addBCC($email);
    $this->stmp->isHTML(true);
    $this->stmp->Subject = 'Edited Trade Confirmation';
    $this->stmp->Body = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edited Trade Confirmation</title>
    </head>
    <body style="background-color:#f94d1c; color:#2f3133; font-family: Arial, sans-serif;">
        <div style="margin:auto; max-width:700px; background:#fff; border-radius:10px; padding:20px;">
            <table width="100%">
                <tr>
                    <td align="center">
                        <img src="' . apiLink . 'img/logo.png" width="120" alt="Logo">
                    </td>
                </tr>
                <tr>
                    <td>
                        <h1 style="color:#f94d1c; text-align:left;">Edited Trade Confirmation</h1>
                        <p>Dear ' . $fullname . ',</p>
                        <p>Your trade has been successfully updated. Below are the updated details of your trade:</p>
                        <table style="width:100%; margin:20px 0; border-collapse:collapse;">
                            <tr><td>AMOUNT:</td><td>' . $tradeDetails['currency']. $tradeDetails['amount'] . '</td></tr>
                            <tr><td>SYMBOL:</td><td>' . $tradeDetails['symbol'] . '</td></tr>
                            <tr><td>TIME INTERVAL:</td><td>' . (int)$tradeDetails['interval']/60 . ' Mins</td></tr>
                            <tr><td>ENTRY PRICE:</td><td>' . $tradeDetails['entryPrice'] . '</td></tr>
                            <tr><td>TRADE LEVERAGE:</td><td>' . $tradeDetails['leverage'] . '</td></tr>
                            <tr><td>TP [TAKE PROFIT]:</td><td>' . $tradeDetails['takeProfit'] . '</td></tr>
                            <tr><td>SL [STOP LOSS]:</td><td>' . $tradeDetails['stopLoss'] . '</td></tr>
                            <tr><td>TRADE TYPE:</td><td>' . $tradeDetails['tradeType'] . '</td></tr>
                            <tr><td>TRADE ID:</td><td>#' . $tradeDetails['trans_id'] . '</td></tr>
                            <tr><td>UPDATED DATE:</td><td>' . $tradeDetails['dateOc'] . '</td></tr>
                            <tr><td>TRADE STATUS:</td><td>' . $tradeDetails['status'] . '</td></tr>
                        </table>
                        <p>If you have any questions or concerns regarding these changes, please feel free to contact us.</p>
                        <p>Regards,<br>' . sitename . '</p>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding-top:20px; color:#999;">
                        <p>&copy; ' . date('Y') . ' <a href="' . apiLink . '" style="color:#999; text-decoration:none;">' . sitename . '</a>. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>';
    return $this->stmp->send();
}

}