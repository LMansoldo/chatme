<script lang="ts">
	interface Props {
		number: string;
		title: string;
		accentColor?: string;
	}

	let { number, title, accentColor = 'var(--color-accent)' }: Props = $props();
</script>

<div class="mb-12">
	<p
		class="mb-2 text-sm font-semibold tracking-widest uppercase"
		style:color={accentColor}
	>
		{number}
	</p>
	<h2 class="text-3xl font-bold text-[var(--color-text-primary)] md:text-4xl">
		{title}
	</h2>
	<div
		class="mt-3 h-1 w-12 rounded-full"
		style:background-color={accentColor}
	></div>
</div>
