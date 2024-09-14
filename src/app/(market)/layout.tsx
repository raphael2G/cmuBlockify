import { AuthContextProvider } from "@/context/AuthContext";
import {MarketContextProvider} from "@/context/MarketContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <MarketContextProvider>
        <div className="min-h-screen bg-gray-100">{children}</div>
      </MarketContextProvider>
    </AuthContextProvider>
  );
}