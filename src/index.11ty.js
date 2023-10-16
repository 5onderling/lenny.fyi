const { getImageHtml } = require('./utils/getImage.js');
const { md } = require('./utils/index.js');

exports.data = {
  title: 'Home',
  nav: true,
  order: 1,
};

exports.render = async (data) => md`
  <div class="hero">
    ${await getImageHtml('./src/assets/avatar.png', {
      width: 640,
      class: 'hero__image',
      alt: 'My avatar (An image of Majime Mitsuya from The Great Passage)',
    })}
    <h1 class="hero__headline">
      <small>Hey I'm</small><br/>${data.meta.owner.name}
    </h1>
  </div>

  ## About me

  I'm a frontend developer based in Kürten, Germany. I started learning developing in 2015 with basic HTML and CSS, fell since then in love with it, and never stopped learning.

  I am currently a software developer at TWT On, with a slight focus on backend development. My passion lies in frontend development, though.

  In my free time I'm currently learning a lot about accessibility and HTML markup in general. When I'm not programming, I probably watch a great piece of audio-visual entertainment, listen to fantastic music, browse through Reddit/twitter or enjoy wonderful art. Recently I started learning the piano.

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
  - [<span class="icon icon--twitter"></span> Twitter / x](https://twitter.com/5onderling)
  - [<span class="icon icon--letterboxd"></span> Letterboxd](https://letterboxd.com/LennyAnders)
  - [<span class="icon icon--anilist"></span> AniList](https://anilist.co/user/lenny)
  - [<span class="icon icon--discogs"></span> Discogs](https://www.discogs.com/user/5onderling)
  - [<span class="icon icon--linkedin"></span> Linkedin](https://www.linkedin.com/in/lenny-anders-698684271)
  - [<span class="icon icon--xing"></span> Xing](https://www.xing.com/profile/Lenny_Anders)
  - [<span class="icon icon--github"></span> Github](https://github.com/lennyanders)
  - [<span class="icon icon--email"></span> E-Mail](mailto:hey@lenny.fyi)

  ## Things I use

  - **Editor:** [Visual Studio Code](https://code.visualstudio.com/)
  - **Programming font:** [Fira Code](https://github.com/tonsky/FiraCode)
  - **Programming theme:** [SynthWave '84](https://github.com/robb0wen/synthwave-vscode)
  - **Computer:** Mac Mini (M1, 16 GB RAM)
  - **Monitor:** LG 27GP950 and Eizo FlexScan EV2450-BK (older model)
  - **Keyboard:** Ducky One 2 mini
  - **Mouse:** Logitech MX Master 3

  ---

  > You know what kind of plan never fails? No plan. No plan at all. You know why? Because life cannot be planned. Look around you. Did you think these people made a plan to sleep in the sports hall with you? But here we are now, sleeping together on the floor. So, there's no need for a plan. You can't go wrong with no plans. We don't need to make a plan for anything. It doesn't matter what will happen next. Even if the country gets destroyed or sold out, nobody cares. Got it?

  — [Ki-taek (Parasite)](https://www.imdb.com/title/tt6751668/quotes/qt4669228)
`;
