"use client"

import { UserButton } from '@/src/components/ui/user-button'
import { Button } from '@/src/components/ui/button'
import { useCurrentRole } from '@/src/hooks/use-currrent-role'
import { UserRole } from '@prisma/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Logo from '@/src/components/logo'
import Image from "next/image";
import { RoleGateForComponent } from '@/src/components/auth/role-gate-component'


const Navbar = () => {
    const pathname = usePathname();
    const role = useCurrentRole();
    return (
        <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-[90%] shadow-sm'>
            <div className='flex gap-x-2'>

                <div className='mt-[-1px]'>
                    <Image
                        // onClick={() => router.push('/')}
                        src="/images/TextLogo.png"
                        height="80"
                        width="80"
                        alt="Logo"
                    />
                </div>

                <Button
                    asChild
                    variant={pathname === "/member" ? "default" : "outline"}
                >
                    <Link href="/member">Members</Link>
                </Button>


                <RoleGateForComponent allowedRole={[UserRole.ADMIN, UserRole.MOD]}>
                    <Button
                        asChild
                        variant={pathname === "/referrer" ? "default" : "outline"}
                    >
                        <Link href="/referrer">Referrer</Link>
                    </Button>
                </RoleGateForComponent>

                <RoleGateForComponent allowedRole={[UserRole.ADMIN, UserRole.MOD]}>
                    <Button
                        asChild
                        variant={pathname === "/request" ? "default" : "outline"}
                    >
                        <Link href="/request">Requests</Link>
                    </Button>
                </RoleGateForComponent>

                <RoleGateForComponent allowedRole={[UserRole.ADMIN]}>
                    <Button
                        asChild
                        variant={pathname === "/moderator" ? "default" : "outline"}
                    >
                        <Link href="/moderator">Moderator</Link>
                    </Button>
                </RoleGateForComponent>

                <Button
                    asChild
                    variant={pathname === "/settings" ? "default" : "outline"}
                >
                    <Link href="/settings">Settings</Link>
                </Button>

            </div>
            <UserButton />
        </nav >
    )
}

export default Navbar
