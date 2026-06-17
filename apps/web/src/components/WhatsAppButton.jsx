import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '8968812137'; // Replace with actual number
  const message = 'Hello! I would like to know more about your wealth management services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[90px] right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95 group animate-bounce-subtle"
      aria-label="Contact us on WhatsApp"
    >
      {/* Wave animations */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-wave" />
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-wave [animation-delay:1s]" style={{ animationDelay: '1s' }} />

      <div className="relative z-10">
        {/* WhatsApp Icon SVG */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          stroke="currentColor"
          strokeWidth="0"
          fill="currentColor"
          className="transition-transform duration-300 group-hover:rotate-12"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.551 4.197 1.595 6.023L0 24l6.135-1.61a11.751 11.751 0 005.91 1.583h.005c6.637 0 12.05-5.414 12.05-12.05a11.756 11.756 0 00-3.537-8.502" />
        </svg>
      </div>
      
      {/* Tooltip on hover */}
      <span className="
  absolute right-full mr-[24px] top-1/2 -translate-y-1/2
  flex items-center gap-[6px]
  px-[13px] py-[7px]
  rounded-[10px]
  bg-[#25D366]
  border-[rgba(37,211,102,0.6)]
  shadow-[0_0_8px_rgba(37,211,102,0.5),0_0_20px_rgba(37,211,102,0.2)]
  backdrop-blur-sm
  opacity-0 scale-95
  group-hover:opacity-100 group-hover:scale-100
  transition-all duration-200 ease-out
  pointer-events-none whitespace-nowrap
">
  <i className="ti ti-brand-whatsapp text-[#ffffff] text-[24px]" aria-hidden="true" />
  <span className="text-[15px] font-medium text-[#ffffff] tracking-[0.3px]">
    Chat with us
  </span>
</span>
    </a>
  );
};

export default WhatsAppButton;
