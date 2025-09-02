export class Rectangle {
  constructor(public x: number, public y: number, public width: number, public height: number) {
  }
}

export class Block extends Rectangle {
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
  }
}

export class Room extends Rectangle {
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
  }
}

export class Point {
  constructor(public x: number, public y: number) {
  }
}

export class EndPoint extends Point {
  constructor(
    public x: number,
    public y: number,
    public beginsSegment?: boolean,
    public segment?: Segment,
    public angle: number = 0,
  ) {
    super(x, y);
  }
}

export class Segment {
  p1: EndPoint;
  p2: EndPoint;
  constructor(x1: number, y1: number, x2: number, y2: number) {
    const p1 = new EndPoint(x1, y1, true);
    const p2 = new EndPoint(x2, y2, false);
    p1.segment = this;
    p2.segment = this;
    this.p1 = p1;
    this.p2 = p2;
  }
}

export class Triangle {
  pBegin: Point;
  pEnd: Point;
  constructor(pBegin: Point, pEnd: Point) {
    this.pBegin = pBegin;
    this.pEnd = pEnd;
  }
}

export class Arcle {
  angleBegin: number;
  angleEnd: number;
  constructor(angleBegin: number, angleEnd: number) {
    this.angleBegin = angleBegin;
    this.angleEnd = angleEnd;
  }
}

export type VisibilityOutput = Triangle | Arcle;