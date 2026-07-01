Hooks.once('tidy5e-sheet.ready', () => {
    const api = game.modules.get('tidy5e-sheet')?.api;

    if(!api) return;

    const craftingTab = new api.models.HtmlTab({
          title: 'Professional.Crafting.Title',
          tabId: "professional-crafting-tab",
          html: `<button type="button" class="my-button">My button</button>`,
    });

    const gatheringTab = new api.models.HtmlTab({
        title: 'Professional.Gathering.Title',
        tabId: "professional-gathering-tab",
        html: `<button type="button" class="my-button">My button</button>`,
    });

    api.registerActorTab(craftingTab);
    api.registerActorTab(gatheringTab);
});