import { loadFull } from 'tsparticles'
const usePaeticles = () => {
	const options = {
		background: {
			color: {
				value: '#EEEEEE'
			}
		},
		fpsLimit: 120,
		interactivity: {
			events: {
				onClick: {
					enable: true,
					mode: 'push'
				},
				onHover: {
					enable: true,
					mode: 'repulse'
				},
				resize: true
			},
			modes: {
				bubble: {
					distance: 400,
					duration: 2,
					opacity: 0.8,
					size: 40
				},
				push: {
					quantity: 4
				},
				repulse: {
					distance: 200,
					duration: 0.4
				}
			}
		},
		particles: {
			color: {
				value: '#00ADB5'
			},
			links: {
				color: '#00ADB5',
				distance: 150,
				enable: true,
				opacity: 0.5,
				width: 1
			},
			collisions: {
				enable: true
			},
			move: {
				direction: 'none',
				enable: true,
				outMode: 'bounce',
				random: false,
				speed: 3,
				straight: false
			},
			number: {
				density: {
					enable: true,
					area: 800
				},
				value: 80
			},
			opacity: {
				value: 0.5
			},
			shape: {
				type: 'circle'
			},
			size: {
				random: true,
				value: 5
			}
		},
		detectRetina: true
	}

	const particlesInit = async (engine: any) => {
		//await loadFull(engine);
		await loadFull(engine)
	}
	const particlesLoaded = async (container: any) => {
		console.log('Particles container loaded', container)
	}
	return {
        options,
        particlesInit,
        particlesLoaded
    }
}

export default usePaeticles
