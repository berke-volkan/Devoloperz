/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    env:{
        apiKey: "AIzaSyAHxDF4ZLMhQHd1PYIeW0ej-mOPhVp4ZVc",
        authDomain: "panda-386904.firebaseapp.com",
        projectId: "panda-386904",
        storageBucket: "panda-386904.firebasestorage.app",
        messagingSenderId: "501981575828",
        appId: "1:501981575828:web:9baf4ff0c9b81b1ffe5281",
        measurementId: "G-9L6DCKYPKE",
        GENERATIVE_AI_API_KEY: "c1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
    },
    images: { remotePatterns: [ { protocol: 'https', hostname: '**', port: '', pathname: '**', search: '', }, ], },
}
