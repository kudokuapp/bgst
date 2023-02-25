import '$styles/globals.css';
import { ThemeContextProvider } from '$context/ThemeContext';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <ThemeContextProvider>
        <body>
          {children}
          <div>
            {/* Google tag (gtag.js) */}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-FQNGDF24C3"
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`

              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FQNGDF24C3');
        
              `}
            </Script>
          </div>
        </body>
      </ThemeContextProvider>
    </html>
  );
}
