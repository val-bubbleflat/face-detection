const faceDetector = new window.FaceDetector();
const wrap = document.createElement("div");
wrap.classList.add("wrap");
document.body.appendChild(wrap);

async function detect() {
    const imgs = document.getElementsByTagName('img');
    for(let i = 0; i < imgs.length; i++){
        const faces = await faceDetector.detect(imgs[i]);
        drawfaces(faces, imgs[i])
    }
}

async function drawfaces(faces, el) {
    faces.forEach(face => {
        console.log(face);
        const {width, height, top, left} = face.boundingBox;
        const elPosition = el.getBoundingClientRect();
        const facebox = document.createElement('div');
        facebox.classList.add('face');
        let position = `
            width: ${width}px;
            height: ${height}px;
            top: ${top + elPosition.top}px;
            left: ${left + elPosition.left}px;
        `;
        facebox.style.cssText = position;

        face.landmarks.forEach(landmark => {
            const el = document.createElement('div');
            el.classList.add('landmark', landmark.type);
            el.style.cssText = ` 
                top: ${landmark.location.y - top}px;
                left: ${landmark.location.x - left}px;
            `;
            facebox.appendChild(el)
        })
        wrap.appendChild(facebox);
    })
}

detect();