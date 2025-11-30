export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: 'chrome' | 'firefox' | 'webkit';
            ENV: 'qa' | 'staging' | 'production';
            URL: string;
            Teacher: string;
            Password: string;
        }
    }
}