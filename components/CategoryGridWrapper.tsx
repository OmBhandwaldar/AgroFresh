import { getTypesForCategory } from "@/lib/actions";
import CategoryGrid from "./CategoryGrid";

const CategoryGridWrapper = async () => {
    const types = await getTypesForCategory();   
    return (
        <>
            <h2 className="text-xl font-semibold mb-6">Shop by Category</h2>
            <CategoryGrid types={types} />
        </>
    );
}

export default CategoryGridWrapper;