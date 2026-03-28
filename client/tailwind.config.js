/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#D4AF37", // Gold
                secondary: "#000000", // Black
                accent: "#FFFFFF", // White
                gold: {
                    50: "#fef7e8",
                    100: "#fde8b3",
                    200: "#fcd588",
                    300: "#f9c949",
                    400: "#f4b61e",
                    500: "#D4AF37",
                    600: "#b8942d",
                    700: "#947727",
                    800: "#785d20",
                    900: "#5e4518",
                },
            },
            fontFamily: {
                sans: ["Inter", "Noto Sans Arabic", "sans-serif"],
                display: ["Playfair Display", "serif"],
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                "spin-slow": "spin 3s linear infinite",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translate3d(0,0,0)" },
                    "50%": { transform: "translate3d(0,-10px,0)" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(212,175,55,0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(212,175,55,0.6)" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
