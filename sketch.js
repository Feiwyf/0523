let video;
let faceMesh;
let predictions = [];
const indices = [
  409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291,
  76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184
];

function setup() {
  createCanvas(640, 480);
  // 畫布置中
  let canvas = createCanvas(640, 480);
  canvas.parent(document.body);
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

    // 畫紅色粗線
    stroke(255, 0, 0);
    strokeWeight(30);
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
