import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconMail,
} from "@tabler/icons-react";

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-400 transition-all duration-300 hover:scale-110 hover:text-amber-400"
    >
      {icon}
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contato" className="bg-zinc-900 py-20">
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-cinzel mb-4 text-4xl font-bold text-white">
          Contato para Shows
        </h2>
        <p className="font-teko mb-12 text-2xl text-gray-400">
          Leve a energia da Rosa dos Ventos para o seu evento!
        </p>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Coluna 1: Email */}
          <div className="flex h-full flex-col justify-center rounded-lg bg-zinc-800 p-8 shadow-lg">
            <h3 className="font-teko mb-4 text-xl tracking-wider text-amber-400 uppercase">
              <IconMail className="mr-2 mb-1 inline-block text-2xl" />
              Email
            </h3>
            <a
              href="mailto:contato@bandarosadosventos.com.br"
              className="font-cinzel text-lg wrap-break-word text-white transition-colors hover:text-amber-500"
            >
              contato@bandarosadosventos.com.br
            </a>
          </div>

          {/* Coluna 2: WhatsApp */}
          <div className="flex h-full flex-col items-center justify-center rounded-lg bg-zinc-800 p-8 shadow-lg">
            <h3 className="font-teko mb-4 text-xl tracking-wider text-amber-400 uppercase">
              <IconBrandWhatsapp className="mr-2 mb-1 inline-block text-2xl" />
              WhatsApp
            </h3>
            <div className="flex flex-col space-y-3">
              {/* Número Jordano */}
              <a
                href="https://wa.me/555499739146"
                target="_blank"
                rel="noopener noreferrer"
                className="font-cinzel text-xl whitespace-nowrap text-white transition-colors hover:text-amber-500"
              >
                (54) 9973-9146 (Jordano)
              </a>
              {/* Número Raquel */}
              <a
                href="https://wa.me/555496299223"
                target="_blank"
                rel="noopener noreferrer"
                className="font-cinzel text-xl whitespace-nowrap text-white transition-colors hover:text-amber-500"
              >
                (54) 9629-9223 (Raquel)
              </a>
            </div>
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div className="flex h-full flex-col justify-center rounded-lg bg-zinc-800 p-8 shadow-lg">
            <h3 className="font-teko mb-6 text-xl tracking-wider text-amber-400 uppercase">
              Siga a Banda
            </h3>
            <div className="flex justify-center space-x-8">
              <SocialLink
                href="http://instagram.com/bandarosadosventosbg"
                icon={<IconBrandInstagram size={36} />}
                label="Instagram"
              />
              <SocialLink
                href=""
                icon={<IconBrandYoutube size={36} />}
                label="YouTube"
              />
              <SocialLink
                href=""
                icon={<IconBrandFacebook size={36} />}
                label="Facebook"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
