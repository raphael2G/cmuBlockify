'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth"
import { FireAuth } from "@/lib/firebase"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

export function GoogleSsoSignIn() {
  const router = useRouter()

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(FireAuth, provider);

      // Optionally, handle successful sign-in here
      console.log("Sign-in successful!");
      toast.success("Sign-in successful!");
      router.push('/market')
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
  
      // Handle specific error codes
      if (error.code) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in popup closed before completing the process.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          case 'auth/cancelled-popup-request':
            // This error can be ignored or handled as per your preference
            errorMessage = null;
            break;
          // Add more cases as needed
          default:
            errorMessage = error.message;
        }
      }
  
      if (errorMessage) {
        toast.error(errorMessage);
      }
      console.error('Sign-in error:', error);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md m-3">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Use your AndrewID account to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button 
            onClick={() => signInWithGoogle()}
            className="w-full max-w-sm"
            variant="outline"
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with AndrewID
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground text-center">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-primary underline-offset-4 transition-colors hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary underline-offset-4 transition-colors hover:underline">
              Privacy Policy
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}