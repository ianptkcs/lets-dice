'use client';

import { Prisma } from '@prisma/client';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
	LoginLink,
	LogoutLink,
	RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs';
import { Button } from './ui/button';
import Link from 'next/link';
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
	ChevronsUpDown,
	Bell,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserFooter = ({ user }: { user: Prisma.UserCreateInput | null }) => {
	return user ? (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button asChild>
					<div className='h-fit flex py-0 gap-3 justify-stretch hover:cursor-pointer'>
						<Avatar className='border-2 border-white shadow-md'>
							<AvatarImage
								src={
									user.image ??
									'https://github.com/shadcn.png'
								}
							/>
							<AvatarFallback>{user.username[0]}</AvatarFallback>
						</Avatar>
						<div className='flex flex-col items-start'>
							<p className=' font-semibold'>{user.username}</p>
							<p className='text-sm italic opacity-85 truncate'>
								{user.slug}
							</p>
						</div>
						<ChevronsUpDown />
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						{user ? (
							<Link
								className='hover:cursor-pointer'
								href={`/profile/${user.slug}?is-user=true`}
							>
								<User />
								Profile
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</Link>
						) : (
							<RegisterLink className='hover:cursor-pointer'>
								<User />
								Profile
								<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
							</RegisterLink>
						)}
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Bell />
						<span>Notifications</span>
						<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<LogoutLink>
						<LogOut />
						<span>Log Out</span>
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</LogoutLink>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	) : (
		<div className='grid grid-cols-2'>
			<LoginLink>
				<Button>Sign In</Button>
			</LoginLink>
			<RegisterLink>
				<Button>Sign Up</Button>
			</RegisterLink>
		</div>
	);
};

export default UserFooter;
