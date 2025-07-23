
//Created By Nenad for purposes of rendering gradient wiht dots based on smart editor located at https://comparisons.org/bg_dots_maker.php
window.addEventListener("load", () => {
    if (!window.sections || !Array.isArray(window.sections)) {
        console.error("Sections data is missing or not an array.");
        return;
    }

    function createHalftoneBackground(containerId, settings) {
        const container = document.getElementById(containerId);
        if (!container) return; 
    
      
        let wrapper = container.querySelector(".canvas-wrapper");
        if (wrapper) {
            container.removeChild(wrapper);
        }
    
      
        wrapper = document.createElement("div");
        wrapper.classList.add("canvas-wrapper");
        container.appendChild(wrapper);
    
       
        const canvas = document.createElement("canvas");
        wrapper.appendChild(canvas);
    
       
        canvas.width = wrapper.clientWidth;
        canvas.height = wrapper.clientHeight;
    
        const ctx = canvas.getContext("2d");
    
        ctx.fillStyle = settings.bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(settings.rotation);
    
        const spacing = settings.spacing;
        const maxRadius = settings.maxRadius;
        const minRadius = settings.minRadius;
        const maxOpacity = settings.maxOpacity;
        const minOpacity = settings.minOpacity;
        const dotColor = settings.dotColor;
    
        const halfWidth = canvas.width / 2;
    
        for (let x = -canvas.width; x < canvas.width; x += spacing) {
            for (let y = -canvas.height; y < canvas.height; y += spacing) {
                const horizontalDistance = Math.abs(x);
                const normalizedDistance = horizontalDistance / halfWidth;
                const radius = minRadius + (maxRadius - minRadius) * normalizedDistance;
    
                const verticalDistance = Math.abs(y);
                const normalizedVertical = verticalDistance / (canvas.height / 2);
                const opacity = maxOpacity - (maxOpacity - minOpacity) * normalizedVertical;
    
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${parseInt(dotColor.slice(1, 3), 16)}, ${parseInt(dotColor.slice(3, 5), 16)}, ${parseInt(dotColor.slice(5, 7), 16)}, ${opacity})`;
                ctx.fill();
            }
        }
    
        ctx.restore();
    }

    function renderAll() {
        window.sections.forEach((section) => {
            createHalftoneBackground(section.id, section.settings);
        });
    }

    renderAll();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(renderAll, 100);
    });

    window.updateSections = function (newSections) {
        window.sections = newSections;
        renderAll();
    };
});
