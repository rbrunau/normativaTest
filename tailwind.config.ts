/** @type {import('tailwindcss').Config} */

export default {
    content: ['./src/**/*.vue', './node_modules/flowbite/**/*.{js,ts}'],
    theme: {
        extend: {
            colors: {
                rab: {
                    50: '#F2F7FC',
                    100: '#E2EEF7',
                    200: '#CCE1F1',
                    300: '#A8CFE8',
                    400: '#7FB4DB',
                    500: '#609AD1',
                    600: '#5789C7',
                    700: '#426FB3',
                    800: '#3B5B92',
                    900: '#3B5B92',
                    950: '#233148',
                },
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
