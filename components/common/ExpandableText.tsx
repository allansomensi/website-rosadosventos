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

  return (
    <>
      {isExpanded ? text : `${text.slice(0, maxLength).trim()}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-1 inline-block font-medium text-zinc-400 transition-colors hover:text-white"
      >
        {isExpanded ? "menos" : "mais"}
      </button>
    </>
  );
}
