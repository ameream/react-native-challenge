import { useState } from "react";

/**
 * Custom hook for managing expanded/collapsed state of multiple sections.
 * @returns object containing expanded sections state and control functions
 * @returns {Set<string>} expandedSections - set of currently expanded section names
 * @returns {function} toggleSection - function to toggle a section's expanded state
 * @returns {function} isExpanded - function to check if a section is expanded
 */
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
