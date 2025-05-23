let video;
let faceMesh;
let predictions = [];
const indices = [
  61,146,91,181,84,17,314,405,321,375,291,308,324,318,402,317,14,87,178,88,
  95,185,40,39,37,0,267,269,270,409,415,310,311,312,13,82,81,42,183,78
];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  faceMesh = ml5.faceMesh(video, modelReady);
}

function modelReady() {
  console.log('FaceMesh ready!');
  faceMesh.on('predict', results => predictions = results);
}

function draw() {
  background(255);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 畫出所有特徵點（debug用）
    fill(0, 255, 0);
    noStroke();
    for (let i = 0; i < keypoints.length; i++) {
      const [x, y] = keypoints[i];
      ellipse(x, y, 5, 5);
    }

    // 畫紅色粗線
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();
    for (let i = 0; i < indices.length - 1; i++) {
      const idxA = indices[i];
      const idxB = indices[i + 1];
      // 檢查索引是否有效
      if (keypoints[idxA] && keypoints[idxB]) {
        const [x1, y1] = keypoints[idxA];
        const [x2, y2] = keypoints[idxB];
        line(x1, y1, x2, y2);
      }
    }
  }
}
