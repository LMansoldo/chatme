<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import SkillCategory from './SkillCategory.svelte';
	import { skills } from '$lib/data/content';
</script>

<section id="skills" data-section="skills" class="px-6 py-24">
	<div class="mx-auto max-w-[var(--container-max)]">
		<SectionHeader
			number="04"
			title="Habilidades"
			accentColor="var(--color-violet)"
		/>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each skills as category (category.category)}
				<SkillCategory {category} />
			{/each}
		</div>
	</div>
</section>
