'use client';

import { Gender, Prisma } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React, { useRef } from 'react';
import { Label } from './ui/label';
import { Save } from 'lucide-react';
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
import { EdgeStoreProvider, useEdgeStore } from '../lib/edgestore';
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
import { SingleImageDropzone } from '@/components/UploadImage';
import { set } from 'zod';

const ProfileCard = ({
	user,
	isUser,
}: {
	user: Prisma.UserCreateInput | null;
	isUser: boolean;
}) => {
	if (!user) return null;
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
	const [imageInput, setImageInput] = React.useState(
		user.image ?? 'https://github.com/shadcn.png'
	);
	const [file, setFile] = React.useState<File | string>(imageInput);
	const originalImage = useRef(imageInput);
	const { edgestore } = useEdgeStore();
	const [undo, setUndo] = React.useState(false);
	const [saving, setSaving] = React.useState(false);

	return (
		<form
			onSubmit={async (event) => {
				event.preventDefault();
				setEdited(false);
				setSaving(true);
				const id = user.id;
				const updateAge = parseInt(ageInput) ?? null;
				const updateGender =
					Object.values(Gender).find(
						(gender) => formatGenderFunction(gender) === genderInput
					) ?? null;
				let newImage = originalImage.current;
				if (file !== originalImage.current) {
					if (file instanceof File) {
						const res = await edgestore.publicFiles.upload({
							file,
							onProgressChange: (progress: any) => {
								// you can use this to show a progress bar
							},
						});
						// you can run some server action or api here
						// to add the necessary data to your database
						newImage = res.url;
					} else {
						newImage = file;
					}
				}
				const updatedUser = await updateUser({
					id,
					usernameInput,
					slugInput,
					updateAge,
					updateGender,
					bioInput,
					imageInput: newImage,
				});
				toast({
					title: 'Profile Updated Successfully!',
					description:
						"We'll refresh the page for you to apply changes.",
					action: <ToastClose></ToastClose>,
				});
				setTimeout(() => {
					setSaving(false);
					window.location.reload();
				}, 1500);
			}}
		>
			<Card className='flex flex-col gap-4 m-2 pb-3 rounded-lg h-fit'>
				<CardContent className='flex flex-col gap-4 p-3 justify-center items-center'>
					<SingleImageDropzone
						width={200}
						height={200}
						value={file}
						disabled={!isUser}
						onChange={(file: any) => {
							setFile(file);
							if (file) {
								setEdited(true);
								setUndo(true);
							}
						}}
					/>
					<Button
						className={`${!undo && file && 'hidden'}`}
						type='button'
						onClick={() => {
							setFile(originalImage.current);
							setUndo(false);
						}}
					>
						Undo
					</Button>
				</CardContent>
				<ul className='flex flex-col gap-3 pl-7 pr-3'>
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
					<div className='grid grid-cols-2 gap-3'>
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
					<CardFooter className='mt-5 pb-0 justify-center'>
						<Button
							disabled={!edited || saving}
							type='submit'
						>
							{saving ? 'Saving...' : 'Save Changes'}
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
