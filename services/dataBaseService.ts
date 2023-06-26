import fs from 'fs';
export const saveToDataBase = (value: any, filename: string) => {
  fs.writeFileSync(`./data/${filename}`, JSON.stringify(value), {
    encoding: 'utf-8',
  });
};
