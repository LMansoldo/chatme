<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import { projects } from '$lib/data/content';
	import type { Project } from '$lib/types';

	let activeFilter = $state<string>('Todos');

	const filters = ['Todos', 'IA', 'Web', 'Infra'];

	const filteredProjects = $derived<Project[]>(
		activeFilter === 'Todos'
			? projects
			: projects.filter((p) => p.category === activeFilter)
	);
</script>

<section id="projects" data-section="projects" class="py-24 px-6">
	<div class="max-w-6xl mx-auto">
		<SectionHeader
			number="02"
			title="Projetos"
			accentColor="var(--color-emerald)"
		/>

		<!-- Filter Buttons -->
		<div class="flex flex-wrap gap-3 mb-10">
			{#each filters as filter (filter)}
				<button
					type="button"
					class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
						{activeFilter === filter
							? 'bg-[var(--color-emerald)] text-black'
							: 'border border-white/10 text-[var(--color-text-secondary)] hover:border-white/20 hover:text-white'}"
					onclick={() => (activeFilter = filter)}
				>
					{filter}
				</button>
			{/each}
		</div>

		<!-- Project Cards Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredProjects as project (project.id)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
