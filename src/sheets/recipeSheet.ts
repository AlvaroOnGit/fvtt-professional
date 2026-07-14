const { ItemSheet5e } = dnd5e.applications.item;

export default class RecipeSheet extends ItemSheet5e {
    static PARTS = {
        header: {
            template: "systems/dnd5e/templates/items/header.hbs"
        },
        tabs: {
            template: "systems/dnd5e/templates/shared/horizontal-tabs.hbs",
            templates: ["templates/generic/tab-navigation.hbs"]
        },
        description: {
            template: "systems/dnd5e/templates/items/description.hbs",
            scrollable: [""]
        },
        recipe: {
            template: "modules/professional/templates/items/recipe.hbs",
            scrollable: [""]
        }
    };

    static TABS = [
        { tab: "description", label: "DND5E.ITEM.SECTIONS.Description" },
        { tab: "recipe", label: "PROFESSIONAL.ITEM.SECTIONS.Recipe" }
    ];
}