let video;
let handpose;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 初始化 Handpose 模型
  handpose = ml5.handpose(video, modelReady);

  // 當模型偵測到手部時，更新預測結果
  handpose.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Handpose model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // 繪製手指尖的紅點
  drawFingerTips();
}

function drawFingerTips() {
  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    const landmarks = prediction.landmarks;

    // 繪製手指尖的紅點 (手指尖通常是 landmarks 的最後幾個點)
    const fingerTips = [4, 8, 12, 16, 20]; // 手指尖的索引
    for (let j of fingerTips) {
      const [x, y] = landmarks[j];
      fill(255, 0, 0);
      noStroke();
      ellipse(x, y, 10, 10);
    }
  }
}
