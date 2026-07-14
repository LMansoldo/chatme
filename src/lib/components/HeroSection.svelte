<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { heroContent } from '$lib/data/content';
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Background geometric composition -->
	<div class="absolute inset-0 pointer-events-none" aria-hidden="true">
		<!-- Large accent circle -->
		<div
			class="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
			style="background: radial-gradient(circle, var(--color-accent), transparent 70%);"
		></div>
		<!-- Medium circle -->
		<div
			class="absolute top-[40%] right-[20%] w-[250px] h-[250px] rounded-full opacity-10 blur-2xl"
			style="background: radial-gradient(circle, var(--color-accent-hover), transparent 70%);"
		></div>
		<!-- Small circle -->
		<div
			class="absolute bottom-[30%] right-[15%] w-[150px] h-[150px] rounded-full opacity-20 blur-xl"
			style="background: radial-gradient(circle, var(--color-accent), transparent 70%);"
		></div>
		<!-- Decorative ring -->
		<div
			class="absolute top-[20%] right-[25%] w-[300px] h-[300px] rounded-full border border-accent/10 opacity-30"
		></div>
		<!-- Another ring -->
		<div
			class="absolute top-[35%] right-[10%] w-[200px] h-[200px] rounded-full border border-accent/5 opacity-20"
		></div>
		<!-- Accent line -->
		<div
			class="absolute top-[60%] right-[30%] w-[120px] h-[2px] opacity-20 rotate-45"
			style="background: linear-gradient(90deg, transparent, var(--color-accent), transparent);"
		></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 w-full max-w-[var(--container-max)] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
		<!-- Left: Text content -->
		<div class="flex flex-col gap-6">
			<!-- Eyebrow -->
			<p class="text-sm uppercase tracking-widest font-medium" style="color: var(--color-accent);">
				{heroContent.eyebrow}
			</p>

			<!-- Name -->
			<h1 class="text-5xl md:text-7xl font-bold text-white" style="font-family: var(--font-heading);">
				{heroContent.name}
			</h1>

			<!-- Subtitle -->
			<p class="text-xl max-w-lg" style="color: var(--color-text-secondary);">
				{heroContent.subtitle}
			</p>

			<!-- CTA Buttons -->
			<div class="flex flex-wrap gap-4 mt-2">
				<a
					href={heroContent.cta.primary.href}
					class="inline-flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-[var(--transition-base)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105"
					style="background-color: var(--color-accent); color: var(--color-bg);"
				>
					{heroContent.cta.primary.label}
				</a>
				<a
					href={heroContent.cta.secondary.href}
					class="inline-flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-[var(--transition-base)] hover:bg-accent/10 hover:scale-105"
					style="border: 1px solid var(--color-accent); color: var(--color-accent);"
				>
					{heroContent.cta.secondary.label}
				</a>
			</div>

			<!-- KPI Bar -->
			<div class="flex gap-8 mt-6 pt-6" style="border-top: 1px solid var(--color-border);">
				{#each heroContent.stats as stat (stat.label)}
					<div class="flex flex-col">
						<span class="text-3xl font-bold" style="color: var(--color-accent);">
							{stat.value}
						</span>
						<span class="text-sm" style="color: var(--color-text-muted);">
							{stat.label}
						</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right: Decorative geometric composition (hidden on mobile) -->
		<div class="hidden lg:block relative h-[500px]" aria-hidden="true">
			<!-- Outer glow circle -->
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full opacity-20 blur-2xl"
				style="background: radial-gradient(circle, var(--color-accent), transparent 70%);"
			></div>
			<!-- Main circle -->
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border-2 opacity-30"
				style="border-color: var(--color-accent);"
			></div>
			<!-- Inner filled circle -->
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full opacity-10"
				style="background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));"
			></div>
			<!-- Offset small circle top-right -->
			<div
				class="absolute top-[15%] right-[10%] w-[100px] h-[100px] rounded-full opacity-20 blur-sm"
				style="background: radial-gradient(circle, var(--color-accent), transparent 70%);"
			></div>
			<!-- Offset small circle bottom-left -->
			<div
				class="absolute bottom-[20%] left-[5%] w-[80px] h-[80px] rounded-full opacity-15 blur-sm"
				style="background: radial-gradient(circle, var(--color-accent-hover), transparent 70%);"
			></div>
			<!-- Decorative dot -->
			<div
				class="absolute top-[30%] left-[20%] w-3 h-3 rounded-full opacity-40"
				style="background-color: var(--color-accent);"
			></div>
			<div
				class="absolute bottom-[25%] right-[20%] w-2 h-2 rounded-full opacity-30"
				style="background-color: var(--color-accent);"
			></div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
		<ChevronDown size={24} color="var(--color-accent)" />
	</div>
</section>
