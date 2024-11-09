
// AUTHOR: SAAKETH KESIREDDY
// LAST EDIT: 11/04/24

// TYPE
"use server";

// IMPORTS
import { Link } from "@nextui-org/react";
import { QueryFieldFilterConstraint, QueryOrderByConstraint, QueryLimitConstraint } from "@firebase/firestore";

// CATEGORY NAV BAR COMPONENT
export default async function CategoryNavBar(
    { filters, collection_name }: 
    { filters: { link: string, name: string, filters: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] }[], collection_name: string }
) {
    return (
        <div className="discussions_selection_header">
            {filters.map((filter) => (
                <Link key={filter.name} className="discussions_selection_tab" href={"/"+collection_name+"/"+filter.link}>
                    {filter.name}
                </Link>
            ))}
        </div>
    )
}