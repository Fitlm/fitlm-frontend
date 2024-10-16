const uproadButton = document.getElementById("uproad");
const moveButton = document.getElementById("move");
const tiltButton = document.getElementById("tilt");
const showButton = document.getElementById("show");
const captureButton = document.getElementById("capture");
const imageContainer = document.getElementById("imageContainer");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const closeButton = document.querySelector(".close-btn");
const popupImageUpload = document.getElementById("popupImageUpload");
const imageUploadContainer = document.getElementById("imageUploadContainer");
const textColorPicker = document.getElementById("ColorPicker");
const dateInput = document.getElementById("date");
let uploadedFileName = "";
let uploadedFileId = ""; // 이미지 파일 ID 저장할 변수 추가

dateInput.value = new Date().toISOString().substring(0, 10);

uproadButton.addEventListener("click", function () {
  popup.style.display = "block";
  overlay.style.display = "block";
});

closeButton.addEventListener("click", function () {
  popup.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", function () {
  popup.style.display = "none";
  overlay.style.display = "none";
});

imageUploadContainer.addEventListener("click", function () {
  popupImageUpload.click();
});

popupImageUpload.addEventListener("change", function (event) {
  const files = event.target.files;
  if (files.length > 0) {
    const file = files[0];
    uploadedFileName = file.name; // 파일 이름 저장
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        const uploadedImage = img;
        uploadedImage.crossOrigin = "Anonymous";
        uploadedImage.style.border = "1.2px solid #00000013";
        uploadedImage.id = "uproadPhoto";

        const fixedHeight = 240; // 고정 세로 크기
        const aspectRatio = uploadedImage.width / uploadedImage.height;
        const targetWidth = fixedHeight * aspectRatio; // 가로 크기 비율 유지

        const photoContainerSet = document.createElement("div");
        photoContainerSet.className = "photo-container-set";
        photoContainerSet.id = "uproadPhotoSet";
        photoContainerSet.style.width = `${targetWidth + 20}px`; // 가로 크기 설정
        photoContainerSet.style.position = "absolute"; // 위치 설정을 위해 절대 위치로 변경

        const photoInner = document.createElement("div");
        photoInner.className = "photo-inner";

        const photoFront = document.createElement("div");
        photoFront.className = "photo-front";
        photoFront.id = "photoColor1";

        const photoContainer = document.createElement("div");
        photoContainer.className = "photo-container";
        photoContainer.id = "photoColor2";
        photoContainer.style.width = `${targetWidth}px`; // 가로 크기 설정
        photoContainer.appendChild(uploadedImage);

        const viewsElement = document.createElement("div");
        viewsElement.className = "views";
        viewsElement.textContent = "0";
        viewsElement.style.marginBottom = "2px";

        const flipIcon = document.createElement("div");
        flipIcon.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 1em; height: 1em; margin-left: 1px; margin-top: 2px; transform: scale(0.85);">
                    <path fill="#40230c" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                    </svg>`;
        flipIcon.style.marginLeft = "1px";
        flipIcon.style.marginTop = "2px";
        viewsElement.appendChild(flipIcon);

        const dateElement = document.createElement("div");
        dateElement.className = "date";
        dateElement.id = "photoDate";
        dateElement.style.marginBottom = "3px";
        const currentDate = new Date().toLocaleDateString();
        dateElement.textContent = currentDate;

        // 상단 중앙에 랜덤 테이프 추가
        const tapeImage = new Image();
        tapeImage.src = tapes[Math.floor(Math.random() * tapes.length)];
        tapeImage.style.position = "absolute";
        tapeImage.style.width = "20px";
        tapeImage.style.height = "43px";
        tapeImage.style.top = "-30px";
        tapeImage.style.left = "50%";
        const randomRotate = Math.random() * 20 - 10;
        let transformString = `translateX(-50%) rotate(${randomRotate}deg)`;
        // 랜덤 반전
        if (Math.random() < 0.5) {
          transformString += " scaleX(-1)";
        }
        if (Math.random() < 0.5) {
          transformString += " scaleY(-1)";
        }
        tapeImage.style.transform = transformString;

        // photoContainerSet 텍스처 추가
        const backgroundImgSet = document.createElement("img");
        backgroundImgSet.src =
          photoTextures[Math.floor(Math.random() * photoTextures.length)];
        backgroundImgSet.style.position = "absolute";
        backgroundImgSet.style.top = "0";
        backgroundImgSet.style.left = "0";
        backgroundImgSet.style.width = "100%";
        backgroundImgSet.style.height = "100%";
        backgroundImgSet.style.opacity = "0.07";
        backgroundImgSet.style.pointerEvents = "none";
        backgroundImgSet.style.zIndex = "1";

        photoFront.appendChild(backgroundImgSet);
        photoContainer.appendChild(tapeImage);
        photoContainer.appendChild(viewsElement);
        photoContainer.appendChild(dateElement);
        photoFront.appendChild(photoContainer);
        photoInner.appendChild(photoFront);
        photoContainerSet.appendChild(photoInner);
        document.getElementById("imageUploadContainer").innerHTML = "";
        document
          .getElementById("imageUploadContainer")
          .appendChild(photoContainerSet);
        updateScale();
      };
    };
    reader.readAsDataURL(file);
  }
});

// 날짜 변경 시 사진 밑의 날짜도 변경
dateInput.addEventListener("change", function () {
  const photoDate = document.getElementById("photoDate");

  if (photoDate) {
    const date = new Date(dateInput.value);
    const formattedDate = `${date.getFullYear()}. ${
      date.getMonth() + 1
    }. ${date.getDate()}.`;
    photoDate.textContent = formattedDate;
  }
});

uproadButton.addEventListener("click", function () {
  adjustPopupLayout();
  uproadButton.classList.toggle("active");
});

captureButton.addEventListener("click", function () {
  const buttons = [
    uproadButton,
    captureButton,
    moveButton,
    tiltButton,
    showButton,
  ];
  const photoContainerSets = document.querySelectorAll(".photo-container-set");

  // 상태 저장
  const originalStates = [];
  photoContainerSets.forEach((container) => {
    const inner = container.querySelector(".photo-inner");
    const fcontainer = container
      .querySelector(".photo-front")
      .querySelector(".photo-container");
    const bcontainer = container
      .querySelector(".photo-back")
      .querySelector(".photo-container");

    const isFlipped = container.classList.contains("flipped");
    const { left, top } = container.style;
    originalStates.push({ container, inner, isFlipped, left, top });
    if (isFlipped) {
      container.querySelector(".photo-front").style.display = "none";
      container.querySelector(".photo-back").style.display = "block";
    } else {
      container.querySelector(".photo-front").style.display = "block";
      container.querySelector(".photo-back").style.display = "none";
    }
    fcontainer.style.marginTop = "11px";
    bcontainer.style.marginTop = "11px";
  });

  buttons.forEach((button) => (button.style.visibility = "hidden"));

  // 요소의 크기를 일시적으로 확대하여 스크롤 영역을 포함한 전체 콘텐츠 캡쳐
  const originalOverflow = imageContainer.style.overflow;
  const originalWidth = imageContainer.style.width;
  const originalHeight = imageContainer.style.height;

  imageContainer.style.overflow = "visible";
  imageContainer.style.width = `${imageContainer.scrollWidth}px`;
  imageContainer.style.height = `${imageContainer.scrollHeight}px`;

  htmlToImage
    .toPng(imageContainer, { quality: 4, backgroundColor: null })
    .then(function (dataUrl) {
      // 상태 복원
      originalStates.forEach(({ container, isFlipped, left, top }) => {
        if (isFlipped) {
          container.querySelector(".photo-front").style.display = "block";
          container.querySelector(".photo-back").style.display = "block";
        } else {
          container.querySelector(".photo-front").style.display = "block";
          container.querySelector(".photo-back").style.display = "block";
        }
        container.style.left = left;
        container.style.top = top;
      });

      buttons.forEach((button) => (button.style.visibility = "visible"));
      imageContainer.style.overflow = originalOverflow;
      imageContainer.style.width = originalWidth;
      imageContainer.style.height = originalHeight;

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "PictureBoard.png";
      link.click();
    })
    .catch(function (error) {
      console.error("캡쳐 오류:", error);
      buttons.forEach((button) => (button.style.visibility = "visible"));
      imageContainer.style.overflow = originalOverflow;
      imageContainer.style.width = originalWidth;
      imageContainer.style.height = originalHeight;
    });
});
// 만족도 체크 이미지 클릭 이벤트 추가
const satisfactionImages = document.querySelectorAll(".satisfaction-img");
satisfactionImages.forEach((img) => {
  img.addEventListener("click", function () {
    satisfactionImages.forEach((i) => (i.style.transform = "scale(1)"));
    if (this.style.transform !== "scale(1.2)") {
      this.style.transform = "scale(1.2)";
    } else {
      this.style.transform = "scale(1)";
    }
  });
});

document.getElementById("submit").addEventListener("click", async function () {
  const uploadedImageElement = document.querySelector(
    "#imageUploadContainer #uproadPhotoSet"
  );
  const imageName = uploadedImageElement
    ? uploadedFileName
    : "No image uploaded";
  const date = document.getElementById("photoDate").textContent;
  const part = document.getElementById("part").value;
  const time = document.getElementById("time").value;
  const satisfactionImg = document.querySelector(
    '.satisfaction-img[style*="scale(1.2)"]'
  );
  const satisfactionId = satisfactionImg ? satisfactionImg.id : "None";
  const memo = document.getElementById("memo").value.replace(/\n/g, "<br>");

  if (imageName == "No image uploaded") {
    alert("이미지를 업로드해야 합니다.");
    return;
  } else if (satisfactionId == "None") {
    alert("이모지를 선택해야 합니다.");
    return;
  }
  // 대호: 여기가 이미지 업로드 처리 코드 이거대로 서버에 업로드하면 됨
  // 대호: alert지우고 사용하면 됨.
  const img = document.getElementById("uproadPhoto"); // 대호: 이게 이미지임. 이걸로 이미지 업로드 못하겠으면 위에 주석으로 이동해서 한번 업로드 구조 확인 ㄱㄱ
  // 대호: 이미지 번호는 사용자 정보 저장쪽에 이미지 업로드 개수 추가해서 업로드 할때마다 1씩 추가하면 됨.
  // 대호: 이미지 파일 명이 사용자 아이디 + 이미지 업로드 개수(이미지 업로드 순서로)
  // 대호: 이거 데이터들 꼭 하나 테이블에 넣을 필요는 없음 형 마음대로 구성 ㄱㄱ
  console.log(
    "upload \n" +
      `id: id\n` +
      `image파일명: ${"id랑"}${"이미지 번호"}\n` + //254라인 주석 ㄱㄱ 아니면 형 편한대로
      `날짜: ${date}\n` +
      `운동 종목: ${part}\n` +
      `만족도: ${satisfactionId}\n` +
      `운동 시간: ${time}\n` +
      `메모: ${memo}\n` +
      `x: ${0}\n` + // 대호: 여기는 0들어가면 됨.
      `y: ${0}\n` + // 대호: 여기는 0들어가면 됨.
      `rotate: ${"0deg"}\n` + // 대호: 여기는 0deg들어가면 됨.
      `scale: ${1}\n` + // 대호: scale는 1로 들어가야함
      `zindex: ${2}\n` + // 대호: zindex는 2로 들어가야함
      `flip: ${0}\n` // 대호: 여기는 0들어가면 됨.
  );

  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기 (또는 쿠키 등 다른 저장소)

  var user;
  try {
    const response = await fetch("http://localhost:4000/users/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 토큰 포함
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    user = await response.json(); // 응답 데이터를 user 변수에 저장
    console.log("Authenticated user:", user); // user 변수 출력 (디버깅용)

    // 여기서 user 변수를 사용하여 필요한 작업 수행
    // 예: user.email, user.name 등
  } catch (error) {
    console.error("Failed to fetch authenticated user:", error);
  }

  // 이미지를 서버에 업로드하고 이미지 ID를 얻기 위한 코드
  let uploadedImageId;
  try {
    const formData = new FormData();
    formData.append("file", popupImageUpload.files[0]); // 선택한 파일 추가
    const uploadResponse = await fetch("http://localhost:4000/products/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // 토큰 포함
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Image upload error! Status: ${uploadResponse.status}`);
    }

    const uploadResult = await uploadResponse.json();
    uploadedImageId = uploadResult.fileId; // 업로드된 이미지의 ID 저장
  } catch (error) {
    console.error("Image upload failed:", error);
    return; // 이미지 업로드 실패 시 중단
  }

  const color = document.getElementById("ColorPicker").value;
  // 제품 데이터 객체 생성
  const productData = {
    userId: user.userId, // 사용자 ID로 대체해야 함
    imageName: uploadedImageId, // 이미지 파일 ID로 수정
    color: color,
    date: date,
    part: part,
    time: time, // Number 형식으로 변환
    satisfactionId: satisfactionId,
    memo: memo,
  };

  console.log("Product data to be sent:", productData);

  try {
    const response = await fetch("http://localhost:4000/api/newProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 토큰 포함
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      console.log("Product uploaded successfully:", await response.json());
    } else {
      console.error(
        "Failed to upload product:",
        response.status,
        response.statusText
      );
      const errorData = await response.text(); // 서버에서 전송한 에러 메시지를 텍스트로 읽기
      console.error("Error details:", errorData);
    }
  } catch (error) {
    console.error("Error uploading product:", error);
  }

  // 업로드된 이미지 요소가 있지만 image-rectangle 클래스가 아닌 다른 요소 삭제
  if (
    uploadedImageElement &&
    !uploadedImageElement.closest(".image-rectangle")
  ) {
    uploadedImageElement.remove(); // 업로드된 이미지 요소 삭제
  }

  // 오늘 날짜로 설정
  const today = new Date().toISOString().substr(0, 10);
  document.getElementById("date").value = today;

  document.getElementById("part").value = "";
  document.getElementById("time").value = "";
  const satisfactionImgs = document.querySelectorAll(".satisfaction-img");
  satisfactionImgs.forEach((img) => {
    img.style.transform = ""; // 만족도 이미지의 스타일 초기화
  });
  document.getElementById("memo").value = "";

  const popupImageContainer = document.getElementById("imageUploadContainer");
  if (popupImageContainer) {
    // 기존 요소를 찾습니다.
    const existingImageElement =
      popupImageContainer.querySelector(".image-rectangle");

    // 기존 요소가 있으면 제거합니다.
    if (existingImageElement) {
      popupImageContainer.removeChild(existingImageElement);
    }
  }
  if (popupImageContainer) {
    const newImageElement = document.createElement("div");
    newImageElement.className = "image-rectangle";
    newImageElement.innerHTML =
      '<img src="images/image.png" alt="Uploaded Image" id="uploadedImage">';
    popupImageContainer.appendChild(newImageElement);
  }

  const existingBackgroundImg = document.getElementById("popup-texture");
  if (existingBackgroundImg) {
    popupImageContainer.removeChild(existingBackgroundImg);
  }

  setImage("All");
  closeButton.click();
  textColorPicker.value = "#ffffff";
});

