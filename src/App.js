import React from "react";
import styled from "styled-components";
import avatarImg from "../public/src/img/avatar_pika.png";
import "./styles.scss";

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};
const describeArc = (x, y, radius, startAngle, endAngle) => {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(" ");

  return d;
};

const progressConfigs = [
  {
    color: {
      from: `rgba(250, 214, 29, calc(1 / 4))`,
      to: `rgba(250, 214, 29, calc(2 / 4))`
    },
    diretion: { x1: 0, y1: 0, x2: 1, y2: 1 },
    pathAngle: {
      from: 0,
      to: 90
    }
  },
  {
    color: {
      from: `rgba(250, 214, 29, calc(2 / 4))`,
      to: `rgba(250, 214, 29, calc(3 / 4))`
    },
    diretion: { x1: 1, y1: 0, x2: 0, y2: 1 },
    pathAngle: {
      from: 90,
      to: 180
    }
  },
  {
    color: {
      from: `rgba(250, 214, 29, calc(3 / 4))`,
      to: `rgba(250, 214, 29, calc(3.5/ 4))`
    },
    diretion: { x1: 1, y1: 1, x2: 0, y2: 0 },
    pathAngle: {
      from: 180,
      to: 270
    }
  },
  {
    color: {
      from: `rgba(250, 214, 29, calc(3.5/ 4))`,
      to: `rgba(250, 214, 29, calc(4 / 4))`
    },
    diretion: { x1: 0, y1: 1, x2: 1, y2: 0 },
    pathAngle: {
      from: 270,
      to: 360
    }
  }
];
const renderProgress = (
  { color, diretion, pathAngle },
  index,
  strokeWidth,
  circleConfig
) => {
  const { cx, cy, r } = circleConfig;
  const strokeLen = Math.PI * 2 * r;
  return (
    <>
      <defs>
        <linearGradient
          id={`myGradient${index}`}
          {...diretion}
          spreadMethod="pad"
        >
          <stop offset="10%" stopColor={color.from} stopOpacity="1" />
          <stop offset="100%" stopColor={color.to} />
        </linearGradient>
      </defs>
      <path
        fill="none"
        stroke-width={strokeWidth}
        stroke={`url(#myGradient${index})`}
        d={describeArc(cx, cy, r, pathAngle.from, pathAngle.to)}
      />
    </>
  );
};

export default function App() {
  const width = 400;
  const strokeWidth = 20;
  const r = (width - strokeWidth) / 2;
  const cx = width / 2;
  const cy = width / 2;
  const percentage = 100 / 100;
  const imgWidth = r * 2 - strokeWidth;
  const range = 3.5999 * percentage * 100;
  const circleConfig = { r, cx, cy };

  console.log(r, range);

  return (
    <div className={"container"} style={{ width: width, height: width }}>
      <svg
        className={`proegress`}
        width={width}
        height={width}
        viewPort="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {progressConfigs.map((item, index) =>
          renderProgress(item, index, strokeWidth, circleConfig)
        )}
      </svg>
      <div
        className={"avatar-img"}
        style={{ width: imgWidth, height: imgWidth }}
      >
        <img src={avatarImg} alt={"avatarImg"} />
      </div>
    </div>
  );
}
