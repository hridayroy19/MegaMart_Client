// "use client";

// import React, { useEffect, useRef } from "react";
// import Link from "next/link";
// // import { DropdownMenuProps } from "@/utils/types/dropdown";
// import { motion, AnimatePresence } from "framer-motion";

// const DropdownMenu: React.FC<DropdownMenuProps> = ({
//   title,
//   items,
//   isOpen,
//   onToggle,
//   closeDropdown,
// }) => {
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         closeDropdown();
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [closeDropdown]);

//   const dropdownVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -10 },
//   };

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={onToggle}
//         className="hover:text-blue-600 transition-colors flex items-center gap-1"
//       >
//         {title}
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             variants={dropdownVariants}
//             transition={{ duration: 0.2 }}
//             className="absolute left-0 w-56 rounded-[5px] bg-white shadow-lg z-10 mt-2 overflow-hidden"
//           >
//             <ul className="flex flex-col text-sm rounded-[10px] text-gray-700 divide-y divide-gray-200">
//               {items.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className="block px-4 py-2 hover:text-[#a8dbed] hover:bg-[#b3c8e7]"
//                     onClick={closeDropdown}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default DropdownMenu;
import React from 'react';

const DropdownMenu = () => {
  return (
    <div>
      
    </div>
  );
};

export default DropdownMenu;