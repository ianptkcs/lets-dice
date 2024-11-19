import { Home, Dices, ChevronRight } from 'lucide-react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import handleAuthenticated from '@/lib/handleAuthenticated';
import UserFooter from './UserFooter';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from './ui/collapsible';

const items = [
	{
		title: 'Home',
		url: '/',
		icon: Home,
	},
	{
		title: 'Tables',
		url: '/tables',
		icon: Dices,
	},
];

const AppSidebar = async () => {
	const user = await handleAuthenticated();
	return (
		<Sidebar>
			<SidebarHeader>
				<Link
					href='/'
					className='flex justify-center items-center'
				>
					<h2 className='tracking-wide text-lg'>LET'S DICE</h2>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<Collapsible
					defaultOpen
					className='group/collapsible'
				>
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger className='gap-2'>
								<ChevronRight className='transition-transform group-data-[state=open]/collapsible:rotate-90' />
								Application
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							{items.map((item) => (
								<SidebarMenuButton asChild>
									<Link href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							))}{' '}
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
				<SidebarGroupContent>
					<SidebarMenu></SidebarMenu>
				</SidebarGroupContent>
			</SidebarContent>
			<SidebarFooter>
				<UserFooter user={user}></UserFooter>
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
