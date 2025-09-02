import { Room, Block, Segment, Point } from './types';
import { drawScene } from './drawScene';
import { loadMap } from './loadMap';
import { calculateVisibility } from './visibility';

function spreadMap<Args extends any[], T>(cb: new (...args: Args) => T) {
  return (array2d: Args[]) =>
    array2d.map(array1d => new cb(...array1d));
}

const makeSegments = spreadMap(Segment);
const makeBlocks = spreadMap(Block);

// Prepare canvas
const canvas = document.getElementById('scene') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const xOffset = 100;
const yOffset = 100;
ctx.canvas.width = 700 + xOffset * 2;
ctx.canvas.height = 500 + yOffset * 2;
ctx.translate(xOffset, yOffset);

// Setup scene
const room = new Room(0, 0, 700, 500);

const walls = makeSegments([
  [20, 20, 20, 60],
  [20, 70, 20, 80],
  [20, 90, 20, 100],
  [20, 110, 20, 120],
  [20, 20, 100, 20],
  [100, 20, 150, 100],
  [150, 100, 50, 100],
]);

const blocks = makeBlocks([
  [50, 150, 20, 20],
  [150, 150, 40, 80],
  [400, 400, 40, 40],
]);

const run = (lightSource: Point) => {
  const endpoints = loadMap(room, blocks, walls, lightSource);
  const visibility = calculateVisibility(lightSource, endpoints);

  requestAnimationFrame(() => {
    ctx.clearRect(-xOffset, -yOffset, ctx.canvas.width, ctx.canvas.height);
    drawScene(ctx, room, lightSource, blocks, walls, visibility);
  });
};

canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
  let lightSource = new Point(offsetX - xOffset, offsetY - yOffset);
  run(lightSource);
});

run(new Point(100, 100));
