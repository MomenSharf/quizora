import { ComingSoon } from "@/components/coming-soon";

export default function UserPage() {
  return (
    <ComingSoon
      title="Your profile is getting ready."
      description="We're working on a space where you can manage your profile, personalize your experience, and showcase your learning journey."
      backHref="/dashboard"
      backLabel="Back to dashboard"
    />
  );
}