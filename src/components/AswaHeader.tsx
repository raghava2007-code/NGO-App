import React from 'react';

interface AswaHeaderProps {
  className?: string;
}

/**
 * AswaHeader
 * Persistent top header component across the entire application displaying
 * ASWA contact info and developer attribution as clean, normal text
 * in the top-right corner without any distracting black bar.
 */
export const AswaHeader: React.FC<AswaHeaderProps> = ({ className = '' }) => {
  return (
    <header
      className={`w-full bg-transparent border-none px-4 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pb-1 flex items-center justify-end z-50 shrink-0 select-none ${className}`}
      role="banner"
      aria-label="Amma Social Welfare Association header"
    >
      <div className="text-right flex flex-col items-end max-w-full">
        {/* First line: ASWA | +91 9948885111 (ASWA is normal bold text) */}
        <div className="flex items-center justify-end gap-2 text-base sm:text-lg md:text-xl text-neutral-100 font-sans tracking-tight">
          <span className="font-extrabold text-white tracking-wide">
            ASWA
          </span>
          <span className="text-neutral-500 font-light select-none text-base sm:text-lg md:text-xl">|</span>
          <a
            href="tel:+919948885111"
            className="font-semibold text-neutral-200 hover:text-[#D4F670] transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#D4F670] rounded-xs whitespace-nowrap"
            title="Call ASWA (+91 9948885111)"
          >
            +91 9948885111
          </a>
        </div>

        {/* Second line: Developed by: Raghavendra for Amma Social Welfare Association */}
        <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-tight mt-0.5 tracking-normal">
          Developed by: <span className="text-neutral-200 font-medium">Raghavendra</span> for <span className="text-neutral-100 font-bold">Amma Social Welfare Association</span>
        </p>
      </div>
    </header>
  );
};

export default AswaHeader;
