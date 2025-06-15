
import { Twitter, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto py-12 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <span className="font-orbitron text-xl font-bold text-white">ZURA</span>
        <p className="text-gray-500 mt-4 md:mt-0">&copy; 2025 Zura Corp. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-white"><Twitter /></a>
          <a href="#" className="text-gray-500 hover:text-white"><Instagram /></a>
          <a href="#" className="text-gray-500 hover:text-white"><Facebook /></a>
        </div>
      </div>
    </footer>
  );
};
