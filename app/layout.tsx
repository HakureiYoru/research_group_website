import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { generateOrganizationSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: {
    default: "西浦微系统课题组",
    template: "%s | 西浦微系统课题组",
  },
  description:
    "西浦微系统课题组由宋鹏飞教授领导，致力于微纳米技术、生物传感器、微流控平台和自动化控制技术的前沿研究。",
  keywords: ["微系统", "生物传感器", "微流控", "西浦", "XJTLU", "宋鹏飞"],
  authors: [{ name: "西浦微系统课题组" }],
  openGraph: {
    title: "西浦微系统课题组",
    description:
      "西浦微系统课题组由宋鹏飞教授领导，致力于微纳米技术、生物传感器、微流控平台和自动化控制技术的前沿研究。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="zh">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
