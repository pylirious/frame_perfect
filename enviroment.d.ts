declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_ID: string;
            GITHUB_SECRET: string;
            REDDIT_ID: string,
            REDDIT_SECRET: string,
            NODE_ENV: 'development' | 'production';
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
