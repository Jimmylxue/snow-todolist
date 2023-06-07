export function addAnimate(
  dom: HTMLDivElement,
  animate: string[] = [],
  during = 800,
) {
  animate.forEach((anim) => dom.classList.add(anim));
  setTimeout(() => {
    animate.forEach((anim) => dom.classList.remove(anim));
  }, during);
  // dom.classList.add(animate)
}
