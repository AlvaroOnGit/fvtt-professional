import CONSTANTS from './constants'
import Logger from './utils/logger'
import RecipeData from './data/recipeData';
import RecipeSheet from './sheets/recipeSheet';

/**
 * Global helper to localize keys
 */
(globalThis as any)._loc = (key: string): string => game.i18n.localize(key);

const sheetType = `${CONSTANTS.MODULE_ID}.recipe`;

Hooks.once('init', () => {
    /**
     * FOUNDRY MODULE SETTINGS
     */
    game.settings.register(`${CONSTANTS.MODULE_ID}`, 'debugMode', {
        name: 'SETTINGS.DebugMode.Name',
        hint: 'SETTINGS.DebugMode.Hint',
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
    });

    Logger.info('Initializing Module');

    CONFIG.Item.dataModels[`${CONSTANTS.MODULE_ID}.recipe`] = RecipeData;
    CONFIG.DND5E.defaultArtwork.Item[`${CONSTANTS.MODULE_ID}.recipe`] = `modules/${CONSTANTS.MODULE_ID}/assets/icons/recipe.svg`;

    const Items = foundry.documents.collections.Items;
    Items.registerSheet(
        CONSTANTS.MODULE_ID,
        RecipeSheet,
        {
            types: [`${sheetType}`],
            makeDefault: true
        }
    );
})


Hooks.once('ready', () => {
    /**
    * Removes the default dnd5e item sheet from the recipe item subtype
    */
    const sheets = CONFIG.Item.sheetClasses[`${sheetType}`];

    if (sheets) {
        delete sheets["dnd5e.ItemSheet5e"];
    }
})

//Hooks.once('tidy5e-sheet.ready', () => {
//    const api = game.modules.get('tidy5e-sheet')?.api;
//
//    if(!api) return;
//
//    const craftingTab = new api.models.HtmlTab({
//          title: 'Professional.Crafting.Title',
//          tabId: "professional-crafting-tab",
//          html: `<button type="button" class="my-button">My button</button>`,
//    });
//
//    const gatheringTab = new api.models.HtmlTab({
//        title: 'Professional.Gathering.Title',
//        tabId: "professional-gathering-tab",
//        html: `<button type="button" class="my-button">My button</button>`,
//    });
//
//    api.registerActorTab(craftingTab);
//    api.registerActorTab(gatheringTab);
//});