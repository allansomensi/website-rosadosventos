"use client";

import { useState } from "react";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
}

export default function ExpandableText({
  text,
  maxLength = 100,
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  if (text.length <= maxLength) {
    return <>{text}</>;
  }

  // Corta na última palavra inteira para não quebrar no meio
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const truncated = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim();

  return (
    <>
      {isExpanded ? text : `${truncated}…`}{" "}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="text-brass hover:text-brass-bright decoration-brass/40 inline font-medium whitespace-nowrap underline underline-offset-4 transition-colors"
      >
        {isExpanded ? "ler menos" : "ler mais"}
      </button>
    </>
  );
}
