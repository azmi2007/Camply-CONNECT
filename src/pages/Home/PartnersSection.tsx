import React from 'react';
import binusLogo from '../../assets/partners/binus-logo.png';
import itbLogo from '../../assets/partners/itb-logo.png';
import itsLogo from '../../assets/partners/its-logo.png';
import ugmLogo from '../../assets/partners/ugm-logo.png';
import undipLogo from '../../assets/partners/undip-logo.png';

const PARTNER_LOGOS = [
  { name: 'Institut Teknologi Bandung', abbr: 'ITB', logo: itbLogo, width: 500, height: 500 },
  { name: 'Universitas Gadjah Mada', abbr: 'UGM', logo: ugmLogo, width: 500, height: 500 },
  { name: 'Institut Teknologi Sepuluh Nopember', abbr: 'ITS', logo: itsLogo, width: 547, height: 365 },
  { name: 'Universitas Diponegoro', abbr: 'UNDIP', logo: undipLogo, width: 500, height: 500 },
  { name: 'BINUS University', abbr: 'BINUS', logo: binusLogo, width: 286, height: 176 }
];

export const PartnersSection: React.FC = () => {
  return (
    <section className="border-y border-[#E4E0FA] bg-[#F7F5FF] py-8 dark:border-[#D9D0FF] dark:bg-[#EFEAFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#7865F5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#6752EE] dark:text-[#5A46D6]">
              Partner Universities & Faculties
            </span>
          </div>

          <div className="partner-marquee relative w-full overflow-hidden">
            <div className="partner-marquee-track flex w-max items-center">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex items-center gap-20 pr-20 sm:gap-24 sm:pr-24"
                >
                  {PARTNER_LOGOS.map((partner) => (
                    <img
                      key={partner.abbr}
                      src={partner.logo}
                      alt={copy === 0 ? partner.name : ''}
                      width={partner.width}
                      height={partner.height}
                      className="h-[100px] w-auto max-w-[240px] shrink-0 object-contain"
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#F7F5FF] to-transparent dark:from-[#EFEAFF]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#F7F5FF] to-transparent dark:from-[#EFEAFF]" />
          </div>
        </div>
      </div>
    </section>
  );
};
