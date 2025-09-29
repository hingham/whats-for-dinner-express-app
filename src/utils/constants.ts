type CollectionName = 'base-freezer-recipes' | 'freezer-recipes' | 'fresh-freezer-base-recipes';

const collectionToIdPrefix: Record<CollectionName, string> = {
    'base-freezer-recipes': 'frozenBase',
    'freezer-recipes': 'frozenRecipes',
    'fresh-freezer-base-recipes': 'freshRecipes',
}

const prefixToCollectionName: Record<string, CollectionName> = {
    'frozenBase': 'base-freezer-recipes',
    'frozenRecipes': 'freezer-recipes',
    'freshRecipes': 'fresh-freezer-base-recipes',
}

export { prefixToCollectionName, collectionToIdPrefix, CollectionName };