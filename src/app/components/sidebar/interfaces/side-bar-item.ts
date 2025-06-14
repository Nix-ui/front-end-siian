export interface SideBarItem {
    label: string;
    icon?: string;
    route?: string;
    children?: SideBarItem[];
    roles: string[] | ['standard'];
}
