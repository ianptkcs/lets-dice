'use client';

import { Gender, Prisma } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React, { useRef } from 'react';
import { Label } from './ui/label';
import {
	Github,
	Mail,
	Twitter,
	Facebook,
	Instagram,
	Edit,
	Save,
	X,
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

const icons = {
	github: Github,
	mail: Mail,
	twitter: Twitter,
	facebook: Facebook,
	instagram: Instagram,
};
import Form from 'next/form';
import { useFormStatus } from 'react-dom';
import prisma from '@/lib/db';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import updateUser from '@/lib/updateUser';
import { toast } from '@/hooks/use-toast';
import { ToastAction, ToastClose } from './ui/toast';
import { Toaster } from './ui/toaster';

const ProfileCard = ({
	user,
	isUser,
}: {
	user: Prisma.UserCreateInput;
	isUser: boolean;
}) => {
	const [edited, setEdited] = React.useState(false);
	const formPending = useFormStatus().pending;
	const [usernameInput, setUsernameInput] = React.useState(user.username);
	const [slugInput, setSlugInput] = React.useState(user.slug);
	const [ageInput, setAgeInput] = React.useState(
		user.age?.toString() || 'N/A'
	);
	const [genderInput, setGenderInput] = React.useState(
		user.gender?.toString() || 'N/A'
	);
	const [bioInput, setBioInput] = React.useState(user.bio ?? 'N/A');

	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				const id = user.id;
				const updateAge = parseInt(ageInput) ?? null;
				const updateGender =
					Object.values(Gender).find(
						(gender) => formatGenderFunction(gender) === genderInput
					) ?? null;
				const res = await updateUser({
					id,
					usernameInput,
					slugInput,
					updateAge,
					updateGender,
					bioInput,
				});
				setEdited(false);
				toast({
					title: 'Profile Updated Successfully!',
					action: (
						<ToastClose>
							<span>Dismiss</span>
						</ToastClose>
					),
				});
			}}
		>
			<Card className='flex flex-col gap-4 m-2 pb-3 rounded-lg h-fit'>
				<CardContent className='grid grid-cols-10 gap-4 p-3'>
					<Avatar
						id='avatar'
						className='col-span-3'
					>
						<AvatarImage
							src={user.image || 'https://github.com/shadcn.png'}
							className='border-2 border-black shadow-lg rounded-full'
						/>
						<AvatarFallback>{user.username[0]}</AvatarFallback>
					</Avatar>
					<CardContent className='flex flex-col col-span-7 p-0 pt-3 gap-3'>
						<ProfileSpan
							isUser={isUser}
							edited={edited}
							setEdited={setEdited}
							label='username'
							input={usernameInput}
							setInput={setUsernameInput}
						/>
						<ProfileSpan
							isUser={isUser}
							edited={edited}
							setEdited={setEdited}
							label='slug'
							input={slugInput}
							setInput={setSlugInput}
						/>
					</CardContent>
				</CardContent>
				<ul className='flex flex-col gap-3 pl-7 pr-3'>
					<div className='flex gap-3'>
						<ProfileSpan
							isUser={isUser}
							edited={edited}
							setEdited={setEdited}
							label='age'
							input={ageInput}
							setInput={setAgeInput}
						/>
						<ProfileSpan
							isUser={isUser}
							edited={edited}
							setEdited={setEdited}
							label='gender'
							input={genderInput}
							setInput={setGenderInput}
						></ProfileSpan>
					</div>
					<div className='flex flex-col gap-1'>
						<Label
							htmlFor='socialLinks'
							className='italic capitalize opacity-70'
						>
							Social Links
						</Label>
					</div>
					<ProfileSpan
						isUser={isUser}
						edited={edited}
						setEdited={setEdited}
						label='bio'
						input={bioInput}
						setInput={setBioInput}
					></ProfileSpan>
				</ul>
				{isUser && (
					<CardFooter className='mt-5 pb-0'>
						<Button
							disabled={!edited || formPending}
							type='submit'
						>
							{formPending ? 'Saving...' : 'Save Changes'}
							<Save />
						</Button>
					</CardFooter>
				)}
			</Card>
			<Toaster />
		</form>
	);
};

const ProfileSpan = ({
	label,
	children,
	edited,
	setEdited,
	input,
	setInput,
	isUser,
}: {
	label?: string;
	children?: React.ReactNode;
	edited: boolean;
	setEdited: React.Dispatch<React.SetStateAction<boolean>>;
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	isUser: boolean;
}) => {
	const originalInputRef = useRef(input);

	return (
		<div className='flex flex-col gap-1'>
			{label && (
				<Label
					htmlFor={label}
					className='italic capitalize opacity-70'
				>
					{label}
				</Label>
			)}
			{label !== 'gender' ? (
				<div className='flex gap-2'>
					<Input
						id={label}
						placeholder={originalInputRef.current}
						onChange={(e) => {
							const newValue = e.target.value;
							setInput(newValue);
							if (
								newValue === originalInputRef.current ||
								newValue === ''
							) {
								setEdited(false);
							} else {
								setEdited(true);
							}
						}}
						disabled={!isUser}
					/>
				</div>
			) : (
				<div className='flex gap-2'>
					<Select
						value={input}
						onValueChange={(value) => {
							setInput(value);
							if (value === originalInputRef.current) {
								setEdited(false);
							} else {
								setEdited(true);
							}
						}}
						disabled={!isUser}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue>
								{input !== 'N/A'
									? formatGenderFunction(input)
									: input}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Gêneros</SelectLabel>
								{Object.values(Gender).map((gender, index) => {
									const formatGender =
										formatGenderFunction(gender);
									return (
										<SelectItem
											value={gender}
											key={index}
										>
											{formatGender}
										</SelectItem>
									);
								})}
								<SelectItem value='N/A'>N/A</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			)}
			{children}
		</div>
	);
};

const formatGenderFunction = (string: string) => {
	let formatString = string.toLowerCase().replace(/_/g, ' ');
	formatString = formatString.charAt(0).toUpperCase() + formatString.slice(1);
	return formatString;
};

export default ProfileCard;
