import { Resend as ResendClient } from "resend";

const resend = new ResendClient(process.env.AUTH_RESEND_KEY);

export async function sendVerificationRequest({
  identifier,
  url,
  provider,
}: {
  identifier: string;
  url: string;
  provider: {
    from?: string;
  };
}) {
  const { host } = new URL(url);

  const { error } = await resend.emails.send({
    from: provider.from!,
    to: identifier,
    subject: "Sign in to Quizora",
    html: `
      <div style="
        max-width:520px;
        margin:auto;
        padding:40px;
        background:#ffffff;
        border-radius:20px;
        font-family:Arial,sans-serif;
        text-align:center;
        border:1px solid #e5e7eb;
      ">
        <h1 style="
          font-size:32px;
          margin-bottom:12px;
          color:#111827;
        ">
          Quizora
        </h1>

        <p style="
          color:#6b7280;
          font-size:16px;
          margin-bottom:30px;
        ">
          Click the button below to sign in to your account.
        </p>

        <a href="${url}" style="
          display:inline-block;
          background:#6366f1;
          color:white;
          padding:14px 28px;
          border-radius:12px;
          text-decoration:none;
          font-weight:600;
        ">
          Sign in
        </a>

        <p style="
          margin-top:30px;
          color:#9ca3af;
          font-size:13px;
        ">
          If you did not request this email, you can safely ignore it.
        </p>

        <p style="
          color:#9ca3af;
          font-size:12px;
        ">
          ${host}
        </p>
      </div>
    `,
    text: `Sign in to Quizora\n\n${url}`,
  });

  if (error) {
    throw new Error(error.message);
  }
}