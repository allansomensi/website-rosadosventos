import TheHeader from "@/components/layout/TheHeader";
import TheFooter from "@/components/layout/TheFooter";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ContactData } from "@/lib/site";

interface SettingsData {
  logoUrl?: string;
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ data: settingsData }, { data: contactData }] = await Promise.all([
    sanityFetch({ query: SETTINGS_QUERY }),
    sanityFetch({ query: CONTACT_QUERY }),
  ]);

  const settings = settingsData as SettingsData | null;
  const contact = contactData as ContactData | null;
  const logoUrl = settings?.logoUrl || "/logo.png";

  return (
    <>
      <TheHeader logoUrl={logoUrl} socialLinks={contact?.socialLinks} />
      <main id="conteudo">{children}</main>
      <TheFooter logoUrl={logoUrl} contact={contact} />
      <div aria-hidden="true" className="grain" />
    </>
  );
}
