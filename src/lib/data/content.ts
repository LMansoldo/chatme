import type {
	Project,
	Experience,
	SkillCategory,
	SocialLink,
	HeroContent
} from '$lib/types';

export const aboutText: string[] = [
	'Sou um engenheiro de software e apaixonado por inteligencia artificial com mais de 5 anos de experiencia criando solucoes inovadoras. Atualmente trabalho como AI Software Engineer na Sediah AI, onde desenvolvo sistemas inteligentes que resolvem problemas reais de negocio.',
	'Sou co-fundador da Nexus IA, uma startup focada em IA generativa e automacao inteligente. Acredito que a tecnologia tem o poder de transformar a maneira como vivemos e trabalho para construir o futuro com codigo e dados.'
];

export const techStack: string[][] = [
	['TypeScript', 'Python', 'Svelte', 'React'],
	['Node.js', 'LangChain', 'PostgreSQL', 'Docker']
];

export const heroContent: HeroContent = {
	eyebrow: 'Software Engineer & AI Engineer',
	name: 'Lucas Mansoldo',
	subtitle:
		'Construo sistemas inteligentes que fazem a diferenca. 5+ anos de experiencia, 30+ projetos entregues, 10+ hackathons.',
	cta: {
		primary: { label: 'Ver Projetos', href: '#projects' },
		secondary: { label: 'Fale Comigo', href: '#contact' }
	},
	stats: [
		{ value: '5+', label: 'Anos de experiencia' },
		{ value: '30+', label: 'Projetos entregues' },
		{ value: '10+', label: 'Hackathons' },
		{ value: '3', label: 'Empresas' }
	]
};

export const projects: Project[] = [
	{
		id: 'babyclothes',
		title: 'BabyClothes',
		description:
			'Plataforma de e-commerce para roupas de bebe com sistema de recomendacao por IA e painel administrativo completo.',
		tags: ['SvelteKit', 'TypeScript', 'AI', 'E-commerce'],
		category: 'IA',
		accentColor: '#22d3ee',
		iconText: 'BC',
		featured: true
	},
	{
		id: 'ticket-projection',
		title: 'Ticket Projection',
		description:
			'Aplicacao de projecao financeira com graficos interativos, snapshots de dados e calculos matematicos avancados.',
		tags: ['Svelte', 'TypeScript', 'Chart.js', 'Math'],
		category: 'Web',
		accentColor: '#a78bfa',
		iconText: 'TP',
		featured: true
	},
	{
		id: 'focusflow',
		title: 'FocusFlow',
		description:
			'Aplicativo de produtividade com tecnica Pomodoro, tracking de tarefas e analise de foco com IA.',
		tags: ['React', 'Node.js', 'AI', 'Productivity'],
		category: 'IA',
		accentColor: '#34d399',
		iconText: 'FF'
	},
	{
		id: 'n1-detector',
		title: 'N1 Detector',
		description:
			'Sistema de deteccao de anomalias em dados de serie temporal usando machine learning e processamento em tempo real.',
		tags: ['Python', 'ML', 'Time Series', 'Detection'],
		category: 'IA',
		accentColor: '#f59e0b',
		iconText: 'N1'
	},
	{
		id: 'jobapply',
		title: 'JobApply',
		description:
			'Plataforma automatizada para candidaturas em vagas de emprego com matching de curriculo por IA e tracking de aplicacoes.',
		tags: ['SvelteKit', 'AI', 'Automation', 'Career'],
		category: 'Web',
		accentColor: '#f472b6',
		iconText: 'JA'
	},
	{
		id: 'odysseus',
		title: 'Odysseus',
		description:
			'Sistema de orquestracao de agentes de IA com memoria persistente, ferramentas customizadas e pipeline de execucao.',
		tags: ['Python', 'AI Agents', 'LangChain', 'Orchestration'],
		category: 'IA',
		accentColor: '#fb923c',
		iconText: 'OD'
	}
];

