import { useAuth } from "@clerk/clerk-react";
import { Redirect } from "wouter";
import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect to="/sign-in" />;
  }
  return children;
}

export default ProtectedRoute;
