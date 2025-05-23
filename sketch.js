let video;
let facemesh;
let predictions = [];

// 指定要連接的點的編號
const points = [
  409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291,
  76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184
];

// 新增要連接的點的陣列
const extraPoints = [
  76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184
];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', gotResults);
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  // 先將畫面水平反轉
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    stroke(255, 0, 0); // 紅色
    strokeWeight(15);

    // 依序連接原本的 points 陣列
    for (let i = 0; i < points.length - 1; i++) {
      const pt1 = keypoints[points[i]];
      const pt2 = keypoints[points[i + 1]];
      if (pt1 && pt2) {
        line(pt1[0], pt1[1], pt2[0], pt2[1]);
      }
    }

    // 依序連接新的 extraPoints 陣列
    for (let i = 0; i < extraPoints.length - 1; i++) {
      const pt1 = keypoints[extraPoints[i]];
      const pt2 = keypoints[extraPoints[i + 1]];
      if (pt1 && pt2) {
        line(pt1[0], pt1[1], pt2[0], pt2[1]);
      }
    }
  }
  pop();
}
