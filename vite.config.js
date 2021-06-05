import vue from '@vitejs/plugin-vue'

export default {
    plugins: [vue()],
    server: {
        proxy: {
            '^/api/.*': {
                target: 'http://localhost:3333',
                rewrite(path) {
                    return path.replace('/api/', '');
                },
                secure: false
            },
            '^/socket.io/.*': {
                target: 'http://localhost:3333',
                secure: false,
                ws: true
            }
        }
    }
}