/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            animation: {
                "fade-in": "fadeIn 1s ease-out",
                "fade-in-up": "fadeInUp 1s ease-out",
                "spin-slow": "spin 3s linear infinite",
                float: "float 4s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeInUp: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(30px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "pulse-glow": {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
                    },
                    "50%": { boxShadow: "0 0 40px rgba(251, 191, 36, 0.6)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
            fontFamily: {
                display: ["Playfair Display", "serif"],
            },
            colors: {
                gold: {
                    50: "#fef7e8",
                    100: "#fde68a",
                    200: "#fcd34d",
                    300: "#fbbf24",
                    400: "#f59e0b",
                    500: "#d97706",
                    600: "#b45309",
                },
                primary: {
                    50: "#fef7e8",
                    100: "#fde68a",
                    200: "#fcd34d",
                    300: "#fbbf24",
                    400: "#f59e0b",
                    500: "#d97706",
                    600: "#b45309",
                },
            },
        },
    },
    plugins: [],
};
