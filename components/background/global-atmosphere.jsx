import AtmosphericBackground from "./atmospheric-background";
import NoiseOverlay from "./noise-overlay";

/**
 * GlobalAtmosphere — unified ambient layer behind all content.
 *
 * Both AtmosphericBackground and NoiseOverlay are pure Server Components
 * using SVG / CSS radial gradients without client hooks or runtime JS.
 */
export default function GlobalAtmosphere() {
  return (
    <>
      <AtmosphericBackground />
      <NoiseOverlay fixed />
    </>
  );
}
