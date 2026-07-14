import { onMount } from 'svelte';

export function createActiveSection() {
	let activeId = $state('hero');

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			},
			{
				rootMargin: '-20% 0px -60% 0px',
				threshold: 0
			}
		);

		const sections = document.querySelectorAll('[data-section]');
		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	});

	return {
		get current() {
			return activeId;
		}
	};
}
