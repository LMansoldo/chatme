<script lang="ts">
	import { Brain, Code2, Layout, Cloud, Server, Monitor, Database, Users } from '@lucide/svelte';
	import type { SkillCategory as SkillCategoryType } from '$lib/types';

	interface Props {
		category: SkillCategoryType;
	}

	let { category }: Props = $props();

	const iconMap: Record<string, typeof Brain> = {
		Brain,
		Code2,
		Layout,
		Cloud,
		Server,
		Monitor,
		Database,
		Users
	};

	const levelToPercent: Record<string, number> = {
		expert: 95,
		advanced: 80,
		intermediate: 60,
		beginner: 40
	};

	const IconComponent = $derived(iconMap[category.icon] ?? Code2);

	const sortedSkills = $derived(
		[...category.skills].sort((a, b) => {
			const aPercent = levelToPercent[a.level ?? 'intermediate'] ?? 60;
			const bPercent = levelToPercent[b.level ?? 'intermediate'] ?? 60;
			return bPercent - aPercent;
		})
	);

	let visible = $state(false);

	$effect(() => {
		const timer = setTimeout(() => {
			visible = true;
		}, 50);
		return () => clearTimeout(timer);
	});
</script>

<div class="rounded-2xl bg-[var(--color-bg-surface)] p-6">
	<div class="mb-5 flex items-center gap-3">
		<div
			class="flex h-10 w-10 items-center justify-center rounded-lg"
			style:background-color="color-mix(in srgb, var(--color-violet) 15%, transparent)"
		>
			<IconComponent size={20} style="color: var(--color-violet)" />
		</div>
		<h3 class="text-lg font-semibold text-[var(--color-text-primary)]">
			{category.category}
		</h3>
	</div>

	<ul class="flex flex-col gap-4">
		{#each sortedSkills as skill, i (skill.name)}
			{@const percent = levelToPercent[skill.level ?? 'intermediate'] ?? 60}
			<li>
				<div class="mb-1.5 flex items-center justify-between">
					<span class="text-sm text-[var(--color-text-secondary)]">
						{skill.name}
					</span>
					<span class="text-xs font-medium text-[var(--color-text-secondary)]">
						{skill.level ?? 'intermediate'}
					</span>
				</div>
				<div class="h-2 w-full overflow-hidden rounded-full bg-[var(--color-bg-elevated)]">
					<div
						class="h-full rounded-full transition-all duration-700 ease-out"
						style:background-color="var(--color-violet)"
						style:width={visible ? `${percent}%` : '0%'}
						style:transition-delay="{i * 100}ms"
					></div>
				</div>
			</li>
		{/each}
	</ul>
</div>
