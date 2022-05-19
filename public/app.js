const header = document.querySelector('.nav');
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
const item4 = document.querySelector('.menuitem:nth-child(4)');
const mood = document.querySelector('.mood');
toggle.addEventListener('click', openMenu);
mood.addEventListener('click', () => {
    if (mood.classList.contains('dark')) {
        mood.innerHTML = 'Light';
    } else {
        mood.innerHTML = 'Dark';
    }
    mood.classList.toggle('dark');
    document.querySelector('body').classList.toggle('dark');
});
function openMenu() {
    window.onclick = (e) => {
        if (!e.target.matches('ul') && e.target.matches('.toggle')) {
            toggle.classList.toggle('show');
            menu.classList.toggle('show');
        } else if (e.target.matches('ul') || e.target.matches('li')) { } else {
            toggle.classList.remove('show');
            menu.classList.remove('show');
        }
    }
}

// stop autohide for small devices
let media = window.matchMedia("(max-width: 768px)");
window.addEventListener("scroll", () => {
    let scroll = this.scrollY;

    if (!media.matches) {
        if (scroll >= 66) {
            if (!mood.classList.contains('dark')) {
                header.style = `
            position:fixed;
            width:100%;
            padding:1em;
            `;
                item4.style = `
            color:black;
            background-color:white;
            `;
            } else {
                header.style = `
            background-color:white;
            color:black;
            position:fixed;
            width:100%;
            box-shadow: 0 0 10px 0 black;
            padding:1em;
            `;
                item4.style = `
            color:white;
            background-color:black;
            `;
            }

        } else if (scroll <= 5) {
            header.style = `
            position:static;
            `;
            item4.style = `
            color:black;
            background-color:white;
            `;
        }
    }
});
autoHideNav(() => {
    header.style.display = 'none';
}, 1000);

function autoHideNav(callback, refresh = 66) {
    if (!callback || typeof callback !== 'function' || media.matches) return;
    let isScrolling = null;
    window.addEventListener('scroll', e => {
        let scroll = this.scrollY;
        if (isScrolling !== null) {
            clearTimeout(isScrolling);
        }
        if (scroll <= 10) {
            isScrolling = setTimeout(() => header.style.display = 'flex', 66);
        } else {
            isScrolling = setTimeout(callback, refresh);
        }
    }, false);
}