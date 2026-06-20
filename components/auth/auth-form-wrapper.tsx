import Link from "next/link";
import { AuthForm } from "./auth-form";
export type AuthMode = "login" | "signup";

const items: { authMode: AuthMode; text: string; route: string }[] = [
  { authMode: "login", text: "Login", route: "/login" },
  { authMode: "signup", text: "Sign Up", route: "/signup" },
];

const AuthFormWrapper = ({ authMode }: { authMode: AuthMode }) => {
  return (
    <div className="flex flex-col gap-3 max-w-120 w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-4xl font-bold">
          {authMode === "login"
            ? "👋 Welcome back to Quizora"
            : "🚀 Join Quizora today"}
        </h1>

        <p className="text-center text-muted-foreground">
          {authMode === "login"
            ? "Access your quizzes, classrooms, and learning progress"
            : "Start building, sharing, and playing quizzes in minutes"}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
        {items.map((item) => {
          const isActive = authMode === item.authMode;

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`rounded-lg py-3 text-center transition-colors ${
                isActive
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground hover:bg-background/50"
              }`}
            >
              {item.text}
            </Link>
          );
        })}
      </div>

      <AuthForm authMode={authMode} />
    </div>
  );
};

export default AuthFormWrapper;
