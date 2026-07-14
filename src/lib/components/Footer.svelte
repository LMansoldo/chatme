<script lang="ts">
	import { ArrowUp, Globe, Briefcase, Camera, Mail } from '@lucide/svelte';
	import { socials } from '$lib/data/content';

	const navLinks = [
		{ label: 'Sobre', href: '#sobre' },
		{ label: 'Projetos', href: '#projetos' },
		{ label: 'Experiência', href: '#experiencia' },
		{ label: 'Habilidades', href: '#habilidades' },
		{ label: 'Contato', href: '#contato' }
	];

	const iconMap: Record<string, typeof Globe> = {
		github: Globe,
		linkedin: Briefcase,
		instagram: Camera,
		mail: Mail
	};

	let showButton = $state(false);

	function handleScroll() {
		showButton = window.scrollY > 400;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$effect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<!-- Back to top button -->
{#if showButton}
	<button
		onclick={scrollToTop}
		class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-[var(--transition-base)] hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer"
		style="background-color: var(--color-accent); color: var(--color-bg);"
		aria-label="Voltar ao topo"
	>
		<ArrowUp size={20} />
	</button>
{/if}

<!-- Footer -->
<footer
	class="border-t"
	style="background-color: var(--color-bg-surface); border-color: var(--color-border);"
>
	<div class="max-w-[var(--container-max)] mx-auto px-6 py-12">
		<!-- Main row: left / center / right -->
		<div class="flex flex-col md:flex-row items-center justify-between gap-8">
			<!-- Left: copyright -->
			<p class="text-sm" style="color: var(--color-text-secondary);">
				&copy; 2024 Lucas Mansoldo. Todos os direitos reservados.
			</p>

			<!-- Center: nav links -->
			<nav class="flex flex-wrap justify-center gap-5">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="text-sm transition-colors duration-[var(--transition-fast)] hover:opacity-100"
						style="color: var(--color-text-secondary);"
						onmouseenter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
						onmouseleave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
					>
						{link.label}
					</a>
				{/each}
			</nav>

			<!-- Right: social icons -->
			<div class="flex items-center gap-3">
				{#each socials as social (social.url)}
					{@const Icon = iconMap[social.icon] ?? Globe}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-[var(--transition-base)] hover:scale-110"
						style="background-color: var(--color-bg-elevated); color: var(--color-text-secondary);"
						onmouseenter={(e) => {
							e.currentTarget.style.backgroundColor = 'var(--color-accent)';
							e.currentTarget.style.color = 'var(--color-bg-primary)';
						}}
						onmouseleave={(e) => {
							e.currentTarget.style.backgroundColor = 'var(--color-bg-elevated)';
							e.currentTarget.style.color = 'var(--color-text-secondary)';
						}}
						aria-label={social.name}
					>
						<Icon size={16} />
					</a>
				{/each}
			</div>
		</div>

		<!-- Bottom tagline -->
		<p
			class="text-center text-xs mt-8 pt-6"
			style="color: var(--color-text-secondary); border-top: 1px solid var(--color-border);"
		>
			Feito com &hearts; e muito café
		</p>
	</div>
</footer>
