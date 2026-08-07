const passwordReset = (verificationUrl: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f4f5;
  font-family: Arial, Helvetica, sans-serif;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f4f4f5; padding: 40px 20px;"
  >
    <tr>
      <td align="center">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 520px;
            background-color: #ffffff;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                padding: 36px 30px 20px;
                background-color: #18181b;
              "
            >
              <div style="
                width: 52px;
                height: 52px;
                line-height: 52px;
                margin: 0 auto 16px;
                background-color: #ffffff;
                border-radius: 12px;
                font-size: 24px;
              ">
                🔐
              </div>

              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 26px;
                font-weight: 700;
              ">
                Reset Your Password
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td
              style="
                padding: 35px 40px;
                color: #52525b;
                font-size: 15px;
                line-height: 1.7;
              "
            >

              <p style="
                margin: 0 0 16px;
                color: #18181b;
                font-size: 18px;
                font-weight: 600;
              ">
                Password reset requested
              </p>

              <p style="margin: 0 0 20px;">
                We received a request to reset the password for your
                Task Flow account.
              </p>

              <p style="margin: 0 0 25px;">
                If you made this request, click the button below to
                choose a new password.
              </p>

              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                width="100%"
                style="margin: 30px 0;"
              >
                <tr>
                  <td align="center">

                    <a
                      href="${verificationUrl}"
                      style="
                        display: inline-block;
                        padding: 14px 30px;
                        background-color: #18181b;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 8px;
                        font-size: 15px;
                        font-weight: 600;
                      "
                    >
                      Reset Password
                    </a>

                  </td>
                </tr>
              </table>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #fafafa;
                  border: 1px solid #e4e4e7;
                  border-radius: 8px;
                  margin: 25px 0;
                "
              >
                <tr>
                  <td style="
                    padding: 14px 16px;
                    color: #52525b;
                    font-size: 14px;
                  ">
                    ⏱️ This password reset link will expire in
                    <strong style="color: #18181b;">
                      15 minutes
                    </strong>.
                  </td>
                </tr>
              </table>

              <p style="margin: 25px 0 10px;">
                If you didn't request a password reset, you can safely
                ignore this email. Your password will remain unchanged.
              </p>

              <p style="
                margin: 25px 0 0;
                color: #18181b;
              ">
                Thanks,<br>
                <strong>Task Flow Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding: 22px 30px;
                background-color: #fafafa;
                border-top: 1px solid #f4f4f5;
              "
            >
              <p style="
                margin: 0;
                color: #a1a1aa;
                font-size: 12px;
                line-height: 1.5;
              ">
                This is an automated email from Task Flow.
                <br>
                Please do not reply to this email.
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

export default passwordReset;
