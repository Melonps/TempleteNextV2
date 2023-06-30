/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true
}

/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */
const config = {
    async redirects() {
        return [
            {
                source: '/home', // リダイレクト元のURL
                destination: '/', // リダイレクト先のURL
                permanent: true // 永続的なリダイレクトかのフラグ
            }
        ]
    }
}

module.exports = nextConfig
module.exports = config
