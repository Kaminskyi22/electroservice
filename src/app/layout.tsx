import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/providers/TranslationProvider";
import Analytics from '@/components/Analytics';
// import UptimeStatus from '@/components/UptimeStatus';
// import FeedbackForm from '@/components/FeedbackForm';

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Електрик Рівне — ElectroService, електромонтажні роботи 24/7",
  description: "Професійні електромонтажні послуги у Рівному та області. Швидко, цілодобово, якісно. Телефонуйте: +380 93 285 14 11",
  keywords: "електрик Рівне, електромонтаж Рівне, електропроводка, електросервіс, електрик виклик, електричні роботи, монтаж електрики, ремонт електрики, Рівне",
  authors: [{ name: 'ElectroService' }],
  creator: 'ElectroService',
  publisher: 'ElectroService',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  metadataBase: new URL('https://electroservice.in'),
  alternates: {
    canonical: "https://electroservice.in/"
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  },
  themeColor: '#1e40af',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ElectroService Рівне'
  },
  openGraph: {
    title: 'ElectroService - Професійні послуги електромонтажу',
    description: 'Швидке та професійне електромонтажні роботи у Львові. 24/7. Гарантія якості. Доступні ціни.',
    url: 'https://electroservice.in',
    siteName: 'ElectroService',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ElectroService - Професійні послуги електромонтажу',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElectroService - Професійні послуги електромонтажу',
    description: 'Швидке та професійне електромонтажні роботи у Львові. 24/7. Гарантія якості. Доступні ціни.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ElectroService Рівне" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />
        <meta property="og:url" content="https://electroservice.in/" />
        <meta property="og:title" content="Електрик Рівне — ElectroService, електромонтажні роботи 24/7" />
        <meta property="og:description" content="Професійні електромонтажні послуги у Рівному та області. Швидко, цілодобово, якісно. Телефонуйте: +380 93 285 14 11" />
        <meta property="og:image" content="https://electroservice.in/images/electric-bg.svg" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Електрик Рівне — ElectroService, електромонтажні роботи 24/7" />
        <meta name="twitter:description" content="Професійні електромонтажні послуги у Рівному та області. Швидко, цілодобово, якісно. Телефонуйте: +380 93 285 14 11" />
        <meta name="twitter:image" content="https://electroservice.in/images/electric-bg.svg" />
        <script type="application/ld+json" suppressHydrationWarning>{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "ElectroService Рівне",
            "image": {
              "@type": "ImageObject",
              "url": "https://electroservice.in/images/electric-bg.svg",
              "caption": "Логотип ElectroService - професійні електромонтажні роботи"
            },
            "@id": "https://electroservice.in/",
            "url": "https://electroservice.in/",
            "telephone": "+380932851411",
            "email": "electroservice33000@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Рівне",
              "addressCountry": "UA",
              "streetAddress": "",
              "postalCode": ""
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 50.6199,
              "longitude": 26.2516
            },
            "description": "Професійні електромонтажні послуги у Рівному та області. Швидко, цілодобово, якісно.",
            "openingHours": "00:00-23:59",
            "areaServed": "Рівне, Рівненська область",
            "priceRange": "UAH",
            "sameAs": [
              "https://t.me/electroservice_bot"
            ],
            "makesOffer": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Електромонтажні роботи" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ремонт електропроводки" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Встановлення освітлення" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Заміна розеток та вимикачів" } }
            ]
          }
        `}</script>
      </head>
      <body className={inter.className}>
        <TranslationProvider>
          {children}
        </TranslationProvider>
        <Analytics />
        {/* <UptimeStatus /> */}
        {/* <FeedbackForm /> */}
      </body>
    </html>
  );
}
