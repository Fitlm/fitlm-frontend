document.getElementById('imageUpload').addEventListener('change', function(event) {
    document.getElementById("show").innerText = "Test";

    const files = event.target.files;
    const container = document.getElementById('imageContainer');
    
    // 이전 이미지를 삭제하지만 tiltContainer와 topContainer는 유지합니다.
    container.innerHTML = ''; // 이전 이미지 삭제

    let currentWidth = 50; // 초기 가로 위치 50픽셀에서 시작
    let maxHeight = 0;
    let startY = 45; // 초기 세로 위치 60픽셀에서 시작
    let loadedFiles = 0; // 로드된 파일 수를 추적
    let maxWidth = 0;

    Array.from(files).forEach((file, index, array) => {
        if (!file.type.startsWith('image/')) { 
            loadedFiles++;
            return; 
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = new Image();
            imgElement.src = e.target.result;
            imgElement.crossOrigin = 'Anonymous'; // CORS 설정
            imgElement.style.border = "1.2px solid #00000013";
            imgElement.className = "photo";
            imgElement.onload = function() {
                const fixedHeight = 240; // 고정 세로 크기
                const aspectRatio = imgElement.width / imgElement.height;
                const targetWidth = fixedHeight * aspectRatio; // 가로 크기 비율 유지

                const photoContainerSet = document.createElement('div');
                photoContainerSet.className = 'photo-container-set';
                photoContainerSet.id = `test${index}.png`;
                photoContainerSet.style.width = `${targetWidth + 20}px`; // 가로 크기 설정
                photoContainerSet.style.position = 'absolute'; // 위치 설정을 위해 절대 위치로 변경

                const photoInner = document.createElement('div');
                photoInner.className = 'photo-inner';

                const photoFront = document.createElement('div');
                photoFront.className = 'photo-front';

                const photoContainer = document.createElement('div');
                photoContainer.className = 'photo-container';
                photoContainer.style.width = `${targetWidth}px`; // 가로 크기 설정
                photoContainer.appendChild(imgElement);

                // 조회수 및 날짜 추가
                const viewsElement = document.createElement('div');
                viewsElement.className = 'views';
                viewsElement.textContent = '0';

                const flipIcon = document.createElement('div');
                flipIcon.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 1em; height: 1em; margin-left: 1px; margin-top: 2px; transform: scale(0.85);">
                    <path fill="#40230c" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                    </svg>`;
                flipIcon.style.marginLeft = '1px';
                flipIcon.style.marginTop = '-1px';
                viewsElement.appendChild(flipIcon);

                const dateElement = document.createElement('div');
                dateElement.className = 'date';
                const currentDate = new Date().toLocaleDateString();
                dateElement.textContent = currentDate;
                dateElement.style.marginBottom = "2px";

                photoContainer.appendChild(viewsElement);
                photoContainer.appendChild(dateElement);
                photoFront.appendChild(photoContainer);

                const photoBack = document.createElement('div');
                photoBack.className = 'photo-back';

                // 뒷면 설정
                const backContainer = document.createElement('div');
                backContainer.className = 'photo-container';
                backContainer.style.width = `${targetWidth}px`; // 가로 크기 설정

                // 이미지와 동일한 크기와 위치의 div 추가
                const backInfoDiv = document.createElement('div');
                backInfoDiv.style.width = `${targetWidth}px`;
                backInfoDiv.className = 'back-info-container';
                backInfoDiv.style.height = `${fixedHeight - 10}px`;
                backInfoDiv.style.backgroundColor = '#F1EBE9';
                backInfoDiv.style.display = 'flex';
                backInfoDiv.style.flexDirection = 'column';
                backInfoDiv.style.alignItems = 'center';
                backInfoDiv.style.justifyContent = 'center';
                backInfoDiv.style.border = "1px solid #F1EBE9";
                backInfoDiv.style.position = 'relative'; // 부모 요소에 position 설정
                backInfoDiv.id = "test";
                
                // backinfo 텍스처 추가// backinfo 텍스처 추가
                const backinfogroundImgSet = document.createElement('img');
                backinfogroundImgSet.src = photoTextures[Math.floor(Math.random() * photoTextures.length)];
                backinfogroundImgSet.style.position = 'absolute';
                backinfogroundImgSet.style.top = '0';
                backinfogroundImgSet.style.left = '0';
                backinfogroundImgSet.style.width = '100%'; // width와 height를 100%로 변경
                backinfogroundImgSet.style.height = '100%';
                backinfogroundImgSet.style.opacity = '0.07';
                backinfogroundImgSet.style.pointerEvents = 'none';
                backinfogroundImgSet.style.zIndex = '1';
                backInfoDiv.appendChild(backinfogroundImgSet);

                // 운동 종목, 이모지, 운동 시간 추가
                const workoutType = document.createElement('a');
                workoutType.innerText = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
                workoutType.className = 'type';
                workoutType.style.fontSize = '16px';
                workoutType.style.color = '#40230c';
                workoutType.style.fontWeight = 'bold';
                workoutType.style.marginBottom = '34px'; // 간격 조정
            
                const emoji = document.createElement('img');
                emoji.crossOrigin = 'Anonymous'; // CORS 설정
                emoji.src = emojiBase64[Math.floor(Math.random() * emojiBase64.length)];
                emoji.className = 'emoji';
                emoji.style.width = '56px';
                emoji.style.height = '68px';

                const workoutTime = document.createElement('div');
                workoutTime.className = 'time';
                workoutTime.innerText = '60min';
                workoutTime.style.fontSize = '16px';
                workoutTime.style.fontWeight = 'bold';
                workoutTime.style.color = '#40230c';
                workoutTime.style.marginTop = '34px'; // 간격 조정

                // memoButton 아이콘 추가
                const memoButton = document.createElement('div');
                memoButton.className = 'memoButton';
                memoButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 412 511.87">
                        <path fill-rule="nonzero" d="M35.7 32.95h33.54V11.18C69.24 5.01 74.25 0 80.43 0c6.17 0 11.18 5.01 11.18 11.18v21.77h49.21V11.18c0-6.17 5.01-11.18 11.19-11.18 6.17 0 11.18 5.01 11.18 11.18v21.77h49.21V11.18C212.4 5.01 217.41 0 223.59 0c6.17 0 11.18 5.01 11.18 11.18v21.77h49.21V11.18c0-6.17 5.01-11.18 11.19-11.18 6.17 0 11.18 5.01 11.18 11.18v21.77h34.55c9.83 0 18.76 4.03 25.21 10.49 5.36 5.35 9.04 12.4 10.15 20.23h.04c9.82 0 18.76 4.03 25.21 10.48C407.98 80.62 412 89.56 412 99.37v376.8c0 9.77-4.04 18.7-10.49 25.17-6.51 6.5-15.45 10.53-25.21 10.53H67.71c-9.81 0-18.75-4.02-25.22-10.49-6.14-6.14-10.09-14.53-10.45-23.8-8.36-.86-15.9-4.66-21.55-10.31C4.03 460.82 0 451.89 0 442.06V68.65c0-9.83 4.03-18.77 10.48-25.22 6.45-6.45 15.39-10.48 25.22-10.48zm340.9 51.06v358.05c0 9.8-4.03 18.74-10.49 25.2-6.47 6.47-15.41 10.5-25.21 10.5H52.43c.39 3.59 2.01 6.82 4.44 9.25 2.79 2.79 6.64 4.53 10.84 4.53H376.3c4.22 0 8.07-1.74 10.85-4.52 2.78-2.78 4.52-6.63 4.52-10.85V99.37c0-4.2-1.74-8.05-4.54-10.84a15.334 15.334 0 0 0-10.53-4.52zm-294 302.37c-5.74 0-10.4-4.86-10.4-10.85 0-5.99 4.66-10.85 10.4-10.85h214.78c5.74 0 10.41 4.86 10.41 10.85 0 5.99-4.67 10.85-10.41 10.85H82.6zm0-71.58c-5.74 0-10.4-4.86-10.4-10.85 0-5.99 4.66-10.85 10.4-10.85h214.78c5.74 0 10.41 4.86 10.41 10.85 0 5.99-4.67 10.85-10.41 10.85H82.6zm0-71.58c-5.74 0-10.4-4.86-10.4-10.85 0-5.99 4.66-10.85 10.4-10.85h214.78c5.74 0 10.41 4.86 10.41 10.85 0 5.99-4.67 10.85-10.41 10.85H82.6zm0-71.58c-5.74 0-10.4-4.86-10.4-10.85 0-5.99 4.66-10.85 10.4-10.85h214.78c5.74 0 10.41 4.86 10.41 10.85 0 5.99-4.67 10.85-10.41 10.85H82.6zM306.35 53.28v21.77c0 6.17-5.01 11.18-11.18 11.18-6.18 0-11.19-5.01-11.19-11.18V53.28h-49.21v21.77c0 6.17-5.01 11.18-11.18 11.18-6.18 0-11.19-5.01-11.19-11.18V53.28h-49.21v21.77c0 6.17-5.01 11.18-11.18 11.18-6.18 0-11.19-5.01-11.19-11.18V53.28H91.61v21.77c0 6.17-5.01 11.18-11.18 11.18-6.18 0-11.19-5.01-11.19-11.18V53.28H35.7c-4.22 0-8.07 1.75-10.85 4.52-2.77 2.78-4.52 6.63-4.52 10.85v373.41c0 4.2 1.75 8.05 4.53 10.84 2.8 2.79 6.65 4.53 10.84 4.53h305.2c4.19 0 8.03-1.75 10.83-4.54 2.79-2.8 4.54-6.65 4.54-10.83V68.65c0-4.19-1.74-8.04-4.53-10.84-2.79-2.78-6.64-4.53-10.84-4.53h-34.55z"/>
                    </svg>`;
                memoButton.style.position = 'absolute';
                memoButton.style.opacity = '0.7';
                memoButton.style.width = '14px';
                memoButton.style.height = '14px';
                memoButton.style.right = '2px';
                memoButton.style.bottom = '2.55%';
                memoButton.style.cursor = 'pointer';

                backInfoDiv.appendChild(workoutType);
                backInfoDiv.appendChild(emoji);
                backInfoDiv.appendChild(workoutTime);
                backInfoDiv.appendChild(memoButton);

                backContainer.appendChild(backInfoDiv);

                // 조회수 및 날짜 추가 (뒷면)
                const viewsElementBack = document.createElement('div');
                viewsElementBack.className = 'views';
                viewsElementBack.textContent = '0';

                const flipIconBack = document.createElement('div');
                flipIconBack.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 1em; height: 1em; margin-left: 1px; margin-top: 2px; transform: scale(0.85);">
                    <path fill="#40230c" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                    </svg>`;
                flipIconBack.style.marginLeft = '1px';
                flipIconBack.style.marginTop = '-1px';
                viewsElementBack.appendChild(flipIconBack);

                const dateElementBack = document.createElement('div');
                dateElementBack.className = 'date';
                dateElementBack.textContent = currentDate;
                dateElementBack.style.marginBottom = "2px";

                backContainer.appendChild(viewsElementBack);
                backContainer.appendChild(dateElementBack);

                photoBack.appendChild(backContainer);

                // photoContainerSet 텍스처 추가
                const backgroundImgSet = document.createElement('img');
                backgroundImgSet.src = photoTextures[Math.floor(Math.random() * photoTextures.length)];
                backgroundImgSet.style.position = 'absolute';
                backgroundImgSet.style.top = '0';
                backgroundImgSet.style.left = '0';
                backgroundImgSet.style.width = '100%';
                backgroundImgSet.style.height = '100%';
                backgroundImgSet.style.opacity = '0.07';
                backgroundImgSet.style.pointerEvents = 'none';
                backgroundImgSet.style.zIndex = '1';

                photoInner.appendChild(photoFront);
                photoInner.appendChild(photoBack);
                photoInner.appendChild(backgroundImgSet);

                // 상단 중앙에 랜덤 테이프 추가
                const tapeImage = new Image();
                tapeImage.src = tapes[Math.floor(Math.random() * tapes.length)];
                tapeImage.style.position = 'absolute';
                tapeImage.style.width = '20px';
                tapeImage.style.height = '43px';
                tapeImage.style.top = '-23px';
                tapeImage.style.left = '50%';
                const randomRotate = Math.random() * 20 - 10;
                let transformString = `translateX(-50%) rotate(${randomRotate}deg)`;;
                // 랜덤 반전
                if (Math.random() < 0.5) {
                    transformString += ' scaleX(-1)';
                }
                if (Math.random() < 0.5) {
                    transformString += ' scaleY(-1)';
                }
                tapeImage.style.transform = transformString;

                photoInner.appendChild(tapeImage);

                photoContainerSet.appendChild(photoInner);

                // 크기 조절용 20px * 20px div 생성 및 추가
                const resizeDiv = document.createElement('div');
                resizeDiv.className = 'resize';
                resizeDiv.style.width = '30px';
                resizeDiv.style.height = '30px';
                resizeDiv.style.opacity = '0';
                resizeDiv.style.position = 'absolute';
                resizeDiv.style.right = '-20px';
                resizeDiv.style.bottom = '-67px';
                resizeDiv.style.cursor = 'nw-resize';

                // 삭제 버튼 추가
                const delBtn = document.createElement('img');
                delBtn.src = "images/x.png";
                delBtn.className = 'delBtn';
                delBtn.style.width = '10px';
                delBtn.style.height = '10px';
                delBtn.style.opacity = '0.7';
                delBtn.style.position = 'absolute';
                delBtn.style.right = '-10px';
                delBtn.style.bottom = '260px';
                delBtn.style.cursor = 'pointer';

                backContainer.appendChild(delBtn);
                photoContainerSet.appendChild(resizeDiv);

                // 이미지 크기 조정 후 컨테이너 위치 계산
                const containerWidth = container.clientWidth;
                if (currentWidth + targetWidth + 50 > containerWidth) { // 현재 행이 꽉 찼을 때
                    if(maxWidth < currentWidth){
                        maxWidth = currentWidth + targetWidth;
                    }
                    startY += maxHeight + 100; // 다음 행의 시작점은 이전 행의 최대 높이 + 100픽셀
                    currentWidth = 50; // 가로 위치 50픽셀에서 시작
                    maxHeight = 0; // 최대 높이 
                    
                }

                photoContainerSet.style.left = `${currentWidth}px`;
                photoContainerSet.style.top = `${startY}px`;


                container.appendChild(photoContainerSet);

                currentWidth += targetWidth + 65; // 다음 이미지 위치를 위해 현재 이미지 너비 + 50픽셀 간격 추가
                maxHeight = Math.max(maxHeight, photoContainerSet.clientHeight); // 행의 최대 높이 갱신

                loadedFiles++;
                if (loadedFiles === files.length) {
                    const bottomElement = document.createElement('div');
                    bottomElement.id = "bottomElement";
                    bottomElement.style.width = '30px';
                    bottomElement.style.height = '30px';
                    bottomElement.style.backgroundColor = "#FCF5F300";
                    bottomElement.style.position = 'absolute'; // 절대 위치 설정
                    bottomElement.style.top = `${startY + 225}px`;
                    container.appendChild(bottomElement);

                    const rightElement = document.createElement('div');
                    rightElement.id = "rightElement";
                    rightElement.style.width = '30px';
                    rightElement.style.height = '30px';
                    rightElement.style.backgroundColor = "#FCF5F300";
                    rightElement.style.position = 'absolute'; // 절대 위치 설정
                    rightElement.style.left = `${containerWidth - 20}px`;
                    container.appendChild(rightElement);
                }
            };
        };
        reader.readAsDataURL(file);
    });
});
