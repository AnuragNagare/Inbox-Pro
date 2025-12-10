'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  useEffect(() => {
    // Add scroll effect for header
    const handleScroll = () => {
      const header = document.getElementById("header");
      const navAction = document.getElementById("navAction");
      const toToggle = document.querySelectorAll(".toggleColour");

      if (window.scrollY > 10) {
        header?.classList.add("bg-white");
        header?.classList.add("shadow");
        if (navAction) {
          navAction.classList.remove("bg-white");
          navAction.classList.add("gradient");
          navAction.classList.remove("text-gray-800");
          navAction.classList.add("text-white");
        }
        toToggle.forEach(element => {
          element.classList.add("text-gray-800");
          element.classList.remove("text-white");
        });
      } else {
        header?.classList.remove("bg-white");
        header?.classList.remove("shadow");
        if (navAction) {
          navAction.classList.remove("gradient");
          navAction.classList.add("bg-white");
          navAction.classList.remove("text-white");
          navAction.classList.add("text-gray-800");
        }
        toToggle.forEach(element => {
          element.classList.add("text-white");
          element.classList.remove("text-gray-800");
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <Link className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
            <svg className="h-8 fill-current inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Inbox Pro AI
          </Link>
        </div>
        <div className="block lg:hidden pr-4">
          <button id="nav-toggle" className="flex items-center p-1 text-purple-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a className="inline-block py-2 px-4 text-black font-bold no-underline" href="#smart-reply">Smart Reply</a>
            </li>
            <li className="mr-3">
              <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#quick-templates">Quick Templates</a>
            </li>
            <li className="mr-3">
              <Link className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="/">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
};

export default Header;

