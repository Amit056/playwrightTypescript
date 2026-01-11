export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: 'chrome' | 'firefox' | 'webkit';
            ENV: 'aci' | 'qa' | 'production'| 'staging';
            URL: string;
            Teacher: string;
            Password: string;
            AdminUserName:string,
            AdminPassWord:string,
            LearnerPassWord:string
        }
    }
}