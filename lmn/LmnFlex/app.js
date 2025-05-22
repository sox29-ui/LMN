function add(){
    document.getElementById('blur').style.display = 'flex';
}
var q = 0;
function b(){
    if (q == 1){
        q = 0;
    } else {
        q = 0;
        document.getElementById('blur').style.display = 'none';
    }
}
function c(){
    q = 1;
}
read();

function read(){
    let vid = localStorage.getItem('vid');
    if (vid !== null && vid !== "[]") {
        const videos = JSON.parse(vid);
        const container = document.getElementById('vid');
        container.innerHTML = '';
        videos.forEach((item) => {
            const box = document.createElement('div');
            box.className = 'box';
            box.id = item.id;
            const x = parseInt(localStorage.getItem(`${item.id}`)) || 0;
            box.onclick = function (){
                window.location.href = "./app.html";
                localStorage.setItem('Now', JSON.stringify(item));
                localStorage.setItem(`${item.id}`, x+1);
            };
            box.innerHTML = `
                <p id="remove-${item.id}">x</p>
                <video id="video-${item.id}" style="display:none;" src="./vid/${item.video}"></video>
                <canvas id="canvas-${item.id}" style="display:none;"></canvas>
                <img id="img-${item.id}" alt="LmnFlex">
                <h2>${item.name}</h2>
                <h3>${item.dis} | (${x} 👀)</h3>
            `;
            const r = box.querySelector(`#remove-${item.id}`);
            r.onclick = function (e){
                e.stopPropagation();
                const oldData = JSON.parse(localStorage.getItem('vid') || '[]');
                const newData = oldData.filter((video) => video.id !== item.id);
                localStorage.setItem('vid', JSON.stringify(newData));
                read();
            };
            const video = box.querySelector(`#video-${item.id}`);
            const canvas = box.querySelector(`#canvas-${item.id}`);
            const img = box.querySelector(`#img-${item.id}`);
            video.addEventListener('loadeddata', () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
            
                setTimeout(() => {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataURL = canvas.toDataURL("image/png");
                    img.src = dataURL;
                }, 500);
            });
            container.appendChild(box);
            
        });
    } else {
        const container = document.getElementById('vid');
        container.innerHTML = '';
    }
}
function send(){
    const name = document.getElementById('q3').value;
    const dis = document.getElementById('q4').value;
    const video = document.getElementById('q1').value;

    if (name && dis && video) {
        const oldData = JSON.parse(localStorage.getItem('vid') || '[]');
        const newItem = {
            name: name,
            dis: dis,
            video: video,
            id: Math.floor(Math.random() * 1000000),
        };
        oldData.push(newItem);
        localStorage.setItem('vid', JSON.stringify(oldData));
        read();
        b();
    } else {
        alert('Please fill in all fields.');
    }
}