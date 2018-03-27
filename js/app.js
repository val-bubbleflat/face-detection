const faceDetector = new window.FaceDetector();

async function detect() {
    const imgs = document.getElementsByTagName('img');
    for(let i = 0; i < imgs.length; i++){
        const faces = await faceDetector.detect(imgs[i]);
        drawfaces(faces)
    }
}

async function drawfaces(faces) {
    faces.forEach(face => {
        console.log(face);
        const {width, height, top, left} = face.boundingBox;

        const facebox = document.createElement('div');
        facebox.classList.add('face');
        facebox.style.cssText = `
            width: ${width}px;
            height: ${height}px;
            top: ${top}px;
            left: ${left}px;
        `;
        face.landmarks.forEach(landmark => {
            const el = document.createElement('div');
            el.classList.add('landmark', landmark.type);
            el.style.cssText = ` 
                top: ${landmark.location.y - top}px;
                left: ${landmark.location.x - left}px;
            `;
            facebox.appendChild(el)
        })
        document.appendChild(facebox);
    })
}

detect();