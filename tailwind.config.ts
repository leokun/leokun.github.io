import type { Config } from 'tailwindcss'

export default {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                bg: '#0b0f10',
                fg: '#c8d1d1',
                accent: {
                    DEFAULT: '#0fb9b1',
                    600: '#0a8f89',
                    700: '#086e69'
                }
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'monospace']
            },
            fontSize: {
                xs: 'calc(var(--fs-base) * 0.75)',
                sm: 'calc(var(--fs-base) * 0.875)',
                base: 'var(--fs-base)',
                lg: 'calc(var(--fs-base) * 1.125)',
                xl: 'calc(var(--fs-base) * 1.25)',
                '2xl': 'calc(var(--fs-base) * 1.5)',
                '3xl': 'calc(var(--fs-base) * 1.875)',
                '4xl': 'calc(var(--fs-base) * 2.25)',
                '5xl': 'calc(var(--fs-base) * 3)',
                '6xl': 'calc(var(--fs-base) * 3.75)',
                '7xl': 'calc(var(--fs-base) * 4.5)',
                '8xl': 'calc(var(--fs-base) * 6)',
            }
        }
    },
    plugins: []
} satisfies Config
