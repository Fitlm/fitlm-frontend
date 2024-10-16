// 이미지 삭제 코드
// 이벤트 위임을 사용하여 body에 이벤트 리스너를 추가합니다.
document.body.addEventListener("mouseover", function (event) {
  // 마우스가 올라간 요소가 photoContainerSet 클래스인지 확인합니다.
  if (
    event.target.classList.contains("photo-container-set") ||
    event.target.closest(".photo-container-set")
  ) {
    const photoContainerSet = event.target.closest(".photo-container-set");
    if (photoContainerSet) {
      const delBtn = photoContainerSet.querySelector(".delBtn");
      if (delBtn) {
        delBtn.style.opacity = 0.7;
      }
    }
  }
});

document.body.addEventListener("mouseout", function (event) {
  // 마우스가 벗어난 요소가 photoContainerSet 클래스인지 확인합니다.
  if (
    event.target.classList.contains("photo-container-set") ||
    event.target.closest(".photo-container-set")
  ) {
    const photoContainerSet = event.target.closest(".photo-container-set");
    if (photoContainerSet) {
      const delBtn = photoContainerSet.querySelector(".delBtn");
      if (delBtn) {
        delBtn.style.opacity = 0;
      }
    }
  }
});

// 이미지 삭제 이벤트 리스너
document.body.addEventListener("click", async function (event) {
  if (event.target.classList.contains("delBtn")) {
    const photoContainerSet = event.target.closest(".photo-container-set");
    const date = photoContainerSet.querySelector(".date").textContent;
    console.log("del " + date + "\n");

    try {
      const userId = await fetchAuthenticatedUser(); // 비동기로 사용자 ID 가져오기
      await deleteProduct(userId, date); // 비동기로 deleteProduct 호출
    } catch (error) {
      console.error("Error in deleting product:", error);
    }

    if (photoContainerSet) {
      photoContainerSet.remove();
    }
  }
});

// 저장하는 코드
document.getElementById("save").addEventListener("click", async function () {
  if (document.getElementById("show").innerText == "All Days") {
    console.log(1);
    const elements = document.querySelectorAll(".photo-container-set");

    for (const element of elements) {
      const computedStyle = window.getComputedStyle(element);

      // Transform에서 rotate 값을 추출
      const transform = computedStyle.transform;

      // 기본 값 설정
      let scale = 1;
      let rotate = 0;

      if (transform !== "none") {
        const values = transform.split("(")[1].split(")")[0].split(",");
        const a = values[0];
        const b = values[1];
        const c = values[2];
        const d = values[3];

        // 회전 각도 계산
        const radians = Math.atan2(b, a);
        rotate = radians * (180 / Math.PI); // 라디안을 도로 변환

        // Scale 계산
        const scaleX = Math.sqrt(a * a + b * b);
        const scaleY = Math.sqrt(c * c + d * d);
        scale = (scaleX + scaleY) / 2; // 비율이 동일하다고 가정
      }

      // 필요한 값들을 콘솔에 출력
      console.log(
        "save \n" +
          `id: ${element.id.slice(0, element.id.lastIndexOf(".") - 1)}\n` +
          `date: ${element.querySelector(".date").textContent}\n` +
          `image파일명: ${element.id}\n` +
          `x: ${parseFloat(computedStyle.left.slice(0, -2))}\n` +
          `y: ${parseFloat(computedStyle.top.slice(0, -2))}\n` +
          `rotate: ${computedStyle.rotate}\n` +
          `scale: ${scale}\n` +
          `zindex: ${parseInt(computedStyle.zIndex)}\n` +
          `flip: ${element.querySelector(".views").textContent}\n`
      );

      try {
        const userId = await fetchAuthenticatedUser(); // 비동기로 사용자 ID 가져오기
        await updateProductsTransform(
          userId,
          element.querySelector(".date").textContent,
          parseFloat(computedStyle.left.slice(0, -2)),
          parseFloat(computedStyle.top.slice(0, -2)),
          computedStyle.rotate,
          scale,
          parseInt(computedStyle.zIndex)
        ); // 비동기로 updateProductsTransform 호출
      } catch (error) {
        console.error("Error in updating transform values:", error);
      }
    }
  }
});

// 사진 삭제 요청 함수
async function deleteProduct(userId, date) {
  try {
    const response = await fetch("http://localhost:4000/products/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ userId, date }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Product deleted successfully:", result);
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}

async function deleteProduct(userId, date) {
  try {
    const response = await fetch(
      `http://localhost:4000/products/delete?userId=${userId}&date=${date}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Product deleted successfully:", result);
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}

async function updateProductsTransform(
  userId,
  date,
  x,
  y,
  rotate,
  scale,
  zindex
) {
  try {
    const response = await fetch(
      "http://localhost:4000/products/updateTransform",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ userId, date, x, y, rotate, scale, zindex }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedProduct = await response.json();
    console.log("Product updated successfully:", updatedProduct);
  } catch (error) {
    console.error("Failed to update product transform values:", error);
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
