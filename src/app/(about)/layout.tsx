
import { AuthContextProvider } from "@/context/AuthContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <div className="">
        {children}
      </div>
    </AuthContextProvider>
  );
}
