import { appConfig } from "@/lib/config/app";

export const verificationTemplate = (verificationCode: string) => ({
  subject: `${appConfig.name} • Verify your email`,
  text: `Your ${appConfig.name} verification code is ${verificationCode}. This code expires in 10 minutes.`,
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${appConfig.name} Verification</title>
</head>

<body style="
  margin:0;
  padding:32px 16px;
  background:#f5f3ff;
  font-family:Inter,Segoe UI,Arial,sans-serif;
">

<table
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  width="100%"
>
<tr>
<td align="center">

<table
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  width="100%"
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
🧠
</div>

<h1
  style="
    margin:0;
    color:white;
    font-size:32px;
    font-weight:700;
    letter-spacing:-.5px;
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
Create, share and challenge with beautiful quizzes.
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
Verify your email
</h2>

<p
  style="
    margin:18px 0 36px;
    color:#71717a;
    font-size:16px;
    line-height:28px;
  "
>
Enter the verification code below to securely sign in to your ${appConfig.name} account.
</p>

<div
  style="
    display:inline-block;
    padding:22px 34px;
    border:2px solid #ddd6fe;
    background:#faf5ff;
    border-radius:20px;
  "
>

<span
  style="
    font-size:42px;
    font-weight:800;
    letter-spacing:10px;
    color:#6d28d9;
  "
>
${verificationCode}
</span>

</div>

<p
  style="
    margin:36px 0 0;
    color:#71717a;
    font-size:15px;
    line-height:26px;
  "
>
This verification code will expire in
<strong style="color:#18181b;">10 minutes</strong>.
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
    color:#71717a;
    font-size:14px;
    line-height:24px;
    text-align:center;
  "
>
If you didn't request this verification code, you can safely ignore this email.
No changes will be made to your account.
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
© ${new Date().getFullYear()} . All rights reserved.
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
