
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'lora': ['Lora', 'serif'],
				'playfair': ['Playfair Display', 'serif'],
				'sans': ['Lora', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Michelin-inspired colors
				champagne: 'hsl(var(--champagne))',
				pearl: 'hsl(var(--pearl))',
				sage: 'hsl(var(--sage))',
				blush: 'hsl(var(--blush))',
				cream: 'hsl(var(--cream))',
				lavender: 'hsl(var(--lavender))',
				mint: 'hsl(var(--mint))',
				'gold-accent': 'hsl(var(--gold-accent))',
				'deep-charcoal': 'hsl(var(--deep-charcoal))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		// Custom scrollbar plugin
		function({ addUtilities }: any) {
			const newUtilities = {
				'.scrollbar-thin': {
					'scrollbar-width': 'thin',
					'scrollbar-color': '#10b981 #f1f8f4',
				},
				'.scrollbar-custom': {
					'&::-webkit-scrollbar': {
						width: '8px',
						height: '8px',
					},
					'&::-webkit-scrollbar-track': {
						background: 'rgba(241, 248, 244, 0.5)',
						'border-radius': '6px',
					},
					'&::-webkit-scrollbar-thumb': {
						background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
						'border-radius': '6px',
						border: '1px solid rgba(248, 255, 254, 0.5)',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
					},
				},
				'.scrollbar-none': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
