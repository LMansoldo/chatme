<script lang="ts">
	import type { Experience } from '$lib/types';

	interface Props {
		experience: Experience;
		index: number;
	}

	let { experience, index }: Props = $props();

	const isEven = $derived(index % 2 === 0);
</script>

<article
	class="experience-card group relative bg-surface rounded-2xl p-6 transition-all duration-[var(--transition-base)] hover:scale-[1.02] hover:shadow-lg"
	class:ml-0={isEven}
	class:ml-auto={!isEven}
	class:mr-0={!isEven}
	class:mr-auto={isEven}
	style="border-left: 4px solid var(--color-accent); max-width: 560px;"
>
	<!-- Company name -->
	<h3 class="text-xl font-bold text-white mb-2" style="font-family: var(--font-heading);">
		{experience.company}
	</h3>

	<!-- Role and period -->
	<div class="flex flex-wrap items-center gap-3 mb-3">
		<span class="text-sm font-medium" style="color: var(--color-accent);">
			{experience.role}
		</span>
		<span class="text-xs" style="color: var(--color-text-muted);">
			{experience.period}
		</span>
		{#if experience.current}
			<span
				class="px-2 py-0.5 text-xs font-medium rounded-full"
				style="background-color: rgba(34, 211, 238, 0.15); color: var(--color-accent);"
			>
				Atual
			</span>
		{/if}
	</div>

	<!-- Description -->
	<p class="text-sm leading-relaxed mb-4" style="color: var(--color-text-secondary);">
		{experience.description}
	</p>

	<!-- Tags -->
	{#if experience.tags && experience.tags.length > 0}
		<div class="flex flex-wrap gap-2">
			{#each experience.tags as tag (tag)}
				<span
					class="px-3 py-1 text-xs font-medium rounded-full transition-colors duration-[var(--transition-fast)] hover:bg-accent/10"
					style="border: 1px solid var(--color-accent); color: var(--color-accent);"
				>
					{tag}
				</span>
			{/each}
		</div>
	{/if}
</article>

<style>
	.experience-card {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		transition: all var(--transition-base);
	}

	.experience-card:hover {
		border-color: var(--color-border-hover);
		background-color: var(--color-bg-tertiary);
	}

	@media (max-width: 768px) {
		.experience-card {
			margin-left: 0 !important;
			margin-right: 0 !important;
			max-width: 100% !important;
		}
	}
</style>
