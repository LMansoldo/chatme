<script lang="ts">
	import { Send, Globe, Briefcase, Camera, Mail } from '@lucide/svelte';
	import SectionHeader from './SectionHeader.svelte';
	import { socials } from '$lib/data/content';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let showSuccess = $state(false);

	const iconMap: Record<string, typeof Send> = {
		github: Globe,
		linkedin: Briefcase,
		instagram: Camera,
		mail: Mail
	};

	function getIcon(iconName: string) {
		return iconMap[iconName] ?? Globe;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		showSuccess = true;
		name = '';
		email = '';
		message = '';

		setTimeout(() => {
			showSuccess = false;
		}, 3000);
	}
</script>

<section id="contact" data-section="contact" class="py-24 px-6">
	<div class="max-w-[var(--container-max)] mx-auto">
		<SectionHeader number="05" title="Vamos Conversar?" accentColor="var(--color-accent)" />

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- LEFT: Contact Form -->
			<form onsubmit={handleSubmit} class="flex flex-col gap-4">
				<input
					type="text"
					bind:value={name}
					placeholder="Seu nome"
					required
					class="w-full px-4 py-3 rounded-xl transition-all duration-[var(--transition-base)] focus:outline-none"
					style="background-color: var(--color-bg-elevated); border: 1px solid var(--color-border); color: var(--color-text-primary);"
					onfocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
					onblur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
				/>
				<input
					type="email"
					bind:value={email}
					placeholder="seu@email.com"
					required
					class="w-full px-4 py-3 rounded-xl transition-all duration-[var(--transition-base)] focus:outline-none"
					style="background-color: var(--color-bg-elevated); border: 1px solid var(--color-border); color: var(--color-text-primary);"
					onfocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
					onblur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
				/>
				<textarea
					bind:value={message}
					placeholder="Sua mensagem..."
					rows="4"
					required
					class="w-full px-4 py-3 rounded-xl resize-none transition-all duration-[var(--transition-base)] focus:outline-none"
					style="background-color: var(--color-bg-elevated); border: 1px solid var(--color-border); color: var(--color-text-primary);"
					onfocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
					onblur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
				></textarea>
				<button
					type="submit"
					class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-[var(--transition-base)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 cursor-pointer"
					style="background-color: var(--color-accent); color: var(--color-bg-primary);"
				>
					<Send size={18} />
					Enviar Mensagem
				</button>
			</form>

			<!-- RIGHT: Social Links Grid -->
			<div class="grid grid-cols-2 gap-4">
				{#each socials as social (social.url)}
					{@const Icon = getIcon(social.icon)}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl transition-all duration-[var(--transition-base)] hover:scale-105 hover:shadow-lg group"
						style="background: {social.bg};"
					>
						<Icon size={28} class="text-white opacity-90 group-hover:opacity-100 transition-opacity" />
						<div class="text-center">
							<p class="text-white font-semibold text-sm">{social.name}</p>
							<p class="text-white/70 text-xs mt-0.5">{social.handle}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>

		<!-- Success Toast -->
		{#if showSuccess}
			<div
				class="fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce"
				style="background-color: var(--color-accent); color: var(--color-bg-primary);"
			>
				Mensagem enviada com sucesso!
			</div>
		{/if}
	</div>
</section>
