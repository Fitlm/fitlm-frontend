setImage("All");

document.getElementById("date").value = new Date()
  .toISOString()
  .substring(0, 10);

document.getElementById("show").addEventListener("click", async function () {
  if (this.innerText == "Test") {
    this.innerText = "15 Days";
    setImage("All"); // 대호: 이거 디비 연결하고 켜야함.
  } else if (this.innerText == "All Days") {
    this.innerText = "15 Days";
    setImage("All"); // 대호: 이거 디비 연결하고 켜야함.
  } else {
    this.innerText = "All Days";
    setImage("15"); // 대호: 이거 디비 연결하고 켜야함.
  }
});

async function setImage(days = "15") {
  try {
    // 이미지 파일 리스트
    let files;
    // memo를 제외한 나머지 파일 이차원 배열
    let datas;

    // 전체 불러오기
    if (days == "15") {
      var userId = await fetchAuthenticatedUser();
      var products = await fetchProductsByWriter(userId);
      files = products.map((product) => product.imageName);
      datas = products.map((product) => [
        product.imageName,
        product.date,
        product.part,
        product.satisfactionId,
        product.time,
        product.x,
        product.y,
        product.rotate,
        product.scale,
        product.zindex,
        product.flip,
        product.color,
      ]);
      if (!products) {
        console.error("No products found");
        return;
      }
    } else if (days == "All") {
      var userId = await fetchAuthenticatedUser();
      var products = await fetchProductsByWriter(userId);
      const recentProducts = products.slice(-15); // 최근 15개만 가져오기
      files = recentProducts.map((product) => product.imageName);
      datas = recentProducts.map((product) => [
        product.imageName,
        product.date,
        product.part,
        product.satisfactionId,
        product.time,
        product.x,
        product.y,
        product.rotate,
        product.scale,
        product.zindex,
        product.flip,
        product.color,
      ]);
      if (!products) {
        console.error("No products found");
        return;
      }
    }

    // 대호: days가 15면 마지막 15장만 가져오면 됨.
    // 대호: days가 All이면 전체 다 가져와야함.
    // 대호: 이미지 파일 리스트 여기에, id가 가지고 있는 이미지만.
    console.log(files);
    console.log(datas);

    // 대호: 사진 data 리스트 여기에 2차원으로
    // 대호: 파일명, 날짜, 종목, 만족도, 시간, x, y, rotate, scale, zindex, 조회수 순서로
    // 대호: 반복문 사용해서 전체 행 전부 집어넣어야 함. 메모 제외 불러오면 됨. 메모는 flip파일에서.

    // 이전 이미지를 삭제하지만 tiltContainer와 topContainer는 유지합니다.
    const container = document.getElementById("imageContainer");
    container.innerHTML = ""; // 이전 이미지 삭제

    let currentWidth = 50; // 초기 가로 위치 50픽셀에서 시작
    let maxHeight = 0;
    let startY = 45; // 초기 세로 위치 60픽셀에서 시작
    let loadedFiles = 0; // 로드된 파일 수를 추적
    let maxWidth = 0;
    const serverUrl = "http://localhost:4000";

    files.forEach((file, index) => {
      const imgElement = new Image();
      imgElement.src = `${serverUrl}/products/image/${file}`; // 이미지 경로 수정
      imgElement.crossOrigin = "Anonymous"; // CORS 설정
      imgElement.style.border = "1.2px solid #00000013";
      imgElement.className = "photo";
      imgElement.onload = function () {
        const fixedHeight = 240; // 고정 세로 크기
        const aspectRatio = imgElement.width / imgElement.height;
        const targetWidth = fixedHeight * aspectRatio; // 가로 크기 비율 유지

        const photoContainerSet = document.createElement("div");
        photoContainerSet.className = "photo-container-set";
        photoContainerSet.id = `photo-${index}`; // 고유 ID 설정
        photoContainerSet.style.width = `${targetWidth + 20}px`; // 가로 크기 설정
        photoContainerSet.style.position = "absolute"; // 위치 설정을 위해 절대 위치로 변경

        if (days != "All") {
          photoContainerSet.style.rotate = `${datas[index][7]}`; // 대호: rotate
          photoContainerSet.style.scale = datas[index][8]; // 대호: scale
          photoContainerSet.style.zIndex = datas[index][9]; // 대호: zindex
        }

        const photoInner = document.createElement("div");
        photoInner.className = "photo-inner";

        const photoFront = document.createElement("div");
        photoFront.className = "photo-front";
        photoFront.style.backgroundColor = datas[index][11];

        const photoContainer = document.createElement("div");
        photoContainer.className = "photo-container";
        photoContainer.style.width = `${targetWidth}px`; // 가로 크기 설정
        photoContainer.appendChild(imgElement);
        photoContainer.style.backgroundColor = datas[index][11];

        // 조회수 및 날짜 추가
        const viewsElement = document.createElement("div");
        viewsElement.className = "views";
        viewsElement.textContent = datas[index][10]; // 예시 데이터

        const flipIcon = document.createElement("div");
        flipIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 1em; height: 1em; margin-left: 1px; margin-top: 2px; transform: scale(0.85);">
            <path fill="#40230c" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
          </svg>`;
        flipIcon.style.marginLeft = "1px";
        flipIcon.style.marginTop = "-1px";
        viewsElement.appendChild(flipIcon);

        const dateElement = document.createElement("div");
        dateElement.className = "date";
        dateElement.textContent = datas[index][1]; // 예시 데이터
        dateElement.style.marginBottom = "2px";

        photoContainer.appendChild(viewsElement);
        photoContainer.appendChild(dateElement);
        photoFront.appendChild(photoContainer);

        const photoBack = document.createElement("div");
        photoBack.className = "photo-back";
        photoBack.style.backgroundColor = datas[index][11];

        // 뒷면 설정
        const backContainer = document.createElement("div");
        backContainer.className = "photo-container";
        backContainer.style.width = `${targetWidth}px`; // 가로 크기 설정
        backContainer.style.backgroundColor = datas[index][11];

        const backInfoDiv = document.createElement("div");
        backInfoDiv.style.width = `${targetWidth}px`;
        backInfoDiv.className = "back-info-container";
        backInfoDiv.style.height = `${fixedHeight - 10}px`;
        backInfoDiv.style.backgroundColor = "#F1EBE9";
        backInfoDiv.style.display = "flex";
        backInfoDiv.style.flexDirection = "column";
        backInfoDiv.style.alignItems = "center";
        backInfoDiv.style.justifyContent = "center";
        backInfoDiv.style.border = "1px solid #F1EBE9";
        backInfoDiv.style.position = "relative"; // 부모 요소에 position 설정

        const backinfogroundImgSet = document.createElement("img");
        backinfogroundImgSet.src =
          photoTextures[Math.floor(Math.random() * photoTextures.length)]; // 텍스처 이미지 경로 수정
        backinfogroundImgSet.style.position = "absolute";
        backinfogroundImgSet.style.top = "0";
        backinfogroundImgSet.style.left = "0";
        backinfogroundImgSet.style.width = "100%";
        backinfogroundImgSet.style.height = "100%";
        backinfogroundImgSet.style.opacity = "0.07";
        backinfogroundImgSet.style.pointerEvents = "none";
        backinfogroundImgSet.style.zIndex = "1";
        backInfoDiv.appendChild(backinfogroundImgSet);

        const workoutType = document.createElement("a");
        workoutType.innerText = datas[index][2]; // 예시 데이터
        workoutType.className = "type";
        workoutType.style.fontSize = "16px";
        workoutType.style.color = "#40230c";
        workoutType.style.fontWeight = "bold";
        workoutType.style.marginBottom = "34px"; // 간격 조정

        const emoji = document.createElement("img");
        emoji.crossOrigin = "Anonymous"; // CORS 설정
        emoji.src = "images/emoji/" + datas[index][3] + ".svg"; // 이모지 경로 수정
        emoji.className = "emoji";
        emoji.style.width = "56px";
        emoji.style.height = "68px";

        const workoutTime = document.createElement("div");
        workoutTime.className = "time";
        workoutTime.innerText = datas[index][4]; // 예시 데이터
        workoutTime.style.fontSize = "16px";
        workoutTime.style.fontWeight = "bold";
        workoutTime.style.color = "#40230c";
        workoutTime.style.marginTop = "34px"; // 간격 조정

        const memoButton = document.createElement("div");
        memoButton.className = "memoButton";
        memoButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 412 511.87">
            <path fill-rule="nonzero" d="M35.7 32.95h33.54V11.18C69.24 5.01 74.25 0 80.43 0c6.17 0 11.18 5.01 11.18 11.18v21.77h49.21V11.18c0-6.17 5.01-11.18 11.19-11.18 6.17 0 11.18 5.01 11.18 11.18v21.77h49.21V11.18C212.4 5.01 217.41 0 223.59 0c6.17 0 11.18 5.01 11.18 11.18v21.77h49.21V11.18c0-6.17 5.01-11.18 11.19-11.18 6.17 0 11.18 5.01 11.18 11.18v21.77h34.55c9.83 0 18.76 4.03 25.21 10.49 5.36 5.35 9.04 12.4 10.15 20.23h.04c9.82 0 18.76 4.03 25.21 10.48C407.98 80.62 412 89.56 412 99.37v376.8c0 9.77-4.04 18.7-10.49 25.17-6.51 6.5-15.45 10.53-25.21 10.53H67.71c-9.81 0-18.75-4.02-25.22-10.49-6.14-6.14-10.09-14.53-10.45-23.8-8.36-.86-15.9-4.66-21.55-10.31C4.03 460.82 0 451.89 0 442.06V68.65c0-9.83 4.03-18.77 10.48-25.22 6.45-6.45 15.39-10.48 25.22-10.48zm340.9 51.06v358.05c0 9.8-4.03 18.74-10.49 25.2-6.47 6.47-15.41 10.5-25.21 10.5H52.43c.39 3.59 2.01 6.82 4.44 9.25 2.79 2.79 6.64 4.53 10.84 4.53H376.3c4.22 0 8.07-1.74 10.85-4.52 2.78-2.78 4.52-6.63 4.52-10.85V99.37c0-4.2-1.74-8.05-4.54-10.84a15.334 15.334 0 0 0-10.53-4.52zm-294 302.37c-5.74 0-10.4-4.86-10.4-10.85 0-5.99 4.66-10.85 10.4-10.85h214.78c5.74 0 10.41 4.86 10.41 10.85 0 5.99-4.67 10.85-10.41 10.85H82.6zm0-71.58c-5.74 0-10.4-4.86-10.4-10.85 0-5.99 4.66-10.85 10.4-10.85h214.78c5.74 0 10.41 4.86 10.41 10.85 0 5.99-4.67 10.85-10.41 10.85H82.6zm0-71.58c-5.74 0-10.4-4.86-10.4-10.85 0-5.99 4.66-10.85 10.4-10.85h214.78c5.74 0 10.41 4.86 10.41 10.85 0 5.99-4.67 10.85-10.41 10.85H82.6zm0-71.58c-5.74 0-10.4-4.86-10.4-10.85 0-5.99 4.66-10.85 10.4-10.85h214.78c5.74 0 10.41 4.86 10.41 10.85 0 5.99-4.67 10.85-10.41 10.85H82.6zM306.35 53.28v21.77c0 6.17-5.01 11.18-11.18 11.18-6.18 0-11.19-5.01-11.19-11.18V53.28h-49.21v21.77c0 6.17-5.01 11.18-11.18 11.18-6.18 0-11.19-5.01-11.19-11.18V53.28h-49.21v21.77c0 6.17-5.01 11.18-11.18 11.18-6.18 0-11.19-5.01-11.19-11.18V53.28H91.61v21.77c0 6.17-5.01 11.18-11.18 11.18-6.18 0-11.19-5.01-11.19-11.18V53.28H35.7c-4.22 0-8.07 1.75-10.85 4.52-2.77 2.78-4.52 6.63-4.52 10.85v373.41c0 4.2 1.75 8.05 4.53 10.84 2.8 2.79 6.65 4.53 10.84 4.53h305.2c4.19 0 8.03-1.75 10.83-4.54 2.79-2.8 4.54-6.65 4.54-10.83V68.65c0-4.19-1.74-8.04-4.53-10.84-2.79-2.78-6.64-4.53-10.84-4.53h-34.55z"/>
          </svg>`;
        memoButton.style.position = "absolute";
        memoButton.style.opacity = "0.7";
        memoButton.style.width = "14px";
        memoButton.style.height = "14px";
        memoButton.style.right = "2px";
        memoButton.style.bottom = "2.55%";
        memoButton.style.cursor = "pointer";

        backInfoDiv.appendChild(workoutType);
        backInfoDiv.appendChild(emoji);
        backInfoDiv.appendChild(workoutTime);
        backInfoDiv.appendChild(memoButton);

        backContainer.appendChild(backInfoDiv);

        const viewsElementBack = document.createElement("div");
        viewsElementBack.className = "views";
        viewsElementBack.textContent = datas[index][10]; // 예시 데이터

        const flipIconBack = document.createElement("div");
        flipIconBack.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 1em; height: 1em; margin-left: 1px; margin-top: 2px; transform: scale(0.85);">
            <path fill="#40230c" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
          </svg>`;
        flipIconBack.style.marginLeft = "1px";
        flipIconBack.style.marginTop = "-1px";
        viewsElementBack.appendChild(flipIconBack);

        const dateElementBack = document.createElement("div");
        dateElementBack.className = "date";
        dateElementBack.textContent = datas[index][1]; // 예시 데이터
        dateElementBack.style.marginBottom = "2px";

        backContainer.appendChild(viewsElementBack);
        backContainer.appendChild(dateElementBack);

        photoBack.appendChild(backContainer);

        const backgroundImgSet = document.createElement("img");
        backgroundImgSet.src =
          photoTextures[Math.floor(Math.random() * photoTextures.length)]; // 텍스처 이미지 경로 수정
        backgroundImgSet.style.position = "absolute";
        backgroundImgSet.style.top = "0";
        backgroundImgSet.style.left = "0";
        backgroundImgSet.style.width = "100%";
        backgroundImgSet.style.height = "100%";
        backgroundImgSet.style.opacity = "0.07";
        backgroundImgSet.style.pointerEvents = "none";
        backgroundImgSet.style.zIndex = "1";

        photoInner.appendChild(photoFront);
        photoInner.appendChild(photoBack);
        photoInner.appendChild(backgroundImgSet);

        const tapeImage = new Image();
        tapeImage.src = tapes[Math.floor(Math.random() * tapes.length)]; // 테이프 이미지 경로 수정
        tapeImage.style.position = "absolute";
        tapeImage.style.width = "20px";
        tapeImage.style.height = "43px";
        tapeImage.style.top = "-23px";
        tapeImage.style.left = "50%";
        const randomRotate = Math.random() * 20 - 10;
        let transformString = `translateX(-50%) rotate(${randomRotate}deg)`;
        if (Math.random() < 0.5) {
          transformString += " scaleX(-1)";
        }
        if (Math.random() < 0.5) {
          transformString += " scaleY(-1)";
        }
        tapeImage.style.transform = transformString;

        photoInner.appendChild(tapeImage);

        photoContainerSet.appendChild(photoInner);

        const resizeDiv = document.createElement("div");
        resizeDiv.className = "resize";
        resizeDiv.style.width = "30px";
        resizeDiv.style.height = "30px";
        resizeDiv.style.opacity = "0";
        resizeDiv.style.position = "absolute";
        resizeDiv.style.right = "-20px";
        resizeDiv.style.bottom = "-67px";
        resizeDiv.style.cursor = "nw-resize";

        const delBtn = document.createElement("img");
        delBtn.src = "images/x.png"; // 삭제 버튼 이미지 경로 수정
        delBtn.className = "delBtn";
        delBtn.style.width = "10px";
        delBtn.style.height = "10px";
        delBtn.style.opacity = "0.7";
        delBtn.style.position = "absolute";
        delBtn.style.right = "-10px";
        delBtn.style.bottom = "260px";
        delBtn.style.cursor = "pointer";

        backContainer.appendChild(delBtn);
        photoContainerSet.appendChild(resizeDiv);

        const containerWidth = container.clientWidth;
        if (currentWidth + targetWidth + 50 > containerWidth) {
          if (maxWidth < currentWidth) {
            maxWidth = currentWidth + targetWidth;
          }
          startY += maxHeight + 100;
          currentWidth = 50;
          maxHeight = 0;
        }

        photoContainerSet.style.left = `${currentWidth}px`;
        photoContainerSet.style.top = `${startY}px`;

        if (days == "All") {
          photoContainerSet.style.left = `${currentWidth}px`;
          photoContainerSet.style.top = `${startY}px`;
        } else {
          photoContainerSet.style.left = `${datas[index][5]}px`; // 대호: X
          photoContainerSet.style.top = `${datas[index][6]}px`; // 대호: Y
        }

        container.appendChild(photoContainerSet);

        currentWidth += targetWidth + 65;
        maxHeight = Math.max(maxHeight, photoContainerSet.clientHeight);

        loadedFiles++;
        if (loadedFiles === files.length) {
          const bottomElement = document.createElement("div");
          bottomElement.id = "bottomElement";
          bottomElement.style.width = "30px";
          bottomElement.style.height = "30px";
          bottomElement.style.backgroundColor = "#FCF5F300";
          bottomElement.style.position = "absolute";
          bottomElement.style.top = `${0}px`;
          container.appendChild(bottomElement);

          const rightElement = document.createElement("div");
          rightElement.id = "rightElement";
          rightElement.style.width = "30px";
          rightElement.style.height = "30px";
          rightElement.style.backgroundColor = "#FCF5F300";
          rightElement.style.position = "absolute";
          rightElement.style.left = `${0}px`;
          container.appendChild(rightElement);
          updateBottomElement();
        }
      };
    });
  } catch (error) {
    console.error("Error setting image:", error);
  }
}

async function fetchProductsByWriter(userId) {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기

  if (!userId) {
    console.error("UserId is undefined");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/products?userId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 토큰 포함
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const products = data.products;
    console.log(products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// user 정보 가져오기 -> userId 정보
async function fetchAuthenticatedUser() {
  const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기 (또는 쿠키 등 다른 저장소)

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

    const user = await response.json(); // 응답 데이터를 user 변수에 저장
    console.log("Authenticated user:", user); // user 변수 출력 (디버깅용)

    // 여기서 user 변수를 사용하여 필요한 작업 수행
    // 예: user.email, user.name 등
    console.log(user.userId);
    return user.userId;
  } catch (error) {
    console.error("Failed to fetch authenticated user:", error);
    throw error; // 오류를 다시 던져서 함수 호출자가 처리할 수 있게 함
  }
}
