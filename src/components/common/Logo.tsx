

import Image from "next/image"
import Link from "next/link"

import logo from "../../../public/mark-white.svg"

export default function Logo (){
    return(
        <Link href="/" className="flex items-end justify-start gap-1">
            <div className="w-8 h-8 relative">
                <Image
                    src={logo}
                    fill
                    alt="logo"
                    className="object-center object-contain"
                />
            </div>
            <h1 className=" text-blue-800 font-[fantasy] -mb-1 font-extrabold text-3xl">DataRadius</h1>
        </Link>
    )
}