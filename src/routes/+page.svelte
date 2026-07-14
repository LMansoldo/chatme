<script lang="ts">
	import { createActiveSection } from '$lib/stores/activeSection';
	import Navbar from '$lib/components/Navbar.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import SkillsSection from '$lib/components/SkillsSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const activeSection = createActiveSection();
</script>

<Navbar activeSection={activeSection.current} />

<main>
	<HeroSection />
	<AboutSection />
	<ProjectsSection />
	<ExperienceSection />
	<SkillsSection />
	<ContactSection />
</main>

<Footer />
