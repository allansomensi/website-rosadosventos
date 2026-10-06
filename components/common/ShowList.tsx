"use client";

import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import type { FormattedShow } from "@/lib/shows";
import ShowCard from "./ShowCard";

const INITIAL_COUNT = 6;
/** Só recolhe a lista se valer a pena (evita "ver mais 1 data") */
const COLLAPSE_THRESHOLD = 9;

export default function ShowList({ shows }: { shows: FormattedShow[] }) {
  const [expanded, setExpanded] = useState(false);
  const collapsible = shows.length >= COLLAPSE_THRESHOLD;
  const visible =
    expanded || !collapsible ? shows : shows.slice(0, INITIAL_COUNT);
  const hiddenCount = shows.length - INITIAL_COUNT;

  return (
    <>
      <ul className="border-bone/10 border-t">
        {visible.map((show, i) => (
          <ShowCard key={show._id} show={show} isNext={i === 0} />
        ))}
      </ul>

      {collapsible && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={buttonStyles({ variant: "outline" })}
          >
            {expanded ? "Mostrar menos" : `Ver mais ${hiddenCount} datas`}
            <IconChevronDown
              size={18}
              aria-hidden="true"
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </>
  );
}
