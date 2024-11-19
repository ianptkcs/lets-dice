import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfileTabs = () => {
	return (
		<Tabs
			defaultValue='player'
			className='m-2'
		>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='player'>Player</TabsTrigger>
				<TabsTrigger value='GameMaster'>GameMaster</TabsTrigger>
			</TabsList>
			<TabsContent value='player'>
				<Card>
					<CardHeader>
						<CardTitle>Player</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Label htmlFor='experiences'>Experiences</Label>
							<div id='experiences'></div>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								defaultValue='@peduarte'
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save changes</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value='GameMaster'>
				<Card>
					<CardHeader>
						<CardTitle>Password</CardTitle>
						<CardDescription>
							Change your password here. After saving, you'll be
							logged out.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='space-y-1'>
							<Label htmlFor='current'>Current password</Label>
							<Input
								id='current'
								type='password'
							/>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='new'>New password</Label>
							<Input
								id='new'
								type='password'
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button>Save password</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default ProfileTabs;
