import './globals.css';
import 'aos/dist/aos.css';
import Script from 'next/script';

export const metadata = {
  title: 'Inbox Pro AI - Intelligent Email Management',
  description: 'AI-powered email management with priority scoring, smart replies, meeting detection, and automated follow-ups',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
        {children}
        <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="lazyOnload" />
        <Script id="aos-init" strategy="lazyOnload">
          {`
            if (typeof window !== 'undefined' && window.AOS) {
              AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}

