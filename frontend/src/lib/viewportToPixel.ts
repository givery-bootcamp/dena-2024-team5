export function vhToPx(vh: number): number {
  const viewportHeight = window.innerHeight;
  const px = (vh / 100) * viewportHeight;
  return px;
}

export function vwToPx(vw: number): number {
  const viewportWidth = window.innerWidth;
  const px = (vw / 100) * viewportWidth;
  return px;
}
