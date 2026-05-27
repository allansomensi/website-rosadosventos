import TheHeader from "@/components/layout/TheHeader";
import TheFooter from "@/components/layout/TheFooter";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

interface SettingsData {
  logoUrl?: string;
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await sanityFetch({ query: SETTINGS_QUERY });
  const settings = data as SettingsData | null;
  const logoUrl = settings?.logoUrl || "/logo.png";

  return (
    <>
      <TheHeader logoUrl={logoUrl} />
      {children}
      <TheFooter logoUrl={logoUrl} />
    </>
  );
}
