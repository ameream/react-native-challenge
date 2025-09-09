import { useState } from "react";

export function useExpandedSections() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  const toggleSection = (species: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(species)) {
        newSet.delete(species);
      } else {
        newSet.add(species);
      }
      return newSet;
    });
  };

  const isExpanded = (species: string) => expandedSections.has(species);

  return {
    expandedSections,
    toggleSection,
    isExpanded,
  };
}
