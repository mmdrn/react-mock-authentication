type SidebarProps = {
	navItems: {
		label: string;
		route: string;
		iconCode: string;
		end: boolean;
	}[];
	sidebarStatus: 'collapsed' | 'expanded';
};

export { SidebarProps };
