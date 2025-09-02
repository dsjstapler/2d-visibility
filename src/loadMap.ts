import { Block, Point, Rectangle, Room, Segment } from './types';

const { atan2, PI: π } = Math;

const flatMap =
  (cb: (item: any) => any[], array: any[]) =>
    array.reduce((flatArray, item) => flatArray.concat(cb(item)), []);

function rectangleToSegments({ x, y, width, height }: Rectangle) {
  const nw = [x, y] as const;
  const ne = [x + width, y] as const;
  const sw = [x, y + height] as const;
  const se = [x + width, y + height] as const;

  return [
    new Segment(...nw, ...ne),
    new Segment(...nw, ...sw),
    new Segment(...ne, ...se),
    new Segment(...sw, ...se)
  ]
}

function calculateEndPointAngles(lightSource: Point, segment: Segment) {
  const { x, y } = lightSource;
  // const dx = 0.5 * (segment.p1.x + segment.p2.x) - x;
  // const dy = 0.5 * (segment.p1.y + segment.p2.y) - y;

  segment.p1.angle = atan2(segment.p1.y - y, segment.p1.x - x);
  segment.p2.angle = atan2(segment.p2.y - y, segment.p2.x - x);
}

const setSegmentBeginning = (segment: Segment) => {
  let dAngle = segment.p2.angle - segment.p1.angle;

  if (dAngle <= -π) dAngle += 2 * π;
  if (dAngle > π) dAngle -= 2 * π;

  segment.p1.beginsSegment = dAngle > 0;
  segment.p2.beginsSegment = !segment.p1.beginsSegment;
};

const processSegments = (lightSource: Point, segments: Segment[]) => {
  for (let i = 0; i < segments.length; i += 1) {
    let segment = segments[i];
    calculateEndPointAngles(lightSource, segment);
    setSegmentBeginning(segment);
  }

  return segments;
};

const getSegmentEndPoints =
  (segment: Segment) => [segment.p1, segment.p2];

export const loadMap = (room: Room, blocks: Block[], walls: Segment[], lightSource: Point) => {
  const segments = processSegments(lightSource, [
    ...rectangleToSegments(room),
    ...flatMap(rectangleToSegments, blocks),
    ...walls
  ]);

  const endpoints = flatMap(getSegmentEndPoints, segments);

  return endpoints;
};
