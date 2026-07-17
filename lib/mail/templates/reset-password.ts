import { appConfig } from "@/lib/config/app";

export const resetPasswwordTemplate = (resetlink: string) => ({
  subject: `${appConfig.name} • Reset your password`,
  text: `Reset your ${appConfig.name} password using this link: ${resetlink}. This link expires in 15 minutes.`,
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reset Password</title>
</head>

<body
  style="
    margin:0;
    padding:32px 16px;
    background:#f5f3ff;
    font-family:Inter,Segoe UI,Arial,sans-serif;
  "
>

<table
  role="presentation"
  width="100%"
  cellpadding="0"
  cellspacing="0"
>
<tr>
<td align="center">

<table
  role="presentation"
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    max-width:620px;
    background:#ffffff;
    border:1px solid #ede9fe;
    border-radius:24px;
    overflow:hidden;
  "
>

<tr>
<td
  align="center"
  style="
    padding:48px 32px;
    background:linear-gradient(135deg,#7c3aed,#6d28d9);
  "
>

<div
  style="
    width:64px;
    height:64px;
    border-radius:18px;
    background:rgba(255,255,255,.15);
    line-height:64px;
    font-size:30px;
    margin-bottom:20px;
  "
>
🔐
</div>

<h1
  style="
    margin:0;
    color:#ffffff;
    font-size:32px;
    font-weight:700;
    letter-spacing:-0.5px;
  "
>
${appConfig.name}
</h1>

<p
  style="
    margin:14px 0 0;
    color:#ede9fe;
    font-size:16px;
    line-height:26px;
  "
>
Secure your account and get back to creating quizzes.
</p>

</td>
</tr>

<tr>
<td
  style="
    padding:48px 36px;
    text-align:center;
  "
>

<h2
  style="
    margin:0;
    color:#18181b;
    font-size:28px;
    font-weight:700;
  "
>
Reset your password
</h2>

<p
  style="
    margin:18px 0 36px;
    color:#71717a;
    font-size:16px;
    line-height:28px;
  "
>
We received a request to reset the password for your ${appConfig.name} account.
Click the button below to choose a new password.
</p>

<a
  href="${resetlink}"
  style="
    display:inline-block;
    background:#7c3aed;
    color:#ffffff;
    text-decoration:none;
    padding:16px 34px;
    border-radius:14px;
    font-size:16px;
    font-weight:600;
  "
>
Reset Password
</a>

<p
  style="
    margin:36px 0 12px;
    color:#71717a;
    font-size:14px;
    line-height:24px;
  "
>
If the button doesn't work, copy and paste this link into your browser:
</p>

<div
  style="
    background:#faf5ff;
    border:1px solid #ddd6fe;
    border-radius:16px;
    padding:18px;
    word-break:break-all;
    font-size:13px;
    color:#6d28d9;
    line-height:22px;
  "
>
${resetlink}
</div>

<p
  style="
    margin:28px 0 0;
    color:#71717a;
    font-size:15px;
    line-height:26px;
  "
>
This reset link will expire in
<strong style="color:#18181b;">15 minutes</strong>
for your security.
</p>

</td>
</tr>

<tr>
<td
  style="
    padding:0 36px 36px;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    background:#fafafa;
    border:1px solid #e4e4e7;
    border-radius:16px;
  "
>

<tr>
<td
  style="
    padding:20px;
    text-align:center;
    color:#71717a;
    font-size:14px;
    line-height:24px;
  "
>
If you didn't request a password reset, you can safely ignore this email.
Your password will remain unchanged.
</td>
</tr>

</table>

</td>
</tr>

<tr>
<td
  align="center"
  style="
    padding:24px;
    border-top:1px solid #f4f4f5;
    color:#a1a1aa;
    font-size:13px;
  "
>
© ${new Date().getFullYear()} ${appConfig.name}. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
});
