import { describe, expect, it } from "vitest";
import { experienceIds, experiences, resolveExperience, validateExperienceSearch } from "@/lib/experiences";

describe("experience search params", () => {
  it("accepts valid values, case-insensitively", () => {
    expect(validateExperienceSearch({ experience: "Editorial", preview: "HERO" })).toEqual({ experience: "editorial", preview: "hero" });
  });
  it("drops invalid values instead of throwing", () => {
    expect(validateExperienceSearch({ experience: "neon", preview: 3, other: "x" })).toEqual({});
  });
  it("falls back to the cinematic full experience", () => {
    const r = resolveExperience({});
    expect(r.config.id).toBe("cinematic");
    expect(r.preview).toBe("full");
  });
  it("resolves unvalidated raw search safely", () => {
    const r = resolveExperience({ experience: "neon", preview: "zzz" });
    expect([r.config.id, r.preview]).toEqual(["cinematic", "full"]);
  });
  it("has a config for every id", () => {
    for (const id of experienceIds) expect(experiences[id].className).toBe(`exp-${id}`);
  });
});
