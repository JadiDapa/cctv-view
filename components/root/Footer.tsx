import Image from "next/image";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { JSX } from "react";

export default async function Footer() {
  const contents = await getFooterContents();

  return (
    <footer className="w-full bg-linear-to-b from-white to-amber-100 border-t border-amber-200 pt-16 pb-8 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="https://isysrg.com/_next/image?url=%2Fassets%2Fimages%2Faimed-black.png&w=828&q=75"
              alt="AIMed"
              width={120}
              height={60}
            />
            <div className="relative flex gap-2 items-center">
              <Image
                src="https://isysrg.com/isysrg.svg"
                alt="AIMed Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <div className="flex gap-1 items-end">
                <p className=" italic text-3xl font-semibold">ISys</p>
                <p className=" text-[10px]">Research Group</p>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-md">
            {contents.description}
          </p>
        </div>

        {/* Address */}
        <div className="text-sm">
          <h3 className="text-primary font-semibold mb-2">Address</h3>
          <p className="mb-4">{contents.address}</p>

          <h3 className="text-primary font-semibold mb-2">Contact</h3>
          <p className="mb-4">{contents.contact}</p>

          <h3 className="text-primary font-semibold mb-2">Opening Hour</h3>
          <p>{contents.open}</p>
        </div>

        {/* Links */}
        <div className="text-sm">
          <h3 className="text-primary font-semibold mb-3">Links</h3>
          <ul className="space-y-2">
            {contents.links.map((link, i) => (
              <li key={i}>
                <a href={link.link} className="hover:underline">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col md:flex-row items-center justify-between border-t pt-6">
        <p className="text-xs text-gray-600">©{contents.copyright}</p>

        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            {contents.socials.map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {iconMap[social.name] ?? null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

async function getFooterContents() {
  return {
    description:
      "The AIMed Center of Excellence aims to develop AI-based technological solutions for the early screening (detection) of non-communicable diseases that are accurate, efficient, ethical, and usable by non-specialist healthcare workers in primary care settings, through a mobile platform integrated with telemedicine.",
    address:
      "Jl. Srijaya Negara, Bukit Besar, Kec. Ilir Barat I, Kota Palembang, Sumatera Selatan 30128. Universitas Sriwijaya",
    contact: "(+62) 81224147003",
    open: "9 AM—4 PM every day",
    copyright: "2025 ISys Research Group",
    links: [
      {
        name: "Research Team",
        link: "/about/research-team",
      },
      {
        name: "Infrastructure",
        link: "/about/infrastructure",
      },
      {
        name: "Products",
        link: "/products/teleotiva",
      },
      {
        name: "International Journals",
        link: "/publications/journals",
      },
      {
        name: "International Conferences (Proceedings)",
        link: "/publications/proceedings",
      },
    ],
    socials: [
      {
        name: "Instagram",
        link: "https://www.instagram.com/isys.research",
      },
      {
        name: "Linkedin",
        link: "https://id.linkedin.com/company/intelligent-system-research-group",
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/@intelligentsystemresearchg2577",
      },
    ],
  };
}

// Map CMS name → Icon component
const iconMap: Record<string, JSX.Element> = {
  Instagram: <Instagram className="w-5 h-5 text-primary cursor-pointer" />,
  Linkedin: <Linkedin className="w-5 h-5 text-primary cursor-pointer" />,
  Youtube: <Youtube className="w-5 h-5 text-primary cursor-pointer" />,
};
