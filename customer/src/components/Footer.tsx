//Icons
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-[#0d0508] border-t-2 border-slate-600 flex w-full justify-center items-center mx-auto py-4 text-white border-b-2 boder-gray-200'>
        <div className="p-2">
            <FaRegCopyright />
        </div>
        <div className="flex gap-2">
            <p>2024 TOMEI.</p>
            <p>All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer