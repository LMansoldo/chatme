export interface KPI {
	value: string;
	label: string;
	suffix?: string;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	tags: string[];
	category: string;
	href?: string;
	accentColor: string;
	iconText: string;
	featured?: boolean;
}

export interface Experience {
	id: string;
	role: string;
	company: string;
	period: string;
	description: string;
	tags: string[];
	current?: boolean;
}

export interface Skill {
	name: string;
	level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface SkillCategory {
	category: string;
	icon: string;
	skills: Skill[];
}

export interface SocialLink {
	name: string;
	handle: string;
	url: string;
	icon: string;
	bg: string;
}

export interface Section {
	id: string;
	label?: string;
	icon?: string;
}

export interface HeroContent {
	eyebrow: string;
	name: string;
	subtitle: string;
	cta: {
		primary: { label: string; href: string };
		secondary: { label: string; href: string };
	};
	stats: { value: string; label: string }[];
}
