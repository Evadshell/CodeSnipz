import React from 'react';
import { Button } from "@/components/ui/button"; // Adjust the import based on your project's structure
import { PlusIcon } from '@heroicons/react/24/outline'; // Heroicons for the plus icon
import UserInfo from './usernav'; // Adjust the import based on your project's structure

interface User {
    image: string;
    name: string;
}

interface NavbarProps {
    user: User;
    onCreatePath: () => void;
}

export default function Navbar({ user, onCreatePath }: NavbarProps) {
    return (
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <UserInfo image={user.image} name={user.name} />
            <Button onClick={onCreatePath} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md">
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Path
            </Button>
        </nav>
    );
}
