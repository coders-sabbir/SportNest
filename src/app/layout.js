import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0F172A] text-white min-h-screen flex flex-col">
        
        <Navbar />

        <main className="pt-24 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}