function updateScale() {
  const parentElement = document.getElementById("imageUploadContainer");
  const photoContainerSet = document.getElementById("uproadPhotoSet");
  const parentWidth = parentElement.clientWidth;
  const parentHeight = parentElement.clientHeight;
  const desiredWidth = parentWidth * 0.85;
  const desiredHeight = parentHeight * 0.7;

  if (photoContainerSet) {
    // 가로와 세로 비율을 고려하여 스케일 팩터를 설정합니다.
    const widthScaleFactor = desiredWidth / photoContainerSet.offsetWidth;
    const heightScaleFactor = desiredHeight / photoContainerSet.offsetHeight;

    // 최대 높이를 85%로 제한
    const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

    photoContainerSet.style.transform = `scale(${scaleFactor})`;
  }
}

function adjustPopupLayout() {
  const imageUploadContainer = document.getElementById("imageUploadContainer");
  const popup = document.getElementById("popup");
  const popupFormContainer = document.querySelector(".popup-form-container");
  const popupInnerContent = document.querySelector(".popup-inner-content");
  let memoTextarea = document.getElementById("memo");

  // 확인할 수 있는 표시자로 사용될 데이터 속성
  const isImageUploadContainerMoved =
    imageUploadContainer.dataset.moved === "true";

  if (popup.offsetWidth / popup.offsetHeight < 0.68) {
    // 이미지 업로드 컨테이너를 팝업 폼 컨테이너의 최상단으로 이동
    if (!isImageUploadContainerMoved) {
      popupFormContainer.insertBefore(
        imageUploadContainer,
        popupFormContainer.firstChild
      );
      imageUploadContainer.style.maxWidth = "100%";
      imageUploadContainer.style.maxHeight = "100%";
      imageUploadContainer.style.marginBottom = "10px";
      imageUploadContainer.dataset.moved = "true"; // 이동 상태 저장

      memoTextarea.style.maxHeight = "3em";
    }
  } else {
    // 이미지 업로드 컨테이너를 원래 위치로 복구
    if (isImageUploadContainerMoved) {
      popupInnerContent.insertBefore(
        imageUploadContainer,
        popupInnerContent.firstChild
      );
      imageUploadContainer.style.maxWidth = "45%";
      imageUploadContainer.style.maxHeight = "94%";
      imageUploadContainer.style.marginBottom = "0";
      imageUploadContainer.dataset.moved = "false"; // 이동 상태 저장

      memoTextarea.style.maxHeight = "100%";
    }
  }
}

// 페이지 로드 시 및 창 크기 조정 시 레이아웃 조정
window.addEventListener("resize", adjustPopupLayout);
document.addEventListener("DOMContentLoaded", adjustPopupLayout);

// 창 크기 변경 시 스케일 업데이트
window.addEventListener("resize", updateScale);

textColorPicker.addEventListener("input", () => {
  const content1 = document.getElementById("photoColor1");
  const content2 = document.getElementById("photoColor2");
  if (content1) {
    const selectedColor = textColorPicker.value;
    content1.style.backgroundColor = selectedColor;
    content2.style.backgroundColor = selectedColor;
  }
  textColorPicker.value = textColorPicker.value;
});
