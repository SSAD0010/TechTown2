import Image from 'next/image'
import React from 'react'
import dolmarlogo from "../image/DolmarLogopng.png";

export default function page() {
  return (
    <div className='content opacity-20  mt-4 '
        style={{
            filter: "grayscale(100%)"
        }}
    >
          <div className="flex gap-2">
          <Image
            src={dolmarlogo}
            alt="Picture of the author"
            className="bg-white rounded-md p-1 min-w-[70px] max-w-[70px]"
          />
          <div>
            <h1 className=" flex scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
              DolmarLand
              <br />
            </h1>
            <p className="text-sm"> Building and Serving for your Tomorrow</p>
          </div>
        </div>

    </div>
  )
}
