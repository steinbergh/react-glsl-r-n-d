import hexRgb from 'hex-rgb';

const scalarRgb = (color = '#FFFFFF') => {
    return hexRgb(color, { format: 'array' }).map(value => value / 255);
};

export const GREEN = scalarRgb('#b3d143');
export const BLUE = scalarRgb('#3dc1fc');
export const PINK = scalarRgb('#ef1faa');
export const PURPLE = scalarRgb('#6f27eb');
export const RED = scalarRgb('#f6431f');
export const YELLOW = scalarRgb('#edb22d');
