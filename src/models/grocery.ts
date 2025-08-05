interface GroceryItemDetails {
    category: string;
    perishable: boolean;
    pantryItem: boolean;
}

type GroceryItem = Record<string, GroceryItemDetails>;

export { GroceryItem };
