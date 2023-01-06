type UnitInterpolationFunc = (x: number) => string;
export const rem: UnitInterpolationFunc = (x) => `${x}rem`;
export const em: UnitInterpolationFunc = (x) => `${x}em`;
