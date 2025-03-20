import { useMemo } from "react";
import { calculateAge } from "@/fitch/calculateAge";
import { FILTERS } from "@/types/filtersEnum";

export const useFilteredProfiles = (data, selectedFilter, filterQuery) => {
  return useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.filter((profile) => {
      if (!selectedFilter) return true;

      switch (selectedFilter) {
        case FILTERS.NAME:
          return profile.name
            ?.toLowerCase()
            .includes(filterQuery.toLowerCase());
        case FILTERS.COUNTRY:
          return profile.country
            ?.toLowerCase()
            .includes(filterQuery.toLowerCase());
        case FILTERS.CITY:
          return profile.location
            ?.toLowerCase()
            .includes(filterQuery.toLowerCase());
        case FILTERS.AGE:
          return calculateAge(profile.birthdate) >= 18;
        default:
          return true;
      }
    });
  }, [data, selectedFilter, filterQuery]);
};
