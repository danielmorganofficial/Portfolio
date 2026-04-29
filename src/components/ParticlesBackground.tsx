import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticlesBackground() {
    const [init, setInit] = useState(false)

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine)
        }).then(() => {
            setInit(true)
        })
    }, [])

    if (!init) return null

    return (
        <Particles
            id="tsparticles"
            options={{
                background: {
                    color: {
                        value: 'transparent',
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: 'repulse',
                        },
                        resize: {
                            enable: true,
                        },
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 100,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ['#a855f7', '#06b6d4', '#ec4899'], // Purple, Cyan, Pink
                    },
                    links: {
                        color: "#a855f7",
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outModes: {
                            default: 'bounce',
                        },
                        random: true,
                        speed: 1.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            width: 800,
                            height: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: { min: 0.3, max: 0.7 },
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: false,
                        },
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: { min: 1, max: 4 },
                    },
                },
                detectRetina: true,
            }}
            className="fixed inset-0 z-0 h-full w-full opacity-50"
        />
    )
}
