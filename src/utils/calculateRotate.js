export default function calculateRotate(e,element) {
  const scrollDistance = window.scrollY || document.documentElement.scrollTop;
    const offsetLeft = element.offsetLeft + element.offsetParent.offsetLeft;
    const offsetTop = element.offsetTop + element.offsetParent.offsetTop - scrollDistance;

    const x = Math.abs(e.clientX - offsetLeft);
    const y = Math.abs(e.clientY - offsetTop);

    const yAxisCenter = element.offsetWidth / 2;
    const xAxisCenter = element.offsetHeight / 2;

    const rotateY = x <= yAxisCenter ? (1 - x / yAxisCenter) * 25 : ((x - yAxisCenter) / yAxisCenter) * -25;
    const rotateX = y <= xAxisCenter ? (1 - y / xAxisCenter) * -25 : ((y - xAxisCenter) / xAxisCenter) * 25;
    return {
      rotateX,
      rotateY,
    }
}