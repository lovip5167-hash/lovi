import React from 'react';
import aboutGif from '@/media/about.gif';

const Abo = () => {
  return (
    <section className="w-full py-20 bg-white flex justify-center items-center">
      <div className="relative p-2 border-2 border-blue-500 rounded-3xl">
        {/* GIF Container with Inner Blue Border */}
        <div className="relative flex justify-center items-center bg-white rounded-2xl p-1 border-2 border-blue-500 overflow-hidden">
          <img 
            src={aboutGif} 
            alt="About The Success Point" 
            className="w-[1150px] h-[650px] object-cover rounded-xl"
            style={{ width: '1000px', height: '450px' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Abo;
