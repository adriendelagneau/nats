import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <div>
      <Navigation />
      <div className="mx-3  sm:mx-8 max-w-screen-2xl 2xl:mx-auto">
        

      {children}
   </div>
      <Footer />
    </div>
   
  );
}