export const experiences: Experience[] = [
	{
		id: 'sediah',
		role: 'AI Software Engineer',
		company: 'Sediah AI',
		period: '2024 - Presente',
		description:
			'Desenvolvimento de solucoes de inteligencia artificial aplicadas a problemas reais de negocio, incluindo sistemas de NLP, automacao inteligente e integracao com LLMs.',
		tags: ['IA Generativa', 'LLMs', 'RAG', 'NLP'],
		current: true
	},
	{
		id: 'nexus',
		role: 'Co-founder & AI Lead',
		company: 'Nexus IA',
		period: '2023 - Presente',
		description:
			'Co-fundacao e lideranca tecnica de startup focada em IA generativa e automacao inteligente para empresas.',
		tags: ['IA Generativa', 'Agentes de IA', 'Lideranca', 'Startup'],
		current: true
	},
	{
		id: 'stefanini',
		role: 'Software Engineer',
		company: 'Stefanini',
		period: '2021 - 2023',
		description:
			'Desenvolvimento de solucoes enterprise de software com foco em APIs, microservicos e integracao de sistemas.',
		tags: ['APIs', 'Microservicos', 'CI/CD', 'Enterprise']
	},
	{
		id: 'venturus',
		role: 'Software Developer',
		company: 'Venturus',
		period: '2020 - 2021',
		description:
			'Desenvolvimento full-stack de aplicacoes web e mobile para projetos de inovacao e P&D.',
		tags: ['React', 'Vue', 'Node.js', 'Python', 'P&D']
	}
];

export const skills: SkillCategory[] = [
	{
		category: 'AI & Machine Learning',
		icon: 'Brain',
		skills: [
			{ name: 'LangChain', level: 'expert' },
			{ name: 'OpenAI API', level: 'expert' },
			{ name: 'RAG', level: 'advanced' },
			{ name: 'Prompt Engineering', level: 'expert' },
			{ name: 'AI Agents', level: 'advanced' }
		]
	},
	{
		category: 'Backend',
		icon: 'Code2',
		skills: [
			{ name: 'Node.js', level: 'expert' },
			{ name: 'Python', level: 'advanced' },
			{ name: 'PostgreSQL', level: 'advanced' },
			{ name: 'REST APIs', level: 'expert' },
			{ name: 'GraphQL', level: 'intermediate' }
		]
	},
	{
		category: 'Frontend',
		icon: 'Layout',
		skills: [
			{ name: 'TypeScript', level: 'expert' },
			{ name: 'React', level: 'advanced' },
			{ name: 'Svelte', level: 'advanced' },
			{ name: 'Tailwind CSS', level: 'expert' },
			{ name: 'Next.js', level: 'advanced' }
		]
	},
	{
		category: 'DevOps & Cloud',
		icon: 'Cloud',
		skills: [
			{ name: 'Docker', level: 'advanced' },
			{ name: 'AWS', level: 'intermediate' },
			{ name: 'CI/CD', level: 'advanced' },
			{ name: 'Git', level: 'expert' },
			{ name: 'Linux', level: 'advanced' }
		]
	},
	{
		category: 'Data',
		icon: 'Code2',
		skills: [
			{ name: 'SQL', level: 'advanced' },
			{ name: 'Data Pipelines', level: 'intermediate' },
			{ name: 'Vector Databases', level: 'advanced' },
			{ name: 'Embeddings', level: 'advanced' }
		]
	},
	{
		category: 'Soft Skills',
		icon: 'Layout',
		skills: [
			{ name: 'Lideranca tecnica', level: 'advanced' },
			{ name: 'Comunicacao', level: 'expert' },
			{ name: 'Trabalho em equipe', level: 'expert' },
			{ name: 'Resolucao de problemas', level: 'expert' }
		]
	}
];

export const socials: SocialLink[] = [
	{
		name: 'GitHub',
		handle: '@lucasmansoldo',
		url: 'https://github.com/lucasmansoldo',
		icon: 'github',
		bg: 'linear-gradient(135deg, #333, #24292e)'
	},
	{
		name: 'LinkedIn',
		handle: '/in/lucasmansoldo',
		url: 'https://linkedin.com/in/lucasmansoldo',
		icon: 'linkedin',
		bg: 'linear-gradient(135deg, #0077B5, #00669C)'
	},
	{
		name: 'Instagram',
		handle: '@lucasmansoldo',
		url: 'https://instagram.com/lucasmansoldo',
		icon: 'instagram',
		bg: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)'
	},
	{
		name: 'Email',
		handle: 'lucasmansoldo0@gmail.com',
		url: 'mailto:lucasmansoldo0@gmail.com',
		icon: 'mail',
		bg: 'linear-gradient(135deg, #22d3ee, #06b6d4)'
	}
];
