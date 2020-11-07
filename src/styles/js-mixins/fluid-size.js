module.exports = (
  mixin,
  minWidth,
  maxWidth,
  minSize,
  maxSize,
  property = 'font-size',
) => {
  const getUnit = (val) => val.replace(/[0-9|.]/g, '');
  const firstUnit = getUnit(minWidth);
  const sameUnit = [maxWidth, minSize, maxSize].every(
    (val) => getUnit(val) === firstUnit,
  );

  if (!sameUnit) {
    console.log(
      `Not all units in the fluidSize mixin are equal, so the ${property} property can't be fluid`,
    );
  }

  mixin.replaceWith(`
    & {
      ${property}: ${minSize};

      ${
        sameUnit
          ? `
            @media screen and (min-width: ${minWidth}) {
              ${property}: calc(
                ${minSize} +
                ${parseFloat(maxSize) - parseFloat(minSize)}
                * ((100vw - ${minWidth}) /
                ${parseFloat(maxWidth) - parseFloat(minWidth)})
              );
            }`
          : ''
      }

      @media screen and (min-width: ${maxWidth}) {
        ${property}: ${maxSize};
      }
    }
  `);
};
