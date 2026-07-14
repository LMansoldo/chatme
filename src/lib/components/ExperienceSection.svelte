<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import ExperienceItem from './ExperienceItem.svelte';
	import { experiences } from '$lib/data/content';
</script>

<section id="experience" data-section="experience" class="py-24 px-6">
	<div class="max-w-[var(--container-max)] mx-auto">
		<SectionHeader
			number="03"
			title="Experiência"
			accentColor="var(--color-amber)"
		/>

		<!-- Timeline container -->
		<div class="relative">
			<!-- Vertical timeline line -->
			<div
				class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
				style="background-color: var(--color-border);"
				aria-hidden="true"
			></div>

			<!-- Experience items -->
			<div class="relative flex flex-col gap-8">
				{#each experiences as experience, index (experience.id)}
					{@const isEven = index % 2 === 0}
					<div class="relative pl-12 md:pl-0">
						<!-- Timeline dot -->
						<div
							class="absolute left-2.5 md:left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10"
							style="background-color: var(--color-accent); box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);"
							aria-hidden="true"
						></div>

						<!-- Experience card -->
						<div class="md:flex {isEven ? 'md:justify-start' : 'md:justify-end'}">
							<ExperienceItem {experience} {index} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	section {
		position: relative;
	}

	@media (min-width: 768px) {
		:global(.experience-card) {
			width: calc(50% - 2rem);
		}
	}
</style>
