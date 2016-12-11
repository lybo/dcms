import { devhost, prodhost, title } from 'json-loader!../conf.json'

export const DEV_HOST = devhost;
export const PROD_HOST = prodhost;
export const PAGE_TITLE = title;

export const USER_ROLE = [
    'super_admin',
    'admin',
    'manager'
];
