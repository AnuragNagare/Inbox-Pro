'use client'

const Footer = () => {
  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Status', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Security', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  }

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-white">
      <div className="container mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1 mb-6 text-black">
            <a className="text-purple-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
              <svg className="h-8 fill-current inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Inbox Pro AI
            </a>
            <p className="text-gray-600 mt-2">AI-powered email management that learns your priorities and automates your workflow.</p>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Product</p>
            <ul className="list-reset mb-6">
              {footerLinks.product.map((link, idx) => (
                <li key={idx} className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    className="no-underline hover:underline text-gray-800 hover:text-purple-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Support</p>
            <ul className="list-reset mb-6">
              {footerLinks.support.map((link, idx) => (
                <li key={idx} className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href={link.href} className="no-underline hover:underline text-gray-800 hover:text-purple-500">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Legal</p>
            <ul className="list-reset mb-6">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx} className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href={link.href} className="no-underline hover:underline text-gray-800 hover:text-purple-500">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <p className="uppercase text-gray-500 md:mb-6">Company</p>
            <ul className="list-reset mb-6">
              {footerLinks.company.map((link, idx) => (
                <li key={idx} className="mt-2 inline-block mr-2 md:block md:mr-0">
                  <a href={link.href} className="no-underline hover:underline text-gray-800 hover:text-purple-500">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm">
          © 2024 Inbox Pro AI. All rights reserved. | Built with ❤️ for email productivity
        </div>
      </div>
    </footer>
  )
}

export default Footer

