export interface Section {
	id: string;
	label: string;
}

export const sections: Section[] = [
	{ id: 'about', label: 'Sobre' },
	{ id: 'projects', label: 'Projetos' },
	{ id: 'experience', label: 'Experiência' },
	{ id: 'skills', label: 'Habilidades' },
	{ id: 'contact', label: 'Contato' }
];
