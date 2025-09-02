import { Block, Point, Rectangle, Room, Segment, Triangle, VisibilityOutput } from './types';

const drawRectangle =
  (ctx: CanvasRenderingContext2D, { x, y, width, height }: Rectangle) => {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x, y, width, height);
    ctx.restore();
  };

const drawSegment =
  (ctx: CanvasRenderingContext2D, { p1, p2 }: Segment) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.restore();
  }

const MAX_LIGHT_RADIUS = 400;

const drawVisibilityTriangles =
  (ctx: CanvasRenderingContext2D, lightSource: Point, visibilityOutput: VisibilityOutput[]) => {
    ctx.save();
    ctx.strokeStyle = 'gray';
    // 创建径向渐变
    const gradient = ctx.createRadialGradient(
      lightSource.x, lightSource.y, 0,
      lightSource.x, lightSource.y, MAX_LIGHT_RADIUS
    );
    gradient.addColorStop(0, 'rgb(243, 243, 10)');      // 灯光色
    gradient.addColorStop(1, 'rgba(243, 243, 10, 0)'); // 透明
    ctx.fillStyle = gradient;
    for (const output of visibilityOutput) {
      if (output instanceof Triangle) {
        const { pBegin, pEnd } = output;
        ctx.beginPath();
        ctx.moveTo(lightSource.x, lightSource.y);
        ctx.lineTo(pBegin.x, pBegin.y);
        ctx.lineTo(pEnd.x, pEnd.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      } else {
        const { angleBegin, angleEnd } = output;
        ctx.beginPath();
        ctx.arc(lightSource.x, lightSource.y, MAX_LIGHT_RADIUS, angleBegin, angleEnd);
        ctx.lineTo(lightSource.x, lightSource.y);
        ctx.closePath();
        // ctx.stroke();
        ctx.fill();
      }
    }
    ctx.restore();
  };

export const drawScene =
  (ctx: CanvasRenderingContext2D, room: Room, lightSource: Point, blocks: Block[], walls: Segment[], visibilityOutput: VisibilityOutput[]) => {
    drawRectangle(ctx, room);
    blocks.forEach(drawRectangle.bind(null, ctx));
    walls.forEach((wall) => drawSegment(ctx, wall));
    drawVisibilityTriangles(ctx, lightSource, visibilityOutput);
  };
