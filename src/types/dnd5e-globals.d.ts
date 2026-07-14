export {};

declare class ItemSheet5eClass {
    static PARTS: {
        header?: { template: string };
        tabs?: { template: string; templates: string[] };
        activities?: { template: string; templates: string[]; scrollable: string[] };
        advancement?: { template: string; scrollable: string[] };
        description?: { template: string; scrollable: string[] };
        details?: { template: string; scrollable: string[] };
        effects?: { template: string; scrollable: string[] };
        [key: string]: {
            template: string;
            templates?: string[];
            scrollable?: string[];
        } | undefined;
    };
}

declare global {
    const dnd5e: {
        applications: {
            item: {
                ItemSheet5e: typeof ItemSheet5eClass;
            }
        }
    }
}