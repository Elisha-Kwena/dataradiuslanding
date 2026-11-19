import type { Metadata } from "next";
import SignupFlow from "@/components/pages/signup/SignUpFlow";
import { BRAND } from "@/lib/signup";

export const metadata: Metadata = {
  title: `Create your workspace | ${BRAND.name}`,
  description: "Start managing your network in under a minute. No card needed.",
};

export default function SignupPage() {
  return <SignupFlow />;
}
