'use client'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#08083D] text-white text-white px-6 md:px-20 py-16">
  <div className="flex flex-col md:flex-row justify-between gap-12">
    {/* Left Section - Logo and Tagline */}
    <div className="max-w-xs">
      <img src="/logo.svg" alt="Logo" className="h-10 mb-6" />
      <p className="text-lg leading-relaxed text-white/90">
        Make the internet <br />
        delightfully human.
      </p>
    </div>

    {/* Center Sections - Links */}
    <div className="flex flex-wrap gap-16">
      {/* Products */}
      <div>
        <h4 className="text-white font-semibold mb-3">Products</h4>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>Proof Pulse</li>
          <li>Pricing</li>
          <li>Customer reviews</li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="text-white font-semibold mb-3">Resources</h4>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>The Academy</li>
          <li>Personalization guide</li>
          <li>Podcast</li>
          <li>Blog</li>
          <li>Case studies</li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-white font-semibold mb-3">Support</h4>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>FAQ & Support Center</li>
          <li className="text-blue-400">team@useproof.com</li>
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="text-white font-semibold mb-3">Company</h4>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>Our story</li>
          <li>Careers</li>
          <li>Partners</li>
          <li>200 E. 6th Street</li>
          <li>Suite 310</li>
          <li>Austin, TX 78701</li>
        </ul>
        <div className="mt-4">
          <img src="/ycombinator.svg" alt="Y Combinator" className="h-6" />
        </div>
      </div>
    </div>
  </div>

  {/* Divider */}
  <hr className="my-10 border-white/20" />

  {/* Bottom Section */}
  <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60 gap-4">
    {/* Social Icons */}
    <div className="flex gap-4">
      <a href="#"><i className="fab fa-twitter" /></a>
      <a href="#"><i className="fab fa-facebook" /></a>
      <a href="#"><i className="fab fa-linkedin" /></a>
    </div>

    {/* Footer Links */}
    <div className="flex flex-wrap gap-6">
      <a href="#">Cookies</a>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <span className="text-white font-semibold">
        © 2021 Proof Technologies, Inc.
      </span>
    </div>
  </div>
</footer>

    </div>
  )
}

export default Footer
