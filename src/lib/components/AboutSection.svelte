<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import { aboutText, techStack } from '$lib/data/content';
	import { User } from '@lucide/svelte';
</script>

<section id="about" data-section="about" class="px-6 py-24">
	<div class="mx-auto max-w-[var(--container-max)]">
		<SectionHeader number="01" title="Sobre Mim" accentColor="var(--color-accent)" />

		<div class="grid gap-12 md:grid-cols-[1.5fr_1fr]">
			<!-- LEFT COLUMN (60%) -->
			<div class="space-y-6">
				{#each aboutText as paragraph, i (i)}
					<p class="text-base leading-relaxed text-[var(--color-text-secondary)]">
						{paragraph}
					</p>
				{/each}

				<!-- Tech Stack Grid -->
				<div class="pt-4">
					<h3 class="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
						Tecnologias
					</h3>
					<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
						{#each techStack as row, i (i)}
							{#each row as tech (tech)}
								<span
									class="rounded-full border-l-2 bg-[var(--color-bg-tertiary)] px-4 py-2 text-center text-sm font-medium text-[var(--color-text)]"
									style:border-color="var(--color-accent)"
								>
									{tech}
								</span>
							{/each}
						{/each}
					</div>
				</div>
			</div>

			<!-- RIGHT COLUMN (40%) -->
			<div class="flex flex-col gap-6">
				<!-- Photo Placeholder -->
				<div
					class="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-[var(--color-bg-secondary)]"
					style:border-color="color-mix(in srgb, var(--color-accent) 30%, transparent)"
				>
					<User
						class="mb-3 h-16 w-16"
						style="color: color-mix(in srgb, var(--color-accent) 40%, transparent)"
					/>
					<span class="text-sm text-[var(--color-text-muted)]">Sua Foto</span>
				</div>

				<!-- Stats Card -->
				<div class="rounded-xl bg-[var(--color-bg-tertiary)] p-6 text-center">
					<p class="text-3xl font-bold" style:color="var(--color-accent)">
						5+ anos
					</p>
					<p class="mt-1 text-sm text-[var(--color-text-secondary)]">
						de experiência em software
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
