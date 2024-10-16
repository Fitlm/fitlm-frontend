const container = document.getElementById("imageContainer");
let clickStartTime;

const memoContents = [
  "Winning and losing isn't everything.<br>Sometimes, the journey is just as important as the outcome.<br>-Alex Morgan-",
  "The hard days are what make you stronger.<br>-Aly Raisman-",
  "Start where you are. Use what you have. Do what you can.<br>-Arthur Ashe-",
  "It's never too late to change old habits.<br>-Florence Griffith Joyner-",
  "It's okay to STRUGGLE, but it's not okay to give up<br>on yourself or your dreams.<br>-Gabe Grunewald-",
];

container.addEventListener("mousedown", function (event) {
  clickStartTime = Date.now();
});

container.addEventListener("mouseup", async function (event) {
  const clickEndTime = Date.now();
  if (clickEndTime - clickStartTime < 100) {
    const memoButton = event.target.closest(".memoButton");
    const photoContainerSet = event.target.closest(".photo-container-set");
    if (!memoButton) {
      if (photoContainerSet) {
        photoContainerSet.classList.toggle("flipped");

        if (document.getElementById("show").innerText != "Test") {
          const view = photoContainerSet.querySelector(".views");
          const back = photoContainerSet.querySelector(".photo-back").querySelector(".views");
          const now = view.textContent;
          const update_flip = Number(now) + 1;
          view.textContent = update_flip;
          back.textContent = update_flip;
          view.appendChild(iconLoad());
          back.appendChild(iconLoad());

          const day = photoContainerSet.querySelector(".date");
          const date = day.textContent;
          console.log(date);
          console.log(update_flip);

          try {
            const userId = await fetchAuthenticatedUser(); // 비동기로 사용자 ID 가져오기
            await updateProductsFlip(userId, date, update_flip); // 비동기로 updateProductsFlip 호출
          } catch (error) {
            console.error("Error in updating flip value:", error);
          }
        }
      }
    }
  }
});

container.addEventListener("touchend", async function (event) {
  const clickEndTime = Date.now();
  if (clickEndTime - clickStartTime < 100) {
    const memoButton = event.target.closest(".memoButton");
    const photoContainerSet = event.target.closest(".photo-container-set");
    if (!memoButton) {
      if (photoContainerSet) {
        photoContainerSet.classList.toggle("flipped");

        if (document.getElementById("show").innerText != "Test") {
          const view = photoContainerSet.querySelector(".views");
          const back = photoContainerSet.querySelector(".photo-back").querySelector(".views");
          const now = view.textContent;
          const update_flip = Number(now) + 1;
          view.textContent = update_flip;
          back.textContent = update_flip;
          view.appendChild(iconLoad());
          back.appendChild(iconLoad());

          const day = photoContainerSet.querySelector(".date");
          const date = day.textContent;
          console.log(date);
          console.log(update_flip);

          try {
            const userId = await fetchAuthenticatedUser(); // 비동기로 사용자 ID 가져오기
            await updateProductsFlip(userId, date, update_flip); // 비동기로 updateProductsFlip 호출
          } catch (error) {
            console.error("Error in updating flip value:", error);
          }
        }
      }
    }
  }
});

const handleMemoButtonClick = async function (event) {
  const memoButton = event.target.closest(".memoButton");
  if (memoButton) {
    const backInfoDiv = memoButton.closest(".back-info-container");
    const photoContainerSet = memoButton.closest(".photo-container-set");
    const dateText = photoContainerSet.querySelector(".date").textContent;

    try {
      const userId = await fetchAuthenticatedUser();
      const products = await fetchProductsByWriter(userId);
      const files = products.map((product) => product.imageName);
      const datas = products.map((product) => [product.date, product.memo]);
      if (!products) {
        console.error("No products found");
        return;
      }

      let data; // 메모 불러오기
      datas.forEach((element) => {
        if (element[0] == dateText) {
          data = element[1];
        }
      });

      if (backInfoDiv.id == "test") {
        data = memoContents[Math.floor(Math.random() * memoContents.length)];
      }

      if (!photoContainerSet.memoState) {
        // 현재 상태 저장
        photoContainerSet.memoState = {
          innerHTML: backInfoDiv.innerHTML,
          memoContent: data,
          textureHTML: backInfoDiv.querySelector("img").outerHTML, // 텍스처 이미지 저장
        };
      }

      if (backInfoDiv.classList.contains("memo-active")) {
        // 메모 상태에서 다시 클릭하면 원래 내용 복원
        backInfoDiv.innerHTML = photoContainerSet.memoState.innerHTML;
        backInfoDiv.classList.remove("memo-active");
      } else {
        // 메모 내용 표시
        const memoTextElement = document.createElement("div");
        memoTextElement.style.padding = "20px";
        memoTextElement.style.color = "#401C0C";
        memoTextElement.style.textAlign = "center";

        // 메모 내용 설정
        memoTextElement.innerHTML = photoContainerSet.memoState.memoContent;

        // 글자 크기 조절
        let fontSize = 16;
        memoTextElement.style.fontSize = `${fontSize}px`;
        backInfoDiv.innerHTML = ""; // 기존 내용 삭제
        backInfoDiv.classList.add("memo-active");
        backInfoDiv.appendChild(memoTextElement);

        // 텍스처 이미지와 메모 버튼 추가
        backInfoDiv.insertAdjacentHTML(
          "beforeend",
          photoContainerSet.memoState.textureHTML
        );
        backInfoDiv.appendChild(memoButton);

        // 가장 긴 줄을 기준으로 폰트 크기 조절
        const lines = photoContainerSet.memoState.memoContent.split("<br>");
        const maxLineLength = Math.max(...lines.map((line) => line.length));

        while (
          memoTextElement.scrollWidth > backInfoDiv.clientWidth - 40 ||
          memoTextElement.scrollHeight > backInfoDiv.clientHeight - 40
        ) {
          fontSize -= 1;
          memoTextElement.style.fontSize = `${fontSize}px`;
          if (fontSize <= 10) break; // 최소 폰트 크기 설정
        }
      }
    } catch (error) {
      console.error("Error handling memo button click:", error);
    }
  }
};

container.addEventListener("click", handleMemoButtonClick);
container.addEventListener("touchend", function (event) {
  const clickEndTime = Date.now();
  if (clickEndTime - clickStartTime < 100) {
    // 0.1초 이내로 클릭 종료 시 동작
    handleMemoButtonClick(event);
  }
});

function iconLoad() {
  const flipIconBack = document.createElement("div");
  flipIconBack.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 1em; height: 1em; margin-left: 1px; margin-top: 2px; transform: scale(0.85);">
        <path fill="#40230c" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
        </svg>`;
  flipIconBack.style.marginLeft = "1px";
  flipIconBack.style.marginTop = "-1px";
  return flipIconBack;
}

async function updateProductsFlip(userId, date, flip) {
  try {
    const response = await fetch("http://localhost:4000/products/updateFlip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ userId, date, flip }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedProduct = await response.json();
    console.log("Product updated successfully:", updatedProduct);
  } catch (error) {
    console.error("Failed to update product flip value:", error);
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
