import React from 'react';
import Image from 'next/image';
interface UserInfoProps {
    image: string;
    name: string;
  }
  
  export default function UserInfo({ image, name }: UserInfoProps) {
  return (
    <div className="flex items-center">
      <Image src={image} alt="User Image" width={40} height={40} className="rounded-full mr-4" />
      <span className="font-medium text-gray-700">{name}</span>
    </div>
  );
}
