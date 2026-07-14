<script lang="ts">
	import { Menu, X } from '@lucide/svelte';
	import { sections } from '$lib/data/sections';

	let { activeSection = '' }: { activeSection?: string } = $props();

	let mobileOpen = $state(false);

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
		mobileOpen = false;
	}

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	// Lock body scroll when mobile menu is open
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = mobileOpen ? 'hidden' : '';
		}
	});
</script>

<nav class="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6"
	style="background: rgba(10, 14, 26, 0.8); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);">

	<!-- Logo -->
	<button
		onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold cursor-pointer border-none"
		style="background: var(--color-accent); color: var(--color-bg);"
		aria-label="Scroll to top"
	>
		LM
	</button>

	<!-- Desktop nav links (center) -->
	<div class="hidden md:flex items-center gap-8 mx-auto">
		{#each sections as section (section.id)}
			<button
				onclick={() => scrollTo(section.id)}
				class="relative px-1 py-2 text-sm font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
				style="color: {activeSection === section.id ? 'var(--color-accent)' : 'var(--color-text-secondary)'};"
			>
				{section.label}
				{#if activeSection === section.id}
					<span class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
						style="background: var(--color-accent);"></span>
				{/if}
			</button>
		{/each}
	</div>

	<!-- CTA button (desktop) -->
	<button
		onclick={() => scrollTo('contact')}
		class="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none transition-all duration-200 hover:opacity-90"
		style="background: var(--color-accent); color: var(--color-bg);"
	>
		Fale Comigo
	</button>

	<!-- Mobile hamburger -->
	<button
		onclick={toggleMobile}
		class="md:hidden ml-auto flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer"
		style="color: var(--color-text);"
		aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
	>
		{#if mobileOpen}
			<X size={24} />
		{:else}
			<Menu size={24} />
		{/if}
	</button>
</nav>

<!-- Mobile menu overlay -->
{#if mobileOpen}
	<div
		class="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
		style="background: rgba(10, 14, 26, 0.95); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); animation: slideIn 300ms ease forwards;"
	>
		{#each sections as section (section.id)}
			<button
				onclick={() => scrollTo(section.id)}
				class="text-2xl font-semibold bg-transparent border-none cursor-pointer transition-colors duration-200"
				style="color: {activeSection === section.id ? 'var(--color-accent)' : 'var(--color-text)'};"
			>
				{section.label}
			</button>
		{/each}

		<button
			onclick={() => scrollTo('contact')}
			class="mt-4 px-8 py-3 rounded-lg text-lg font-semibold cursor-pointer border-none"
			style="background: var(--color-accent); color: var(--color-bg);"
		>
			Fale Comigo
		</button>
	</div>
{/if}

<style>
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
