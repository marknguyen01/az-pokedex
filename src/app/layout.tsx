import '../css/style.scss'

import  { Metadata } from 'next';
import { GlobalNavbar } from '../components/GlobalNavbar';

export const metadata: Metadata = {
    title: {
        default: 'AZ Pokédex',
        template: '%s | AZ Pokédex'
    },
}
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode,
}) {
    return (
        <html lang="en">
            <body>
                <header>
                    <GlobalNavbar />
                </header>
                <main className="container mx-auto p-2 md:p-4 lg:p-6">
                    {children}
                </main>
            </body>
        </html>
    );
}