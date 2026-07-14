<script lang="ts">
	import { ExternalLink } from '@lucide/svelte';
	import type { Project } from '$lib/types';

	let { project }: { project: Project } = $props();
</script>

<a
	href={project.href ?? '#'}
	class="group block bg-[var(--color-bg-surface)] rounded-2xl border border-white/5 overflow-hidden hover:border-[var(--color-accent)]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,211,238,0.1)]"
>
	<!-- Gradient Header -->
	<div
		class="h-48 relative flex items-center justify-center"
		style="background: linear-gradient(135deg, {project.accentColor}15, {project.accentColor}05)"
	>
		<div
			class="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold"
			style="background: {project.accentColor}20; color: {project.accentColor}"
		>
			{project.iconText}
		</div>
	</div>

	<!-- Body -->
	<div class="p-6">
		<div class="flex items-start justify-between mb-2">
			<h3 class="text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
				{project.title}
			</h3>
			<ExternalLink
				size={18}
				class="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0 ml-2"
			/>
		</div>

		<p class="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">
			{project.description}
		</p>

		<!-- Tech Tags -->
		<div class="flex flex-wrap gap-2">
			{#each project.tags as tag (tag)}
				<span
					class="text-xs px-2.5 py-1 rounded-full border"
					style="border-color: {project.accentColor}40; color: {project.accentColor}"
				>
					{tag}
				</span>
			{/each}
		</div>
	</div>
</a>
