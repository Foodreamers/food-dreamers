'use client';

import { motion } from 'framer-motion';
import { Anton } from 'next/font/google';

export default function Footer() {
  return (
    <footer
className="relative overflow-hidden bg-[#140824] px-[6vw] pb-10 pt-20 text-white">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_80%_90%,rgba(163,255,90,0.08),transparent_30%)]" />
<div className="relative mx-auto w-full max-w-[1512px]">
  <div className="relative z-10 flex flex-col gap-20">
    {/* TOP */}
    <div className="flex flex-col justify-between gap-16 lg:flex-row">
      {/* LEFT */}
      <div className="max-w-[620px]">
        <p
          className="text-[18px] uppercase tracking-[0.22em] text-[#C084FC]"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          FOOD DREAMERS
        </p>

        <h2
          className="mt-5 text-[72px] uppercase leading-[0.98] tracking-[-0.04em] text-white"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          LET’S CREATE
          <br />
          SOMETHING
          <br />
          UNFORGETTABLE
        </h2>

      
        <motion.button
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.96 }}
          className="mt-10 rounded-[14px] bg-[#C084FC] px-9 py-4 text-[22px] uppercase text-black shadow-[0_12px_40px_rgba(79,163,255,0.28)]"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          START A PROJECT
        </motion.button>
      </div>

      {/* RIGHT */}
      <div className="grid grid-cols-2 gap-x-20 gap-y-12 text-[16px] uppercase">
        

        <div>
          <p className="mb-5 text-[#C084FC]">Social</p>

          <div className="flex flex-col gap-3 text-white/75">
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">Facebook</a>
            <a href="#">YouTube</a>
          </div>
        </div>

        <div>
          <p className="mb-5 text-[#C084FC]">Contact</p>

          <div className="flex flex-col gap-3 text-white/75">
            <p>heldlo@fooddreamers.com</p>
            <p>MEXICO CITY, MX</p>
          </div>
        </div>

        <div>
          
          </div>
        </div>
      </div>
    </div>

    {/* BOTTOM */}
    <div className="flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 text-[14px] uppercase text-white/40 lg:flex-row lg:items-center">
      <p>© 2026 Food Dreamers. All Rights Reserved.</p>

      <div className="flex items-center gap-6">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms</a>
      </div>
    </div>
  </div>
  
</footer>
  );
}