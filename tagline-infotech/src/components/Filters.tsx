import React, { useEffect, useRef, useState } from "react";
import { IFilter } from "../helpers/ArrayOfFilters";
import { Debounce } from "../helpers";

interface IProps {
    filters: IFilter[],
    setAppliedFilters: Function,
    appliedFilters: any
}

const Filters = (props: IProps) => {
    const { filters, setAppliedFilters, appliedFilters } = props;
    const nameFilter = filters.filter((data) => data.filter == "name")[0];
    const nameRef: any = useRef();

    useEffect(() => {
        if (appliedFilters.name) nameRef.current.value = appliedFilters.name;
    }, [appliedFilters])

    const Labels = ({ filter, labels }: { filter: string, labels: string[] }) => {
        const labelsArray = [...labels];

        const handleClick = (value: boolean, label: string) => {
            // console.log("appliedFilters", appliedFilters)
            appliedFilters[filter] = appliedFilters[filter] || new Set();
            if (appliedFilters[filter].has(label) && !value) { appliedFilters[filter].delete(label) }
            else {
                appliedFilters[filter].add(label)
            }
            setAppliedFilters(appliedFilters);
        }

        return (
            <div>
                {
                    labelsArray.map((label, index) => {
                        return (
                            <div key={index}>
                                <input type="checkbox" onChange={(e) => handleClick(e.target.checked, label)} />
                                {label}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const NameFilter = () => {
        const handleChange = (value: string) => {
            setAppliedFilters({ ...appliedFilters, name: value })
        }

        const debounceHandleChange = Debounce(handleChange, 500);

        return (
            <input type="text" onChange={(e) => debounceHandleChange(e.target.value)} ref={nameRef} />
        )
    }

    return (
        <div className="category-container">
            {filters.map((data: IFilter, index: number) => {
                return (
                    (data.filter != "id" && data.filter != "name") &&
                    <div key={index}>
                        <span>{data.filter}</span>
                        <Labels filter={data.filter} labels={data.values} />
                    </div>
                )
            })}
            {
                nameFilter && <NameFilter />
            }
        </div>
    )
}
export default React.memo(Filters);