const emailVerification = (name: string, verificationUrl: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin:0; padding:0; background:#f4f4f5; font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background:#f4f4f5; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:520px; background:#fff; border-radius:12px;">
          <tr>
            <td align="center" style="padding:30px;">
              <h1 style="margin:0; color:#18181b;">
                Verify Your Email
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 30px; color:#52525b; font-size:16px; line-height:1.6;">
              <p>
                Hello <strong>${name}</strong>,
              </p>
              <p>
                Thanks for creating an account with us.
                Please verify your email address by clicking the button below.
              </p>
              <table cellpadding="0" cellspacing="0" border="0"
                style="margin:30px auto;">
                <tr>
                  <td align="center" bgcolor="#18181b"
                    style="border-radius:8px;">
                    <a href="${verificationUrl}"
                      style="
                        display:inline-block;
                        padding:14px 28px;
                        color:#fff;
                        text-decoration:none;
                        font-weight:bold;
                      ">
                      Verify Email
                    </a>

                  </td>
                </tr>
              </table>
              <p>
                This verification link will expire in
                <strong>15 minutes</strong>.
              </p>
              <p>
                If you didn't create an account, you can safely ignore this email.
              </p>
              <p>
                Thanks,<br>
                <strong>Task Flow Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export default emailVerification;
