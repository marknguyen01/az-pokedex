import './globals.css'
import mongooseClient from '../lib/mongooseClient'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await mongooseClient();
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
    </html>
  )
}
