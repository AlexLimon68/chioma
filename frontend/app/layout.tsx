import type { Metadata } from 'next';
//import '@fontsource-variable/inter'; // Tu importación corregida de la fuente
import './globals.css'; // Tus estilos globales de Tailwind
import { RootLayoutClient } from './RootLayoutClient';

export const metadata: Metadata = {
  title: 'Chioma — Blockchain-Powered Real Estate',
  description: 'Automated Commissions. Zero Disputes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Pasamos todo el árbol al cliente que ya acomoda el Skip Link y el <main> */}
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
