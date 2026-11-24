import localFont from 'next/font/local';
import './globals.css';

const leagueSpartan = localFont({
  src: './fonts/LeagueSpartan.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-league',
});

export const metadata = {
  metadataBase: new URL('https://evam.in'),
  title: 'evam — Comedy, Video, Engagement & Behavioural Training',
  description: 'evam is a Chennai-based performance arts entrepreneurship working across comedy, video production, event engagement and arts-based behavioural training.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'evam — Performance arts for brands, teams and audiences',
    description: 'Comedy, video production, event engagement and arts-based behavioural training from evam, Chennai.',
    url: '/',
    siteName: 'evam',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/assets/home-vimeo-poster-opt.webp', width: 1280, height: 720, alt: 'A scene from the evam showreel' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Tamasha_eST',
    title: 'evam — Performance arts for brands, teams and audiences',
    description: 'Comedy, video production, event engagement and arts-based behavioural training from evam, Chennai.',
    images: ['/assets/home-vimeo-poster-opt.webp'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#871c97',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={leagueSpartan.variable}>
      <body>{children}</body>
    </html>
  );
}
