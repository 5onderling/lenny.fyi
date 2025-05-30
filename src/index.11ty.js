import { quotes } from './index/quotes.js';
import { getImageHtml } from './utils/getImage.js';
import { md } from './utils/index.js';

export const data = {
  title: 'Home',
  nav: true,
  order: 1,
};

export const render = async () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return md`
    <div class="hero">
      ${await getImageHtml('./src/assets/avatar.png', {
        width: 640,
        class: 'hero__image logo-image-transition',
        alt: 'My avatar (An image of Majime Mitsuya from The Great Passage)',
        lazy: false,
      })}
      <h1 class="hero__headline">
        <small>Hey I'm</small><br/>
        Lenny Anders
      </h1>
    </div>

    ## About me

    I'm a frontend developer based in Kürten, Germany. I started learning developing in 2015 with basic HTML and CSS, fell in love with it since then , and never stopped learning.

    Currently, I'm working as an angular frontend developer at Ströer.

    In my free time, I'm learning a lot about accessibility and HTML markup in general. When I'm not programming, I probably watch a great piece of audiovisual entertainment, listen to fantastic music or enjoy wonderful art.

    ## My skills

    Over the time I learned a few things, I mostly like writing vanilla JavaScript, TypeScript, CSS, SCSS, HTML5 and Voby. For bundling I like to use Vite or esbuild.

    _Here's a fancy list of things I can do / use (well):_

    - CSS / SASS / SCSS / PostCSS
    - JavaScript / TypeScript
    - Vite / esbuild / Rollup
    - Vue / Angular / Voby / Preact
    - Node.js / NPM
    - .net / C#

    ## Here you can find me

    - [<span class="icon icon--bluesky"></span> Bluesky](https://bsky.app/profile/lenny.fyi)
    - [<span class="icon icon--letterboxd"></span> Letterboxd](https://letterboxd.com/5onderling)
    - [<span class="icon icon--anilist"></span> AniList](https://anilist.co/user/lenny)
    - [<span class="icon icon--discogs"></span> Discogs](https://www.discogs.com/user/5onderling)
    - [<span class="icon icon--linkedin"></span> Linkedin](https://www.linkedin.com/in/5onderling)
    - [<span class="icon icon--github"></span> Github](https://github.com/5onderling)
    - [<span class="icon icon--email"></span> E-Mail](mailto:hey@lenny.fyi)

    ## Things I use

    - **Editor:** [Visual Studio Code](https://code.visualstudio.com/)
    - **Programming font:** [Fira Code](https://github.com/tonsky/FiraCode)
    - **Programming theme:** [SynthWave '84](https://github.com/robb0wen/synthwave-vscode)
    - **Computer:** MacBook Pro (M3 Max, 36 GB RAM)
    - **Monitor:** LG 27GP950 and Eizo FlexScan EV2450-BK (older model)
    - **Keyboard:** [ZSA Voyager](https://www.zsa.io/voyager)
    - **Mouse:** Logitech MX Master 3

    ---

    > ${quote.quote}

    — [${quote.author}](${quote.link})
`;
};
