import fs from 'fs/promises'
import path from "path";

export async function loadInput(day: number): Promise<string> {
    const inputFilePath = path.join(process.cwd(), `src/day${day}`, 'input.txt');
    console.log('loading input data from: ', inputFilePath)
    const filebuffer = await fs.readFile(inputFilePath)
    return filebuffer.toString()
}

export async function profile(label: string, func: () => any) {
    performance.mark("start");
  
    const result = await func();
  
    performance.mark("end");
  
    const measure = performance.measure("start to end", "start", "end");
    console.log(`${label} Time: ${measure.duration}ms`);
  
    return result;
  }