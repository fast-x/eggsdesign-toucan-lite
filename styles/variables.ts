import tokensJson from './tokens.json';
/*
const colors: { [key: string]: string } = {};
if (tokens && tokens.colors) {
    for (let [key, value] of Object.entries(tokens.colors)) {
        const obj = value as any;
        if (obj.type && obj.type === 'color') {
            colors[key] = obj.value;
        } else {
            for (let [childKey, childValue] of Object.entries(obj)) {
                const childObj = childValue as any;
                if (childObj.type && childObj.type === 'color') {
                    colors[key].[childKey] = obj.value;
                }
            }
        }
        
    }
}
*/

export const tokens = tokensJson;

// Variables. Colors, sizes, everythang

// SCREEN SIZES
export const screenWidthMini = '500px';
export const screenWidthSmall = '768px';
export const screenWidthMedium = '1024px';
export const screenWidthLarge = '1200px';
export const screenWidthXl = '1550px';
export const snappy = '75ms ease-in 25ms';
export const bezier = '0.5s cubic-bezier(0.25, 1, 0.5, 1)';

// FONT
//export const bodyFont = "'Poppins', sans-serif";
export const bodyFont = "'mundial', sans-serif";

// COLORS
export const colBlack = '#011627';
export const colWhite = '#fdfffc';
export const colEmerald = '#2ec4b6';
export const colMint = '#b8e1dc';
export const colLightMint = '#daefec';
export const colLava = '#e71d36';
export const colAmber = '#ff9f1c';
export const colGreen = '#3a8363';
export const colDarkBlue = '#011627';
export const colSlate = '#134765';
export const colLightGrey = '#f1f1f1';
export const colGrey = '#767676';
export const colLightBlue = '#1d5f86';
export const colWarmGrey = '#f0ebe3';

// SIZES
export const dirInnerArrowWidth = '14px';
export const dirOuterArrowWidth = '16px';
export const inputBorderRadius = '.5rem';
