const { ItemDataModel } = window.dnd5e.dataModels.abstract;
const { PhysicalItemTemplate, ItemDescriptionTemplate, ItemTypeTemplate } = window.dnd5e.dataModels.item;

export default class RecipeData extends ItemDataModel.mixin(PhysicalItemTemplate, ItemDescriptionTemplate, ItemTypeTemplate) {

    static LOCALIZATION_PREFIXES = [...super.LOCALIZATION_PREFIXES, "DND5E.SOURCE"];

    static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {}, { inplace: false }));

    static get inventorySection() {
        return {
            id: "recipes",
            order: 650,
            label: "TYPES.Item.RecipePl",
            groups: { type: "professional.recipe" },
            columns: ["price", "weight", "quantity", "controls"]
        };
    }

    static defineSchema() {
        return {
            ...super.defineSchema(),
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
        this.prepareDescriptionData();
        this.preparePhysicalData();
    }

    get chatProperties() {
        return [
            this.priceLabel,
            this.weight ? `${this.weight.value} ${_loc("DND5E.AbbreviationLbs")}` : null,
        ];
    }

    async getSheetData(context: any) {
        await super.getSheetData(context);

        context.subtitles = [
            ...this.physicalItemSheetFields
        ];
    }
}