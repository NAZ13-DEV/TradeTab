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
  $this->stmp->addBCC($email);
  $this->stmp->isHTML(true);
  $this->stmp->Subject = 'Welcome to ' . sitename;

  $this->stmp->Body = '<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Email</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0f0f0f; font-family: Arial, sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f0f0f;">
      <tr>
        <td align="center" style="padding: 20px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border-radius: 12px; width: 100%; max-width: 600px;">

            <!-- Logo Section -->
            <tr>
              <td align="center" style="background-color: #1e1e1e; padding: 20px 0;">
                <img src="' . apiLink . 'img/logo.png" alt="' . sitename . ' Logo" width="200" style="display: block; max-width: 100%; height: auto;" />
              </td>
            </tr>

            <!-- Content Section -->
            <tr>
              <td align="center" style="padding: 30px 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 28px; margin-bottom: 20px;">Verify Your Email Address</h1>
                <p style="font-size: 16px; color: #cccccc; line-height: 1.6; margin: 0;">
                  Dear ' . htmlspecialchars($fullname) . ',<br><br>
                  Please verify your email by clicking the button below.<br />
                  This link will expire in 24 hours.
                </p>
                <a href="' . appLink . 'ValidateEmail?token=' . urlencode($EncrypteduserEmail) . '&mail=' . urlencode($email) . '"
                  target="_blank"
                  style="background-color: #10B981; color: #ffffff; padding: 15px 30px; border-radius: 30px; font-size: 16px; font-weight: bold; text-transform: uppercase; display: inline-block; margin: 30px 0; text-decoration: none;">
                  VERIFY EMAIL
                </a>
                <p style="font-size: 14px; color: #999999; margin: 20px 0;">
                  If you did not register for this account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 20px;">
                <a href="#" style="font-size: 12px; color: #10B981; text-decoration: none;">Unsubscribe</a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
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
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>2FA Code</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0f0f0f; font-family: Arial, sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f0f0f;">
      <tr>
        <td align="center" style="padding: 20px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border-radius: 12px; width: 100%; max-width: 600px;">

            <!-- Logo Section -->
            <tr>
              <td align="center" style="background-color: #1e1e1e; padding: 20px 0;">
                <img src="' . apiLink . 'img/logo.png" alt="' . sitename . ' Logo" width="200" style="display: block; max-width: 100%; height: auto;" />
              </td>
            </tr>

            <!-- Content Section -->
            <tr>
              <td align="center" style="padding: 30px 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">2 Factor Authentication Activation Code</h1>
                <p style="font-size: 16px; color: #cccccc; line-height: 1.6; margin: 0;">
                  Dear ' . htmlspecialchars($fullname) . ',<br><br>
                  You requested for the activation of your 2 Factor Authentication.<br />
                  To complete this action, use the code below:
                </p>
                <div style="margin: 30px 0;">
                  <span style="background-color: #10B981; color: #ffffff; padding: 15px 30px; border-radius: 30px; font-size: 18px; font-weight: bold; display: inline-block;">' . $verCode . '</span>
                </div>
                <p style="font-size: 14px; color: #999999; margin: 20px 0;">
                  Please note that this code is valid for the next 24 hours.<br />
                  If you did not request for this code, please ignore this email.
                </p>
                <p style="font-size: 14px; color: #999999; margin: 20px 0;">
                  If you have any questions or concerns, feel free to contact our support team at [' . sitemail . '].
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 20px;">
                <p style="font-size: 14px; color: #10B981;">
                  Thank you for choosing [' . sitename . ']. We look forward to serving you!
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
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
                <td class="border-0 alert alert-dark"
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
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>2FA Deactivated</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0f0f0f; font-family: Arial, sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f0f0f;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border-radius: 12px; width: 100%; max-width: 600px;">
  
              <!-- Logo Section -->
              <tr>
                <td align="center" style="background-color: #1e1e1e; padding: 20px 0;">
                  <img src="' . apiLink . 'img/logo.png" alt="' . sitename . ' Logo" width="200" style="display: block; max-width: 100%; height: auto;" />
                </td>
              </tr>
  
              <!-- Content Section -->
              <tr>
                <td align="center" style="padding: 30px 20px; text-align: center;">
                  <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">2 Factor Authentication Pin Has Been Deactivated</h1>
                  <p style="font-size: 16px; color: #cccccc; line-height: 1.6; margin: 0;">
                    Dear ' . htmlspecialchars($fullname) . ',<br><br>
                    You requested for the activation of your 2 Factor Authentication has been Approved.
                  </p>
                  <div style="margin: 30px 0;">
                    <span style="background-color: #10B981; color: #ffffff; padding: 15px 30px; border-radius: 30px; font-size: 16px; font-weight: bold; display: inline-block;">2FA Disabled</span>
                  </div>
                  <p style="font-size: 14px; color: #999999; margin: 20px 0;">
                    If you did not request for this action on this account, please ignore this email.
                  </p>
                  <p style="font-size: 14px; color: #999999; margin: 20px 0;">
                    If you have any questions or concerns, feel free to contact our support team at [' . sitemail . '].
                  </p>
                </td>
              </tr>
  
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px;">
                  <p style="font-size: 14px; color: #10B981;">
                    Thank you for choosing [' . sitename . ']. We look forward to serving you!
                  </p>
                </td>
              </tr>
  
            </table>
          </td>
        </tr>
      </table>
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
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>2FA Changed</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0f0f0f; font-family: Arial, sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f0f0f;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border-radius: 12px; width: 100%; max-width: 600px;">
  
              <!-- Logo Section -->
              <tr>
                <td align="center" style="background-color: #1e1e1e; padding: 20px 0;">
                  <img src="' . apiLink . 'img/logo.png" alt="' . sitename . ' Logo" width="200" style="display: block; max-width: 100%; height: auto;" />
                </td>
              </tr>
  
              <!-- Content Section -->
              <tr>
                <td align="center" style="padding: 30px 20px; text-align: center;">
                  <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">2 Factor Authentication Pin Has Been Changed</h1>
                  <p style="font-size: 16px; color: #cccccc; line-height: 1.6; margin: 0;">
                    Dear ' . htmlspecialchars($fullname) . ',<br><br>
                    You requested for the change of your 2 Factor Authentication pin has been Approved.
                  </p>
                  <div style="margin: 30px 0;">
                    <span style="background-color: #10B981; color: #ffffff; padding: 15px 30px; border-radius: 30px; font-size: 16px; font-weight: bold; display: inline-block;">2FA Updated</span>
                  </div>
                  <p style="font-size: 14px; color: #999999; margin: 20px 0;">
                    If you did not request for this action on this account, please ignore this email.
                  </p>
                  <p style="font-size: 14px; color: #999999; margin: 20px 0;">
                    If you have any questions or concerns, feel free to contact our support team at [' . sitemail . '].
                  </p>
                </td>
              </tr>
  
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px;">
                  <p style="font-size: 14px; color: #10B981;">
                    Thank you for choosing [' . sitename . ']. We look forward to serving you!
                  </p>
                </td>
              </tr>
  
            </table>
          </td>
        </tr>
      </table>
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
  
    $this->stmp->Body = '<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Verified</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0f0f0f; font-family: Arial, sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f0f0f;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border-radius: 12px; width: 100%; max-width: 600px;">
  
              <!-- Logo Section -->
              <tr>
                <td align="center" style="background-color: #1e1e1e; padding: 20px 0;">
                  <img src="' . apiLink . 'img/logo.png" alt="' . sitename . ' Logo" width="200" style="display: block; max-width: 100%; height: auto;" />
                </td>
              </tr>
  
              <!-- Content Section -->
              <tr>
                <td align="center" style="padding: 30px 20px; text-align: center;">
                  <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">Email Verification Successful</h1>
                  <p style="font-size: 16px; color: #cccccc; line-height: 1.6; margin: 0;">
                    Dear ' . htmlspecialchars($fullname) . ',<br><br>
                    We are delighted to inform you that your email address has been successfully verified.<br />
                    Thank you for taking the time to confirm your email and for joining our community!
                  </p>
                  <p style="font-size: 14px; color: #999999; margin: 20px 0;">
                    This step ensures that you will receive important updates, account notifications, and exciting offers from us.
                    If you have any questions or concerns, please feel free to reach out to our support team at [' . sitemail . '].
                  </p>
                </td>
              </tr>
  
              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px;">
                  <p style="font-size: 14px; color: #10B981;">
                    Thank you for choosing [' . sitename . ']. We look forward to serving you!
                  </p>
                </td>
              </tr>
  
            </table>
          </td>
        </tr>
      </table>
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
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trade Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f0f0f; font-family: Arial, sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f0f0f;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border-radius: 12px; width: 100%; max-width: 600px;">
                
                <!-- Logo Section -->
                <tr>
                  <td align="center" style="background-color: #1e1e1e; padding: 20px 0;">
                    <img src="' . apiLink . 'img/logo.png" alt="Logo" width="200" style="display: block; max-width: 100%; height: auto;" />
                  </td>
                </tr>
  
                <!-- Header -->
                <tr>
                  <td align="center" style="padding: 30px 20px; text-align: center;">
                    <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">Trade Confirmation</h1>
                    <p style="font-size: 16px; color: #cccccc; line-height: 1.6; margin: 0;">
                      Dear ' . htmlspecialchars($fullname) . ',<br><br>
                      Your trade has been successfully placed. Below are the details of your trade:
                    </p>
                  </td>
                </tr>
  
                <!-- Trade Details Table -->
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="10" cellspacing="0" style="color: #cccccc; font-size: 14px; border-collapse: collapse;">
                      <tr><td><strong>AMOUNT:</strong></td><td>' . $tradeDetails['currency'] . $tradeDetails['amount'] . '</td></tr>
                      <tr><td><strong>SYMBOL:</strong></td><td>' . $tradeDetails['symbol'] . '</td></tr>
                      <tr><td><strong>TIME INTERVAL:</strong></td><td>' . ((int)$tradeDetails['interval'] / 60) . ' Mins</td></tr>
                      <tr><td><strong>ENTRY PRICE:</strong></td><td>' . $tradeDetails['entryPrice'] . '</td></tr>
                      <tr><td><strong>TRADE LEVERAGE:</strong></td><td>' . $tradeDetails['leverage'] . '</td></tr>
                      <tr><td><strong>TP [TAKE PROFIT]:</strong></td><td>' . $tradeDetails['takeProfit'] . '</td></tr>
                      <tr><td><strong>SL [STOP LOSS]:</strong></td><td>' . $tradeDetails['stopLoss'] . '</td></tr>
                      <tr><td><strong>TRADE TYPE:</strong></td><td>' . $tradeDetails['tradeType'] . '</td></tr>
                      <tr><td><strong>TRADE ID:</strong></td><td>#' . $tradeDetails['trans_id'] . '</td></tr>
                      <tr><td><strong>TRADE DATE:</strong></td><td>' . $tradeDetails['dateOc'] . '</td></tr>
                      <tr><td><strong>TRADE STATUS:</strong></td><td>' . $tradeDetails['status'] . '</td></tr>
                    </table>
                  </td>
                </tr>
  
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px;">
                    <p style="font-size: 14px; color: #999999;">
                      If you have any questions or concerns, please feel free to contact us.<br><br>
                      Regards,<br>' . sitename . '
                    </p>
                    <p style="font-size: 12px; color: #666666;">&copy; ' . date('Y') . ' <a href="' . apiLink . '" style="color:#10B981; text-decoration: none;">' . sitename . '</a>. All rights reserved.</p>
                  </td>
                </tr>
  
              </table>
            </td>
          </tr>
        </table>
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
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Edited Trade Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f0f0f; font-family: Arial, sans-serif;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f0f0f;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border-radius: 12px; width: 100%; max-width: 600px;">
  
                <!-- Logo Section -->
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <img src="' . apiLink . 'img/logo.png" alt="Logo" width="200" style="display: block; max-width: 100%; height: auto;" />
                  </td>
                </tr>
  
                <!-- Header -->
                <tr>
                  <td align="center" style="padding: 30px 20px; text-align: center;">
                    <h1 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">Edited Trade Confirmation</h1>
                    <p style="font-size: 16px; color: #cccccc; line-height: 1.6; margin: 0;">
                      Dear ' . htmlspecialchars($fullname) . ',<br><br>
                      Your trade has been successfully updated. Below are the updated details of your trade:
                    </p>
                  </td>
                </tr>
  
                <!-- Trade Details Table -->
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="10" cellspacing="0" style="color: #cccccc; font-size: 14px; border-collapse: collapse;">
                      <tr><td><strong>AMOUNT:</strong></td><td>' . $tradeDetails['currency'] . $tradeDetails['amount'] . '</td></tr>
                      <tr><td><strong>SYMBOL:</strong></td><td>' . $tradeDetails['symbol'] . '</td></tr>
                      <tr><td><strong>TIME INTERVAL:</strong></td><td>' . ((int)$tradeDetails['interval'] / 60) . ' Mins</td></tr>
                      <tr><td><strong>ENTRY PRICE:</strong></td><td>' . $tradeDetails['entryPrice'] . '</td></tr>
                      <tr><td><strong>TRADE LEVERAGE:</strong></td><td>' . $tradeDetails['leverage'] . '</td></tr>
                      <tr><td><strong>TP [TAKE PROFIT]:</strong></td><td>' . $tradeDetails['takeProfit'] . '</td></tr>
                      <tr><td><strong>SL [STOP LOSS]:</strong></td><td>' . $tradeDetails['stopLoss'] . '</td></tr>
                      <tr><td><strong>TRADE TYPE:</strong></td><td>' . $tradeDetails['tradeType'] . '</td></tr>
                      <tr><td><strong>TRADE ID:</strong></td><td>#' . $tradeDetails['trans_id'] . '</td></tr>
                      <tr><td><strong>UPDATED DATE:</strong></td><td>' . $tradeDetails['dateOc'] . '</td></tr>
                      <tr><td><strong>TRADE STATUS:</strong></td><td>' . $tradeDetails['status'] . '</td></tr>
                    </table>
                  </td>
                </tr>
  
                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 20px;">
                    <p style="font-size: 14px; color: #999999;">
                      If you have any questions or concerns regarding these changes, please feel free to contact us.<br><br>
                      Regards,<br>' . sitename . '
                    </p>
                    <p style="font-size: 12px; color: #666666;">&copy; ' . date('Y') . ' <a href="' . apiLink . '" style="color:#10B981; text-decoration: none;">' . sitename . '</a>. All rights reserved.</p>
                  </td>
                </tr>
  
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>';
  
      return $this->stmp->send();
  }
  

}