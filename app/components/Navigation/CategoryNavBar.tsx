
import { Link } from "@nextui-org/react";
import { QueryFieldFilterConstraint, QueryOrderByConstraint, QueryLimitConstraint } from "@firebase/firestore";

export default function CategoryBar({ filters }: { filters: { link: string, name: string, filters: (QueryFieldFilterConstraint | QueryOrderByConstraint | QueryLimitConstraint)[] }[] }) {
    return (
        <div className="discussions_selection_header">
            {filters.map((filter) => (
                <Link key={filter.name} className="discussions_selection_tab" href={"/discussions/"+filter.link}>
                    {filter.name}
                </Link>
            ))}
        </div>
    )
}